import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as firebase from 'firebase';

(window as any).fb = firebase;

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  email = 'snayak00@gmail.com';
  password = 'internet0!';
  user: User;

  currentUser() {
    if (!this.user) {
      this.user = new User(firebase.auth().currentUser);
    }

    return this.user;
  }

  signIn(): Promise<User> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.user = new User(user.user);
        return this.user;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  doThing() {
    console.log('thing');
  }
}
