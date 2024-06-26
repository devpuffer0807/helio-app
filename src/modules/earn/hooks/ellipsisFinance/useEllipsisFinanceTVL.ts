import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common';

import { useGetEllipsisFinanceTVLQuery } from '../../actions/farming/ellipsisFinance/getEllipsisFinanceTVL';

export function useEllipsisFinanceTVL(): BigNumber {
  const { data: ellipsisFinanceTVL } = useGetEllipsisFinanceTVLQuery();

  return ellipsisFinanceTVL ?? ZERO;
}
