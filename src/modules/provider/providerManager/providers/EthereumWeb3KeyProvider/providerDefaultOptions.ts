import { BscConnector } from '@binance-chain/bsc-connector';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { IProviderOptions } from 'web3modal';

import { RPCConfig } from '../../../utils/const';
import { getWalletIcon } from '../../../utils/getWalletIcon';
import { getWalletName } from '../../../utils/getWalletName';
import { EEthereumNetworkId, EWalletId } from '../../../utils/types';
import { WC_BRIDGE } from '../../const';
import { getBitKeepProvider, getIsBitKeep } from '../../utils/getBitKeep';
import { getCloverProvider, getIsClover } from '../../utils/getClover';
import { getIsCoin98, getIsCoin98Injected } from '../../utils/getIsCoin98';
import { getIsOKX, getIsOKXInjected } from '../../utils/getIsOKX';
import {
  getIsTrustWallet,
  getIsTrustWalletInjected,
} from '../../utils/getIsTrustWallet';
import { getMirageProvider } from '../../utils/getMirage';

export const DEFAULT_RPC = Object.entries(RPCConfig).reduce(
  (acc, [key, { rpcUrls }]) => ({ ...acc, [key]: rpcUrls[0] }),
  {} as Record<EEthereumNetworkId, string>,
);

const AUTH_STORAGE_KEY = 'persist:auth';

function parseAuthChainId(): EEthereumNetworkId | undefined {
  const authPersistData = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!authPersistData) {
    return undefined;
  }

  try {
    const data = JSON.parse(authPersistData);
    const { chainId } = JSON.parse(data.ethCompatible);
    return chainId;
  } catch (error) {
    return undefined;
  }
}

