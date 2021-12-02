import { Clue } from './clue';
import { GridClue } from './grid-clue';
import { Solution } from './solution';

export interface Grid {
  id: string;
  clues: GridClue[];
  solution: Solution[];
}
