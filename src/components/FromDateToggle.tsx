import { AnimatePresence, motion } from 'framer-motion';
import { DateInput } from './DateInput';

interface FromDateToggleProps {
  useCustom: boolean;
  customDate: string;
  onToggle: () => void;
  onDateChange: (date: string) => void;
}

export function FromDateToggle({
  useCustom,
  customDate,
  onToggle,
  onDateChange,
}: FromDateToggleProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-gray-500 dark:text-white/40 font-medium">From:</span>

      <button
        onClick={useCustom ? onToggle : undefined}
        aria-pressed={!useCustom}
        className={`px-3 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
          !useCustom
            ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-medium'
            : 'text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/60'
        }`}
      >
        Today
      </button>

      <button
        onClick={!useCustom ? onToggle : undefined}
        aria-pressed={useCustom}
        className={`px-3 py-1 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
          useCustom
            ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-medium'
            : 'text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/60'
        }`}
      >
        Custom
      </button>

      <AnimatePresence>
        {useCustom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DateInput
              value={customDate}
              onChange={onDateChange}
              id="from-date"
              size="sm"
              aria-label="Custom reference date"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
