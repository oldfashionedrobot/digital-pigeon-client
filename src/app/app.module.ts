import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoftComponent } from './components/loft/loft.component';
import { PigeonItemComponent } from './components/pigeon-item/pigeon-item.component';
import { PigeonComponent } from './components/pigeon/pigeon.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessageComponent } from './components/message/message.component';
import { SendPigeonComponent } from './components/send-pigeon/send-pigeon.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { ReadMessageComponent } from './components/read-message/read-message.component';


@NgModule({
  imports: [BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule, AppRoutingModule],
  declarations: [
    AppComponent,
    LoftComponent,
    PigeonItemComponent,
    PigeonComponent,
    MessageComponent,
    MessagesComponent,
    SendPigeonComponent,
    SendMessageComponent,
    ReadMessageComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
