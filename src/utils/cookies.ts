import Cookies from 'js-cookie';

const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  expires: 365,
  sameSite: 'lax',
};

export function getCookie(key: string): string | undefined {
  return Cookies.get(key);
}

export function setCookie(key: string, value: string): void {
  Cookies.set(key, value, COOKIE_OPTIONS);
}

export function removeCookie(key: string): void {
  Cookies.remove(key);
}
