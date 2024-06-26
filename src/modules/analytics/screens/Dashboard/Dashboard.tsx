import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import sub from 'date-fns/sub';

import { DateRange } from 'modules/analytics/consts';
import { t } from 'modules/i18n';
import { Layout } from 'modules/layout';

import { CollateralInfo } from './CollateralInfo';
import { StabilizationPool } from './StabilizationPool';
import { TotalBorrowers } from './TotalBorrowers';

const DATE_CONFIG = {
  [DateRange.Day]: 'days',
  [DateRange.Week]: 'weeks',
  [DateRange.Month]: 'months',
};

export function Dashboard(): JSX.Element {
  const [currentActiveTab, setCurrentActiveTab] = useState(DateRange.Month);
  const fromDate = Math.round(
    sub(new Date(), {
      [DATE_CONFIG[currentActiveTab]]: 1,
    }).getTime() / 1000,
  );

  return (
    <Layout>
      <Typography
        variant="h2"
        sx={theme => ({
          display: 'none',
          [theme.breakpoints.down('md')]: {
            mt: 5,
            mb: 3.5,
            display: 'block',
          },
        })}
      >
        {t('analytics.title')}
      </Typography>
      <CollateralInfo date={fromDate} onTabClick={setCurrentActiveTab} />
      <Box
        sx={theme => ({
          display: 'flex',
          flexDirection: 'row',
          height: 300,
          gap: '20px',
          mt: '20px',
          mb: '70px',

          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
          },
        })}
      >
        <TotalBorrowers date={fromDate} />
        <StabilizationPool date={fromDate} />
      </Box>
    </Layout>
  );
}
