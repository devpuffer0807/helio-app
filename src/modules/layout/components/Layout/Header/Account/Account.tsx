import React, { MouseEvent, RefObject, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Popover from '@mui/material/Popover';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { cropString, useAppSelector, ZERO } from 'modules/common';
import { CollateralToken } from 'modules/core';
import exchangeCoinIcon from 'modules/core/assets/main-collateral-token.svg';
import { t } from 'modules/i18n';
import { getWalletIcon } from 'modules/provider';
import { getAccount } from 'modules/store/actions/getAccount';
import { getLoanTokenBalance } from 'modules/store/actions/getLoanTokenBalance';
import { getMainTokenBalance } from 'modules/store/actions/getMainTokenBalance';
import { getNativeBalance } from 'modules/store/actions/getNativeBalance';
import { getSpaceIdAccount } from 'modules/store/actions/getSpaceIdAccount';
import { DARK_COLORS, LIGHT_COLORS, rgba } from 'modules/theme';

import { Dropdown } from './Dropdown';

interface Props {
  className?: string;
  dropdownAnchor: RefObject<HTMLDivElement | null>;
}

export function Account({
  className,
  dropdownAnchor,
}: Props): JSX.Element | null {
  const theme = useTheme();
  const [showDrawer, setShowDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const { classes, cx } = useStyles();

  const { data: currentAccount = '' } = getAccount.useQueryState();
  const { data: spaceIdAccount = '' } = getSpaceIdAccount.useQueryState();

  const { data: balance } = getNativeBalance.useQueryState({
    token: CollateralToken.Main,
  });
  const { data: loanTokenBalance } = getLoanTokenBalance.useQueryState();
  const { data: mainTokenBalance } = getMainTokenBalance.useQueryState();

  const mainTokenBalanceAmount = mainTokenBalance ?? ZERO;

  const handleClickAccount = (event: MouseEvent<HTMLDivElement>) => {
    if (!event.target) {
      return;
    }

    setAnchorEl(dropdownAnchor.current);
  };

  const userAddress = spaceIdAccount || cropString(currentAccount);

  const walletId = useAppSelector(store => store.auth.walletId);
  const walletIcon = getWalletIcon(walletId);

  return (
    <div className={cx(classes.container, className)}>
      <div className={classes.content}>
        {balance && (
          <div className={classes.wrapper}>
            <img
              src={exchangeCoinIcon}
              alt={t('units.COLLATERAL_MAIN_TOKEN')}
            />

            <Typography variant="subtitle1" ml={1}>
              {balance.decimalPlaces(3).toString()}
            </Typography>
          </div>
        )}

        <Box className={classes.accountData} onClick={handleClickAccount}>
          <Box component="img" src={walletIcon} height={24} width={24} />

          <Typography
            ml={1}
            variant="subtitle1"
            fontSize={14}
            sx={theme.palette.mode === 'light' ? { opacity: 0.5 } : undefined}
            className={classes.typography}
          >
            {userAddress}
          </Typography>
        </Box>
      </div>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={theme => ({
          borderRadius: 24,
          overflow: 'visible',
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        })}
      >
        <Dropdown
          address={currentAccount}
          loanTokenBalance={loanTokenBalance ?? ZERO}
          mainTokenBalance={mainTokenBalanceAmount}
          onClose={() => setAnchorEl(null)}
          userAddress={userAddress}
        />
      </Popover>

      <button
        onClick={() => setShowDrawer(true)}
        type="button"
        className={classes.accountButton}
      >
        <Box component="img" src={walletIcon} height={24} />
      </button>

      <Drawer
        anchor="bottom"
        open={showDrawer}
        onClose={() => setShowDrawer(value => !value)}
      >
        <Dropdown
          address={currentAccount}
          loanTokenBalance={loanTokenBalance ?? ZERO}
          mainTokenBalance={mainTokenBalanceAmount}
          onClose={() => setShowDrawer(false)}
          userAddress={userAddress}
        />
      </Drawer>
    </div>
  );
}

const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px 0 16px',
    color: theme.colors.black,

    '& > img': {
      width: 24,
    },

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  accountData: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    borderRadius: 14,
    padding: '0 16px',
    cursor: 'pointer',
    transition: 'background-color .05s ease',
    backgroundColor:
      theme.palette.mode === 'light'
        ? LIGHT_COLORS.white
        : DARK_COLORS.grayTint,

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },

  content: {
    height: 36,
    display: 'flex',
    borderRadius: 14,
    boxShadow:
      theme.palette.mode === 'light'
        ? `0px 10px 13px ${rgba(theme.colors.black, 0.1) ?? ''}`
        : 'none',
    backgroundColor:
      theme.palette.mode === 'light' ? 'transparent' : theme.colors.secondary,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  accountButton: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    position: 'relative',
    height: 36,
    justifyContent: 'center',
    padding: 0,
    width: 36,
    color: theme.colors.black,
    backgroundColor: theme.colors.white,
    border: 'none',
    borderRadius: '50%',

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  typography: {
    fontFeatureSettings: "'calt' off",
  },

  container: {
    display: 'flex',
    alignItems: 'center',
  },
}));
