import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.template.html',
  styleUrls: ['./app.styles.scss'],
})
export class AppComponent implements OnInit {
  title = 'digital-pigeon';
  user$: Promise<User>;

  constructor(private fbService: FirebaseService) {}

  ngOnInit() {
    this.user$ = this.fbService.signIn();
  }
}
