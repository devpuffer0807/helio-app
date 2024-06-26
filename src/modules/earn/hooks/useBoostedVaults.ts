import { useEffect, useMemo } from 'react';

import { isProdEnv } from '../../common';
import { useGetPancakeSwapHayBusdQuery } from '../actions/vaults/pancakeSwapHayBusd/getPancakeSwapHayBusd';
import { useLazyGetPancakeSwapHayBusdStableQuery } from '../actions/vaults/pancakeSwapHayBusd/getPancakeSwapHayBusdStable';
import { BoostedVault } from '../actions/vaults/types';

export function useBoostedVaults(): BoostedVault[] {
  const { data: pancakeSwapHayBusd } = useGetPancakeSwapHayBusdQuery();
  const [fetchHayBusdStable, { data: pancakeSwapHayBusdStable }] =
    useLazyGetPancakeSwapHayBusdStableQuery();

  useEffect(() => {
    if (isProdEnv()) {
      void fetchHayBusdStable();
    }
  }, [fetchHayBusdStable]);

  return useMemo<BoostedVault[]>(() => {
    return [pancakeSwapHayBusd, pancakeSwapHayBusdStable].filter(
      Boolean,
    ) as BoostedVault[];
  }, [pancakeSwapHayBusd, pancakeSwapHayBusdStable]);
}
