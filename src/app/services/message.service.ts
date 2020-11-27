import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _baseUrl: string = `${environment.apiUrl}/messages`;

  constructor(private _http: HttpClient) { }

  getMessages(): Observable<Message[] | any> {
    return this._http.get(this._baseUrl).pipe(
      map((resp: { data: [] }) => {
        return resp.data.map(r => {
          return new Message(r);
        });
      })
    )
  }

  getMessage(id: number): Observable<Message> {
    return this._http.get(`${this._baseUrl}/${id}`).pipe(
      map((resp: { data: Array<any> }) => {
        return new Message(resp.data[0]);
      })
    )
  }

  getMessagesForUser(userId: number): Observable<Message[] | any> {
    return this._http.get(`${this._baseUrl}/user/${userId}`).pipe(
      map((resp: { data: [] }) => {
        return resp.data.map(r => {
          return new Message(r);
        });
      })
    )
  }
}
