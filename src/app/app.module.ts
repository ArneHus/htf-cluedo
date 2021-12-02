import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';

import { MatDialogModule } from '@angular/material/dialog';
import { RulesComponent } from './rules/rules.component';
import { GameComponent } from './game/game.component';
import { CluesComponent } from './clues/clues.component';

@NgModule({

  declarations: [
    AppComponent,
    LandingComponent,
    RulesComponent,
    CreateLobbyComponent,
    GameComponent,
    CluesComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
