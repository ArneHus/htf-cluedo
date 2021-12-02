import { Component, Input, OnInit } from '@angular/core';
import { Lobby } from '../lobby';
import { LobbyService } from '../lobby.service';

@Component({
  selector: 'app-create-lobby',
  templateUrl: './create-lobby.component.html',
  styleUrls: ['./create-lobby.component.css']
})

export class CreateLobbyComponent implements OnInit {
  @Input() lobby: Lobby = {
    id: '',
    lobbyCode: '',
    games: [],
    players: []
  };

  player?: string;

  constructor(private lobbyService: LobbyService) { }

  ngOnInit(): void {
    this.lobbyService.createLobby().subscribe(
      (result) => {
        this.lobby = result
        let playerString = 'Player_' + this.lobby.players.length.toString();
        this.player = playerString

        this.lobbyService.joinLobby(this.lobby.lobbyCode, playerString).subscribe((result) => {
          this.lobby = result
          this.lobby.players.push(playerString)
        })

        this.lobbyService.getLobby(this.lobby.lobbyCode).subscribe((result) => {
          this.lobby = result
        })
    },
      (error) => {
        console.log('error')
        console.log(error)
    })
  }

}
