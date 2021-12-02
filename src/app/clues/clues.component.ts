import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../game';

@Component({
  selector: 'app-clues',
  templateUrl: './clues.component.html',
  styleUrls: ['./clues.component.scss']
})
export class CluesComponent implements OnInit {
  @Input() game: Game = {
    state: '',
    round: 0,
    activePlayerId: '',
    data: {},
  }

  constructor() { }

  ngOnInit(): void {
    console.log("clues")
    console.log()
  }

}
