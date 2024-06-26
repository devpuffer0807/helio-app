import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { t } from 'modules/i18n';
import { useGetLiquidationCollateralPricesQuery } from 'modules/liquidation/actions';
import { FONTS } from 'modules/theme';

import CloseToLiquidation from './tables/CloseToLiquidation';
import History from './tables/History';
import ToBeLiquidated from './tables/ToBeLiquidated';

enum TableTab {
  ToBeLiquidated,
  CloseToLiquidation,
  History,
}

export function Table(): JSX.Element {
  const { classes } = useStyles();
  const { data: pricesData } = useGetLiquidationCollateralPricesQuery();
  const [tab, setTab] = useState<TableTab>(TableTab.ToBeLiquidated);
  const prices = pricesData ?? {};

  const tabsConfig = [
    {
      key: TableTab.ToBeLiquidated,
      label: t('liquidation.to-be-liquidated'),
    },
    {
      key: TableTab.CloseToLiquidation,
      label: t('liquidation.close-to-liquidation'),
    },
    {
      key: TableTab.History,
      label: t('liquidation.history'),
    },
  ];

  return (
    <div>
      <TableContainer className={classes.container}>
        <div className={classes.nav}>
          <Box display="flex">
            {tabsConfig.map(({ key, label }) => (
              <Typography
                key={key}
                variant="h2"
                onClick={() => setTab(key)}
                sx={{
                  fontSize: '24px',
                  mr: 3,
                  cursor: 'pointer',
                  opacity: tab === key ? 1 : 0.5,
                  whiteSpace: 'nowrap',
                }}
                className={classes.tab}
              >
                {label}
              </Typography>
            ))}
          </Box>
        </div>

        <div className={classes.content}>
          {tab === TableTab.ToBeLiquidated && (
            <ToBeLiquidated prices={prices} />
          )}
          {tab === TableTab.CloseToLiquidation && (
            <CloseToLiquidation prices={prices} />
          )}
          {tab === TableTab.History && <History />}
        </div>
      </TableContainer>
    </div>
  );
}

const useStyles = makeStyles()(theme => ({
  container: {
    [theme.breakpoints.down('md')]: {
      width: '100vw',
    },
  },
  nav: {
    overflowX: 'auto',
    display: 'flex',
    margin: '8px 0 16px',
    paddingBottom: '8px',
    [theme.breakpoints.down('md')]: {
      '&::-webkit-scrollbar': {
        width: '0',
      },
    },
  },
  content: {
    overflowX: 'auto',
  },
  tab: {
    '&&': {
      fontFamily: FONTS.accentTwo,
    },
  },
}));
