import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pigeon } from '../../models';
import { PigeonService } from '../../services';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  template: `
    <div *ngIf="(pigeon$ | async) as pigeon" class="pigeon">
      <div class="pigeon-pic">  
        {{ pigeon.name }}
        <img src="{{ pigeon.imgUrl }}" />
      </div>  
      <div class="pigeon-info">
        <a *ngIf="pigeon.ownerId == pigeon.currentUserId"
          href="javascript:void(0)"
          [routerLink]="['', { outlets: { modal: ['send-pigeon', pigeon.id] } }]">
          Give Pigeon to Correspondent
        </a>
        <a *ngIf="pigeon.ownerId != pigeon.currentUserId"
          href="javascript:void(0)"
          [routerLink]="['', { outlets: { modal: ['send-message', pigeon.id] } }]">
          Send Message
        </a>
        <a *ngIf="pigeon.messageId"
          href="javascript:void(0)"
          [routerLink]="['', { outlets: { modal: ['read-message', pigeon.messageId] } }]">
          Read Message
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .pigeon {
        display: flex;
        border: 1px solid grey;
      }

      .pigeon-info {
        flex-grow: 1;
      }

      .pigeon-pic {
        min-width: 17vw;
      }

      .pigeon img {
        width: 100%;
      }
    `,
  ],
})
export class PigeonComponent implements OnInit {
  pigeon$: Observable<Pigeon>;

  constructor(
    private _route: ActivatedRoute,
    private _pigeonService: PigeonService
  ) { }

  ngOnInit() {
    this.pigeon$ = this._route.params.pipe(
      map((params: Params) => {
        return params['pigeonId'];
      }),
      switchMap((pigeonId: number) => {
        console.log(pigeonId)
        return this._pigeonService.getPigeon(pigeonId);
      })
    );
  }
}
