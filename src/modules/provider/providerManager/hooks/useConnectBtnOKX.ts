import { EWalletId } from '../../utils/types';
import { DOWNLOAD_OKX_URL } from '../const';
import { IWalletConnectBtn } from '../types';
import { getIsOKXInjected } from '../utils/getIsOKX';

/**
 * Hook for simplified usage of OKX wallet connection button.
 */
export const useConnectBtnOKX = (): IWalletConnectBtn => {
  return {
    walletId: EWalletId.okxwallet,
    isInjected: getIsOKXInjected(),
    isDisabled: false,
    downloadUrl: DOWNLOAD_OKX_URL,
  };
};
