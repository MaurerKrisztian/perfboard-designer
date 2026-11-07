// The site's analytics consent banner lives outside the editor's bundle (assets/consent.js, loaded
// by every page's own script tag). The editor reopens it from the Help menu, so a visitor can
// change their choice, and counts what gets used through it (src/features/analytics.ts, which
// declares window.perfboardConsent).

// Whether the banner is on this page (it isn't when consent.js failed to load, or was blocked).
export const hasConsentSettings = () => window.perfboardConsent !== undefined;

export function openConsentSettings() {
  window.perfboardConsent?.open();
}
