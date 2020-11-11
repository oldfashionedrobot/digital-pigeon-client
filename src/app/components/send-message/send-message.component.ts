import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PigeonService, UserService } from 'src/app/services';
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
        <textarea>
        </textarea>
        <div class="modal-actions">
          <button [routerLink]="['', { outlets: { modal: null } }]">
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

  constructor(private _route: ActivatedRoute, private _pigeonService: PigeonService, private _userService: UserService) { }

  ngOnInit() {
    // this.user$ = this._userService.getUser();

    this.pigeon$ = this._route.params.pipe(
      map((params: Params) => {
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
