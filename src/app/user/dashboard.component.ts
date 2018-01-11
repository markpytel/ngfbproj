import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase'; 

import { FEED_ADD, FEED_REMOVE, FEED_ADD_COMMENT } from '../store/feed/feed.actions';
import { IAppState } from '../store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  form: FormGroup;

  config: any;
  userId: any;

  feeds$: Observable<{}>;

  userData1: any;
  userData2: any;

  constructor(public fb: FormBuilder, public store: Store<IAppState>) {

    this.feeds$ = store.select('feed');

    this.form = fb.group({
      text: ['', Validators.required],
      name: ['', Validators.required]
    });

    var config = {
      apiKey: "AIzaSyCA6NZgN4JxSffbnJk4jT43yeWRp6N1nPM",
      authDomain: "mwprojectmp.firebaseapp.com",
      databaseURL: "https://mwprojectmp.firebaseio.com",
      projectId: "mwprojectmp",
      storageBucket: "mwprojectmp.appspot.com",
      messagingSenderId: "150830302092"
    };

    firebase.initializeApp(config);

    this.config = config

  }

  submitFeed(): void {

    if (this.form.valid) {

      this.store.dispatch({
        type: FEED_ADD,
        payload: this.form.value
      });

      this.form.reset();
    }
  }

  submitCommentOnFeed(id: string, commentForm: FormGroup): void {

    if (commentForm.valid) {

      this.store.dispatch({
        type: FEED_ADD_COMMENT,
        payload: {
          id,
          comment: commentForm.value
        }
      });

      commentForm.reset();
    }

  }

  removeFeed(feed: {}): void {

    this.store.dispatch({
      type: FEED_REMOVE,
      payload: feed
    });

  }

  ngOnInit() {
    console.log('firebase: ', firebase);
    console.log('this.config: ', this.config);
    // this.writeUserData();
    // this.readUserData();
    console.log('user1: ', this.userData1)
    console.log('user2: ', this.userData2)    
  }

  writeUserData() {
    firebase.database().ref('users/' + '1').set({
      username: 'user1',
      email: 'a'
    });
    firebase.database().ref('users/' + '2').set({
      username: 'user2',
      email: 'b'
    });
  }

  readUserData() {
    this.userData1 = firebase.database().ref('users/' + '1')
    this.userData1.on('value', function(snapshot) {
      this.getUserData('', snapshot.val());
    });
    this.userData2 = firebase.database().ref('users/' + '2')
    this.userData2.on('value', function(snapshot) {
      this.getUserData('', snapshot.val());
    });
  }

  getUserData(var1, func1) {
    console.log('func1 result: ', func1());
    return {};
  }
}
