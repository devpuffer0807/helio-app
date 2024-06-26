import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store';

export const {
  useLazyRepayGetRepaidAmountQuery,
  endpoints: { repayGetRepaidAmount },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    repayGetRepaidAmount: build.query<BigNumber | null, string>({
      queryFn: async transactionHash => {
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getInteractionContract();

        const [event] = await sdk.getEventsFromReceipt(
          contract,
          'Payback',
          transactionHash,
        );
        if (!event) {
          return { data: null };
        }

        const { amount } = event.returnValues;
        return { data: convertFromWei(amount) };
      },
    }),
  }),
});
