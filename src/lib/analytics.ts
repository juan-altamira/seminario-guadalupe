type AnalyticsPayload = Record<string, unknown>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return;
  window.plausible?.(name, { props: payload });
  window.dataLayer?.push({ event: name, ...payload });
}
