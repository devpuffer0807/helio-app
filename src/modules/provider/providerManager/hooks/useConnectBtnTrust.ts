import { useMemo } from 'react';

import { EWalletId } from '../../utils/types';
import { DOWNLOAD_TRUST_URL } from '../const';
import { IWalletConnectBtn } from '../types';
import { getIsTrustWalletInjected } from '../utils/getIsTrustWallet';
import {
  getTrustWalletDeepLink,
  IGetTrustWalletDeepLinkArgs,
} from '../utils/getTrustWalletDeepLink';

/**
 * Hook for simplified usage of Trust wallet connection button.
 */
export const useConnectBtnTrust = ({
  link = window.location.href,
  coinId,
}: Partial<IGetTrustWalletDeepLinkArgs> = {}): IWalletConnectBtn => {
  const deepLink = useMemo(
    () => getTrustWalletDeepLink({ link, coinId }),
    [coinId, link],
  );

  return {
    walletId: EWalletId.trust,
    isInjected: getIsTrustWalletInjected(),
    isDisabled: false,
    deepLink,
    downloadUrl: DOWNLOAD_TRUST_URL,
  };
};
