import { Injectable } from '@angular/core';
import { Message } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _messages: Message[] = [
    new Message('1', 'hello'),
    new Message('2', 'goodbye'),
    new Message('3', 'frankfurter'),
    new Message('4', 'potato salad'),
    new Message('5', 'frankfurter'),
    new Message('6', 'potato salad'),
  ];

  getMessages(): Observable<Message[]> {
    return of(this._messages);
  }

  getMessage(id: string) {
    return of(this._messages.find(m => m.id == id));
  }
}
