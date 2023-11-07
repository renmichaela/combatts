'use client'

import type { PlayersObject } from '@/app/combat/Combat';
import { ReactNode } from 'react';

interface SelectorProps {
  title: string;
  value: PlayersObject | number;
  increment: Function;
  decrement: Function;
  children ?: ReactNode;
}

const Selector = ({ title, value, increment, decrement, children }: SelectorProps) => {
  const buttonStyle = {
    padding: '0.5rem 1rem',
  };

  const divStyle = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  }

  const spanStyle = {
    marginLeft: '2rem',
    marginRight: '2rem',
  };

  const selectorStyle = {
    marginBottom: '2rem'
  };

  const displayValue = () => typeof value === 'number' ? value : Object.keys(value).length;

  return (
    <div style={selectorStyle}>
      <div style={divStyle}>
        <button style={buttonStyle} onClick={decrement}>-</button>
        <span style={spanStyle}>{title}: {displayValue()}</span>
        <button style={buttonStyle} onClick={increment}>+</button>
      </div>
      {children}
    </div>
  );
};

export default Selector;
