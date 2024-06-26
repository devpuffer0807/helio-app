import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store';

export const {
  useWithdrawGetStakedTokenRatioQuery,
  endpoints: { withdrawGetStakedTokenRatio },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    withdrawGetStakedTokenRatio: build.query<BigNumber, void>({
      queryFn: async () => {
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getStakedTokenContract();
        const ratio = await contract.methods.ratio().call();

        return { data: convertFromWei(ratio) };
      },
    }),
  }),
});
