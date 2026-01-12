"use client";

type ClientErrorPayload = {
  kind: "error" | "unhandledrejection";
  message: string;
  stack?: string;
  href?: string;
  userAgent?: string;
  time: string;
};

function postClientError(payload: ClientErrorPayload) {
  try {
    const body = JSON.stringify(payload);
    // Prefer sendBeacon (more reliable during crashes/navigation).
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      (navigator as Navigator).sendBeacon("/api/client-error", blob);
      return;
    }
    void fetch("/api/client-error", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Never throw from error reporting.
  }
}

export function ClientErrorReporter() {
  if (typeof window === "undefined") return null;

  // Only register once per page lifetime.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.__clientErrorReporterInstalled) return null;
  w.__clientErrorReporterInstalled = true;

  const base = (): Pick<ClientErrorPayload, "href" | "userAgent" | "time"> => ({
    href: window.location.href,
    userAgent: navigator.userAgent,
    time: new Date().toISOString(),
  });

  window.addEventListener("error", (event) => {
    const err = event.error as Error | undefined;
    postClientError({
      kind: "error",
      message: err?.message ?? event.message ?? "Unknown error",
      stack: err?.stack,
      ...base(),
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message =
      reason instanceof Error
        ? reason.message
        : typeof reason === "string"
          ? reason
          : "Unhandled promise rejection";
    const stack = reason instanceof Error ? reason.stack : undefined;
    postClientError({
      kind: "unhandledrejection",
      message,
      stack,
      ...base(),
    });
  });

  return null;
}

