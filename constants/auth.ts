

export const QUERY_KEYS = {
  USER: ["auth", "user"] as const,
} as const;

export const AUTH_CONFIG = {
  STALE_TIME: 5 * 60 * 1000,
  CACHE_TIME: 10 * 60 * 1000,
  MAX_RETRY_COUNT: 2,
  REQUEST_TIMEOUT: 10000,
};
