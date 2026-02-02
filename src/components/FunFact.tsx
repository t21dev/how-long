import { AnimatePresence, motion } from 'framer-motion';
import { getFunFact } from '../utils/funFacts';

interface FunFactProps {
  totalDays: number;
  direction: 'past' | 'future' | 'same';
}

export function FunFact({ totalDays, direction }: FunFactProps) {
  const fact = getFunFact(totalDays, direction);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={fact}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.25 }}
        className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-white/50"
      >
        <span className="shrink-0 text-base leading-none" aria-hidden="true">
          💡
        </span>
        <p className="leading-relaxed">{fact}</p>
      </motion.div>
    </AnimatePresence>
  );
}
