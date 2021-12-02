import { Data } from "@angular/router";

export interface Game {
  state: string;
  round: number;
  activePlayerId: string;
  data: Data;
}
