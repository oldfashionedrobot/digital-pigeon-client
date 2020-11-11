import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User, Pigeon } from '../../models';
import { FirebaseService, PigeonService, UserService } from '../../services';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
    private _fbService: FirebaseService,
    private _pigeonService: PigeonService,
    private _userService: UserService
  ) { }

  filter(by: LoftFilters | string) {
    this.filter$.next(by as LoftFilters);
  }

  ngOnInit() {
    let currentUser: User;

    this.user$ = this._fbService.user$.asObservable();
    this.pigeons$ = combineLatest([
      this._pigeonService.getPigeons(),
      this.filter$,
      this.searchField.valueChanges.pipe(startWith('')),
      this.user$,
    ])
      .pipe(
        map(([pigeons, filter, search, user]) => {
          currentUser = user;
          let filteredPigs;

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
              filteredPigs = pigeons.filter(p => p.ownerId === user.id)
              break;
            case LoftFilters.Correspondents:
              filteredPigs = pigeons.filter(p => p.ownerId !== user.id)
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
        })
      );
  }
}
