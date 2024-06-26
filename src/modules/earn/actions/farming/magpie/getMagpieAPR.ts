import BigNumber from 'bignumber.js';

import { CoingeckoApi } from 'modules/api/CoingeckoApi';
import { convertFromWei, convertToWei, HUNDRED } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store/queries';

import {
  MAGPIE_BUSD_ADDRESS,
  MAGPIE_MASTER_WOMBAT_ADDRESS,
  MAGPIE_MGP_ADDRESS,
  MAGPIE_PROXY_ADDRESS,
  MAGPIE_STAKING_TOKEN_ADDRESS,
} from '../../../consts';

export interface MagpieAPR {
  womAPR: BigNumber;
  hayAPR: BigNumber;
  vlMGPApr: BigNumber;
}

export const {
  useGetMagpieAPRQuery,
  endpoints: { getMagpieAPR },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getMagpieAPR: build.query<MagpieAPR, void>({
      queryFn: async () => {
        const sdk = await ContractsManager.getInstance();
        const masterWombatContract = await sdk.getMagpieMasterWombatContract();

        const hayPidOnMastermagpie = 5;

        const magpieStakingInfo = await masterWombatContract.methods
          .userInfo(hayPidOnMastermagpie, MAGPIE_PROXY_ADDRESS)
          .call();

        const magpieStakingBalance = convertFromWei(magpieStakingInfo.amount);
        const magpieStakingFactor = convertFromWei(magpieStakingInfo.factor);

        const hayPoolInfo = await masterWombatContract.methods
          .poolInfo(hayPidOnMastermagpie)
          .call();

        const poolFactor = convertFromWei(hayPoolInfo.sumOfFactors);
        const hayLpContract = await sdk.getMagpieHayLpContract();
        const poolBalance = convertFromWei(
          await hayLpContract.methods
            .balanceOf(MAGPIE_MASTER_WOMBAT_ADDRESS)
            .call(),
        );

        const poolInfo = await masterWombatContract.methods
          .poolInfoV3(5)
          .call();

        const hayPoolEmission = convertFromWei(poolInfo.rewardRate);

        const normPerSec = hayPoolEmission
          .multipliedBy(0.375)
          .multipliedBy(magpieStakingBalance)
          .dividedBy(poolBalance);
        const boostedPerSec = hayPoolEmission
          .multipliedBy(0.625)
          .multipliedBy(magpieStakingFactor)
          .dividedBy(poolFactor);

        const yearEmission = normPerSec
          .plus(boostedPerSec)
          .multipliedBy(365 * 24 * 60 * 60);
        const womprice = await CoingeckoApi.getInstance().getWombatPrice();
        const womAPR = yearEmission
          .multipliedBy(womprice)
          .dividedBy(magpieStakingBalance)
          .multipliedBy(100 * 0.8);

        const hayRewarder = hayPoolInfo.rewarder;

        const rewardContract = await sdk.getMagpierewardContract(hayRewarder);
        const hayRewardInfo = await rewardContract.methods.rewardInfo(0).call();

        const hayRewardAyear = convertFromWei(
          hayRewardInfo.tokenPerSec,
        ).multipliedBy(365 * 24 * 60 * 60 * 0.8);

        const hayAPR = hayRewardAyear
          .dividedBy(poolBalance)
          .multipliedBy(HUNDRED);

        const path = [MAGPIE_MGP_ADDRESS, MAGPIE_BUSD_ADDRESS];

        const routerV2Contract = await sdk.getMagpieRouterContract();

        const amountsOut = await routerV2Contract.methods
          .getAmountsOut(convertToWei(1), path)
          .call();

        const mgpPrice = convertFromWei(amountsOut[1]);

        const masterMagpieContract = await sdk.getMagpieMasterContract();

        const vlMGPPersec = convertFromWei(
          (
            await masterMagpieContract.methods
              .getPoolInfo(MAGPIE_STAKING_TOKEN_ADDRESS)
              .call()
          ).emission,
        );
        const vlMGPApr = vlMGPPersec
          .multipliedBy(365 * 24 * 60 * 60)
          .multipliedBy(mgpPrice)
          .dividedBy(magpieStakingBalance)
          .multipliedBy(HUNDRED);

        return {
          data: {
            womAPR,
            hayAPR,
            vlMGPApr,
          },
        };
      },
    }),
  }),
});
