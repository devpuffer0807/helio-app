import { useMemo } from 'react';

import { useGetHAYPoolQuery } from '../actions/staking/hay/getHAYPool';
import { StakingTokenInfo } from '../actions/staking/types';

export function useStakingTokens(): StakingTokenInfo[] {
  const { data: HAYStakingPool } = useGetHAYPoolQuery();

  return useMemo(() => {
    return [HAYStakingPool].filter(Boolean) as StakingTokenInfo[];
  }, [HAYStakingPool]);
}
