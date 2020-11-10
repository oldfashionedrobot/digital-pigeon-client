import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoftComponent } from './components/loft/loft.component';
import { PigeonComponent } from './components/pigeon/pigeon.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'loft',
    pathMatch: 'full',
  },
  {
    // load all pigeons with currentUserId == yours, group by userId
    path: 'loft',
    component: LoftComponent,
  },
  {
    // load all pigeons with currentUserId == yours, group by userId
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
  // {
  //   // how to id?? maybe pigeons with a message attached, add into loft?
  //   path: 'inbox',
  // },
  // {
  //   path: 'messages',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
