import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common';
import { CollateralToken } from 'modules/core';
import { useGetBorrowAPRQuery } from 'modules/store/actions/getBorrowAPR';
import { useGetRewardsAPRQuery } from 'modules/store/actions/getRewardsAPR';

export const useNetBorrowAPR = (token: CollateralToken): BigNumber => {
  const { data: rewardsAPR } = useGetRewardsAPRQuery({ token });
  const { data: borrowAPR } = useGetBorrowAPRQuery({ token });

  return (rewardsAPR ?? ZERO).minus(borrowAPR ?? ZERO);
};
