import { Injectable } from '@angular/core';
import { Pigeon } from '../models';
import { Observable, of, ReplaySubject, Subject, combineLatest } from 'rxjs';

/// TEMP
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PigeonService {
  private _pigeons: Pigeon[];
  private _pigeons$: ReplaySubject<Pigeon[]> = new ReplaySubject<Pigeon[]>(1);

  constructor(private _firebaseService: FirebaseService, private _userService: UserService) {
    combineLatest([this._userService.getUsers(), this._firebaseService.user$])

      .subscribe(([users, currentUser]) => {
        this._pigeons = [
          new Pigeon(0, null, currentUser.id, currentUser.id),
          new Pigeon(1, null, currentUser.id, currentUser.id),
          new Pigeon(2, '1', currentUser.id, currentUser.id),
          new Pigeon(3, null, currentUser.id, currentUser.id),
          new Pigeon(4, '4', currentUser.id, currentUser.id),
          new Pigeon(5, null, currentUser.id, currentUser.id),
          new Pigeon(6, '2', currentUser.id, currentUser.id),
          new Pigeon(7, null, currentUser.id, currentUser.id),
          new Pigeon(8, null, currentUser.id, currentUser.id),
          new Pigeon(0, '3', currentUser.id, currentUser.id),
          new Pigeon(1, null, currentUser.id, currentUser.id),
          new Pigeon(2, null, users[0].id),
          new Pigeon(3, null, users[0].id),
          new Pigeon(4, null, users[1].id),
          new Pigeon(5, null, users[2].id),
          new Pigeon(6, null, users[2].id),
          new Pigeon(7, null, users[2].id),
          new Pigeon(8, null, users[0].id),
          new Pigeon(2, null, users[1].id),
          new Pigeon(3, null, users[1].id),
          new Pigeon(4, null, users[4].id),
          new Pigeon(5, null, users[4].id),
          new Pigeon(6, null, users[5].id),
          new Pigeon(7, null, users[5].id),
          new Pigeon(8, null, users[3].id),
          new Pigeon(2, null, users[3].id),
          new Pigeon(3, null, users[2].id),
          new Pigeon(4, null, users[5].id),
          new Pigeon(5, null, users[2].id),
          new Pigeon(6, null, users[3].id),
          new Pigeon(1, null, users[3].id),
          new Pigeon(0, null, users[2].id),
        ];

        this._pigeons$.next(this._pigeons);
      })
  }


  getPigeons(): Observable<Pigeon[]> {
    return this._pigeons$.asObservable();
  }

  getPigeon(id: number) {
    // make use of subject
    return of(this._pigeons[id]);
  }
}
