import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../models';
import { MessageService } from '../../services';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  template: `
    <div *ngIf="(message$ | async) as message" class="message">
      {{ message.message }}
    </div>
  `,
  styles: [``],
})
export class MessageComponent implements OnInit {
  message$: Observable<Message>;

  constructor(
    private _route: ActivatedRoute,
    private _messageService: MessageService
  ) { }

  ngOnInit() {
    this.message$ = this._route.params.pipe(
      switchMap((params: Params) => {
        return params['messageId'];
      }),
      switchMap((messageId: number) => {
        return this._messageService.getMessage(messageId);
      })
    );
  }
}
