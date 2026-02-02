import { motion } from 'framer-motion';
import type { DateDistance } from '../hooks/useDateDistance';

function formatPrimary(d: DateDistance): string {
  if (d.direction === 'same') return "That's today!";

  const parts: string[] = [];
  if (d.years > 0) parts.push(`${d.years} ${d.years === 1 ? 'year' : 'years'}`);
  if (d.months > 0) parts.push(`${d.months} ${d.months === 1 ? 'month' : 'months'}`);
  if (d.days > 0 || parts.length === 0) parts.push(`${d.days} ${d.days === 1 ? 'day' : 'days'}`);
  return parts.join(', ');
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 100_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toLocaleString();
}

export function ResultDisplay({ distance }: { distance: DateDistance }) {
  const primary = formatPrimary(distance);
  const suffix =
    distance.direction === 'past'
      ? 'ago'
      : distance.direction === 'future'
        ? 'from now'
        : '';

  const secondaryParts: string[] = [];
  if (distance.totalDays > 0) {
    secondaryParts.push(`${formatCount(distance.totalDays)} days`);
    if (distance.totalWeeks > 0) secondaryParts.push(`${formatCount(distance.totalWeeks)} weeks`);
    secondaryParts.push(`${formatCount(distance.totalHours)} hours`);
  }

  return (
    <motion.div
      key={`${distance.totalDays}-${distance.direction}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-2 text-center"
    >
      <p className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white leading-tight">
        {primary}
      </p>
      {suffix && (
        <p className="text-base text-gray-500 dark:text-white/50 font-medium">
          {suffix}
        </p>
      )}
      {secondaryParts.length > 0 && (
        <p className="text-sm text-gray-400 dark:text-white/40">
          {secondaryParts.join(' \u00B7 ')}
        </p>
      )}
    </motion.div>
  );
}
