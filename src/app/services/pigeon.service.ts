import { Injectable } from '@angular/core';
import { Pigeon } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PigeonService {
  private _pigeons: Pigeon[] = [
    new Pigeon(),
    new Pigeon(1),
    new Pigeon(2),
    new Pigeon(3),
    new Pigeon(4),
    new Pigeon(5),
    new Pigeon(6),
    new Pigeon(7),
    new Pigeon(8),
  ];

  getPigeons(): Observable<Pigeon[]> {
    return of(this._pigeons);
  }

  getPigeon(id: number) {
    return of(this._pigeons[id]);
  }
}
