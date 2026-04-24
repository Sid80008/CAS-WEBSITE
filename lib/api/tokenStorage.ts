const TOKEN_KEY = "admin_access_token";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/**
 * Safely get localStorage without colliding with Node 25's global localStorage
 */
function getStorage() {
  if (typeof window !== "undefined" && window.localStorage && typeof window.localStorage.getItem === 'function') {
    return window.localStorage;
  }
  return null;
}

export function getAccessToken(): string | null {
  const storage = getStorage();
  if (storage) {
    try {
      const token = storage.getItem(TOKEN_KEY);
      if (token) return token;
    } catch (e) {}
  }

  // Cookie fallback (Safe for both SSR and Client)
  if (typeof document !== "undefined") {
    try {
      const match = document.cookie.match(new RegExp('(^| )' + TOKEN_KEY + '=([^;]+)'));
      if (match) return decodeURIComponent(match[2]);
    } catch (e) {}
  }
  
  return null;
}

export function setAccessToken(token: string): void {
  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(TOKEN_KEY, token);
    } catch (e) {}
  }

  if (typeof document !== "undefined") {
    document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
  }
}

export function clearAccessToken(): void {
  const storage = getStorage();
  if (storage) {
    try {
      storage.removeItem(TOKEN_KEY);
    } catch (e) {}
  }

  if (typeof document !== "undefined") {
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; samesite=lax`;
  }
}

export { TOKEN_KEY };
