import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PigeonService, UserService, MessageService } from 'src/app/services';
import { Pigeon, User } from '../../models';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  template: `
    <div class="modal">
      <div class="modal-content">
        <nav>
          <h2>Send Message</h2>
          <a href="javascript:void(0)" [routerLink]="['', { outlets: { modal: null } }]" class="close-modal">
            X
          </a>
        </nav>  
        Type a messasge to send with {{ (pigeon$ | async)?.name }} to {{ (user$ | async)?.name }}.
        <br>
        <textarea [(ngModel)]="messageText">
        </textarea>
        <div class="modal-actions">
          <button (click)="sendMessage()">
            Send Message
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../modal.styles.scss'],
})
export class SendMessageComponent implements OnInit {
  user$: Observable<User>;
  pigeon$: Observable<Pigeon>;
  private _pigeonId: number;
  messageText: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _messageService: MessageService, private _pigeonService: PigeonService, private _userService: UserService) { }

  sendMessage() {
    this._messageService.sendMessage(this._pigeonId, this.messageText);
    this._router.navigate(['', { outlets: { modal: null } }]);
  }

  ngOnInit() {
    // this.user$ = this._userService.getUser();

    this.pigeon$ = this._route.params.pipe(
      map((params: Params) => {
        this._pigeonId = params['pigeonId'];
        return params['pigeonId'];
      }),
      switchMap((pigeonId: number) => {
        return this._pigeonService.getPigeon(pigeonId);
      })
    );

    this.user$ = this.pigeon$.pipe(switchMap(pigeon => {
      return this._userService.getUser(pigeon.ownerId);
    }));

  }
}
