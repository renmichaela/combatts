import { DefaultPluginAPIs, Move } from 'boardgame.io';
import { CombatState } from '@/app/combat/Combat';
import type { Player } from '@/app/combat/Combat';

const beginPlacingEnemies: Move<CombatState> = ({ events }) => events.setPhase('placeEnemies');

const rollInitiative = (context: DefaultPluginAPIs, players: Array<Player>) => {
  return players.map((player, playerID) => ({
    playerID,
    roll: context.random.D20()
  })).sort((a, b) => a.roll - b.roll).flatMap(obj => obj.playerID.toString());
};

const GameMoves = {
  beginPlacingEnemies,
  rollInitiative
};

export default GameMoves;
