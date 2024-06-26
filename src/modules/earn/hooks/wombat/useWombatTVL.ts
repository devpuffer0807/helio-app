import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common';

import { useGetWombatTVLQuery } from '../../actions/farming/wombat/getWombatTVL';

export function useWombatTVL(): BigNumber {
  const { data: TVL } = useGetWombatTVLQuery();

  if (!TVL) return ZERO;

  const { liability } = TVL;

  return new BigNumber(liability);
}
