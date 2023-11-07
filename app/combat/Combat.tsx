import type { BoardProps } from 'boardgame.io/react';
import type { Game } from "boardgame.io";
import Movement from '@/app/combat/Movement';

interface BoardOptions {
  x: number;
  y: number;
  cells: Array<number|null>;
};

type PlayerType = "hero" | "enemy";

export interface Player {
  name: string;
  health?: number;
  type: PlayerType;
};

export type PlayersObject = Record<number, Player>;

export const Hero = (health: number = 1): Player => ({
  name: '',
  health,
  type: "hero"
});

export const Enemy = (health: number = 1): Player => ({
  name: '',
  health,
  type: "enemy"
});

// Equivalent of 'G'
export interface CombatState {
  cells: Array<number|string>;
};

type GameFunction = {
  (
    x: number,
    y: number,
    players: Array<Player>,
  ): Game<CombatState>
};

export const Combat: GameFunction = (x = 5, y = 5, players) => {
  // const rollInitiative = ({ random }) => {
  //   return players.map((player, playerID) => ({
  //     playerID,
  //     roll: random.D20()
  //   })).sort((a, b) => a.roll - b.roll).flatMap(obj => obj.playerID);
  // };
  const cells = Array(x * y).fill(null);
  const playersObj = Object.fromEntries(players.map((player, i) => [i, player]))

  return {
    setup: () => ({
      cells,
      players: playersObj
    }),
    moves: {...Movement},
    // turn: {
    //   order: {
    //     first: ({ G, ctx }) => 0,
    //     next: ({ G, ctx }) => (ctx.playOrderPos + 1) % ctx.numPlayers,
    //     playOrder: rollInitiative
    //   },
    // },
    phases: {
      placeEnemies: {
        start: true,
        moves: {
          placeCharacter: Movement.placeCharacter
        }
      }
    }
  };
}
