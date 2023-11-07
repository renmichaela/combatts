import { Move } from 'boardgame.io';
import { CombatState } from '@/app/combat/Combat';

const moveToCell: Move<CombatState> = ({ G, playerID }, cell: number) => {
  G.cells[cell] = playerID;
}

const placeCharacter: Move<CombatState> = ({ G, playerID, events }, cell: number) => {
  G.cells[cell] = playerID;
  events.endTurn();
}

const Movement = {
  moveToCell,
  placeCharacter
}

export default Movement;