import { stringify } from 'query-string';
import { encodeQueryParams, StringParam } from 'use-query-params';

import { HOMEPAGE, WALLET_PARAM_ID } from 'modules/common';
import { EWalletId } from 'modules/provider';

export function getMobileAuthCallbackURL(walletId: EWalletId): string {
  const encodedQuery = encodeQueryParams(
    { [WALLET_PARAM_ID]: StringParam },
    { [WALLET_PARAM_ID]: walletId },
  );

  return `${window.location.origin}/${HOMEPAGE}/?${stringify(encodedQuery)}`;
}
