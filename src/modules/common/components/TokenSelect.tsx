import React from 'react';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import { selectClasses } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { CollateralToken, useCollateralToken } from 'modules/core';
import { t } from 'modules/i18n';

import { Select } from './Select';

interface Props {
  enableSecond?: boolean;
}

export function TokenSelect({ enableSecond = true }: Props): JSX.Element {
  const { classes } = useStyles();
  const [{ token, icon, unit }, setToken] = useCollateralToken();

  return (
    <Select
      className={classes.select}
      value={token}
      renderValue={() => (
        <Box display="flex" alignItems="center">
          <img src={icon} alt={token} />

          <Typography variant="body1" fontWeight={600}>
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
      {enableSecond && (
        <MenuItem value={CollateralToken.Second} divider>
          {t('units.COLLATERAL_SECOND_TOKEN')}
        </MenuItem>
      )}
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
  );
}

const useStyles = makeStyles()({
  select: {
    '&&': {
      [`&& .${selectClasses.select}`]: {
        padding: '0 20px 0 0',
        border: 'none',
      },

      [`& .${selectClasses.icon}`]: {
        right: 4,
      },
    },
  },
});
