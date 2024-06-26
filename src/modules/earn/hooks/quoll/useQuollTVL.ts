import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common';

import { useGetQuollTVLQuery } from '../../actions/farming/quoll/getQuollTVL';

export function useQuollTVL(): BigNumber {
  const { data: TVL } = useGetQuollTVLQuery();

  return TVL ?? ZERO;
}
