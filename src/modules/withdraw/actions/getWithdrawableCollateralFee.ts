import BigNumber from 'bignumber.js';

import { convertFromWei, ZERO } from 'modules/common';
import { ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store';

export const {
  useLazyGetWithdrawableCollateralFeeQuery,
  endpoints: { getWithdrawableCollateralFee },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getWithdrawableCollateralFee: build.query<
      { [key: string]: BigNumber },
      { amount: string }
    >({
      queryFn: async () => {
        const sdk = await ContractsManager.getInstance();

        const ceETHVaultContract = await sdk.getCEETHVaultContract();
        const HUNDRED = new BigNumber('100');
        const ethWithdrawalFee = convertFromWei(
          await ceETHVaultContract.methods.getWithdrawalFee().call(),
        ).multipliedBy(HUNDRED);

        const withdrawableFeeAmounts: { [key: string]: BigNumber } = {
          ankrBNB: ZERO,
          SnBNB: ZERO,
          stkBNB: ZERO,
          BNBx: ZERO,
          BNB: ZERO,
          ETH: ethWithdrawalFee,
          wBETH: ZERO,
        };

        return { data: withdrawableFeeAmounts };
      },
    }),
  }),
});
