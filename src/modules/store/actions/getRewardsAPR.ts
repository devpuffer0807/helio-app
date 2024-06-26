import BigNumber from 'bignumber.js';

import { APP_ENV, convertFromWei, ZERO } from 'modules/common';
import {
  CollateralToken,
  ContractsManager,
  getCollateralToken,
} from 'modules/core';

import { web3Api } from '../queries';

export const {
  useGetRewardsAPRQuery,
  endpoints: { getRewardsAPR },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getRewardsAPR: build.query<BigNumber, { token: CollateralToken }>({
      queryFn: async ({ token }) => {
        // TODO: remove it after releasing HELIO token for Mainnet
        if (APP_ENV === 'prod') {
          return { data: ZERO };
        }

        const instance = await ContractsManager.getInstance();
        const contract = await instance.getRewardsContract();
        const { address } = getCollateralToken(token);
        const result = await contract.methods.distributionApy(address).call();

        return {
          data: new BigNumber(convertFromWei(result).toFixed(2)),
        };
      },
    }),
  }),
});
