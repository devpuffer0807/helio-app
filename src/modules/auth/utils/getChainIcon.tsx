import { ReactNode } from 'react';

import { EEthereumNetworkId } from 'modules/provider';

import { ReactComponent as BinanceChainIcon } from './assets/binance-chain.svg';

export function getChainIcon(chainId: EEthereumNetworkId): ReactNode {
  switch (chainId) {
    case EEthereumNetworkId.smartchain:
    case EEthereumNetworkId.smartchainTestnet:
      return <BinanceChainIcon />;
    default:
      return null;
  }
}
