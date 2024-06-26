import BigNumber from 'bignumber.js';

import {
  convertFromWei,
  HUNDRED,
  LOAN_TOKEN_ADDRESS,
  ONE,
  ZERO,
} from 'modules/common';
import { ContractsManager, JAR_CONTRACT_ADDRESS } from 'modules/core';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';
import { getLoanTokenBalance } from 'modules/store/actions/getLoanTokenBalance';

import { StakingTokenInfo } from '../types';

const SECONDS_IN_YEAR = new BigNumber(31536000);

export const {
  useGetHAYPoolQuery,
  endpoints: { getHAYPool },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getHAYPool: build.query<StakingTokenInfo, void>({
      queryFn: async (_, { getState, dispatch }) => {
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);

        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getJarContract();

        const [staked, rewards, rate, totalSupply, rawBalance] =
          await Promise.all([
            contract.methods.balanceOf(currentAccount).call(),
            contract.methods.earned(currentAccount).call(),
            contract.methods.rate().call(),
            contract.methods.totalSupply().call(),
            dispatch(
              getLoanTokenBalance.initiate(undefined, {
                subscribe: true,
                forceRefetch: true,
              }),
            ),
          ]);

        const { data: balance } = rawBalance;
        const totalDeposit = convertFromWei(totalSupply);

        const APR = new BigNumber(convertFromWei(rate))
          .multipliedBy(SECONDS_IN_YEAR)
          .div(totalDeposit)
          .multipliedBy(HUNDRED);

        const result: StakingTokenInfo = {
          poolName: 'HELIO',
          stakingId: 'hay',
          name: 'HAY',
          rewardToken: {
            name: 'HAY',
            balance: convertFromWei(rewards),
          },
          staked: convertFromWei(staked),
          APR,
          TVL: totalDeposit,
          targetAddress: JAR_CONTRACT_ADDRESS,
          token: {
            address: LOAN_TOKEN_ADDRESS,
            balance: balance ?? ZERO,
            name: 'HAY',
            price: ONE,
          },
          description: 'HAY Single Staking Pool',
        };

        return { data: result };
      },
    }),
  }),
});
