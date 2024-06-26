import BigNumber from 'bignumber.js';

import { convertFromWei, HUNDRED } from 'modules/common';
import {
  CollateralToken,
  ContractsManager,
  getCollateralToken,
} from 'modules/core';

import { web3Api } from '../queries';
import { getAccount } from './getAccount';

export interface AccountData {
  collateral: BigNumber;
  borrowed: BigNumber;
  availableToBorrow: BigNumber;
  borrowLimit: BigNumber;
  borrowedPercent: BigNumber;
  collateralPercent: BigNumber;
  collateralPrice: BigNumber;
  collateralRatio: BigNumber;
}

export const {
  useGetAccountDataQuery,
  endpoints: { getAccountData },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getAccountData: build.query<AccountData, { token: CollateralToken }>({
      queryFn: async ({ token }, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getInteractionContract();
        const { address: collateralTokenAddress } = getCollateralToken(token);

        const [
          collateralStr,
          borrowedStr,
          availableToBorrowStr,
          collateralRateStr,
          collateralPriceStr,
        ] = await Promise.all([
          contract.methods.locked(collateralTokenAddress, account).call(),
          contract.methods.borrowed(collateralTokenAddress, account).call(),
          contract.methods
            .availableToBorrow(collateralTokenAddress, account)
            .call(),
          contract.methods.collateralRate(collateralTokenAddress).call(),
          contract.methods.collateralPrice(collateralTokenAddress).call(),
        ]);

        const collateral = convertFromWei(collateralStr);
        const availableToBorrow = convertFromWei(availableToBorrowStr);
        const collateralRate = convertFromWei(collateralRateStr);
        const collateralPrice = convertFromWei(collateralPriceStr);
        const collateralPercent = collateralRate.multipliedBy(HUNDRED);
        const collateralRatio = collateralRate.multipliedBy(collateralPrice);
        const borrowed = convertFromWei(borrowedStr);
        const borrowLimit = collateral.multipliedBy(collateralRatio);

        const borrowedPercent = borrowLimit.isZero()
          ? borrowLimit
          : borrowed.div(borrowLimit).multipliedBy(HUNDRED).decimalPlaces(2);

        return {
          data: {
            collateral,
            borrowed,
            availableToBorrow,
            borrowLimit,
            borrowedPercent,
            collateralPercent,
            collateralPrice,
            collateralRatio,
          },
        };
      },
    }),
  }),
});
