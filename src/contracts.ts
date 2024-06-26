enum Env {
  DEV = 'dev',
  STAGE = 'stage',
  PROD = 'prod',
}

interface ContractAddresses {
  ilkCeABNBc: string;
  ilkBUSD: string;
  ilkETH: string;
  ilkSNBNB: string;
  ilkWBETH: string;
  collateralCeABNBc: string;
  collateralBUSD: string;
  collateralETH: string;
  collateralSNBNB: string;
  collateralWBETH: string;
  SNBNB: string;
  ETH: string;
  HAY: string;
  HELIO: string;
  HBNB: string;
  ankrBNB: string;
  HAYBUSDLp: string;
  HAYBUSDLpStable: string;
  HAYBUSDPlanetLp: string;
  provider: string;
  interaction: string;
  ethProvider: string;
  auctionProxy: string;
  rewards: string;
  wBETH: string;
  lock: string;
  flash: string;
  binancePool: string;
  ceETHVault: string;
  oracleCeABNBc: string;
  oracleBUSD: string;
  ceVault: string;
  cerosRouter: string;
  vat: string;
  spot: string;
  joinHAY: string;
  joinCeABNBc: string;
  joinBUSD: string;
  jug: string;
  vow: string;
  dog: string;
  clipABNBc: string;
  clipBUSD: string;
  abaci: string;
  jar: string;
  farming: string;
  pancakeRouter: string;
  pancakeDepositProxy: string;
  pancakeDepositProxyStable: string;
  pancakeStrategy: string;
  pancakeStrategyStable: string;
  pancakeStableSwap: string;
  tokenBounding: string;
  incentiveVoting: string;
  proxyAdmin: string;
  ellipsisFinance: string;
  ellipsisMediator: string;

  // external contracts
  magpieProxy: string;
  magpieMasterWombatAddress: string;
  magpieHAYLp: string;
  magpieRouter: string;
  magpieMaster: string;
  magpieMGP: string;
  magpieBUSD: string;
  magpieStakingToken: string;
  thena: string;
}

