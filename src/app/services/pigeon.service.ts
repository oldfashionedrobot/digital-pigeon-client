import { Injectable } from '@angular/core';
import { Pigeon } from '../models';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';

/// TEMP
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class PigeonService {
  private _pigeons: Pigeon[];
  private _pigeons$: ReplaySubject<Pigeon[]> = new ReplaySubject<Pigeon[]>(1);

  constructor(private _firebaseService: FirebaseService) {
    this._firebaseService.user$.subscribe((user) => {
      this._pigeons = [
        new Pigeon(0, null, user.id),
        new Pigeon(1, null, user.id),
        new Pigeon(2, '1', user.id),
        new Pigeon(3, null, user.id),
        new Pigeon(4, '4', user.id),
        new Pigeon(5, null, user.id),
        new Pigeon(6, '2', user.id),
        new Pigeon(7, null, user.id),
        new Pigeon(8, null, user.id),
        new Pigeon(0, '3', user.id),
        new Pigeon(1, null, user.id),
        new Pigeon(2, null, 'fsddfsf'),
        new Pigeon(3, null, 'fsddfsf'),
        new Pigeon(4, null, 'fsddfsf'),
        new Pigeon(5, null, 'fsddfsf'),
        new Pigeon(6, null, 'fsddfsf'),
        new Pigeon(7, null, 'fsddfsf'),
        new Pigeon(8, null, 'fsddfsf'),
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
