import { Injectable } from '@angular/core';
import { Pigeon } from '../models';
import { Observable, of, ReplaySubject, Subject, combineLatest, } from 'rxjs';
import { map } from 'rxjs/operators';

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
          new Pigeon(1, 0, null, currentUser.id, currentUser.id),
          new Pigeon(2, 1, null, currentUser.id, currentUser.id),
          new Pigeon(3, 2, '1', currentUser.id, currentUser.id),
          new Pigeon(4, 7, null, currentUser.id, currentUser.id),
          new Pigeon(5, 3, null, currentUser.id, currentUser.id),
          new Pigeon(6, 4, '4', currentUser.id, currentUser.id),
          new Pigeon(7, 5, null, currentUser.id, currentUser.id),
          new Pigeon(8, 6, '2', currentUser.id, currentUser.id),
          new Pigeon(9, 8, '5', currentUser.id, currentUser.id),
          new Pigeon(10, 0, '3', currentUser.id, currentUser.id),
          new Pigeon(11, 7, '6', currentUser.id, currentUser.id),
          new Pigeon(12, 1, null, currentUser.id, currentUser.id),
          new Pigeon(13, 2, null, users[0].id),
          new Pigeon(14, 3, null, users[0].id),
          new Pigeon(15, 4, null, users[1].id),
          new Pigeon(16, 5, null, users[2].id),
          new Pigeon(17, 6, null, users[2].id),
          new Pigeon(18, 7, null, users[2].id),
          new Pigeon(19, 8, null, users[0].id),
          new Pigeon(20, 2, null, users[1].id),
          new Pigeon(21, 3, null, users[1].id),
          new Pigeon(22, 4, null, users[4].id),
          new Pigeon(23, 5, null, users[4].id),
          new Pigeon(24, 6, null, users[5].id),
          new Pigeon(25, 7, null, users[5].id),
          new Pigeon(26, 8, null, users[3].id),
          new Pigeon(27, 2, null, users[3].id),
          new Pigeon(28, 3, null, users[2].id),
          new Pigeon(29, 4, null, users[5].id),
          new Pigeon(30, 5, null, users[2].id),
          new Pigeon(31, 6, null, users[3].id),
          new Pigeon(32, 1, null, users[3].id),
          new Pigeon(33, 0, null, users[2].id),
        ];

        this._pigeons$.next(this._pigeons);
      })
  }


  getPigeons(): Observable<Pigeon[]> {
    return this._pigeons$.asObservable();
  }

  getPigeon(id: number) {
    // make use of subject
    return this._pigeons$.pipe(map(pigeons => {
      return pigeons.find(p => p.id == id)
    }))
  }
}
