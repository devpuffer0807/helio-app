import { useMemo } from 'react';

import { EWalletId } from '../../utils/types';
import { DOWNLOAD_METAMASK_URL } from '../const';
import { IWalletConnectBtn } from '../types';
import { getIsCoinbaseInjected } from '../utils/getIsCoinbase';
import { getIsMetaMaskInjected } from '../utils/getIsMetaMaskInjected';
import { getIsOKXInjected } from '../utils/getIsOKX';
import { getIsTrustWalletInjected } from '../utils/getIsTrustWallet';
import { getMetaMaskDeepLink } from '../utils/getMetaMaskDeepLink';

export interface IConnectBtnMetamask extends IWalletConnectBtn {
  /**
   * Is button disabled because of Trust Wallet is installed.
   */
  isDisabledByTrustWallet: boolean;
  /**
   * Is button disabled because of Coinbase Wallet and OKX Wallet are installed.
   */
  isDisabledByOtherWallets: boolean;
  /**
   * Is button disabled because of Coin98 Wallet settings.
   * To enable MetaMask, user should disable override settings in the Coin98 wallet.
   */
  isRedefinedByCoin98: boolean;
}

/**
 * Hook for simplified usage of MetaMask wallet connection button.
 *
 * @param link Is used to generate deep link to MetaMask. Link to redirect user after connection. Default: current page.
 */
export const useConnectBtnMetaMask = (
  link = window.location.href,
): IConnectBtnMetamask => {
  const isCoinbaseInjected = getIsCoinbaseInjected();
  const isOKXInjected = getIsOKXInjected();
  const isMetamaskInjected = getIsMetaMaskInjected();
  const isTrustWalletInjected = getIsTrustWalletInjected();
  const deepLink = useMemo(() => getMetaMaskDeepLink(link), [link]);

  const isRedefinedByCoin98 = !!(window as any)?.ethereum?.isCoin98;
  const isDisabledByOtherWallets = isCoinbaseInjected && isOKXInjected;
  const isDisabledByTrustWallet = isTrustWalletInjected && !isMetamaskInjected;

  const isDisabled =
    isDisabledByOtherWallets || isRedefinedByCoin98 || isDisabledByTrustWallet;

  return {
    walletId: EWalletId.injected,
    isDisabled,
    isDisabledByTrustWallet,
    isDisabledByOtherWallets,
    isRedefinedByCoin98,
    isInjected: isMetamaskInjected,
    deepLink,
    downloadUrl: DOWNLOAD_METAMASK_URL,
  };
};
