import { EWalletId } from '../../utils/types';
import { DOWNLOAD_CLOVER_URL } from '../const';
import { IWalletConnectBtn } from '../types';
import {
  getCloverProvider,
  getIsClover,
  getIsCloverInjected,
} from '../utils/getClover';

/**
 * Hook for simplified usage of Clover wallet connection button.
 */
export const useConnectBtnClover = (): IWalletConnectBtn => {
  const isInjected = getIsCloverInjected();
  const cloverProvider = getCloverProvider();
  const isCloverActive = getIsClover(cloverProvider);
  const isCloverDisabled = isInjected && !isCloverActive;

  return {
    walletId: EWalletId.clover,
    isInjected,
    isDisabled: isCloverDisabled,
    downloadUrl: DOWNLOAD_CLOVER_URL,
  };
};
