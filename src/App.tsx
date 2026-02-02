import { useState, useEffect, useCallback } from 'react';
import { useDateDistance } from './hooks/useDateDistance';
import { DateInput } from './components/DateInput';
import { ResultDisplay } from './components/ResultDisplay';
import { FunFact } from './components/FunFact';
import { ThemeToggle } from './components/ThemeToggle';
import { FromDateToggle } from './components/FromDateToggle';

function getInitialState() {
  const params = new URLSearchParams(window.location.search);
  const urlDate = params.get('date');
  const urlFrom = params.get('from');

  return {
    targetDate: urlDate || localStorage.getItem('howlong-target-date') || '',
    customFromDate: urlFrom || '',
    useCustomFrom: !!urlFrom,
    theme: (localStorage.getItem('howlong-theme') === 'light' ? 'light' : 'dark') as
      | 'dark'
      | 'light',
  };
}

function App() {
  const initial = getInitialState();
  const [targetDate, setTargetDate] = useState(initial.targetDate);
  const [customFromDate, setCustomFromDate] = useState(initial.customFromDate);
  const [useCustomFrom, setUseCustomFrom] = useState(initial.useCustomFrom);
  const [theme, setTheme] = useState(initial.theme);
  const [copied, setCopied] = useState<'result' | 'link' | null>(null);

  const effectiveFromDate = useCustomFrom && customFromDate ? customFromDate : null;
  const distance = useDateDistance(targetDate || null, effectiveFromDate);

  // Sync theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
    localStorage.setItem('howlong-theme', theme);
  }, [theme]);

  // Persist target date
  useEffect(() => {
    if (targetDate) {
      localStorage.setItem('howlong-target-date', targetDate);
    }
  }, [targetDate]);

  // Sync URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (targetDate) params.set('date', targetDate);
    if (useCustomFrom && customFromDate) params.set('from', customFromDate);
    const qs = params.toString();
    const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [targetDate, customFromDate, useCustomFrom]);

  // Keyboard shortcut: Cmd/Ctrl+K to focus date input
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('target-date')?.focus();
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!distance || distance.direction === 'same') return;
    const parts: string[] = [];
    if (distance.years > 0) parts.push(`${distance.years} ${distance.years === 1 ? 'year' : 'years'}`);
    if (distance.months > 0) parts.push(`${distance.months} ${distance.months === 1 ? 'month' : 'months'}`);
    if (distance.days > 0 || parts.length === 0) parts.push(`${distance.days} ${distance.days === 1 ? 'day' : 'days'}`);
    const suffix = distance.direction === 'past' ? 'ago' : 'from now';
    await navigator.clipboard.writeText(`${parts.join(', ')} ${suffix}`);
    setCopied('result');
    setTimeout(() => setCopied(null), 2000);
  }, [distance]);

  const handleShare = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'How Long?', url });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied('link');
      setTimeout(() => setCopied(null), 2000);
    }
  }, []);

  return (
    <div className="min-h-dvh font-sans">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-950 transition-colors duration-500" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-300/30 dark:bg-indigo-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-300/30 dark:bg-purple-500/15 rounded-full blur-[100px]" />
      </div>

      {/* Header — sticky on mobile only */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-gray-50/80 dark:bg-gray-950/80 border-b border-black/5 dark:border-white/5 md:static md:z-auto md:backdrop-blur-none md:bg-transparent md:border-b-0">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/favicon.svg" alt="" width={32} height={32} className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-balance">
              How Long?
            </h1>
          </div>
          <ThemeToggle
            theme={theme}
            onToggle={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          />
        </div>
      </header>

      {/* Content centered in remaining viewport */}
      <div className="min-h-[calc(100dvh-3.5rem)] md:min-h-[calc(100dvh-3.75rem)] flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Main Card */}
          <main className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg dark:shadow-[0_0_60px_-15px_rgba(99,102,241,0.3)]">
            {/* Hero Input */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <label htmlFor="target-date" className="text-lg text-gray-600 dark:text-white/60 whitespace-nowrap">
                How long was
              </label>
              <DateInput
                value={targetDate}
                onChange={setTargetDate}
                id="target-date"
                size="lg"
              />
              <span className="text-lg text-gray-600 dark:text-white/60">?</span>
            </div>

            {/* Results */}
            {distance && (
              <>
                <ResultDisplay distance={distance} />

                {/* From Date Toggle */}
                <div className="border-t border-black/5 dark:border-white/10 pt-4">
                  <FromDateToggle
                    useCustom={useCustomFrom}
                    customDate={customFromDate}
                    onToggle={() => setUseCustomFrom((v) => !v)}
                    onDateChange={setCustomFromDate}
                  />
                </div>

                {/* Fun Fact */}
                {distance.direction !== 'same' && (
                  <div className="border-t border-black/5 dark:border-white/10 pt-4">
                    <FunFact
                      totalDays={distance.totalDays}
                      direction={distance.direction}
                    />
                  </div>
                )}
              </>
            )}
          </main>

          {/* Footer Actions */}
          <footer className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!distance || distance.direction === 'same'}
                className="px-3 py-1.5 text-sm rounded-lg bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/10 text-gray-700 dark:text-white/70 hover:bg-white/80 dark:hover:bg-white/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {copied === 'result' ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleShare}
                disabled={!targetDate}
                className="px-3 py-1.5 text-sm rounded-lg bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/10 text-gray-700 dark:text-white/70 hover:bg-white/80 dark:hover:bg-white/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {copied === 'link' ? 'Copied!' : 'Share'}
              </button>
            </div>
            <a
              href="https://github.com/t21dev/how-long"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/50 transition-colors"
            >
              Open Source
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
