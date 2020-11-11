import { Injectable } from '@angular/core';
import { User } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users: User[] = [
    new User({
      displayName: 'Billy',
      uid: '1',
      email: 'billy@butcher.com'
    }),
    new User({
      displayName: 'Marvin',
      uid: '2',
      email: 'marvin@milk.com'
    }),
    new User({
      displayName: 'Serge',
      uid: '3',
      email: 'serge@frenchie.com'
    }),
    new User({
      displayName: 'Kimiko',
      uid: '4',
      email: 'kimiko@thefemale.com'
    }),
    new User({
      displayName: 'Hughie',
      uid: '5',
      email: 'hughie@campbell.com'
    }),
    new User({
      displayName: 'Annie',
      uid: '6',
      email: 'annie@january.com'
    }),
  ];

  getUsers(): Observable<User[]> {
    return of(this._users);
  }

  getUser(id: string) {
    return of(this._users.find(u => u.id === id));
  }
}
