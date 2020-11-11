import { Component, OnInit, Input } from '@angular/core';
import { Pigeon, Message } from '../../models';
import { DecoratedPigeon } from '../loft/loft.component';

@Component({
  template: `
    <div class="modal">
      <div class="modal-content">
        <nav>
          <h2>Read Message</h2>
          <a href="javascript:void(0)" [routerLink]="['', { outlets: { modal: null } }]" class="close-modal">
            X
          </a>
        </nav>  
      // read message

      </div>
    </div>
  `,
  styleUrls: ['../modal.styles.scss'],
})
export class ReadMessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {


  }
}
