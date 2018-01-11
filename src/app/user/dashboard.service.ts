import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Client } from './dashboard.model';
@Injectable()
export class ClientService {
    private basePath: string = '/Client';
    Clients: FirebaseListObservable<Client[]> = null; //  list of objects
    Client: FirebaseObjectObservable<Client> = null; //   single object
    constructor(private db: AngularFireDatabase) { }

    getClientsList(query = {}): FirebaseListObservable<Client[]> {
        this.Clients = this.db.list(this.basePath, {
            query: query
        });
        return this.Clients
    }
    // Return a single observable Client
    getClient(key: string): FirebaseObjectObservable<Client> {
        const ClientPath = `${this.basePath}/${key}`;
        this.Client = this.db.object(ClientPath)
        return this.Client
    }
}

