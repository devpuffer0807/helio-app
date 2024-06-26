import { EWalletId } from '../utils/types';

export interface IWalletConnectBtn {
  /**
   * Id that is used in the Provider to connect the wallet.
   */
  walletId: EWalletId;
  /**
   * Is the button disabled by any other wallet or for some other reason?
   */
  isDisabled: boolean;
  /**
   * Is wallet available in the browser?
   */
  isInjected: boolean;
  /**
   * URL to download wallet extension.
   */
  downloadUrl: string;
  /**
   * Deep link to wallet.
   */
  deepLink?: string;
}
