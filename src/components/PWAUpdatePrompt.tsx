import { useRegisterSW } from 'virtual:pwa-register/react';

export function PWAUpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;
      // Poll for updates every hour while the app is open
      setInterval(() => {
        void registration.update();
      }, 60 * 60 * 1000);
    },
  });

  const dismiss = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,28rem)]"
    >
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-4 shadow-lg shadow-black/10 dark:shadow-[0_0_40px_-10px_rgba(99,102,241,0.4)]">
        {needRefresh ? (
          <>
            <p className="text-sm text-gray-900 dark:text-white font-medium">
              A new version is available
            </p>
            <p className="text-xs text-gray-600 dark:text-white/60 mt-1">
              Reload to get the latest updates.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => void updateServiceWorker(true)}
                className="px-3 py-1.5 text-sm rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              >
                Reload
              </button>
              <button
                onClick={dismiss}
                className="px-3 py-1.5 text-sm rounded-lg bg-white/50 dark:bg-white/10 border border-black/5 dark:border-white/10 text-gray-700 dark:text-white/70 hover:bg-white/80 dark:hover:bg-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              >
                Later
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-gray-900 dark:text-white">
              Ready to work offline
            </p>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="text-gray-500 dark:text-white/50 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              <svg className="size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 1 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 0 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
