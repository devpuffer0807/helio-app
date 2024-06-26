import { numberToHex } from 'web3-utils';

import { EEthereumNetworkId } from './types';

const ETH_DECIMALS = 18;

interface IRPCConfig {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored
}

export const RPCConfig: Record<number, IRPCConfig> = {
  // Mainnet config is partial, because there is no need to specify it fully
  [EEthereumNetworkId.mainnet]: {
    chainId: numberToHex(EEthereumNetworkId.mainnet),
    chainName: 'Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/eth'],
    blockExplorerUrls: ['https://etherscan.io'],
  },

  [EEthereumNetworkId.goerli]: {
    chainId: numberToHex(EEthereumNetworkId.goerli),
    chainName: 'Goerli Test Network',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
    blockExplorerUrls: [
      'https://goerli.etherscan.io/',
      'https://blockscout.com/eth/goerli ',
    ],
  },

  [EEthereumNetworkId.sepolia]: {
    chainId: numberToHex(EEthereumNetworkId.sepolia),
    chainName: 'Sepolia Test Network',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/eth_sepolia'],
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
  },

  [EEthereumNetworkId.smartchain]: {
    chainId: numberToHex(EEthereumNetworkId.smartchain),
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/bsc/'],
    blockExplorerUrls: ['https://bscscan.com'],
  },

  [EEthereumNetworkId.smartchainTestnet]: {
    chainId: numberToHex(EEthereumNetworkId.smartchainTestnet),
    chainName: 'Binance Smart Chain - Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/bsc_testnet_chapel'],
    blockExplorerUrls: ['https://testnet.bscscan.com'],
  },

  [EEthereumNetworkId.arbitrum]: {
    chainId: numberToHex(EEthereumNetworkId.arbitrum),
    chainName: 'Arbitrum One',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io/'],
  },

  [EEthereumNetworkId.arbitrumTestnet]: {
    chainId: numberToHex(EEthereumNetworkId.arbitrumTestnet),
    chainName: 'Arbitrum Goerli',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://goerli.arbiscan.io/'],
  },

  [EEthereumNetworkId.arbitrumNova]: {
    chainId: numberToHex(EEthereumNetworkId.arbitrumNova),
    chainName: 'Arbitrum Nova',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://nova.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://nova.arbiscan.io/'],
  },

  [EEthereumNetworkId.avalanche]: {
    chainId: numberToHex(EEthereumNetworkId.avalanche),
    chainName: 'Avalanche Mainnet C-Chain',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/avalanche'],
    blockExplorerUrls: ['https://snowtrace.io/'],
  },

  [EEthereumNetworkId.avalancheTestnet]: {
    chainId: numberToHex(EEthereumNetworkId.avalancheTestnet),
    chainName: 'Avalanche FUJI C-Chain',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/avalanche_fuji'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/'],
  },

  [EEthereumNetworkId.fantom]: {
    chainId: numberToHex(EEthereumNetworkId.fantom),
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/fantom'],
    blockExplorerUrls: ['https://ftmscan.com/'],
  },
  [EEthereumNetworkId.fantomTestnet]: {
    chainId: numberToHex(EEthereumNetworkId.fantomTestnet),
    chainName: 'Fantom testnet',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/fantom_testnet'],
    blockExplorerUrls: ['https://testnet.ftmscan.com/'],
  },
  [EEthereumNetworkId.polygon]: {
    chainId: numberToHex(EEthereumNetworkId.polygon),
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/polygon'],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  [EEthereumNetworkId.mumbai]: {
    chainId: numberToHex(EEthereumNetworkId.mumbai),
    chainName: 'Polygon testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/polygon_mumbai'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
  [EEthereumNetworkId.polygonZkEVM]: {
    chainId: numberToHex(EEthereumNetworkId.polygonZkEVM),
    chainName: 'Polygon zkEVM',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://zkevm-rpc.com'],
    blockExplorerUrls: ['https://zkevm.polygonscan.com/'],
  },
  [EEthereumNetworkId.polygonZkEVMTestnet]: {
    chainId: numberToHex(EEthereumNetworkId.polygonZkEVMTestnet),
    chainName: 'zkEVM Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.public.zkevm-test.net'],
    blockExplorerUrls: ['https://testnet-zkevm.polygonscan.com'],
  },
  [EEthereumNetworkId.gnosis]: {
    chainId: numberToHex(EEthereumNetworkId.gnosis),
    chainName: 'Gnosis',
    nativeCurrency: {
      name: 'xDai',
      symbol: 'xDai',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.ankr.com/gnosis'],
    blockExplorerUrls: ['https://blockscout.com/xdai/mainnet/'],
  },
  [EEthereumNetworkId.chiado]: {
    chainId: numberToHex(EEthereumNetworkId.chiado),
    chainName: 'Chiado',
    nativeCurrency: {
      name: 'SPOA',
      symbol: 'SPOA',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://rpc.chiadochain.net/'],
    blockExplorerUrls: ['https://blockscout.com/gnosis/chiado'],
  },
  [EEthereumNetworkId.sokol]: {
    chainId: numberToHex(EEthereumNetworkId.sokol),
    chainName: 'Sokol',
    nativeCurrency: {
      name: 'SPOA',
      symbol: 'SPOA',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://sokol.poa.network/'],
    blockExplorerUrls: ['https://blockscout.com/poa/sokol/'],
  },

  [EEthereumNetworkId.xdc]: {
    chainId: numberToHex(EEthereumNetworkId.xdc),
    chainName: 'XDC Mainnet',
    nativeCurrency: {
      name: 'XDC',
      symbol: 'XDC',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://erpc.xinfin.network/'],
    blockExplorerUrls: ['https://explorer.xinfin.network/'],
  },
  [EEthereumNetworkId.xdcTestnet]: {
    chainId: numberToHex(EEthereumNetworkId.xdcTestnet),
    chainName: 'XDC Apothem Testnet',
    nativeCurrency: {
      name: 'TXDC',
      symbol: 'TXDC',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://erpc.apothem.network/'],
    blockExplorerUrls: ['https://explorer.apothem.network/'],
  },
  [EEthereumNetworkId.optimism]: {
    chainId: numberToHex(EEthereumNetworkId.optimism),
    chainName: 'OP Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  [EEthereumNetworkId.optimismTestnet]: {
    chainId: numberToHex(EEthereumNetworkId.optimismTestnet),
    chainName: 'OP Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: ETH_DECIMALS,
    },
    rpcUrls: ['https://goerli.optimism.io'],
    blockExplorerUrls: ['https://goerli-optimism.etherscan.io'],
  },
};
