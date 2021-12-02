import { Clue } from "./clue";
import { Solution } from "./solution";

export interface Grid {
  id: string;
  clues: Clue[];
  solution: Solution[];
}
