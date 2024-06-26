import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common';

import { useGetEllipsisFinanceAPRQuery } from '../../actions/farming/ellipsisFinance/getEllipsisFinanceAPR';

export function useEllipsisFinanceAPR(): BigNumber {
  const { data: ellipsisFinanceAPR } = useGetEllipsisFinanceAPRQuery();

  return ellipsisFinanceAPR ?? ZERO;
}
