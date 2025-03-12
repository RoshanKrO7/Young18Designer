export const APP_NAME = 'TailorAtHome';

export const API_CONFIG = {
  SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY || '',
};

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  TAILORS: '/tailors',
  BOOKING: '/booking',
  PROFILE: '/profile',
  ADMIN: '/admin',
};

export const AUTH_CONFIG = {
  STORAGE_KEY: 'tailorathome_auth',
  SESSION_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const TOAST_CONFIG = {
  SUCCESS_DURATION: 3000,
  ERROR_DURATION: 4000,
  POSITION: 'top-right' as const,
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

export const DATE_FORMAT = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  TIME: 'HH:mm',
}; 