import { Component, OnInit } from '@angular/core';
import { User, Pigeon } from '../../models';
import { FirebaseService, PigeonService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './loft.template.html',
  styleUrls: ['./loft.styles.scss'],
})
export class LoftComponent implements OnInit {
  user$: Observable<User>;
  pigeons$: Observable<Pigeon[]>;
  loftView: number = 1;

  constructor(
    private _fbService: FirebaseService,
    private _pigeonService: PigeonService
  ) {}

  goLeft() {
    if (this.loftView > 0) {
      this.loftView--;
    }
  }

  goRight() {
    if (this.loftView < 2) {
      this.loftView++;
    }
  }

  ngOnInit() {
    this.user$ = this._fbService.user$.asObservable();
    this.pigeons$ = this._pigeonService.getPigeons();
  }
}
