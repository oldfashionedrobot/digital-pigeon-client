import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'src/app/services';
import { Message } from '../../models';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
        Message content:
        
        <p>
         {{ (message$ | async)?.text }}
        </p>

      </div>
    </div>
  `,
  styleUrls: ['../modal.styles.scss'],
})
export class ReadMessageComponent implements OnInit {
  message$: Observable<Message>;

  constructor(private _route: ActivatedRoute, private _messageService: MessageService) { }

  ngOnInit() {
    this.message$ = this._route.params.pipe(
      map((params: Params) => {
        return params['messageId'];
      }),
      switchMap((messageId: string) => {
        return this._messageService.getMessage(messageId);
      })
    );

  }
}
