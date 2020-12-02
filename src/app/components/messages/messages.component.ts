import { Component, OnInit } from '@angular/core';
import { Message } from '../../models';
import { AuthService, MessageService } from '../../services';
import { Observable } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

@Component({
  template: `
    <div class="messages">
      <p *ngFor="let message of messages$ | async">
        {{ message.message }}
        <a [routerLink]="['', { outlets: { modal: ['read-message', message.id] } }]">Read Message</a>
      </p>
    </div>
  `,
  styles: [``],
})
export class MessagesComponent implements OnInit {
  messages$: Observable<Message[]>;
  senders$: Observable<any>;

  constructor(private _messageService: MessageService, private _authService: AuthService) { }

  ngOnInit() {
    this.messages$ = this._authService.currentUserId$.pipe(
      switchMap(id => this._messageService.getMessagesForUser(id)),
      shareReplay(1)
    );

    this.senders$ = this.messages$.pipe(

    )

  }
}
