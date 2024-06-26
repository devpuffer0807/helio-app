import { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { HUNDRED, ZERO } from 'modules/common';
import { CollateralToken } from 'modules/core';
import { useGetAccountDataQuery } from 'modules/store/actions/getAccountData';

export function useGetBorrowUtilization(token: CollateralToken): BigNumber {
  const { data } = useGetAccountDataQuery({ token });

  const { borrowed, collateral, collateralRatio } = data ?? {};

  const isEmptyData = !(borrowed && collateral && collateralRatio);
  const isZeroData = collateral?.isZero() || collateralRatio?.isZero();

  return useMemo(() => {
    if (isEmptyData || isZeroData) {
      return ZERO;
    }

    return borrowed
      .multipliedBy(HUNDRED)
      .dividedBy(collateral.multipliedBy(collateralRatio));
  }, [borrowed, collateral, collateralRatio, isEmptyData, isZeroData]);
}
