import { Component, OnInit, Input } from '@angular/core';
import { Pigeon, Message } from '../../models';

@Component({
  selector: 'pigeon-item',
  template: `
    <div class="pigeon">
      {{ pigeon.name }}
      <img src="{{ pigeon.imgUrl }}" />
      <a routerLink="pigeons/{{ pigeon.id }}">View Pigeon</a>
      <a *ngIf="message" routerLink="/messages/{{ message.id }}">
        Read Message
      </a>
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
export class PigeonItemComponent implements OnInit {
  @Input() pigeon: Pigeon;
  @Input() message: Message = new Message('hello');

  constructor() {}

  ngOnInit() {}
}
