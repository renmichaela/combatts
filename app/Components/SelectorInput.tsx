'use client'

interface UpdaterFunction {
  (index: number, value: string): any;
};

interface SelectorInputProps {
  index: number;
  data: string;
  updater: UpdaterFunction;
}

export function SelectorInput({index, data, updater}: SelectorInputProps) {
  return (
    <input
      key={index}
      type="text"
      value={data}
      onChange={(e) => updater(index, e.currentTarget.value)}
      className="block border-2 border-[#333] mb-2 mx-auto w-4/5" />
  );
};
