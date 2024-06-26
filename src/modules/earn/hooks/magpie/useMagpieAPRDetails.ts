import { useMemo } from 'react';

import { truncateNumber } from 'modules/common';
import { useTranslation } from 'modules/i18n';

import { useGetMagpieAPRQuery } from '../../actions/farming/magpie/getMagpieAPR';
import { translation } from '../translation';

export function useMagpieAPRDetails(): Record<string, string> | undefined {
  const { t, keys } = useTranslation(translation);
  const { data: APR } = useGetMagpieAPRQuery();

  return useMemo(() => {
    if (!APR) return undefined;

    return {
      [t(keys.WOM)]: t('units.percent-no-space', {
        value: truncateNumber(APR?.womAPR, 2),
      }),
      [t(keys.HAY)]: t('units.percent-no-space', {
        value: truncateNumber(APR.hayAPR, 2),
      }),
      [t(keys.vlMGP)]: t('units.percent-no-space', {
        value: truncateNumber(APR.vlMGPApr, 2),
      }),
    };
  }, [APR, keys.WOM, keys.HAY, keys.vlMGP, t]);
}
