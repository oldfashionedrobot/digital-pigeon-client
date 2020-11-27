import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User, Pigeon } from '../../models';
import { UserService, PigeonService } from 'src/app/services';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  template: `
    <div class="modal">
      <div class="modal-content">
        <nav>
          <h2>Give Pigeon to Correspondent</h2>
          <a href="javascript:void(0)" [routerLink]="['', { outlets: { modal: null } }]" class="close-modal">
            X
          </a>
        </nav>  
        Select a Correspondent to send {{ (pigeon$ | async)?.name }} to.
        <ul class="select-user-list">
          <li *ngFor="let user of users$ | async" class="select-user"
            (click)="selectedUser = user.id"
            [class.active]="selectedUser == user.id">
            {{ user.name }}
          </li>
        </ul>

        <div class="modal-actions">
          <button (click)="givePigeon()" [disabled]="!selectedUser">
            Give Pigeon
          </button>
        </div>
 
      </div>
    </div>
  `,
  styleUrls: ['../modal.styles.scss'],
})
export class SendPigeonComponent implements OnInit {
  users$: Observable<User[]>;
  pigeon$: Observable<Pigeon>;
  selectedUser: number;

  private _pigeonId: number;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService, private _pigeonService: PigeonService) { }

  givePigeon() {
    this._pigeonService.givePigeon(this._pigeonId, this.selectedUser).then(m => {
      this._router.navigate(['', { outlets: { modal: null } }]);
    });

  }

  ngOnInit() {
    this.users$ = this._userService.getUsers();

    this.pigeon$ = this._route.params.pipe(
      map((params: Params) => {
        this._pigeonId = params['pigeonId'];
        return params['pigeonId'];
      }),
      switchMap((pigeonId: number) => {
        return this._pigeonService.getPigeon(pigeonId);
      })
    );
  }
}
