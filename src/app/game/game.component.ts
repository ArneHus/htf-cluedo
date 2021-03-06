import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../data';
import { Game } from '../game';
import { GameService } from '../game.service';
import { Lobby } from '../lobby';
import { LobbyService } from '../lobby.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() lobby: Lobby = {
    id: '',
    lobbyCode: '',
    games: [],
    players: [],
  };

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

  player?: string;
  dataLoaded: boolean = false;

  constructor(
    private lobbyService: LobbyService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.lobbyService.createLobby().subscribe(
      (result) => {
        this.lobby = result;
        let playerString = 'Player_' + this.lobby.players.length.toString();
        this.player = playerString;

        this.lobbyService
          .joinLobby(this.lobby.lobbyCode, playerString)
          .subscribe((result) => {
            this.lobby = result;
            this.lobby.players.push(playerString);

            this.gameService
              .startGame(this.lobby.lobbyCode)
              .subscribe((result) => {
                this.game = result;
                this.game.data.clues = this.shuffle(this.game.data.clues);
                this.dataLoaded = true;
              });
          });
      },
      (error) => {
        console.log('error');
        console.log(error);
      }
    );
  }

  shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
