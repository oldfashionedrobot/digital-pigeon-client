import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUserId$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  changeUser(newId: number) {
    this.currentUserId$.next(newId);
  }
}