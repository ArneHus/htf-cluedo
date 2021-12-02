import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Lobby } from './lobby';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  constructor(private httpClient: HttpClient) {}

  apiURL: string = 'https://htf-api.hyperdrive.studio';

  createLobby():Observable<Lobby> {
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Lobby>(this.apiURL + "/lobby", {headers: headers})
  }

  joinLobby(code: string, name: string):Observable<Lobby> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Lobby>(this.apiURL + "/lobby/" + code + "/join", {"playerId": name}, {headers: headers})
  }

  getLobby(code: string) {
    return timer(1, 1000).pipe(
      switchMap(() =>
        this.httpClient.get<Lobby>(this.apiURL + '/lobby/' + code)
      )
    );

  }
}
