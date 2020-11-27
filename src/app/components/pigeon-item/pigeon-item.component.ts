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

      <nav>
        <a *ngIf="pigeon.ownerId == pigeon.currentUserId && !pigeon.messageId"
          href="javascript:void(0)"
          [routerLink]="['', { outlets: { modal: ['send-pigeon', pigeon.id] } }]">
          Give Pigeon
        </a>
        <a *ngIf="pigeon.ownerId != pigeon.currentUserId"
          href="javascript:void(0)"
          [routerLink]="['', { outlets: { modal: ['send-message', pigeon.id] } }]">
          Send Message
        </a>
        <a *ngIf="pigeon.messageId"
          href="javascript:void(0)"
          [routerLink]="['', { outlets: { modal: ['read-message', pigeon.messageId] } }]">
          Read Message
        </a>
      </nav>
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
