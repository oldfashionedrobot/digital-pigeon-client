import { Component, OnInit } from '@angular/core';
import { Message } from '../../models';
import { MessageService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  template: `
    <div class="messages">
      <p *ngFor="let message of messages$ | async">
        {{ message.text }}
        <a routerLink="./{{ message.id }}">Read Message</a>
      </p>
    </div>
  `,
  styles: [``],
})
export class MessagesComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private _messageService: MessageService) {}

  ngOnInit() {
    this.messages$ = this._messageService.getMessages();
  }
}
