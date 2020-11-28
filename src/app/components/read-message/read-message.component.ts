import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService, PigeonService, UserService } from 'src/app/services';
import { Message, User } from '../../models';
import { Observable } from 'rxjs';
import { map, switchMap, take, shareReplay } from 'rxjs/operators';

@Component({
  template: `
    <div class="modal">
      <div class="modal-content">
        <nav>
          <h2>Read Message</h2>
          <a href="javascript:void(0)" [routerLink]="['', { outlets: { modal: null } }]" class="close-modal">
            X
          </a>
        </nav>  
        From: {{ (sender$ | async)?.name }}
        
        <p>
         {{ (message$ | async)?.message }}
        </p>
        Sent: {{ (message$ | async)?.createdAt }}
      </div>
    </div>
  `,
  styleUrls: ['../modal.styles.scss'],
})
export class ReadMessageComponent implements OnInit {
  message$: Observable<Message>;
  sender$: Observable<User>;

  constructor(
    private _route: ActivatedRoute,
    private _messageService: MessageService,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.message$ = this._route.params.pipe(
      map((params: Params) => {
        return params['messageId'];
      }),
      switchMap((messageId: number) => {
        return this._messageService.getMessage(messageId);
      }),
      shareReplay(1)
    );

    this.sender$ = this.message$.pipe(switchMap(msg => this._userService.getUser(msg.fromId)))

    this.message$.pipe(take(1)).subscribe(msg => {
      this._messageService.readMessage(msg.id).then(r => {
        console.log('marked as read', r);
      })
    })

  }
}
