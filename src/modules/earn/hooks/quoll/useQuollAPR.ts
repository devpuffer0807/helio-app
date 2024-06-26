import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common';

import { useGetQuollAPRQuery } from '../../actions/farming/quoll/getQuollAPR';

export function useQuollAPR(): BigNumber {
  const { data: APR } = useGetQuollAPRQuery();

  return APR ?? ZERO;
}
