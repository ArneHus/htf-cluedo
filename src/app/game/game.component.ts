import { Component, Input, OnInit } from '@angular/core';
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

  game: Game = {
    state: '',
    round: 0,
    activePlayerId: '',
    data: {},
  };

  player?: string;

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
                console.log(this.game);
              });
          });
      },
      (error) => {
        console.log('error');
        console.log(error);
      }
    );
  }
}
