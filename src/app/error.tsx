"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep a local console trace as well.
    console.error("App error boundary caught:", error);
  }, [error]);

  return (
    <main className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-md w-full rounded-xl border border-black/10 dark:border-white/15 p-5">
        <h1 className="text-lg font-semibold">Något gick fel</h1>
        <p className="mt-2 text-sm opacity-80">
          Prova att ladda om. Om felet kvarstår är det sannolikt en bugg i
          klienten.
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs opacity-70">Digest: {error.digest}</p>
        ) : null}
        <div className="mt-4 flex gap-3">
          <button
            className="rounded-md bg-black text-white dark:bg-white dark:text-black px-3 py-2 text-sm"
            onClick={() => reset()}
          >
            Försök igen
          </button>
          <button
            className="rounded-md border border-black/10 dark:border-white/15 px-3 py-2 text-sm"
            onClick={() => window.location.reload()}
          >
            Ladda om
          </button>
        </div>
      </div>
    </main>
  );
}

