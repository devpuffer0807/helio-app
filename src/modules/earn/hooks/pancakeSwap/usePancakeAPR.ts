import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common';

import { useAnalyticsGetAPRQuery } from '../../actions/vaults/pancakeSwapHayBusd/getAPR';

export function usePancakeAPR(): BigNumber {
  const { data: APR } = useAnalyticsGetAPRQuery();

  return APR ? new BigNumber(APR.apr) : ZERO;
}
