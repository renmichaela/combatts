import type { DefaultPluginAPIs, Game } from "boardgame.io";
import Movement from '@/app/combat/Movement';
import GameMoves from '@/app/combat/moves/GameMoves';

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
  players: Record<string|number, Player>
};

type GameFunction = {
  (
    x: number,
    y: number,
    players: Array<Player>,
  ): Game<CombatState>
};

export const Combat: GameFunction = (x = 5, y = 5, players) => {
  const cells = Array(x * y).fill(null);
  const playersObj = Object.fromEntries(players.map((player, i) => [i, player]))
  const enemies = Object.values(playersObj).filter((player: Player) => player.type === "enemy").map((player: Player, i: number) => i.toString());

  return {
    setup: ({ ctx }) => {
      ctx.numPlayers = players.length;
      
      return {
        cells,
        players: playersObj
      }
    },
    moves: {...Movement, beginPlacingEnemies: GameMoves.beginPlacingEnemies},
    turn: {
      order: {
        first: () => 0,
        next: ({ ctx }) => (ctx.playOrderPos + 1) % ctx.numPlayers,
        playOrder: (context: DefaultPluginAPIs) => GameMoves.rollInitiative(context, players)
      },
    },
    phases: {
      placeEnemies: {
        moves: {
          placeCharacter: Movement.placeCharacter
        },
        turn: {
          activePlayers: enemies
        }
      }
    }
  };
}
