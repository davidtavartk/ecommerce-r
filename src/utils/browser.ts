export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const setCookie = (name: string, value: string, days: number = 7): void => {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
};
