import { differenceInYears } from 'date-fns/differenceInYears';
import { differenceInMonths } from 'date-fns/differenceInMonths';
import { differenceInDays } from 'date-fns/differenceInDays';
import { differenceInWeeks } from 'date-fns/differenceInWeeks';
import { differenceInHours } from 'date-fns/differenceInHours';
import { addYears } from 'date-fns/addYears';
import { addMonths } from 'date-fns/addMonths';
import { isBefore } from 'date-fns/isBefore';
import { isSameDay } from 'date-fns/isSameDay';
import { parseISO } from 'date-fns/parseISO';
import { startOfDay } from 'date-fns/startOfDay';

export interface DateDistance {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  direction: 'past' | 'future' | 'same';
}

export function useDateDistance(
  targetDateStr: string | null,
  fromDateStr: string | null,
): DateDistance | null {
  if (!targetDateStr) return null;

  const target = startOfDay(parseISO(targetDateStr));
  if (isNaN(target.getTime())) return null;

  const from = fromDateStr
    ? startOfDay(parseISO(fromDateStr))
    : startOfDay(new Date());

  if (isNaN(from.getTime())) return null;

  if (isSameDay(target, from)) {
    return {
      years: 0,
      months: 0,
      days: 0,
      totalDays: 0,
      totalWeeks: 0,
      totalHours: 0,
      direction: 'same',
    };
  }

  const isPast = isBefore(target, from);
  const [earlier, later] = isPast ? [target, from] : [from, target];

  const years = differenceInYears(later, earlier);
  const afterYears = addYears(earlier, years);
  const months = differenceInMonths(later, afterYears);
  const afterMonths = addMonths(afterYears, months);
  const days = differenceInDays(later, afterMonths);

  const totalDays = differenceInDays(later, earlier);
  const totalWeeks = differenceInWeeks(later, earlier);
  const totalHours = differenceInHours(later, earlier);

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalHours,
    direction: isPast ? 'past' : 'future',
  };
}
