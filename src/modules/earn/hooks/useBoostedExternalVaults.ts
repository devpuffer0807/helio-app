import { useMemo } from 'react';

import { useGetPlanetFinanceHayBusdQuery } from '../actions/vaults/planetFinanceHayBusd/getPlanetFinanceHayBusd';
import { BoostedExternalVault } from '../actions/vaults/types';
import { BOOSTED_EXTERNAL_VAULTS } from '../consts';

export function useBoostedExternalVaults(): BoostedExternalVault[] {
  const { data: planetFinanceHayBusd } = useGetPlanetFinanceHayBusdQuery();

  return useMemo<BoostedExternalVault[]>(() => {
    return [...(planetFinanceHayBusd || []), ...BOOSTED_EXTERNAL_VAULTS].filter(
      Boolean,
    ) as BoostedExternalVault[];
  }, [planetFinanceHayBusd]);
}
