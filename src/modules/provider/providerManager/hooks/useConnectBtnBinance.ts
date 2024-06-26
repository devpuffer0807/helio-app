import { EWalletId } from '../../utils/types';
import { DOWNLOAD_BINANCE_URL } from '../const';
import { IWalletConnectBtn } from '../types';
import { getIsBinanceInjected } from '../utils/getIsBinanceInjected';

/**
 * Hook for simplified usage of Binance wallet connection button.
 */
export const useConnectBtnBinance = (): IWalletConnectBtn => {
  return {
    walletId: EWalletId.binanceWallet,
    isDisabled: false,
    isInjected: getIsBinanceInjected(),
    downloadUrl: DOWNLOAD_BINANCE_URL,
  };
};
