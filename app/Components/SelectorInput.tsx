'use client'

interface UpdaterFunction {
  (index: number, value: string): any;
};

interface SelectorInputProps {
  index: number;
  data: string;
  updater: UpdaterFunction;
  placeholder?: string;
}

export function SelectorInput({index, data, updater, placeholder}: SelectorInputProps) {
  return (
    <input
      key={index}
      type="text"
      value={data}
      onChange={(e) => updater(index, e.currentTarget.value)}
      className="block mb-2 mx-auto p-2 rounded drop-shadow w-4/5"
      placeholder={placeholder} />
  );
};
