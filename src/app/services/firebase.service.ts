import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import * as firebase from 'firebase';
import { ReplaySubject } from 'rxjs';

(window as any).fb = firebase;

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  email = 'snayak00@gmail.com';
  password = 'internet0!';
  user$: ReplaySubject<User> = new ReplaySubject<User>(1);

  // currentUser(): Promise<User> {
  //   return new Promise((resolve, reject) => {
  //     if (!this.user && firebase.auth().currentUser) {
  //       this.user = new User(firebase.auth().currentUser);
  //     } else {
  //       reject('cannae find user');
  //     }
  //
  //     resolve(this.user);
  //   });
  // }

  signIn() {
    return firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        this.user$.next(new User(user.user));
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
