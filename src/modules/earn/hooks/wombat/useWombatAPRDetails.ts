import { useMemo } from 'react';
import BigNumber from 'bignumber.js';

import { HUNDRED, truncateNumber } from 'modules/common';
import { useTranslation } from 'modules/i18n';

import { useGetWombatAPRQuery } from '../../actions/farming/wombat/getWombatAPR';
import { translation } from '../translation';

export function useWombatAPRDetails(): Record<string, string> | undefined {
  const { t, keys } = useTranslation(translation);
  const { data: APR } = useGetWombatAPRQuery();

  const womBaseAPR = new BigNumber(APR?.womBaseAPR ?? 0).multipliedBy(HUNDRED);
  const medianBoostedAPR = new BigNumber(
    APR?.medianBoostedAPR ?? 0,
  ).multipliedBy(HUNDRED);
  const totalBonusTokenAPR = new BigNumber(
    APR?.totalBonusTokenAPR ?? 0,
  ).multipliedBy(HUNDRED);

  return useMemo(() => {
    if (!APR) return undefined;
    return {
      [t(keys.womBaseAPR)]: t('units.percent-no-space', {
        value: truncateNumber(womBaseAPR, 2),
      }),
      [t(keys.totalBonusTokenAPR, { token: t('units.LOAN_TOKEN') })]: t(
        'units.percent-no-space',
        { value: truncateNumber(totalBonusTokenAPR, 2) },
      ),
      [t(keys.medianBoostedAPR)]: t('units.percent-no-space', {
        value: truncateNumber(medianBoostedAPR, 2),
      }),
    };
  }, [
    APR,
    keys.womBaseAPR,
    keys.medianBoostedAPR,
    keys.totalBonusTokenAPR,
    womBaseAPR,
    medianBoostedAPR,
    totalBonusTokenAPR,
    t,
  ]);
}
