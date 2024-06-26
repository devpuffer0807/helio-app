import binanceWalletLogo from './assets/binance-wallet.svg';
import bitKeepLogo from './assets/bitkeep-logo.svg';
import cloverLogo from './assets/clv-logo.svg';
import coin98WalletLogo from './assets/coin98-wallet.svg';
import coinbaseLogo from './assets/coinbase.svg';
import huobiLogo from './assets/huobi.svg';
import imTokenLogo from './assets/im-token.svg';
import mathLogo from './assets/math.svg';
import metamaskLogo from './assets/metamask.svg';
import mirageLogo from './assets/mirage.svg';
import okxLogo from './assets/okx.svg';
import trustWalletLogo from './assets/trust.svg';
import walletConnectLogo from './assets/wallet-connect.svg';
import { EWalletId } from './types';

export const getWalletIcon = (walletId: EWalletId): string => {
  switch (walletId) {
    case EWalletId.binanceWallet:
      return binanceWalletLogo;
    case EWalletId.imtoken:
      return imTokenLogo;
    case EWalletId.math:
      return mathLogo;
    case EWalletId.trustViaWalletConnect:
      return trustWalletLogo;
    case EWalletId.trust:
      return trustWalletLogo;
    case EWalletId.huobi:
      return huobiLogo;
    // TODO(Vladimir): Fix after removing web3Modal
    case 'walletconnect' as EWalletId:
    case EWalletId.walletconnect:
      return walletConnectLogo;
    case EWalletId.okxwallet:
      return okxLogo;
    case EWalletId.coinbase:
      return coinbaseLogo;
    case EWalletId.coin98:
      return coin98WalletLogo;
    case EWalletId.coin98ViaWalletConnect:
      return coin98WalletLogo;
    case EWalletId.clover:
      return cloverLogo;
    case EWalletId.mirage:
      return mirageLogo;
    case EWalletId.bitKeep:
      return bitKeepLogo;
    case EWalletId.injected:
    default:
      return metamaskLogo;
  }
};