export const providerDefaultOptions: IProviderOptions = {
  [EWalletId.coin98]: {
    display: {
      logo: getWalletIcon(EWalletId.coin98),
      name: getWalletName(EWalletId.coin98),
      description: '',
    },
    package: () => null,
    connector: async () => {
      const { provider } = (window as any).coin98;
      if (!getIsCoin98(provider) || !getIsCoin98Injected()) {
        throw new Error("Coin 98 wallet isn't installed");
      }

      await provider.request({
        method: 'eth_requestAccounts',
      });

      return provider;
    },
  },
  [EWalletId.coin98ViaWalletConnect]: {
    display: {
      logo: getWalletIcon(EWalletId.coin98ViaWalletConnect),
      name: getWalletName(EWalletId.coin98ViaWalletConnect),
      description: 'The most trusted & secure crypto wallet',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage({
        bridge: WC_BRIDGE,
        ...options,
      });
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.binanceWallet]: {
    display: {
      logo: getWalletIcon(EWalletId.binanceWallet),
      name: getWalletName(EWalletId.binanceWallet),
      description:
        'A Crypto Wallet for BNB Beacon Chain, BNB Smart Chain and Ethereum',
    },
    package: BscConnector,
    connector: async (ProviderPackage: any) => {
      const bsc = new ProviderPackage({
        supportedChainIds: [
          EEthereumNetworkId.smartchain,
          EEthereumNetworkId.smartchainTestnet,
        ],
      });

      const activate = await bsc.activate();

      return activate.provider;
    },
  },
  [EWalletId.imtoken]: {
    display: {
      logo: getWalletIcon(EWalletId.imtoken),
      name: getWalletName(EWalletId.imtoken),
      description: 'Easy and secure digital wallet trusted by millions',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage({
        bridge: WC_BRIDGE,
        ...options,
      });
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.math]: {
    display: {
      logo: getWalletIcon(EWalletId.math),
      name: getWalletName(EWalletId.math),
      description: 'Gateway to the World of Blockchain',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage({
        bridge: WC_BRIDGE,
        ...options,
      });
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.trustViaWalletConnect]: {
    display: {
      logo: getWalletIcon(EWalletId.trustViaWalletConnect),
      name: getWalletName(EWalletId.trustViaWalletConnect),
      description: 'The most trusted & secure crypto wallet',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage({
        bridge: WC_BRIDGE,
        ...options,
      });
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.trust]: {
    display: {
      logo: getWalletIcon(EWalletId.trust),
      name: getWalletName(EWalletId.trust),
      description: 'The most trusted & secure crypto wallet',
    },
    package: () => null,
    connector: async () => {
      const { trustwallet } = window as any;
      if (!getIsTrustWallet(trustwallet) || !getIsTrustWalletInjected()) {
        throw new Error("Trust Wallet isn't installed");
      }

      await trustwallet.request({
        method: 'eth_requestAccounts',
      });

      return trustwallet;
    },
  },
  [EWalletId.huobi]: {
    display: {
      logo: getWalletIcon(EWalletId.huobi),
      name: getWalletName(EWalletId.huobi),
      description: 'Multi-currency support, practical and convenient',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async (ProviderPackage: any, options: any) => {
      const provider = new ProviderPackage({
        bridge: WC_BRIDGE,
        ...options,
      });
      await provider.enable();
      return provider;
    },
  },
  [EWalletId.walletconnect]: {
    display: {
      logo: getWalletIcon(EWalletId.walletconnect),
      name: getWalletName(EWalletId.walletconnect),
      description: '',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async (
      ProviderPackage: typeof WalletConnectProvider,
      options: any,
    ) => {
      const provider = new ProviderPackage({
        bridge: WC_BRIDGE,
        ...options,
      });

      await provider.enable();

      return provider;
    },
  },
  [EWalletId.coinbase]: {
    display: {
      logo: getWalletIcon(EWalletId.coinbase),
      name: getWalletName(EWalletId.coinbase),
      description: 'Coinbase wallet',
    },
    package: CoinbaseWalletSDK,
    options: {
      appName: 'App',
      rpc: DEFAULT_RPC,
      reloadOnDisconnect: false,
    },
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const lastChainId = parseAuthChainId();

      const coinbase = new CoinbaseWalletSDK({
        appName,
        reloadOnDisconnect: false,
      });
      const provider = coinbase.makeWeb3Provider(
        lastChainId ? DEFAULT_RPC[lastChainId] : networkUrl,
        lastChainId ?? chainId,
      );
      await provider.enable();

      return provider;
    },
  },
  [EWalletId.okxwallet]: {
    display: {
      logo: getWalletIcon(EWalletId.okxwallet),
      name: getWalletName(EWalletId.okxwallet),
      description: 'Your portal to Web3',
    },
    package: WalletConnectProvider,
    options: {
      rpc: DEFAULT_RPC,
    },
    connector: async () => {
      const { okexchain: provider } = window as any;

      if (!getIsOKX(provider) || !getIsOKXInjected()) {
        throw new Error("OKX wallet isn't installed");
      }

      await provider.enable();
      return provider;
    },
  },
  [EWalletId.clover]: {
    display: {
      logo: getWalletIcon(EWalletId.clover),
      name: getWalletName(EWalletId.clover),
      description: 'CLV - Passport to the Omniverse',
    },
    options: {
      rpc: DEFAULT_RPC,
    },
    package: () => null,
    connector: async () => {
      const provider = getCloverProvider();

      if (!getIsClover(provider)) {
        throw new Error("CLV wallet isn't installed");
      }

      await provider.enable();

      return provider;
    },
  },
  [EWalletId.mirage]: {
    display: {
      logo: getWalletIcon(EWalletId.mirage),
      name: getWalletName(EWalletId.mirage),
      description: 'The best crypto wallet',
    },
    options: {
      rpc: DEFAULT_RPC,
    },
    package: () => null,
    connector: async () => {
      const provider = getMirageProvider();

      await provider.request({
        method: 'eth_requestAccounts',
      });
      return provider;
    },
  },
  [EWalletId.bitKeep]: {
    display: {
      logo: getWalletIcon(EWalletId.bitKeep),
      name: getWalletName(EWalletId.bitKeep),
      description: 'BitKeep - A reliable multi-chain wallet',
    },
    options: {
      rpc: DEFAULT_RPC,
    },
    package: WalletConnectProvider,
    connector: async () => {
      const provider = getBitKeepProvider();

      if (!getIsBitKeep(provider)) {
        throw new Error("BitKeep wallet isn't installed");
      }

      await provider.request({ method: 'eth_requestAccounts' });
      provider.removeAllListeners();
      return provider;
    },
  },
};
