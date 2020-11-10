import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoftComponent } from './components/loft/loft.component';
import { PigeonItemComponent } from './components/pigeon-item/pigeon-item.component';
import { PigeonComponent } from './components/pigeon/pigeon.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  imports: [BrowserModule, CommonModule, RouterModule, AppRoutingModule],
  declarations: [
    AppComponent,
    LoftComponent,
    PigeonItemComponent,
    PigeonComponent,
    MessageComponent,
    MessagesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
