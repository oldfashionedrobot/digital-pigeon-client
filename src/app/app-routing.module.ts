import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoftComponent } from './components/loft/loft.component';
import { PigeonComponent } from './components/pigeon/pigeon.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';
import { SendPigeonComponent } from './components/send-pigeon/send-pigeon.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { ReadMessageComponent } from './components/read-message/read-message.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'loft',
    pathMatch: 'full',
  },
  {
    path: 'loft',
    component: LoftComponent,
  },
  {
    path: 'loft/pigeons/:pigeonId',
    component: PigeonComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
  },
  {
    path: 'messages/:messageId',
    component: MessageComponent,
  },
  {
    path: 'send-pigeon/:pigeonId',
    outlet: 'modal',
    component: SendPigeonComponent
  },
  {
    path: 'send-message/:pigeonId',
    outlet: 'modal',
    component: SendMessageComponent
  },
  {
    path: 'read-message/:pigeonId',
    outlet: 'modal',
    component: ReadMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
