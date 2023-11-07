'use client'

import { Client } from 'boardgame.io/react';
import { Combat, Enemy, Hero } from '@/app/combat/Combat';
import type { Player } from '@/app/combat/Combat';
import { CombatMap } from '@/app/combat/CombatMap';
import Selector from '@/app/Components/Selector';
import { SelectorInput } from '@/app/Components/SelectorInput';
import { useState } from 'react';
import usePlayers from '@/app/combat/Players';

export default function Play()
{
  const [rows, setRows] = useState(8);
  const addRow = () => setRows(rows + 1);
  const delRow = () => setRows(rows - 1);
  
  const [cols, setCols] = useState(8);
  const addCol = () => setCols(cols + 1);
  const delCol = () => setCols(cols - 1);

  const [heroes, setHeroes] = useState<Array<Player>>([Hero()]);
  const [enemies, setEnemies] = useState<Array<Player>>([Enemy()]);

  const hero = usePlayers(heroes, Hero, setHeroes);
  const enemy = usePlayers(enemies, Enemy, setEnemies);

  const CombatClient = Client({
    game: Combat(cols, rows, [...heroes, ...enemies]),
    board: CombatMap
  });

  return (
    <>
      <h1 className="mx-4 my-6 text-3xl">Combat TS</h1>
      <div className="flex">
        <div className="bg-[#ad86ef] h-screen pt-6 px-3 w-1/4">
          <Selector
            title="Rows"
            value={rows}
            increment={addRow}
            decrement={delRow}
          />
          <Selector
            title="Columns"
            value={cols}
            increment={addCol}
            decrement={delCol}
          />
          <Selector
            title="Heroes"
            value={heroes}
            increment={hero.addPlayer}
            decrement={hero.delPlayer}
          >{Object.values(heroes).map((player: Player, index: number) => <SelectorInput key={index} index={index} data={player.name} updater={hero.renamePlayer} placeholder={`Hero ${index + 1} name`} />)}</Selector>
          <Selector
            title="Enemies"
            value={enemies}
            increment={enemy.addPlayer}
            decrement={enemy.delPlayer}
          >{Object.values(enemies).map((player: Player, index: number) => <SelectorInput key={index} index={index} data={player.name} updater={enemy.renamePlayer} placeholder={`Enemy ${index + 1} name`} />)}</Selector>
        </div>
        <div className="bg-[#86efad] h-screen p-6 w-3/4">
          <CombatClient x={cols} y={rows} />
        </div>
      </div>
    </>
  )
}
