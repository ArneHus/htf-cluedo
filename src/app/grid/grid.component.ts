import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../game';
import { Data } from '../data';
import { Clue } from '../clue';
import { Grid } from '../grid';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GameService } from '../game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  clues: Array<Clue> = [];
  murderers: Array<string> = [];
  weapons: Array<string> = [];
  locations: Array<string> = [];

  grid: Grid = {
    id: '',
    clues: [{ id: '', text: '' }],
    solution: [],
  };
  grids: Array<Grid> = [];

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

  @Input() code: string = '';

  // reactive form
  gridForm = new FormGroup({
    murderer: new FormControl(''),
    weapon: new FormControl(''),
    location: new FormControl(''),
  });

  constructor(private gameService: GameService, private router: Router) {}

  onSubmit() {
    this.gameService
      .guess(
        this.code,
        this.gridForm.value.location,
        this.gridForm.value.weapon,
        this.gridForm.value.murderer
      )
      .subscribe((result) => {
        console.log(result);
        if (result.location && result.weapon && result.murderer) {
          this.router.navigate(['/winner']);
        } else if (this.game.round == 2) {
          this.router.navigate(['/loser']);
        } else {
          this.timeLeft = 60;
          this.game.round += 1;
          this.over = false;
        }
      });
  }

  ngOnInit(): void {
    console.log(this.game.data.clues);
    this.startTimer();
    this.game.data.clues.forEach((clue: Clue) => {
      if (clue.type === 'location') {
        this.locations.push(clue.name);
      } else if (clue.type === 'murderer') {
        this.murderers.push(clue.name);
      } else {
        this.weapons.push(clue.name);
      }
    });
  }

  timeLeft: number = 60;
  interval: any;
  over: Boolean = false;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.over = true;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  toggleDone() {
    this.over = true
  }
}
