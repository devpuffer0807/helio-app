export enum AvailableReadProviders {
  ethMainnet = 'ethMainnetHttpProvider',
  ethGoerli = 'ethGoerliHttpProvider',
  ethSepolia = 'ethSepoliaHttpProvider',

  mumbai = 'polygonMumbaiHttpWeb3KeyProvider',
  polygon = 'polygonHttpWeb3KeyProvider',
  polygonZkEVM = 'polygonZkEVMHttpWeb3KeyProvider',
  polygonZkEVMTestnet = 'polygonZkEVMTestnetHttpWeb3KeyProvider',

  avalancheChain = 'avalancheChainHttpProvider',
  avalancheChainTest = 'avalancheChainTestHttpProvider',

  arbitrum = 'arbitrumHttpProvider',
  arbitrumTestnet = 'arbitrumTestnetHttpProvider',

  arbitrumNova = 'arbitrumNovaHttpProvider',

  binanceChain = 'binanceChainHttpProvider',
  binanceChainTest = 'binanceChainTestHttpProvider',

  ftmOpera = 'ftmOperaHttpProvider',
  ftmTestnet = 'ftmTestnetHttpProvider',

  gnosis = 'gnosisHttpProvider',
  chiado = 'chiadoHttpProvider',
  sokol = 'sokolHttpProvider',

  xdc = 'xdcMainnetHttpProvider',
  xdcTestnet = 'xdcTestnetHttpProvider',

  optimism = 'optimismHttpProvider',
  optimismTestnet = 'optimismTestnetHttpProvider',
}

export type Address = string;

export enum AvailableWriteProviders {
  ethCompatible = 'ethCompatible',
}

export enum EEthereumNetworkId {
  mainnet = 1,
  ropsten = 3,
  rinkeby = 4,
  goerli = 5,
  dev = 2018,
  classic = 61,
  mordor = 63,
  kotti = 6,
  smartchain = 56,
  smartchainTestnet = 97,
  arbitrum = 42161,
  arbitrumTestnet = 421613,
  arbitrumNova = 42170,
  avalanche = 43114,
  avalancheTestnet = 43113,
  polygon = 137,
  polygonZkEVM = 1101,
  polygonZkEVMTestnet = 1442,
  fantom = 250,
  fantomTestnet = 4002,
  mumbai = 80001,
  gnosis = 100,
  chiado = 10200,
  sokol = 77,
  xdc = 50,
  xdcTestnet = 51,
  sepolia = 11155111,
  optimism = 10,
  optimismTestnet = 420,
}

export enum EWalletId {
  huobi = 'custom-huobi',
  imtoken = 'custom-imtoken',
  injected = 'injected',
  math = 'custom-math',
  trust = 'custom-trust',
  trustViaWalletConnect = 'custom-trust-walletconnect',
  binanceWallet = 'custom-binance-wallet',
  coin98 = 'custom-coin98',
  coin98ViaWalletConnect = 'custom-coin98-walletconnect',
  walletconnect = 'custom-walletconnect',
  coinbase = 'custom-coinbase',
  okxwallet = 'custom-okxwallet',
  clover = 'custom-clover',
  mirage = 'custom-mirage',
  bitKeep = 'custom-bitkeep',
}

export interface IProvider {
  isConnected(): boolean;
  connect(): Promise<void>;
  disconnect(): void;
}
