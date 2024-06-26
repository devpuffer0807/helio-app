import BigNumber from 'bignumber.js';

import {
  COLLATERAL_SECOND_TOKEN_ADDRESS,
  convertFromWei,
  LOAN_TOKEN_ADDRESS,
  ZERO,
} from 'modules/common';
import {
  ContractsManager,
  FARMING_CONTRACT_ADDRESS,
  PANCAKE_DEPOSIT_PROXY_STABLE_ADDRESS,
} from 'modules/core';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';
import { getCollateralSecondTokenBalance } from 'modules/store/actions/getCollateralSecondTokenBalance';
import { getLoanTokenBalance } from 'modules/store/actions/getLoanTokenBalance';

import {
  HAY_BUSD_LP_STABLE_TOKEN_ADDRESS,
  PANCAKE_STRATEGY_STABLE_ADDRESS,
} from '../../../consts';
import { BoostedVault } from '../types';
import { getPancakeSwapHayBusdAPR } from './getPancakeSwapHayBusdAPR';
import { getPancakeSwapHayBusdRate } from './getPancakeSwapHayBusdRate';

export const {
  useLazyGetPancakeSwapHayBusdStableQuery,
  useGetPancakeSwapHayBusdStableQuery,
  endpoints: { getPancakeSwapHayBusdStable },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getPancakeSwapHayBusdStable: build.query<BoostedVault, void>({
      queryFn: async (_, { getState, dispatch }) => {
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);

        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getFarmingContract();
        const poolId = '1';
        const strategyContract = await sdk.getPancakeStrategyContract(
          PANCAKE_STRATEGY_STABLE_ADDRESS,
        );

        const [
          staked,
          rewards,
          rawTVL,
          rawRate,
          rawOriginalAPR,
          rawHAYBalance,
          rawBUSDBalance,
        ] = await Promise.all([
          contract.methods.stakedWantTokens(poolId, currentAccount).call(),
          contract.methods.claimableReward(currentAccount, [poolId]).call(),
          strategyContract.methods.wantLockedTotal().call(),
          dispatch(
            getPancakeSwapHayBusdRate.initiate(undefined, {
              subscribe: true,
              forceRefetch: true,
            }),
          ),
          dispatch(
            getPancakeSwapHayBusdAPR.initiate(undefined, {
              subscribe: true,
              forceRefetch: true,
            }),
          ),
          dispatch(
            getLoanTokenBalance.initiate(undefined, {
              subscribe: true,
              forceRefetch: true,
            }),
          ),
          dispatch(
            getCollateralSecondTokenBalance.initiate(undefined, {
              subscribe: true,
              forceRefetch: true,
            }),
          ),
        ]);

        let LPBalance = ZERO;
        if (HAY_BUSD_LP_STABLE_TOKEN_ADDRESS) {
          const lpContract = await sdk.getPancakeStableSwapLPContract();
          const rawLPBalance = await lpContract.methods
            .balanceOf(currentAccount)
            .call();
          LPBalance = convertFromWei(rawLPBalance);
        }

        const { data: rate } = rawRate;
        const { data: originalAPR } = rawOriginalAPR;
        const { data: HAYBalance } = rawHAYBalance;
        const { data: BUSDBalance } = rawBUSDBalance;

        const APR = originalAPR
          ? new BigNumber(originalAPR.pancakeStable.apr)
          : ZERO;

        const BUSDPerHAY = (rate?.busdPerHayRate as BigNumber) ?? ZERO;
        const HAYPerBUSD = (rate?.hayPerBusdRate as BigNumber) ?? ZERO;
        const TVL = convertFromWei(rawTVL);

        const result: BoostedVault = {
          poolId,
          id: 'haybusdstable',
          staked: convertFromWei(staked),
          name: 'PancakeSwap',
          APR,
          rewardToken: {
            name: 'HAY',
            balance: convertFromWei(rewards[0]),
          },
          farmingAddress: FARMING_CONTRACT_ADDRESS,
          proxyAddress: PANCAKE_DEPOSIT_PROXY_STABLE_ADDRESS,
          lpToken: {
            name: 'HAY/BUSD LP',
            balance: LPBalance,
            address: HAY_BUSD_LP_STABLE_TOKEN_ADDRESS,
            price: BUSDPerHAY.plus(HAYPerBUSD),
          },
          tokens: [
            {
              name: 'HAY',
              balance: HAYBalance ?? ZERO,
              isBound: false,
              equivalent: BUSDPerHAY,
              address: LOAN_TOKEN_ADDRESS,
            },
            {
              name: 'BUSD',
              balance: BUSDBalance ?? ZERO,
              isBound: false,
              equivalent: HAYPerBUSD,
              address: COLLATERAL_SECOND_TOKEN_ADDRESS,
            },
          ],
          strategyAddress: PANCAKE_STRATEGY_STABLE_ADDRESS,
          TVL,
          type: 'stable',
          description: 'Pancake Swap V3 Concentrated Liquidity  Pool',
        };

        return { data: result };
      },
    }),
  }),
});
