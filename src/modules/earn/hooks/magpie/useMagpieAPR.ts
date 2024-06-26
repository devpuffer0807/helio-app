import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common';

import { useGetMagpieAPRQuery } from '../../actions/farming/magpie/getMagpieAPR';

export function useMagpieAPR(): BigNumber {
  const { data: APR } = useGetMagpieAPRQuery();

  if (!APR) return ZERO;

  const { hayAPR, vlMGPApr, womAPR } = APR;

  return hayAPR.plus(vlMGPApr).plus(womAPR);
}
