import { useMemo } from 'react';

import { EWalletId } from '../../utils/types';
import { DOWNLOAD_COINBASE_URL } from '../const';
import { IWalletConnectBtn } from '../types';
import { getCoinbaseDeepLink } from '../utils/getCoinbaseDeepLink';
import { getIsCoinbaseInjected } from '../utils/getIsCoinbase';

/**
 * Hook for simplified usage of Coinbase wallet connection button
 *
 * @param link Is used to generate deep link to Coinbase. Link to redirect user after connection. Default: current page.
 */
export const useConnectBtnCoinbase = (
  link = window.location.href,
): IWalletConnectBtn => {
  const deepLink = useMemo(() => getCoinbaseDeepLink(link), [link]);

  return {
    walletId: EWalletId.coinbase,
    isInjected: getIsCoinbaseInjected(),
    isDisabled: false,
    deepLink,
    downloadUrl: DOWNLOAD_COINBASE_URL,
  };
};
