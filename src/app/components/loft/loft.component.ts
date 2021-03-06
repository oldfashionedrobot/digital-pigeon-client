import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User, Pigeon } from '../../models';
import { AuthService, PigeonService, UserService } from '../../services';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, startWith, switchMap, shareReplay, filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

export enum LoftFilters {
  All = '',
  Yours = 'yours',
  Correspondents = 'others',
  HaveMessages = 'messages'
}

export class DecoratedPigeon extends Pigeon {
  ownerName: string;
}

@Component({
  templateUrl: './loft.template.html',
  styleUrls: ['./loft.styles.scss'],
})
export class LoftComponent implements OnInit {
  user$: Observable<User>;
  pigeons$: Observable<Pigeon[]>;
  filter$ = new BehaviorSubject<LoftFilters>(LoftFilters.All);
  searchField: FormControl = new FormControl('');
  numMessages: number = 0;
  currentFilter: LoftFilters;


  constructor(
    private _pigeonService: PigeonService,
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  filter(by: LoftFilters | string) {
    this.filter$.next(by as LoftFilters);
  }

  ngOnInit() {
    let currentUser: User;

    const refresher$ = this._router.events.pipe(map((val) => {
      // see also 
      if (val instanceof NavigationEnd && !val.url.includes('(modal:')) {
        console.log('refresh', val);
        return true;
      }
      return false;
    }), filter(b => b == true));

    this.user$ = this._authService.currentUserId$.pipe(
      switchMap(id => {
        this.filter$.next(LoftFilters.All);
        this.searchField.setValue('');
        return this._userService.getUser(id)
      }),
      shareReplay(1)
    );

    this.pigeons$ =
      refresher$.pipe(
        startWith(true),
        switchMap(() => combineLatest([
          this.user$.pipe(switchMap(user => {
            currentUser = user;
            return this._pigeonService.getPigeonsForUser(user.id)
          })),
          this.filter$,
          this.searchField.valueChanges.pipe(startWith('')),
        ])),
        map(([pigeons, filter, search]) => {
          let filteredPigs;
          console.log('reload');
          if (pigeons != null) {
            pigeons.forEach(async (p: DecoratedPigeon) => {
              if (p.ownerId != currentUser.id) {
                let owner = await this._userService.getUser(p.ownerId).toPromise();
                p.ownerName = owner.name;
              }
            })
          }

          this.numMessages = pigeons.reduce((acc, p) => acc + (p.messageId ? 1 : 0), 0)

          this.currentFilter = filter;

          switch (filter) {
            case LoftFilters.Yours:
              filteredPigs = pigeons.filter(p => p.ownerId === currentUser.id)
              break;
            case LoftFilters.Correspondents:
              filteredPigs = pigeons.filter(p => p.ownerId !== currentUser.id)
              break;
            case LoftFilters.HaveMessages:
              filteredPigs = pigeons.filter(p => p.messageId != null)
              break;
            case LoftFilters.All:
            default:
              filteredPigs = pigeons;
          }


          if (search != '') {
            filteredPigs = filteredPigs.filter(p => {
              return p.ownerName != null && p.ownerName.toLowerCase().includes(search.toLowerCase());
            })
          }
          return filteredPigs || [];
        }),
        shareReplay(1)
      );
  }
}
