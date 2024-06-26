import BigNumber from 'bignumber.js';

import { EarnApi } from 'modules/api/EarnApi';
import {
  COLLATERAL_SECOND_TOKEN_ADDRESS,
  isProdEnv,
  LOAN_TOKEN_ADDRESS,
  PLANET_BOOSTED_VAULT_LINK,
  PLANET_HAY_BUSD_DESCRIPTION,
  PLANET_HAY_USDT_DESCRIPTION,
  PLANET_HAY_USDT_VAULT_LINK,
  ZERO,
} from 'modules/common';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

import { LOAN_COLLATERAL_PLANET_LP_TOKEN_ADDRESS } from '../../../consts';
import { BoostedExternalVault } from '../types';

export const {
  useGetPlanetFinanceHayBusdQuery,
  endpoints: { getPlanetFinanceHayBusd },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getPlanetFinanceHayBusd: build.query<BoostedExternalVault[], void>({
      queryFn: async (_, { getState }) => {
        const state: RootState = getState();
        const { data: currentAccount = '' } = getAccount.select()(state);
        const api = EarnApi.getInstance();
        const planetFinanceHayBusd = await api.getPlanetFinanceHayBusdPool(
          currentAccount,
        );
        const planetFinanceHayUsdt = await api.getPlanetFinanceHayUsdtPool(
          currentAccount,
        );
        const result: BoostedExternalVault[] = [
          {
            id: '17',
            poolId: 'hayusdt',
            name: 'Planet Finance',
            staked: BigNumber('0'),
            APR: BigNumber(planetFinanceHayUsdt?.userTotalApr || '0'),
            TVL: BigNumber(planetFinanceHayUsdt?.tvl || '0'),
            rewardToken: {
              balance: BigNumber('0'),
              name: 'HAY',
            },
            tokens: [
              {
                name: 'HAY',
                balance: ZERO,
                isBound: true,
                equivalent: ZERO,
                address: LOAN_TOKEN_ADDRESS,
              },
              {
                name: 'USDT',
                balance: ZERO,
                isBound: true,
                equivalent: ZERO,
                address: '',
              },
            ],
            lpToken: {
              name: 'HAY/USDT LP',
              balance: ZERO,
              address: '',
              price: ZERO,
            },
            isStakeActive: true,
            showZeroAPR: false,
            showZeroTVL: false,
            showOnlyForStakedUsers: false,
            link: PLANET_HAY_USDT_VAULT_LINK,
            description: PLANET_HAY_USDT_DESCRIPTION,
          },
          {
            poolId: '18',
            id: 'haybusd',
            staked: ZERO,
            name: 'Planet Finance',
            APR: BigNumber(planetFinanceHayBusd?.userTotalApr || '0'),
            rewardToken: {
              balance: ZERO,
              name: 'HAY',
            },
            lpToken: {
              name: 'HAY/BUSD LP',
              balance: ZERO,
              address: LOAN_COLLATERAL_PLANET_LP_TOKEN_ADDRESS,
              price: ZERO,
            },
            tokens: [
              {
                name: 'HAY',
                balance: ZERO,
                isBound: true,
                equivalent: ZERO,
                address: LOAN_TOKEN_ADDRESS,
              },
              {
                name: 'BUSD',
                balance: ZERO,
                isBound: true,
                equivalent: ZERO,
                address: COLLATERAL_SECOND_TOKEN_ADDRESS,
              },
            ],
            TVL: BigNumber(planetFinanceHayBusd?.tvl || '0'),
            isStakeActive: !isProdEnv() || true,
            showZeroAPR: false,
            showZeroTVL: false,
            showOnlyForStakedUsers: false,
            link: PLANET_BOOSTED_VAULT_LINK,
            description: PLANET_HAY_BUSD_DESCRIPTION as string,
          },
        ];

        return { data: result };
      },
    }),
  }),
});
