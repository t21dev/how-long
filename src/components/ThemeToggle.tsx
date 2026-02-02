import { motion } from 'framer-motion';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative size-10 flex items-center justify-center rounded-xl bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="text-lg"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </motion.span>
    </button>
  );
}
