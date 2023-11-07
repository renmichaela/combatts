import type { BoardProps } from 'boardgame.io/react';
import type { CombatState } from './Combat';

interface CombatProps extends BoardProps<CombatState> {
  x: number;
  y: number;
}

export function CombatMap(props: CombatProps) {
  const cells = Array(props.x * props.y).fill(null);
  const onClick = (id: number) => props.moves.placeCharacter(id);
  
  const cellStyle = {
    border: '1px solid #555',
    width: '50px',
    height: '50px',
    lineHeight: '50px',
    textAlign: 'center',
  };

  let tbody = [];
  for (let i = 0; i < props.y; i++) {
    let cells = [];
    for (let j = 0; j < props.x; j++) {
      const id: number = props.y * i + j;
      cells.push(
        <td key={id}>
          {props.G.cells[id] ? (
            <div style={cellStyle}>{props.G.cells[id]}</div>
          ) : (
            <button
              className="bg-slate-200 hover:bg-white"
              style={cellStyle}
              onClick={() => onClick(id)}
            />
          )}
        </td>
      );
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <>
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
      </div>
    </>
  );
}