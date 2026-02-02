import { motion, AnimatePresence } from 'framer-motion';
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
        className={`px-3 py-1 rounded-lg transition-colors ${
          !useCustom
            ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-medium'
            : 'text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/60'
        }`}
      >
        Today
      </button>

      <button
        onClick={!useCustom ? onToggle : undefined}
        className={`px-3 py-1 rounded-lg transition-colors ${
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
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <DateInput
              value={customDate}
              onChange={onDateChange}
              id="from-date"
              size="sm"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
