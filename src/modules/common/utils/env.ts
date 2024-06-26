import { APP_ENV } from '../consts';

export const isProdEnv = (): boolean => {
  return APP_ENV === 'prod';
};
