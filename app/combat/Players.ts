import type { Player, PlayersObject } from "@/app/combat/Combat";

const usePlayers = (players: Array<Player>, playerType: Function, setter: Function) => {
  const addPlayer = () => setter([...players, playerType()]);

  const delPlayer = () => setter([...players.slice(0, players.length - 1)]);

  const renamePlayer = (playerIndex: number, name: string) => {
    let player = players[playerIndex];
    let renamed = {...player, name: name};
    let newPlayers = [...players]
    newPlayers[playerIndex] = renamed;

    return setter(newPlayers);
  }

  return {
    addPlayer,
    delPlayer,
    renamePlayer
  };
}

export default usePlayers;
