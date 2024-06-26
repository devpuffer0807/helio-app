import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import {
  CollateralToken,
  ContractsManager,
  PROVIDER_CONTRACT_ADDRESS,
} from 'modules/core';
import { web3Api } from 'modules/store';

export const {
  useLazyGetBalanceOfCollateralQuery,
  endpoints: { getBalanceOfCollateral },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getBalanceOfCollateral: build.query<
      BigNumber,
      { strategy: string; tokenName: string }
    >({
      queryFn: async ({ strategy, tokenName }) => {
        const sdk = await ContractsManager.getInstance();

        const contract = await sdk.getProviderContract();

        let amount: string;

        switch (tokenName) {
          case CollateralToken.Main:
            const provider = await sdk.getProvider();
            const web3 = provider.getWeb3();
            amount = await web3.eth.getBalance(PROVIDER_CONTRACT_ADDRESS);
            break;
          case CollateralToken.Eth:
            const ethContract = await sdk.getCollateralTokenContract(
              CollateralToken.Eth,
            );
            amount = await ethContract.methods.balanceOf(strategy).call();
            break;
          case CollateralToken.WBETH:
            const wBETHContract = await sdk.getCollateralTokenContract(
              CollateralToken.WBETH,
            );
            amount = await wBETHContract.methods.balanceOf(strategy).call();
            break;
          default:
            amount = await contract.methods.balanceOfToken(strategy).call();
        }

        return { data: convertFromWei(amount) };
      },
    }),
  }),
});
