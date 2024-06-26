import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common';

import { useGetThenaAPRQuery } from '../../actions/farming/thena/getThenaAPR';

export function useThenaAPR(): BigNumber {
  const { data: APR } = useGetThenaAPRQuery();

  if (!APR) return ZERO;

  return APR;
}
