import BigNumber from 'bignumber.js';

import { HUNDRED, ZERO } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

import { GetSharesArgs } from '../types';

export const {
  useGetPancakeSwapHayBusdSharesQuery,
  endpoints: { getPancakeSwapHayBusdShares },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getPancakeSwapHayBusdShares: build.query<BigNumber, GetSharesArgs>({
      queryFn: async (args, { getState }) => {
        const { strategyAddress, poolId } = args;
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const farmingContract = await sdk.getFarmingContract();
        const strategyContract = await sdk.getPancakeStrategyContract(
          strategyAddress,
        );

        const [{ shares: userShares }, totalShares] = await Promise.all([
          farmingContract.methods.userInfo(poolId, currentAccount).call(),
          strategyContract.methods.sharesTotal().call(),
        ]);

        const result =
          totalShares !== '0'
            ? new BigNumber(userShares).multipliedBy(HUNDRED).div(totalShares)
            : ZERO;

        return { data: result };
      },
    }),
  }),
});
