import { useMemo } from 'react';

import { useGetThenaPoolsQuery } from '../actions/farming/thena/getThenaPools';
import { LIQUIDITY_POOLS } from '../consts';

export function useLiquidityExternalPools(): typeof LIQUIDITY_POOLS[number][] {
  const { data: thenaPools } = useGetThenaPoolsQuery();

  return useMemo<typeof LIQUIDITY_POOLS[number][]>(() => {
    return thenaPools ? [...thenaPools, ...LIQUIDITY_POOLS] : LIQUIDITY_POOLS;
  }, [thenaPools]);
}
