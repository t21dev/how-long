interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  size?: 'lg' | 'sm';
  min?: string;
  max?: string;
  'aria-label'?: string;
}

export function DateInput({ value, onChange, id, size = 'lg', min, max, 'aria-label': ariaLabel }: DateInputProps) {
  const sizeClasses =
    size === 'lg'
      ? 'text-lg px-4 py-2.5'
      : 'text-sm px-3 py-1.5';

  return (
    <input
      type="date"
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={min}
      max={max}
      autoComplete="off"
      aria-label={ariaLabel}
      className={`${sizeClasses} bg-white/80 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded-xl text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 transition-all cursor-pointer`}
    />
  );
}
