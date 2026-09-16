export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
};

export type StoredConsent = CookiePreferences & { timestamp: string };

const STORAGE_KEY = "fgt_cookie_consent";

export function readConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredConsent;
  } catch {
    return null;
  }
}

export function writeConsent(prefs: CookiePreferences): void {
  try {
    const record: StoredConsent = { ...prefs, timestamp: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable (private browsing, disabled storage, etc.) — nothing to persist.
  }
}
