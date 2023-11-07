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
  const displayValue = () => typeof value === 'number' ? value : Object.keys(value).length;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <button className="bg-white py-1 px-3 rounded shadow" onClick={decrement}>-</button>
        <span>{title}: {displayValue()}</span>
        <button className="bg-white py-1 px-3 rounded shadow" onClick={increment}>+</button>
      </div>
      {children}
    </div>
  );
};

export default Selector;
