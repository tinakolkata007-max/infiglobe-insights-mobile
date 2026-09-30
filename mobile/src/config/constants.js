export const API_URL = __DEV__ ? 'http://10.0.2.2:3000/api' : 'https://api.infiglobe.com/api';
export const APP_NAME = 'Infiglobe Insights';
export const PRIMARY_COLOR = '#1e40af';
export const SECONDARY_COLOR = '#0891b2';
export const SUCCESS_COLOR = '#22c55e';
export const ERROR_COLOR = '#ef4444';
export const WARNING_COLOR = '#f59e0b';
export const NEUTRAL_COLOR = '#6b7280';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',
  LANGUAGE: 'language',
};

export const KYC_STATUSES = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  RE_VERIFICATION: 're_verification',
};