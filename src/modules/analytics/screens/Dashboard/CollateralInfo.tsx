import { ChangeEvent, useState } from 'react';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import { DateRange } from 'modules/analytics/consts';
import {
  GetTotalBorrowed,
  GetTotalValueLocked,
} from 'modules/api/AnalyticsApi';
import {
  LineChart,
  Select,
  Tooltip,
  truncateNumber,
  ZERO,
} from 'modules/common';
import { getCollateralToken } from 'modules/core';
import { t } from 'modules/i18n';
import { rgba } from 'modules/theme';

import {
  useAnalyticsGetTotalBorrowedQuery,
  useAnalyticsGetTotalValueLockedQuery,
} from '../../actions';

interface Props {
  date: number;
  onTabClick: (tab: DateRange) => void;
}

const combineData = (
  tvlArr: GetTotalValueLocked[],
  tbArr: GetTotalBorrowed[],
) => {
  return tvlArr.map((row, i) => {
    const date = row.ts.replace(' +0000 UTC', '');
    return {
      ts: new Date(date).getTime(),
      tvl: new BigNumber(row.amount)
        .multipliedBy(row.collateral_price)
        .toNumber(),
      tb: tbArr[i]
        ? new BigNumber(tbArr[i].amount).toNumber()
        : new BigNumber(tbArr?.at(-1)?.amount ?? ZERO).toNumber(),
    };
  });
};

const token = getCollateralToken();

export function CollateralInfo({ date, onTabClick }: Props): JSX.Element {
  const [dateRange, setDateRange] = useState(DateRange.Month);
  const theme = useTheme();
  const { classes } = useStyles();

  const handleSelectDateRange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as unknown as DateRange;
    setDateRange(value);
    onTabClick(value);
  };

  const chartOptions = {
    xAxis: {
      key: 'ts',
      hide: false,
    },
    lines: [
      {
        key: 'tvl',
        strokeColor: theme.colors.orange,
        unit: t('units.USD'),
      },
      {
        key: 'tb',
        strokeColor: theme.colors.blue,
        unit: t('units.LOAN_TOKEN'),
      },
    ],
  };

  const { data: totalValueLocked } = useAnalyticsGetTotalValueLockedQuery(date);
  const { data: totalBorrowed } = useAnalyticsGetTotalBorrowedQuery(date);

  const lastValueOfTVL = new BigNumber(
    totalValueLocked?.at(-1)?.amount ?? ZERO,
  );
  const lastUSDValueOfTVL = new BigNumber(
    totalValueLocked?.at(-1)?.collateral_price ?? ZERO,
  ).multipliedBy(lastValueOfTVL);

  const lastBorrowedValue = new BigNumber(
    totalBorrowed?.at(-1)?.amount ?? ZERO,
  );
  const lastUSDBorrowedValue = new BigNumber(1).multipliedBy(lastBorrowedValue);

  const overcollateralization = lastUSDBorrowedValue.isZero()
    ? ''
    : truncateNumber(lastUSDValueOfTVL.div(lastUSDBorrowedValue), 2);

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
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={theme => ({
            mb: '73px',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              gap: '50px',
            },
          })}
        >
          <Box
            sx={theme => ({
              display: 'flex',
              flexDirection: 'row',
              [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                gap: '50px',
              },
            })}
          >
            <Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Box
                  sx={{
                    width: '12px',
                    height: '12px',
                    background: theme.colors.orange,
                    borderRadius: '12px',
                    marginRight: '8px',
                  }}
                />
                <Typography variant="body1" mr="5px" fontWeight={500}>
                  {t('analytics.total-collateral')}
                </Typography>
                <Tooltip title={t('analytics.total-collateral-tooltip')} />
              </Box>
              <Box display="flex" alignItems="baseline" mt={1}>
                <Typography variant="h1" mr={1} fontSize={28}>
                  {truncateNumber(lastUSDValueOfTVL ?? ZERO, 0)}
                </Typography>

                <Typography variant="h4" fontWeight={500}>
                  {t('units.USD')}
                </Typography>
              </Box>
              <Box display="flex" mt={0.5}>
                <Typography variant="subtitle1" sx={{ opacity: 0.5 }}>
                  {`${truncateNumber(lastValueOfTVL ?? ZERO, 2)} ${token.unit}`}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.section}>
              <Box display="flex" flexDirection="row" alignItems="baseline">
                <Box
                  sx={{
                    width: '12px',
                    height: '12px',
                    background: theme.colors.blue,
                    borderRadius: '12px',
                    marginRight: '8px',
                  }}
                />
                <Typography variant="body1" mr="5px" fontWeight={500}>
                  {t('analytics.total-borrow')}
                </Typography>
                <Tooltip title={t('analytics.total-borrow-tooltip')} />
              </Box>
              <Box display="flex" alignItems="baseline" mt={1}>
                <Typography variant="h1" mr={1} fontSize={28}>
                  {truncateNumber(lastBorrowedValue, 0)}
                </Typography>

                <Typography variant="h4" fontWeight={500}>
                  {t('units.LOAN_TOKEN')}
                </Typography>
              </Box>
              <Box display="flex" mt={0.5}>
                <Typography variant="subtitle1" sx={{ opacity: 0.5 }}>
                  {t('units.USD-value', {
                    value: truncateNumber(lastUSDBorrowedValue, 0),
                  })}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.section}>
              <Box display="flex" alignItems="center">
                <Typography variant="body1" mr="5px">
                  {t('analytics.current-overcollateralization')}
                </Typography>
                <Tooltip
                  title={t('analytics.current-overcollateralization-tooltip', {
                    unit: t('units.LOAN_TOKEN'),
                  })}
                />
              </Box>
              <Typography variant="h1" mr={1} mt={1} fontSize={28}>
                {overcollateralization}
              </Typography>
            </Box>
          </Box>
          <Select value={dateRange} onChange={handleSelectDateRange}>
            <MenuItem value={DateRange.Day}>{t('analytics.day-view')}</MenuItem>
            <MenuItem value={DateRange.Week}>
              {t('analytics.week-view')}
            </MenuItem>
            <MenuItem value={DateRange.Month}>
              {t('analytics.month-view')}
            </MenuItem>
          </Select>
        </Box>
        <Box
          sx={theme => ({
            height: '300px',
            [theme.breakpoints.down('md')]: {
              height: '155px',
            },
          })}
        >
          <LineChart
            data={combineData(totalValueLocked ?? [], totalBorrowed ?? [])}
            options={chartOptions}
          />
        </Box>
      </Box>
    </Paper>
  );
}

const useStyles = makeStyles()(theme => ({
  section: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '30px',
      paddingLeft: '30px',
      borderLeft: `1px solid ${rgba(theme.colors.black, 0.1) as string}`,
    },
  },
}));
