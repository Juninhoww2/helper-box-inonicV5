import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../app/dtos/IUser';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})

export class AuthenticationService {

    public isLogged: any = false;

    constructor(private angularFireAuth: AngularFireAuth) {
        angularFireAuth.authState.subscribe(user => (this.isLogged = user));
    }

    async registerUser(user: User) {
        try {
            return await this.angularFireAuth
                .createUserWithEmailAndPassword(user.email, user.password);
        } catch (err) {
            console.log('Unexpected error: ', err);
        }
    }

    async loginUser(user: User) {
        try {
            return await this.angularFireAuth
                .signInWithEmailAndPassword(user.email, user.password);
        } catch (err) {
            console.log('Unexpected error: ', err);
        }
    }



}
