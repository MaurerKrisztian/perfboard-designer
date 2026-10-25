// Analytics consent for every page of perfboarddesigner.com. Google Analytics (GA4) runs only after
// a visitor accepts it on the banner: until then nothing is loaded from Google and no cookie is set
// (Consent Mode's basic setup). The choice is kept in localStorage for the whole site, as
// "analytics_consent": "granted" or "denied". Anything with a data-consent-settings attribute (a
// footer link, the editor's Help menu) opens the banner again to change it, as does
// window.perfboardConsent.open(). Declining after accepting turns analytics off and deletes its
// cookies.
//
// Served as is from assets/ (Vite's publicDir), not bundled, so pages load it with a plain script
// tag; it imports nothing and has no build step.
(() => {
  const MEASUREMENT_ID = "G-4L924FCCVE";
  const STORAGE_KEY = "analytics_consent";
  const GRANTED = "granted";
  const DENIED = "denied";

  let analyticsLoaded = false;
  let banner;

  function readChoice() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function saveChoice(choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Storage blocked: the choice holds for this page only.
    }
  }

  window.dataLayer = window.dataLayer || [];
  // gtag reads its arguments object, so this stays a plain function.
  function gtag() {
    window.dataLayer.push(arguments);
  }

  // The page's address without its #fragment: the editor's share links carry a whole board there.
  const pageLocation = () => location.origin + location.pathname + location.search;

  function startAnalytics() {
    if (analyticsLoaded) {
      gtag("consent", "update", {analytics_storage: GRANTED});
      return;
    }
    analyticsLoaded = true;
    // As Google's consent mode guide has it: everything denied by default, then the choice as an
    // update, both before config. Analytics only: nothing for ads.
    gtag("consent", "default", {analytics_storage: DENIED, ad_storage: DENIED, ad_user_data: DENIED, ad_personalization: DENIED});
    gtag("consent", "update", {analytics_storage: GRANTED});
    gtag("js", new Date());
    gtag("config", MEASUREMENT_ID, {page_location: pageLocation()});
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  function stopAnalytics() {
    if (analyticsLoaded) gtag("consent", "update", {analytics_storage: DENIED});
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (name === "_ga" || name.startsWith("_ga_")) deleteCookie(name);
    }
  }

  // GA sets its cookies on the widest domain it can, so try each one up from this host.
  function deleteCookie(name) {
    const labels = location.hostname.split(".");
    for (let i = 0; i < labels.length; i++) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${labels.slice(i).join(".")}`;
    }
    document.cookie = `${name}=; Max-Age=0; path=/`;
  }

  function choose(choice) {
    saveChoice(choice);
    if (choice === GRANTED) startAnalytics();
    else stopAnalytics();
    closeBanner();
  }

  const STYLE = `
    .pd-consent {
      position: fixed;
      left: 16px;
      bottom: 16px;
      z-index: 2147483000;
      box-sizing: border-box;
      width: min(420px, calc(100vw - 32px));
      padding: 16px;
      border: 1px solid #2c4038;
      border-radius: 12px;
      background: #101b17;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
      color: #edf2ec;
      font: 400 14px/1.5 Barlow, system-ui, -apple-system, "Segoe UI", sans-serif;
    }
    .pd-consent p {
      margin: 0 0 12px;
    }
    .pd-consent .pd-consent-title {
      margin-bottom: 4px;
      font-size: 15px;
      font-weight: 600;
    }
    .pd-consent-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }
    .pd-consent button {
      min-width: 96px;
      padding: 7px 14px;
      border: 1px solid #d08c4c;
      border-radius: 8px;
      background: transparent;
      color: #edf2ec;
      font: 600 14px/1.4 inherit;
      font-family: inherit;
      cursor: pointer;
    }
    .pd-consent button:hover,
    .pd-consent button:focus-visible {
      background: rgba(208, 140, 76, 0.14);
      outline: none;
    }
    /* The answer we'd like, filled in copper. "No thanks" stays the same size, with full-contrast
       text: easy to see, only not highlighted, as EU guidance on cookie banners allows. */
    .pd-consent button.pd-consent-primary {
      background: #d08c4c;
      color: #1f1206;
    }
    .pd-consent button.pd-consent-primary:hover,
    .pd-consent button.pd-consent-primary:focus-visible {
      background: #eaa96a;
    }
    .pd-consent button:focus-visible {
      box-shadow: 0 0 0 2px #101b17, 0 0 0 4px #eaa96a;
    }
    @media (max-width: 600px) {
      .pd-consent {
        left: 8px;
        bottom: calc(8px + env(safe-area-inset-bottom, 0px));
        width: calc(100vw - 16px);
      }
      .pd-consent-actions button {
        flex: 1;
      }
    }
  `;

  function addStyle() {
    if (document.getElementById("pd-consent-style")) return;
    const style = document.createElement("style");
    style.id = "pd-consent-style";
    style.textContent = STYLE;
    document.head.appendChild(style);
  }

  function makeButton(label, choice, primary = false) {
    const button = document.createElement("button");
    button.type = "button";
    if (primary) button.className = "pd-consent-primary";
    button.textContent = label;
    button.addEventListener("click", () => choose(choice));
    return button;
  }

  // Says plainly who, what for and what not. Allowing is highlighted, but declining is a button as
  // big and as readable beside it, so it's as easy: what EU consent asks for.
  function openBanner() {
    if (banner) return;
    addStyle();
    banner = document.createElement("div");
    banner.className = "pd-consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Cookie consent");
    const title = document.createElement("p");
    title.className = "pd-consent-title";
    title.textContent = "Help make Perfboard Designer better";
    const text = document.createElement("p");
    text.textContent = "It's free, open source and has no ads. With your OK, Google Analytics cookies show which features get used, "
      + "so we know what to improve next. They're never used for ads, and your boards are never sent.";
    const actions = document.createElement("div");
    actions.className = "pd-consent-actions";
    const decline = makeButton("No thanks", DENIED);
    actions.append(decline, makeButton("Sure, happy to help", GRANTED, true));
    banner.append(title, text, actions);
    document.body.appendChild(banner);
    return decline;
  }

  function closeBanner() {
    banner?.remove();
    banner = undefined;
  }

  // Opened again to change the choice: focus it, so a keyboard user lands on it.
  function openSettings() {
    closeBanner();
    openBanner()?.focus();
  }

  window.perfboardConsent = {open: openSettings};

  document.addEventListener("click", event => {
    const opener = event.target instanceof Element && event.target.closest("[data-consent-settings]");
    if (!opener) return;
    event.preventDefault();
    openSettings();
  });

  const choice = readChoice();
  if (choice === GRANTED) startAnalytics();
  if (choice !== GRANTED && choice !== DENIED) {
    if (document.body) openBanner();
    else document.addEventListener("DOMContentLoaded", () => openBanner(), {once: true});
  }
})();
