import { PayloadAction } from '@reduxjs/toolkit';

import { t } from 'modules/i18n';

interface ErrorPayload {
  params?: Record<string, number | string>;
  data?: string | unknown;
}

export function getErrorMessage(
  action: PayloadAction<unknown, string, Record<string, unknown>>,
): string | null {
  const payload = action.payload as ErrorPayload | undefined;
  const error = payload?.data as string;
  const params = payload?.params ?? {};
  const key = `error.${error}`;
  const result = t(key, params);

  return result !== key ? result : null;
}
