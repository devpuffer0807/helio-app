import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store/queries';

export const {
  useGetEllipsisFinanceTVLQuery,
  endpoints: { getEllipsisFinanceTVL },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getEllipsisFinanceTVL: build.query<BigNumber, void>({
      queryFn: async () => {
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getEllipsisFinanceContract();

        const [firstToken, secondToken] = await contract.methods
          .get_balances()
          .call();

        const result = convertFromWei(firstToken).plus(
          convertFromWei(secondToken),
        );

        return {
          data: result,
        };
      },
    }),
  }),
});
