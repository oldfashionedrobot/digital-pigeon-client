import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _baseUrl: string = `${environment.apiUrl}/users`;

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this._http.get(this._baseUrl).pipe(
      map((resp: { data: [] }) => {
        return resp.data.map(r => {
          return new User(r);
        });
      })
    )
  }

  getUser(id: number) {
    return this._http.get(`${this._baseUrl}/${id}`).pipe(
      map((resp: { data: Array<any> }) => {
        return new User(resp.data[0]);
      })
    )
  }
}
