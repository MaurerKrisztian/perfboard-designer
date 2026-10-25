// The site's analytics consent banner lives outside the editor's bundle (assets/consent.js, loaded
// by every page's own script tag). The editor only reopens it, from the Help menu, so a visitor can
// change their choice.

declare global {
  interface Window {
    perfboardConsent?: {open: () => void};
  }
}

// Whether the banner is on this page (it isn't when consent.js failed to load, or was blocked).
export const hasConsentSettings = () => window.perfboardConsent !== undefined;

export function openConsentSettings() {
  window.perfboardConsent?.open();
}
