import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';

import {
  SAFE_BORROW_LIMIT_PERCENTS,
  useGetBorrowUtilization,
  Warning,
  ZERO,
} from 'modules/common';
import { useCollateralToken } from 'modules/core';
import { useTranslation } from 'modules/i18n';

import { useGetRewardsQuery } from '../../../actions';
import { CollateralTable } from '../CollateralTable';
import { Stats } from '../Stats';
import { translation } from './translation';

interface Props {
  executed: boolean;
  onSubmit(claimValue: BigNumber): void;
}

export function MyPositions({ onSubmit, executed }: Props): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const { data: reward = ZERO } = useGetRewardsQuery();
  const [{ token }] = useCollateralToken();
  const borrowingUtilization = useGetBorrowUtilization(token);

  return (
    <Box>
      <Box
        sx={theme => ({
          marginTop: '34px',
          [theme.breakpoints.up('md')]: {
            display: 'none',
            marginBottom: '24px',
            marginTop: '62px',
          },
        })}
      >
        <Typography variant="h2" mb={3.5}>
          {t(keys.myPositions)}
        </Typography>
      </Box>

      <Stats reward={reward} executed={executed} onSubmit={onSubmit} />
      <Typography
        variant="h2"
        sx={{
          marginTop: '46px',
          marginBottom: '20px',
          fontSize: 24,
        }}
      >
        {t(keys.borrow)}
      </Typography>
      <CollateralTable />
      {borrowingUtilization.isGreaterThan(SAFE_BORROW_LIMIT_PERCENTS) && (
        <Warning textAlign="center" prefix={t('warning.caution')}>
          {t('warning.borrowing-threshold')}
        </Warning>
      )}
    </Box>
  );
}
