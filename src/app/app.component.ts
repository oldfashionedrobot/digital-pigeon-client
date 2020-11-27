import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { Observable } from 'rxjs';
import { AuthService, UserService } from './services';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.template.html',
  styleUrls: ['./app.styles.scss'],
})
export class AppComponent implements OnInit {
  title = 'digital-pigeon';
  user$: Observable<User>;
  userOpts$: Observable<User[]>;


  constructor(private _userService: UserService, private _authService: AuthService) { }

  ngOnInit() {
    this.user$ = this._authService.currentUserId$.pipe(switchMap(id => this._userService.getUser(id)));

    this.userOpts$ = this._userService.getUsers();
  }

  changeUser(value: number) {
    this._authService.changeUser(value);
  }

}
