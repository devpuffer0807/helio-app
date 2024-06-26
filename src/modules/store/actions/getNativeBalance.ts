import BigNumber from 'bignumber.js';

import { ProviderManagerSingleton } from 'modules/api';
import { convertFromWei } from 'modules/common';
import { CollateralToken, ContractsManager } from 'modules/core';
import { AvailableWriteProviders } from 'modules/provider';

import { web3Api } from '../queries';
import { getAccount } from './getAccount';

export const {
  useGetNativeBalanceQuery,
  endpoints: { getNativeBalance },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getNativeBalance: build.query<BigNumber, { token: CollateralToken }>({
      queryFn: async ({ token }, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();

        const balance = await (async () => {
          switch (token) {
            case CollateralToken.Main: {
              const provider = await instance.getETHWriteProvider(
                AvailableWriteProviders.ethCompatible,
              );

              return provider.getWeb3().eth.getBalance(account);
            }
            case CollateralToken.Second:
            default: {
              const sdk = await ContractsManager.getInstance();
              const contract = await sdk.getCollateralTokenContract(token);

              return contract.methods.balanceOf(account).call();
            }
          }
        })();

        return {
          data: convertFromWei(balance),
        };
      },
    }),
  }),
});
