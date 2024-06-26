import { useMemo } from 'react';

import { truncateNumber } from 'modules/common';
import { useTranslation } from 'modules/i18n';

import { useAnalyticsGetAPRQuery } from '../../actions/vaults/pancakeSwapHayBusd/getAPR';
import { translation } from '../translation';

export function usePancakeStableAPRDetails():
  | Record<string, string>
  | undefined {
  const { t, keys } = useTranslation(translation);
  const { data: APR } = useAnalyticsGetAPRQuery();

  return useMemo(() => {
    if (!APR) return undefined;

    return {
      [t(keys.tradingFeesAPR)]: t('units.percent-no-space', {
        value: truncateNumber(APR?.pancakeStable.lpApr, 2),
      }),
      [t(keys.LPQuantity)]: t('units.percent-no-space', {
        value: truncateNumber(APR.pancakeStable.cakeApr, 2),
      }),
      [t(keys.tokenAPR, { token: t('units.LOAN_TOKEN') })]: t(
        'units.percent-no-space',
        { value: truncateNumber(APR.pancakeStable.ourApr, 2) },
      ),
    };
  }, [APR, keys.LPQuantity, keys.tokenAPR, keys.tradingFeesAPR, t]);
}
