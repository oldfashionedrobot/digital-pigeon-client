import { Component, OnInit, Input } from '@angular/core';
import { Pigeon, Message } from '../../models';
import { DecoratedPigeon } from '../loft/loft.component';

@Component({
  selector: 'pigeon-item',
  template: `
    <div class="pigeon {{ pigeon.messageId ? 'has-message' : '' }}">
      <span *ngIf="pigeon.ownerName">
        {{ pigeon.ownerName }}'s
      </span>
      {{ pigeon.name }}
      <img src="{{ pigeon.imgUrl }}" />
      <a routerLink="pigeons/{{ pigeon.id }}">View Pigeon</a>
    </div>
  `,
  styleUrls: ['./pigeon-item.styles.scss'],
})
export class PigeonItemComponent implements OnInit {
  @Input() pigeon: DecoratedPigeon;

  constructor() { }

  ngOnInit() {


  }
}
