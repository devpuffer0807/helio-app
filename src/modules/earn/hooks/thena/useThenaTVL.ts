import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common';

import { useGetThenaTVLQuery } from '../../actions/farming/thena/getThenaTVL';

export function useThenaTVL(): BigNumber {
  const { data: TVL } = useGetThenaTVLQuery();

  if (!TVL) return ZERO;

  return new BigNumber(TVL);
}
