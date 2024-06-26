import { EWalletId } from '../../utils/types';
import { DOWNLOAD_COIN98_URL } from '../const';
import { IWalletConnectBtn } from '../types';
import { getIsCoin98Injected } from '../utils/getIsCoin98';

/**
 * Hook for simplified usage of Coin98 wallet connection button.
 */
export const useConnectBtnCoin98 = (): IWalletConnectBtn => {
  return {
    walletId: EWalletId.coin98,
    isInjected: getIsCoin98Injected(),
    isDisabled: false,
    downloadUrl: DOWNLOAD_COIN98_URL,
  };
};
