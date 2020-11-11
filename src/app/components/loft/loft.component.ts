import { Component, OnInit } from '@angular/core';
import { User, Pigeon } from '../../models';
import { FirebaseService, PigeonService } from '../../services';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export enum LoftFilters {
  All = '',
  Yours = 'yours',
  Correspondents = 'others',
  HaveMessages = 'messages'
}

@Component({
  templateUrl: './loft.template.html',
  styleUrls: ['./loft.styles.scss'],
})
export class LoftComponent implements OnInit {
  user$: Observable<User>;
  pigeons$: Observable<Pigeon[]>;
  filter$ = new BehaviorSubject<LoftFilters>(LoftFilters.All);
  numMessages: number = 0;


  constructor(
    private _fbService: FirebaseService,
    private _pigeonService: PigeonService
  ) { }

  filter(by: LoftFilters | string) {
    this.filter$.next(by as LoftFilters);
  }

  ngOnInit() {
    this.user$ = this._fbService.user$.asObservable();
    this.pigeons$ = combineLatest([this._pigeonService.getPigeons(), this.filter$, this.user$])
      .pipe(
        map(([pigeons, filter, user]) => {
          console.log(pigeons);
          switch (filter) {
            case LoftFilters.Yours:
              return pigeons.filter(p => p.ownerId === user.id)
            case LoftFilters.Correspondents:
              return pigeons.filter(p => p.ownerId !== user.id)
            case LoftFilters.HaveMessages:
              return pigeons.filter(p => p.messageId != null)
            case LoftFilters.All:
            default:
              return pigeons;
          }
        })
      );
  }
}
