import { Component, OnInit, Input } from '@angular/core';
import { Pigeon, Message } from '../../models';
import { DecoratedPigeon } from '../loft/loft.component';

@Component({
  template: `
    <div class="modal">
      <div class="modal-content">
        <nav>
          <h2>Send Message</h2>
          <a href="javascript:void(0)" [routerLink]="['', { outlets: { modal: null } }]" class="close-modal">
            X
          </a>
        </nav>  
      // send message

      </div>
    </div>
  `,
  styleUrls: ['../modal.styles.scss'],
})
export class SendMessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {


  }
}
