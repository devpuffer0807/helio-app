import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';

import { LineChart, Tooltip, truncateNumber, ZERO } from 'modules/common';
import { t } from 'modules/i18n';

import { useAnalyticsGetTotalBorrowersQuery } from '../../actions';

interface Props {
  date: number;
}

export function TotalBorrowers({ date }: Props): JSX.Element {
  const theme = useTheme();

  const chartOptions = {
    xAxis: {
      key: 'ts',
      hide: true,
    },
    lines: [
      {
        key: 'amount',
        strokeColor: theme.colors.blue,
        unit: '',
      },
    ],
  };

  const { data: totalBorrowers } = useAnalyticsGetTotalBorrowersQuery(date);

  const lastValue = new BigNumber(totalBorrowers?.at(-1)?.amount ?? ZERO);
  const chartData =
    totalBorrowers?.map(({ amount, ts, ...rest }) => {
      const date = ts.replace(' +0000 UTC', '');
      return {
        ...rest,
        ts: new Date(date).getTime(),
        amount: Number(amount),
      };
    }) ?? [];

  return (
    <Paper
      sx={{
        width: '100%',
        padding: '32px',

        [theme.breakpoints.down('md')]: {
          padding: '20px 16px',
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography variant="body1" mr="5px" fontWeight={500}>
              {t('analytics.total-borrowers')}
            </Typography>
            <Tooltip title={t('analytics.total-borrowers-tooltip')} />
          </Box>
          <Box display="flex" alignItems="baseline" mt={1}>
            <Typography variant="h1" fontSize={28}>
              {truncateNumber(lastValue, 0)}
            </Typography>
          </Box>
        </Box>
        <Box height={250}>
          <LineChart data={chartData} options={chartOptions} />
        </Box>
      </Box>
    </Paper>
  );
}
