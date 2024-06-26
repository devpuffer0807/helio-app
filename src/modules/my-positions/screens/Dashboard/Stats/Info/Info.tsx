import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Tooltip, truncateNumber, ZERO } from 'modules/common';
import { CollateralToken, getCollateralToken } from 'modules/core';
import { useTranslation } from 'modules/i18n';
import { useGetAccountDataQuery } from 'modules/store/actions/getAccountData';

import { translation } from './translation';

const token = getCollateralToken(CollateralToken.Main);

export function Info(): JSX.Element {
  const { data: accountData } = useGetAccountDataQuery({
    token: CollateralToken.Main,
  });
  const { t, keys } = useTranslation(translation);

  const {
    collateralPrice = ZERO,
    collateral = ZERO,
    borrowed = ZERO,
  } = accountData ?? {};

  const collateralAsUSD = collateral.multipliedBy(collateralPrice);
  const netAssetValue = collateral
    .multipliedBy(collateralPrice)
    .minus(borrowed);

  return (
    <Paper
      sx={theme => ({
        padding: '45px 28px',
        [theme.breakpoints.down('md')]: {
          padding: '28px 16px',
        },
      })}
    >
      <Box
        sx={theme => ({
          display: 'flex',

          [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between',
          },
          [theme.breakpoints.down('md')]: {
            gap: '50px',
            flexFlow: 'column nowrap',
          },
        })}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{ fontSize: '15px', fontWeight: 500, marginRight: '5px' }}
          >
            {t(keys.totalCollateral)}
          </Typography>
        </Box>

        <Box
          sx={theme => ({
            [theme.breakpoints.up('md')]: {
              textAlign: 'right',
            },
          })}
        >
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            {t('units.USD-value', {
              value: truncateNumber(collateralAsUSD),
            })}
          </Typography>
          <Typography variant="body3">
            {`${truncateNumber(collateral)} ${token.unit}`}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={theme => ({
          borderBottom: '1px solid rgba(0,0,0,.1)',
          borderTop: '1px solid rgba(0,0,0,.1)',
          padding: '20px 0 15px',
          margin: '15px 0 20px',
          display: 'flex',

          [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between',
            padding: '45px 0 15px',
            margin: '15px 0 45px',
          },

          [theme.breakpoints.down('md')]: {
            gap: '50px',
            flexFlow: 'column nowrap',
          },
        })}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{ fontSize: '15px', fontWeight: 500, marginRight: '5px' }}
          >
            {t(keys.totalBorrowed)}
          </Typography>
        </Box>

        <Box
          sx={theme => ({
            [theme.breakpoints.up('md')]: {
              textAlign: 'right',
            },
          })}
        >
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            {t('units.USD-value', {
              value: truncateNumber(borrowed ?? ZERO),
            })}
          </Typography>
          <Typography variant="body3">
            {t('units.LOAN_TOKEN-value', {
              value: truncateNumber(borrowed ?? ZERO),
            })}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={theme => ({
          display: 'flex',
          [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between',
          },
          [theme.breakpoints.down('md')]: {
            gap: '50px',
            flexFlow: 'column nowrap',
          },
        })}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="body1"
            sx={{ fontSize: '15px', fontWeight: 500, marginRight: '5px' }}
          >
            {t(keys.netAssetValue)}
          </Typography>
          <Tooltip title={t(keys.netAssetValueTooltip)} />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 500 }}>
          {t('units.USD-value', { value: truncateNumber(netAssetValue) })}
        </Typography>
      </Box>
    </Paper>
  );
}
