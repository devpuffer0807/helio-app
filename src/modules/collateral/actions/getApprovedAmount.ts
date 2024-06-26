import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import {
  CollateralToken,
  ContractsManager,
  ETH_PROVIDER_CONTRACT_ADDRESS,
  INTERACTION_CONTRACT_ADDRESS,
} from 'modules/core';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

export const {
  useGetCollateralApprovedAmountQuery,
  endpoints: { getCollateralApprovedAmount },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getCollateralApprovedAmount: build.query<
      BigNumber,
      { token: CollateralToken }
    >({
      queryFn: async ({ token }, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getCollateralTokenContract(token);

        const amount = await contract.methods
          .allowance(
            account,
            token === CollateralToken.Eth
              ? ETH_PROVIDER_CONTRACT_ADDRESS
              : INTERACTION_CONTRACT_ADDRESS,
          )
          .call();

        return { data: convertFromWei(amount) };
      },
    }),
  }),
});
