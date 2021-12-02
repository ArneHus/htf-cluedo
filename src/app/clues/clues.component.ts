import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../game';
import { Data } from '../data';
import { Clue } from '../clue';
import { ClueCustom } from '../clueCustom';

@Component({
  selector: 'app-clues',
  templateUrl: './clues.component.html',
  styleUrls: ['./clues.component.scss'],
})
export class CluesComponent implements OnInit {
  clues = [];
  grids = [];

  data: Data = {
    clues: this.clues,
    grids: this.grids,
  };

  @Input() game: Game = {
    state: '',
    round: 0,
    activePlayerId: '',
    data: this.data,
  };

  locations: ClueCustom[] = [];
  weapons: ClueCustom[] = [];
  suspects: ClueCustom[] = [];

  constructor() {}

  toggleCrossed(type: string, clue: ClueCustom){
    console.log(type)
    if (type === "location"){
      var index = this.locations.findIndex(c => c.name == clue.name)
      clue.isCrossed = !clue.isCrossed
      this.locations[index] = clue
    }
    else if (type === "weapon"){
      var index = this.weapons.findIndex(c => c.name == clue.name);
      clue.isCrossed = !clue.isCrossed;
      this.weapons[index] = clue;
    }
    else if (type === "suspect"){
      var index = this.suspects.findIndex(c => c.name == clue.name);
      clue.isCrossed = !clue.isCrossed;
      this.suspects[index] = clue;
    }
  }

  ngOnInit(): void {
    console.log(this.game);
    this.game.data.clues.forEach((clue: Clue) => {
      if (clue.type === 'location') {
        var clueCustom: ClueCustom = {
          name: clue.name,
          isCrossed: false
        };
        this.locations.push(clueCustom);
      } else if (clue.type === 'weapon') {
        var clueCustom: ClueCustom = {
          name: clue.name,
          isCrossed: false,
        };
        this.weapons.push(clueCustom);
      } else if (clue.type === 'murderer') {
        var clueCustom: ClueCustom = {
          name: clue.name,
          isCrossed: false,
        };
        this.suspects.push(clueCustom);
      }
    });
  }
}
