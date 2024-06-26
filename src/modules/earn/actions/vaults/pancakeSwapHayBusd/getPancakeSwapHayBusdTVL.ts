import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store';

interface Args {
  strategyAddress: string;
  poolId: string;
}

export const {
  useGetPancakeSwapHayBusdTVLQuery,
  endpoints: { getPancakeSwapHayBusdTVL },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getPancakeSwapHayBusdTVL: build.query<BigNumber, Args>({
      queryFn: async ({ strategyAddress }) => {
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getPancakeStrategyContract(strategyAddress);

        const staked = await contract.methods.wantLockedTotal().call();

        return { data: convertFromWei(staked) };
      },
    }),
  }),
});
