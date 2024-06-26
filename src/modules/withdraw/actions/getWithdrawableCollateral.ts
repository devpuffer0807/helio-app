import BigNumber from 'bignumber.js';

import { convertFromWei, convertToWei, ZERO } from 'modules/common';
import { CollateralToken, ContractsManager } from 'modules/core';
import {
  WITHDRAWAL_TOKENS_ETH,
  WITHDRAWAL_TOKENS_MAIN,
} from 'modules/earn/consts';
import { web3Api } from 'modules/store';

export const {
  useLazyGetWithdrawableCollateralQuery,
  endpoints: { getWithdrawableCollateral },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getWithdrawableCollateral: build.query<
      { [key: string]: BigNumber },
      { amount: string }
    >({
      queryFn: async ({ amount }) => {
        const sdk = await ContractsManager.getInstance();

        const contract = await sdk.getProviderContract();

        const withdrawableAmounts: { [key: string]: BigNumber } = {
          ankrBNB: ZERO,
          SnBNB: ZERO,
          stkBNB: ZERO,
          BNBx: ZERO,
          BNB: ZERO,
          ETH: ZERO,
          wBETH: ZERO,
        };

        for await (const token of WITHDRAWAL_TOKENS_MAIN) {
          if (token.name === CollateralToken.Main) {
            withdrawableAmounts[token.name] = convertFromWei('0');
          } else {
            try {
              withdrawableAmounts[token.name] = convertFromWei(
                await contract.methods
                  .estimateInToken(token.address, convertToWei(amount))
                  .call(),
              );
            } catch (e) {
              withdrawableAmounts[token.name] = convertFromWei('0');
            }
          }
        }

        for await (const token of WITHDRAWAL_TOKENS_ETH) {
          if (token.name === CollateralToken.Eth) {
            const ceETHVaultContract = await sdk.getCEETHVaultContract();
            const withdrawalFee = convertFromWei(
              await ceETHVaultContract.methods.getWithdrawalFee().call(),
            );
            const HUNDRED = new BigNumber('100');
            withdrawableAmounts[token.name] = new BigNumber(amount || '0')
              .multipliedBy(HUNDRED.minus(withdrawalFee.multipliedBy(HUNDRED)))
              .dividedBy(HUNDRED);
          } else {
            // wBETH
            try {
              const wBETHContract = await sdk.getWBETHContract();
              const exchangeRate = convertFromWei(
                await wBETHContract.methods.exchangeRate().call(),
              );
              withdrawableAmounts[token.name] = new BigNumber(
                amount || '0',
              ).dividedBy(exchangeRate);
            } catch (e) {
              withdrawableAmounts[token.name] = convertFromWei('0');
            }
          }
        }

        return { data: withdrawableAmounts };
      },
    }),
  }),
});
