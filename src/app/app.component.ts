import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RulesComponent } from './rules/rules.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog){}

  openRules() {
    this.dialog.open(RulesComponent);
  }
}
