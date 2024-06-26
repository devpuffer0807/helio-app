import { EWalletId } from './types';

export const getWalletName = (id: EWalletId): string => {
  switch (id) {
    case EWalletId.okxwallet:
      return 'OKX Wallet';
    case EWalletId.coinbase:
      return 'Coinbase Wallet';
    case EWalletId.huobi:
      return 'Huobi Wallet';
    case EWalletId.trustViaWalletConnect:
      return 'Trust Wallet';
    case EWalletId.trust:
      return 'Trust Wallet';
    case EWalletId.math:
      return 'Math Wallet';
    case EWalletId.imtoken:
      return 'imToken';
    case EWalletId.binanceWallet:
      return 'Binance Wallet';
    // TODO(Vladimir): Fix after removing web3Modal
    case 'walletconnect' as EWalletId:
    case EWalletId.walletconnect:
      return 'WalletConnect';
    case EWalletId.coin98ViaWalletConnect:
      return 'Coin98 Wallet';
    case EWalletId.coin98:
      return 'Coin98 Wallet';
    case EWalletId.clover:
      return 'CLV Wallet';
    case EWalletId.bitKeep:
      return 'BitKeep Wallet';
    case EWalletId.injected:
      return 'MetaMask';
    case EWalletId.mirage:
      return 'Mirage Wallet';
    default:
      return 'web3 wallet';
  }
};
