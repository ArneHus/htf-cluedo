import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'create', component: CreateLobbyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
