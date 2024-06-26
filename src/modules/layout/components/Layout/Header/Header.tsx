import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { isProdEnv, MOBILE_HEADER_HEIGHT } from 'modules/common';
import darkLogoIcon from 'modules/core/assets/logo-dark.svg';
import lightLogoIcon from 'modules/core/assets/logo-light.svg';
import { t } from 'modules/i18n';
import { DashboardRoutesConfig } from 'modules/my-positions';
import { getAccount } from 'modules/store/actions/getAccount';

import { BinanceLabs } from '../BinanceLabs';
import { Copyright } from '../Copyright';
import { MenuLinks } from '../MenuLinks';
import { SocialLinks } from '../SocialLinks';
import { Account } from './Account';
import { MenuButton } from './MenuButton';
import { ThemeSwitch } from './ThemeSwitch';

interface Props {
  className?: string;
}

export function Header({ className }: Props): JSX.Element {
  const theme = useTheme();

  const { classes, cx } = useStyles();

  const location = useLocation();
  const mdWidth = theme.breakpoints.values.md;
  const [showMenu, setShowMenu] = useState(false);
  const themeSwitchRef = useRef(null);
  const { data: currentAccount } = getAccount.useQueryState();

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!showMenu) {
      return;
    }

    function handler() {
      setShowMenu(false);
    }

    const listener = window.matchMedia(`(max-width: ${mdWidth}px)`);
    listener.addEventListener('change', handler);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('overflow');
      listener.removeEventListener('change', handler);
    };
  }, [showMenu, mdWidth]);

  return (
    <header className={cx(classes.root, className)}>
      <Link
        to={DashboardRoutesConfig.dashboard.generatePath()}
        className={classes.link}
      >
        <img
          src={theme.palette.mode === 'light' ? lightLogoIcon : darkLogoIcon}
          alt={t('project-name')}
        />
      </Link>

      <Box
        sx={{
          [theme.breakpoints.up('lg')]: {
            display: 'none',
          },

          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        }}
      >
        <MenuLinks />
      </Box>

      {!isProdEnv() && (
        <div className={classes.networkIndicator}>
          {t('header.network-indicator')}
        </div>
      )}

      <Box display="flex" alignItems="center">
        {!showMenu && currentAccount && (
          <Account dropdownAnchor={themeSwitchRef} />
        )}

        <MenuButton
          active={showMenu}
          onClick={() => setShowMenu(value => !value)}
          className={classes.menuButton}
        />

        <ThemeSwitch className={classes.themeSwitch} ref={themeSwitchRef} />
      </Box>

      {showMenu && (
        <div className={classes.menu}>
          <MenuLinks />

          <div>
            <SocialLinks />
            <Copyright />
            <BinanceLabs />
          </div>
        </div>
      )}
    </header>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    position: 'relative',

    [theme.breakpoints.down('lg')]: {
      justifyContent: 'space-between',
    },

    [theme.breakpoints.down('md')]: {
      borderRadius: 0,
    },
  },

  menu: {
    backgroundColor: theme.colors.silver,
    height: `calc(100vh - ${MOBILE_HEADER_HEIGHT}px)`,
    left: 0,
    position: 'fixed',
    top: MOBILE_HEADER_HEIGHT,
    width: '100vw',
    padding: '50px 32px 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  themeSwitch: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  link: {
    display: 'flex',
    position: 'relative',

    '& > img': {
      width: '100%',
    },

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },

    [theme.breakpoints.down('md')]: {
      maxWidth: 112,
    },
  },

  menuButton: {
    marginLeft: 20,

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  networkIndicator: {
    position: 'relative',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    fontSize: 14,
    lineHeight: '17px',
    color: theme.colors.light,
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: -12,
      top: 6,
      height: 6,
      width: 6,
      borderRadius: '50%',
      backgroundColor: theme.colors.green,
    },
  },
}));
