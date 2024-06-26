import React from 'react';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';

import { CollateralRoutesConfig } from 'modules/collateral';
import {
  Minus,
  Plus,
  Select,
  Tooltip,
  truncateNumber,
  useNavigateSearch,
  ZERO,
} from 'modules/common';
import {
  CollateralToken,
  DISABLE_MULTI_COLLATERAL,
  useCollateralToken,
} from 'modules/core';
import { t } from 'modules/i18n';
import { WithdrawCollateralRoutesConfig } from 'modules/withdraw';

interface Props {
  className?: string;
  collateral: BigNumber;
  equivalent: BigNumber;
}

export function CollateralPanel({
  className,
  collateral,
  equivalent,
}: Props): JSX.Element {
  const navigateSearch = useNavigateSearch();
  const [{ token, icon: collateralTokenIcon, unit }, setToken] =
    useCollateralToken();

  return (
    <Paper
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: { xs: '20px 16px 16px', md: '28px 28px 20px' },
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography
            variant="body1"
            component="span"
            mr={0.5}
            fontWeight={500}
          >
            {t('borrow.dashboard.my-collateral')}
          </Typography>
          <Tooltip title={t('borrow.dashboard.my-collateral-tooltip')} />
        </Box>

        {!DISABLE_MULTI_COLLATERAL && (
          <Select
            value={token}
            renderValue={() => (
              <Box display="flex" alignItems="center">
                <img src={collateralTokenIcon} alt={token} />

                <Typography variant="h6" component="div">
                  {unit}
                </Typography>
              </Box>
            )}
            onChange={event =>
              setToken(event.target.value as unknown as CollateralToken)
            }
          >
            <MenuItem value={CollateralToken.Main} divider>
              {t('units.COLLATERAL_MAIN_TOKEN')}
            </MenuItem>
            <MenuItem value={CollateralToken.Second} divider>
              {t('units.COLLATERAL_SECOND_TOKEN')}
            </MenuItem>
            <MenuItem value={CollateralToken.Eth} divider>
              {t('units.COLLATERAL_ETH_TOKEN')}
            </MenuItem>
            <MenuItem value={CollateralToken.SnBNB} divider>
              {t('units.COLLATERAL_SNBNB_TOKEN')}
            </MenuItem>
            <MenuItem value={CollateralToken.WBETH}>
              {t('units.COLLATERAL_WBETH_TOKEN')}
            </MenuItem>
          </Select>
        )}
      </Box>

      <Box display="flex" flexDirection="column">
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          sx={theme => ({
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          })}
        >
          <Box>
            <Box display="flex" alignItems="baseline" mb="6px">
              <Box
                component="img"
                src={collateralTokenIcon}
                mr={1}
                width={24}
              />
              <Typography variant="h1" component="span">
                {collateral.isGreaterThan(ZERO)
                  ? truncateNumber(collateral)
                  : ZERO.toFormat(2)}
              </Typography>
              <Typography
                variant="h4"
                component="span"
                sx={{ ml: 1 }}
                fontWeight={500}
              >
                {unit}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={theme => ({
                  fontSize: 13,
                  color: theme.colors.black,
                  opacity: 0.5,
                })}
              >
                {t('units.$-value', { value: truncateNumber(equivalent) })}
              </Typography>
            </Box>
          </Box>
          {collateral && (
            <Box
              display="flex"
              sx={theme => ({
                [theme.breakpoints.down('md')]: {
                  mt: 2,
                },
              })}
            >
              {token !== CollateralToken.Second && (
                <Plus
                  type="stretched"
                  onClick={() =>
                    navigateSearch(
                      CollateralRoutesConfig.provide.generatePath(),
                      {
                        token,
                      },
                    )
                  }
                />
              )}
              {collateral.isGreaterThan(ZERO) && (
                <Box sx={{ ml: 1 }}>
                  <Minus
                    type="stretched"
                    onClick={() =>
                      navigateSearch(
                        WithdrawCollateralRoutesConfig.provide.generatePath(),
                        {
                          token,
                        },
                      )
                    }
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
