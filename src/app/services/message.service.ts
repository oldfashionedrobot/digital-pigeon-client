import { Injectable } from '@angular/core';
import { Message } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _messages: Message[] = [
    new Message('hello'),
    new Message('goodbye'),
    new Message('frankfurter'),
    new Message('potato salad'),
  ];

  getMessages(): Observable<Message[]> {
    return of(this._messages);
  }

  getMessage(id: number) {
    return of(this._messages[id]);
  }
}
