import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pigeon } from '../../models';
import { PigeonService } from '../../services';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  template: `
    <div class="pigeon">
      {{ (pigeon$ | async)?.name }}
      <img src="{{ (pigeon$ | async)?.imgUrl }}" />
    </div>
  `,
  styles: [
    `
      .pigeon {
        width: 17vw;
        display: inline-block;
        border: 1px solid grey;
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
  ) {}

  ngOnInit() {
    this.pigeon$ = this._route.params.pipe(
      switchMap((params: Params) => {
        return params['pigeonId'];
      }),
      switchMap((pigeonId: number) => {
        return this._pigeonService.getPigeon(pigeonId);
      })
    );
  }
}
