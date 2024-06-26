import * as Sentry from '@sentry/react';

import { APP_ENV } from '../consts';

export const initSentry = (): void => {
  if (APP_ENV === 'dev') {
    Sentry.init({
      dsn: 'https://e27daf6b6e7d4b28b7a05e36820d0b8e@o286716.ingest.sentry.io/4505113644761088',
      integrations: [new Sentry.BrowserTracing()],
      tracesSampleRate: 1.0,
    });
  }
};