const contracts: Record<Env, ContractAddresses> = {
  [Env.DEV]: {
    ilkCeABNBc:
      '0x636541424e426300000000000000000000000000000000000000000000000000',
    ilkBUSD:
      '0x4255534400000000000000000000000000000000000000000000000000000000',
    ilkETH:
      '0x6365774245544800000000000000000000000000000000000000000000000000',
    ilkSNBNB:
      '0x536e424e42000000000000000000000000000000000000000000000000000000',
    ilkWBETH:
      '0x7742455448000000000000000000000000000000000000000000000000000000',
    collateralCeABNBc: '0x9d7E47F0FBB811aEE2d75a10259D82Fb23C33ADf',
    collateralBUSD: '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7',
    collateralETH: '0x8Eb71F58542FCa8821C94c23f215676a14c5ab86',
    collateralSNBNB: '0xa5e96AaDc66e48Ff000057C0f932a3C4B71403e8',
    collateralWBETH: '0x34f8f72e3f14Ede08bbdA1A19a90B35a80f3E789',
    SNBNB: '0xa5e96aadc66e48ff000057c0f932a3c4b71403e8',
    ETH: '0xE7bCB9e341D546b66a46298f4893f5650a56e99E',
    HAY: '0xF052Cb891C3887aCCA8741859c6184794C482A8A',
    HELIO: '0x0000000000000000000000000000000000000000',
    HBNB: '0x23B41F4D98B4124C5925Bd195d07133235646107',
    ankrBNB: '0x46dE2FBAf41499f298457cD2d9288df4Eb1452Ab',
    HAYBUSDLp: '0xb050200e173788D397e1F706E97216E72d24da2E',
    HAYBUSDLpStable: '',
    HAYBUSDPlanetLp: '',
    provider: '0xefdd468abBcEaf09cCE678694B5c35A2238dB2Ed',
    interaction: '0x52C3DE78Ec58a5aDA0c837dCc36ef2C29e5efC75',
    ethProvider: '0x4C9FB2baB630D9d9C02905a6129b4cc2ee78B704',
    auctionProxy: '0x017Dc39353E9D524C93AeE1022931dFe76D46953',
    rewards: '0xcAb0509a6357de69154aa9925A270663C33A5E4e',
    wBETH: '0x34f8f72e3f14Ede08bbdA1A19a90B35a80f3E789',
    lock: '0x190d8A217cf6022B47d7105d408334B7c3eCdE8D',
    flash: '0x8c6B43e4e38b576a8E98F93E40716935DcBB671f',
    binancePool: '0x0eCf14f54C5fF190e025Bc5e80c6351F91BFcB1c',
    ceETHVault: '0x2d924a915B1d9a6926366149f8d39509f7D501bB',
    oracleCeABNBc: '0x095421a21b553ffF030ddB0B183347BE93C54cc2',
    oracleBUSD: '0x7F1364804Dd28D576A82F5d34Df35B83e1f5DCb3',
    ceVault: '0x7e35713Ce8767Ee04e4E68db4b6D414D293Be660',
    cerosRouter: '0xa05CC343a528A0E67b9cAbb8d1f15023D3D0B2Ae',
    vat: '0xa61b2Be8BB85b93658DD7b00D8aa8AAbb10da5a4',
    spot: '0xA349094f5a4736462481F5E19368622aA7468Df0',
    joinHAY: '0x118e50412905a74A4B763ECBb276a29Fc566C225',
    joinCeABNBc: '0x0738B6c71C15E8d8EDcECAe09D9A3E6dd1032A2C',
    joinBUSD: '0x0F8731D882aaB697E5b55C1630af0B054D16Ceaf',
    jug: '0xe42836fdD2C94efE0bc0a2BFE6423b6Bb3a1f161',
    vow: '0x3e9C7046c1305A46A8eF3E658e53dc085a2b9F49',
    dog: '0x12ED31508c11FB6C497fee29FFaB08DeFe920D96',
    clipABNBc: '0x69812f512bD45dECC1Bbea5E4447baC872B23FC9',
    clipBUSD: '0x8e72e97dFe9589CBc343ea8B96e0A982E21073cc',
    abaci: '0x2a23b833Ed42b8D9E7b87651dC35A4a8749e7D9e',
    jar: '0x14D5214a78f3b5123f98F118D3767b538D3a214B',
    farming: '0x59619cD80B89CB64ab26D576624267a57f6690f6',
    pancakeRouter: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
    pancakeDepositProxy: '0x2Af24DADC29daD3c47abc37b77A604C495fDa883',
    pancakeDepositProxyStable: '',
    pancakeStrategy: '0xD4143AB6b86e1f5E9bef45F0472228F929f292bA',
    pancakeStrategyStable: '',
    pancakeStableSwap: '',
    tokenBounding: '0xD585Eb839A41e32cEB1d1ccD45ba9B84Ec8e433f',
    incentiveVoting: '0xD8b79e0B9A915A19f271e45BF8886Fa4C77B8226',
    proxyAdmin: '0x06D7e837B545E3A49AD5013fFc4553d79B81eE60',
    ellipsisFinance: '0xB82849C0Bc8bE685eFACB882183b3688E69524eF',
    ellipsisMediator: '',

    magpieProxy: '0x664cc2BcAe1E057EB1Ec379598c5B743Ad9Db6e7',
    magpieMasterWombatAddress: '0x489833311676B566f888119c29bd997Dc6C95830',
    magpieHAYLp: '0x1fa71DF4b344ffa5755726Ea7a9a56fbbEe0D38b',
    magpieRouter: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    magpieMaster: '0xa3B615667CBd33cfc69843Bf11Fbb2A1D926BD46',
    magpieMGP: '0xD06716E1Ff2E492Cc5034c2E81805562dd3b45fa',
    magpieBUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    magpieStakingToken: '0xaB22C452308eAe8C0CDdad0Ec4E31aa21f1d6c42',
    thena: '0xe43317c1f037cbbaf33f33c386f2caf2b6b25c9c',
  },
  [Env.STAGE]: {
    ilkCeABNBc:
      '0x636541424e426332000000000000000000000000000000000000000000000000',
    ilkBUSD:
      '0x4255534400000000000000000000000000000000000000000000000000000000',
    ilkETH:
      '0x6365774245544800000000000000000000000000000000000000000000000000',
    ilkSNBNB:
      '0x536e424e42000000000000000000000000000000000000000000000000000000',
    ilkWBETH:
      '0x7742455448000000000000000000000000000000000000000000000000000000',
    collateralCeABNBc: '0xEbCB8d02102269a1A2775Cd5a36E234857A5cf36',
    collateralBUSD: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
    collateralETH: '0x8Eb71F58542FCa8821C94c23f215676a14c5ab86',
    collateralSNBNB: '0xa5e96AaDc66e48Ff000057C0f932a3C4B71403e8',
    collateralWBETH: '0x34f8f72e3f14Ede08bbdA1A19a90B35a80f3E789',
    SNBNB: '0xa5e96aadc66e48ff000057c0f932a3c4b71403e8',
    ETH: '0xE7bCB9e341D546b66a46298f4893f5650a56e99E',
    HAY: '0x7adC9A28Fab850586dB99E7234EA2Eb7014950fA',
    HELIO: '0x1119022D7831430632c729AFF1F16FA23a1C8CfE',
    HBNB: '0xBFE45FDFAb94dd208676C42fb31a00068EfF39a1',
    ankrBNB: '0x46dE2FBAf41499f298457cD2d9288df4Eb1452Ab',
    HAYBUSDLp: '0xE041AB7Ea825C06d4BF7eA3182F3d4EC4De7E83E',
    HAYBUSDLpStable: '',
    HAYBUSDPlanetLp: '',
    provider: '0xa08C7C4FBF8195923bA29C368621Cf45EAAF7A2d',
    interaction: '0x2cf64bCB720b91373Df1315ED15188FF5D8C06Ab',
    ethProvider: '0x4C9FB2baB630D9d9C02905a6129b4cc2ee78B704',
    auctionProxy: '0x9747BA58300EB18fD6Db2Cc956B933c64C245e16',
    rewards: '0x730666F77855cD265de35A3768F1A02b7506440b',
    wBETH: '0x34f8f72e3f14Ede08bbdA1A19a90B35a80f3E789',
    lock: '0x0000000000000000000000000000000000000000',
    flash: '0x0000000000000000000000000000000000000000',
    binancePool: '0x0eCf14f54C5fF190e025Bc5e80c6351F91BFcB1c',
    ceETHVault: '0x2d924a915B1d9a6926366149f8d39509f7D501bB',
    oracleCeABNBc: '0x12e4142ACa8bf5a73B2CeE27C5901325Cd86fD0d',
    oracleBUSD: '0x965D25D7A0Cb0bB536aD68303E83B958Cef7dA02',
    ceVault: '0xfF045B3d6E64c0206647052C3858d7076c43Fa76',
    cerosRouter: '0xaC63ca94d0Ecb8242C3F47056BA64571c74FC79e',
    vat: '0xaAe55ecf3D89a129F2039628b3D2A575cD8D9863',
    spot: '0xca52b26945FB42BB7fC3bc7d9B8DAec0aa1E60aB',
    joinHAY: '0x3F9Af26DDBeBb677EA668d8dC5986545230A6b3D',
    joinCeABNBc: '0xa3e339aD42F989acDd2FdB21C7602EAD24A78483',
    joinBUSD: '0xa4A9dDD4Dc5f3656A3c8A5dAa80Bc58f4A421C97',
    jug: '0x59D2E5f043B066f1391b2b0E8BFDe86127b2121a',
    vow: '0x0659aef5fe538250f518cbf09b6066516b630e2e',
    dog: '0xEF46C1B018F448d128a287E136DF7c2e07114439',
    clipABNBc: '0xD0C2691Ad3278dCa9D9C8175e9d14d3deB94DB41',
    clipBUSD: '0xbB9414227A8cf7421c29841fc5dd28bfcb6cbb23',
    abaci: '0x5039Cb7bD2E3C47A07fb15a9F3A83bF375d37D04',
    jar: '0x9aab2377B7F23340A9f5C969E1419e070855bB27',
    farming: '0x43587B5bE016Ff1AD33fcE1eA98561cec559506C',
    pancakeRouter: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
    pancakeDepositProxy: '0x968e6C1614aBe4261B65cC298A1FadCdC2cC90b9',
    pancakeDepositProxyStable: '',
    pancakeStrategy: '0x4426d4161E00CED5016432FcCC69867eb963a7CF',
    pancakeStrategyStable: '',
    pancakeStableSwap: '',
    tokenBounding: '0x37BeC64130854F1ea89e2D1a6F304Cac41a929EF',
    incentiveVoting: '0x6cD66ca25b90A739D270588543B9c36980444888',
    proxyAdmin: '0x0000000000000000000000000000000000000000',
    ellipsisFinance: '0xB82849C0Bc8bE685eFACB882183b3688E69524eF',
    ellipsisMediator: '',

    magpieProxy: '0x664cc2BcAe1E057EB1Ec379598c5B743Ad9Db6e7',
    magpieMasterWombatAddress: '0x489833311676B566f888119c29bd997Dc6C95830',
    magpieHAYLp: '0x1fa71DF4b344ffa5755726Ea7a9a56fbbEe0D38b',
    magpieRouter: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    magpieMaster: '0xa3B615667CBd33cfc69843Bf11Fbb2A1D926BD46',
    magpieMGP: '0xD06716E1Ff2E492Cc5034c2E81805562dd3b45fa',
    magpieBUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    magpieStakingToken: '0xaB22C452308eAe8C0CDdad0Ec4E31aa21f1d6c42',
    thena: '0xe43317c1f037cbbaf33f33c386f2caf2b6b25c9c',
  },
  [Env.PROD]: {
    ilkCeABNBc:
      '0x636541424e426300000000000000000000000000000000000000000000000000',
    ilkBUSD:
      '0x4255534400000000000000000000000000000000000000000000000000000000',
    ilkETH:
      '0x6365774245544800000000000000000000000000000000000000000000000000',
    ilkSNBNB:
      '0x536e424e42000000000000000000000000000000000000000000000000000000',
    ilkWBETH:
      '0x7742455448000000000000000000000000000000000000000000000000000000',
    collateralCeABNBc: '0x563282106A5B0538f8673c787B3A16D3Cc1DbF1a',
    collateralBUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    collateralETH: '0x6C813D1d114d0caBf3F82f9E910BC29fE7f96451',
    collateralSNBNB: '0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B',
    collateralWBETH: '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
    SNBNB: '0xB0b84D294e0C75A6abe60171b70edEb2EFd14A1B',
    ETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    HAY: '0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5',
    HELIO: '0x0000000000000000000000000000000000000000',
    HBNB: '0x4b30fcAA7945fE9fDEFD2895aae539ba102Ed6F6',
    ankrBNB: '0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827',
    HAYBUSDLp: '0x70c26e9805ec5Df3d4aB0b2a3dF86BBA2231B6c1',
    HAYBUSDLpStable: '0xB6040A9F294477dDAdf5543a24E5463B8F2423Ae',
    HAYBUSDPlanetLp: '0x93B32a8dfE10e9196403dd111974E325219aec24',
    provider: '0xa835F890Fcde7679e7F7711aBfd515d2A267Ed0B',
    interaction: '0xB68443Ee3e828baD1526b3e0Bdf2Dfc6b1975ec4',
    ethProvider: '0x0326c157bfF399e25dd684613aEF26DBb40D3BA4',
    auctionProxy: '0xffe2519FaD60c7Ca0c18756392AE735273Ae49A1',
    rewards: '0xe66395EbA979968e574984268979C49a57EB59Ee',
    wBETH: '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
    lock: '0x0000000000000000000000000000000000000000',
    flash: '0x0000000000000000000000000000000000000000',
    binancePool: '0xa0c92efdceA55ca19396e4850B8D29Df6F907bcD',
    ceETHVault: '0xA230805C28121cc97B348f8209c79BEBEa3839C0',
    oracleCeABNBc: '0xf81748d12171De989A5Bbf2d76bf10BFbBaEC596',
    oracleBUSD: '0x1736759CF80B4C877c0dBC4591B97Fc06B0370B8',
    ceVault: '0x25b21472c073095bebC681001Cbf165f849eEe5E',
    cerosRouter: '0xA186D2363E5048D129E0a35E2fddDe767d4dada8',
    vat: '0x33A34eAB3ee892D40420507B820347b1cA2201c4',
    spot: '0x49bc2c4E5B035341b7d92Da4e6B267F7426F3038',
    joinHAY: '0x4C798F81de7736620Cd8e6510158b1fE758e22F7',
    joinCeABNBc: '0xfA14F330711A2774eC438856BBCf2c9013c2a6a4',
    joinBUSD: '0x626978E5ac1d460E4018E26C476279147987fD26',
    jug: '0x787BdEaa29A253e40feB35026c3d05C18CbCA7B3',
    vow: '0x2078A1969Ea581D618FDBEa2C0Dc13Fc15CB9fa7',
    dog: '0xd57E7b53a1572d27A04d9c1De2c4D423f1926d0B',
    clipABNBc: '0x2dcFb02CE33955b6Cc0aF34033189DE3ac4C0292',
    clipBUSD: '0x4B1d28855F0931AEF13d5DeEA8eFa09e5dbbf96C',
    abaci: '0xc1359eD77E6B0CBF9a8130a4C28FBbB87B9501b7',
    jar: '0x0a1Fd12F73432928C190CAF0810b3B767A59717e',
    farming: '0xf0fA2307392e3b0bD742437C6f80C6C56Fd8A37f',
    pancakeRouter: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    pancakeDepositProxy: '0xbf0E241DE91B9230b03d1C968083226905773aA0',
    pancakeDepositProxyStable: '0x574f1AeC874fA9621237B54c0A316248453F2BF4',
    pancakeStrategy: '0x5A2CcC1f8BB9a3048885E5F38bB48463E6314B7C',
    pancakeStrategyStable: '0xe8baC331FaF2f65eA1db5425Cf3Ee9dB59C8e3cd',
    pancakeStableSwap: '0x49079D07ef47449aF808A4f36c2a8dEC975594eC',
    tokenBounding: '0x37BeC64130854F1ea89e2D1a6F304Cac41a929EF',
    incentiveVoting: '0xdE1F4c0DD8C22b421851Fb51862F265D7564bEf7',
    proxyAdmin: '0x1Fa3E4718168077975fF4039304CC2e19Ae58c4C',
    ellipsisFinance: '0xB82849C0Bc8bE685eFACB882183b3688E69524eF',
    ellipsisMediator: '0xd5193c2b05F44c35BcAB405f8d702E866f8e2cd1',

    magpieProxy: '0x664cc2BcAe1E057EB1Ec379598c5B743Ad9Db6e7',
    magpieMasterWombatAddress: '0x489833311676B566f888119c29bd997Dc6C95830',
    magpieHAYLp: '0x1fa71DF4b344ffa5755726Ea7a9a56fbbEe0D38b',
    magpieRouter: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    magpieMaster: '0xa3B615667CBd33cfc69843Bf11Fbb2A1D926BD46',
    magpieMGP: '0xD06716E1Ff2E492Cc5034c2E81805562dd3b45fa',
    magpieBUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    magpieStakingToken: '0xaB22C452308eAe8C0CDdad0Ec4E31aa21f1d6c42',
    thena: '0xe43317c1f037cbbaf33f33c386f2caf2b6b25c9c',
  },
};

export default contracts[process.env.REACT_APP_ENV as Env];
