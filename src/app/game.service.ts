import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Game } from './game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private httpClient: HttpClient) {}

  apiURL: string = 'https://htf-api.hyperdrive.studio';

  startGame(code: string): Observable<Game> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Game>(
      this.apiURL + '/game/' + code + '/start',
      {
        headers: headers,
      }
    );
  }

  endGame(code: string): Observable<Game> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Game>(this.apiURL + '/game/' + code + '/end', {
      headers: headers,
    });
  }

  guess(
    code: string,
    location: string,
    weapon: string,
    murderer: string
  ): Observable<Game> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Game>(
      this.apiURL + '/game/' + code + '/guess',
      { location: location, weapon: weapon, murderer: murderer },
      { headers: headers }
    );
  }

  getGame(code: string) {
    return this.httpClient.get<Game>(this.apiURL + '/game/' + code);
  }
}
