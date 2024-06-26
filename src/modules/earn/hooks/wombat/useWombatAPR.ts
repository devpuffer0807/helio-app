import BigNumber from 'bignumber.js';

import { HUNDRED, ZERO } from 'modules/common';

import { useGetWombatAPRQuery } from '../../actions/farming/wombat/getWombatAPR';

export function useWombatAPR(): BigNumber {
  const { data: APR } = useGetWombatAPRQuery();

  if (!APR) return ZERO;

  const { medianBoostedAPR, totalBonusTokenAPR, womBaseAPR } = APR;

  return new BigNumber(medianBoostedAPR)
    .plus(new BigNumber(totalBonusTokenAPR))
    .plus(new BigNumber(womBaseAPR))
    .multipliedBy(HUNDRED);
}
