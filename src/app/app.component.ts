import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { FirebaseService } from './services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.template.html',
  styleUrls: ['./app.styles.scss'],
})
export class AppComponent implements OnInit {
  title = 'digital-pigeon';
  user$: Observable<User>;

  constructor(private fbService: FirebaseService) {}

  ngOnInit() {
    this.fbService.signIn();
    this.user$ = this.fbService.user$.asObservable();
  }
}
