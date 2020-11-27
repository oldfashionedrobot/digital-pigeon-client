import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pigeon } from '../models';
import { Observable, of, ReplaySubject, Subject, combineLatest, } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PigeonService {
  private _baseUrl: string = `${environment.apiUrl}/pigeons`;

  constructor(private _http: HttpClient) {

  }


  getPigeons(): Observable<Pigeon[] | any> {
    return this._http.get(this._baseUrl).pipe(
      map((resp: { data: [] }) => {
        return resp.data.map(r => {
          return new Pigeon(r);
        });
      })
    )
  }

  getPigeon(id: number): Observable<Pigeon> {
    return this._http.get(`${this._baseUrl}/${id}`).pipe(
      map((resp: { data: Array<any> }) => {
        return new Pigeon(resp.data[0]);
      })
    )
  }

  readPigeon(id: number): Promise<object> {
    return this._http.put(`${this._baseUrl}/${id}/read`, {}).toPromise();
  }

  getPigeonsForUser(userId: number): Observable<Pigeon[] | any> {
    return this._http.get(`${this._baseUrl}/user/${userId}`).pipe(
      map((resp: { data: [] }) => {
        return resp.data.map(r => {
          return new Pigeon(r);
        });
      })
    )
  }

  givePigeon(pigeonId: number, recipientId: number): Promise<object> {
    return this._http.post(`${environment.apiUrl}/give-pigeon`, {
      pigeonId, recipientId
    }).toPromise();
  }
}
