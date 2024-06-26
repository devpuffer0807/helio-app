import { NavLink, NavLinkProps } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { AnalyticsRoutesConfig } from 'modules/analytics';
import { BorrowRoutesConfig } from 'modules/borrow';
import { IS_ANALYTICS_ENABLED } from 'modules/common';
import { EarnRoutesConfig } from 'modules/earn/EarnRoutesConfig';
import { t } from 'modules/i18n';
import { LiquidationRoutesConfig } from 'modules/liquidation';
import { DashboardRoutesConfig } from 'modules/my-positions';
import { SubscriptionRoutesConfig } from 'modules/subscription';
import { rgba } from 'modules/theme';

interface Props {
  className?: string;
}

interface LinkProps extends NavLinkProps {
  disabled?: boolean;
  children: string;
}

function Link({ children, to, disabled = false }: LinkProps) {
  const { classes } = useStyles({ disabled });

  return (
    <NavLink to={to} className={classes.root}>
      <Typography variant="body2" component="span">
        {children}
      </Typography>
    </NavLink>
  );
}

export function MenuLinks({ className }: Props): JSX.Element {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row', lg: 'column' },
      }}
    >
      <Link to={DashboardRoutesConfig.dashboard.generatePath()}>
        {t('menu.links.dashboard')}
      </Link>

      <Link to={BorrowRoutesConfig.dashboard.generatePath()}>
        {t('menu.links.borrow')}
      </Link>

      <Link to={EarnRoutesConfig.dashboard.generatePath()}>
        {t('menu.links.earn')}
      </Link>

      {IS_ANALYTICS_ENABLED && (
        <Link to={AnalyticsRoutesConfig.dashboard.generatePath()}>
          {t('menu.links.analytics')}
        </Link>
      )}

      <Link to={LiquidationRoutesConfig.dashboard.generatePath()}>
        {t('menu.links.liquidation')}
      </Link>

      <Link to={SubscriptionRoutesConfig.subscription.generatePath()}>
        {t('menu.links.subscription')}
      </Link>
    </Box>
  );
}

const useStyles = makeStyles<{ disabled?: boolean }>()(
  (theme, { disabled }) => ({
    root: {
      textDecoration: 'none',
      transition: '0.3s',
      pointerEvents: disabled ? 'none' : 'initial',
      opacity: 0.5,

      '&, &:active:visited': {
        color: rgba(theme.colors.black, 0.5),
      },

      '&.active, &:hover': {
        color: theme.colors.black,
        opacity: 1,
      },

      '&.active > *': {
        fontWeight: 500,
      },

      '&:not(:last-child)': {
        marginBottom: 28,
      },

      [theme.breakpoints.down('lg')]: {
        '&:not(:last-child)': {
          marginBottom: 0,
          marginRight: 28,
        },
      },

      [theme.breakpoints.down('md')]: {
        height: 54,
        lineHeight: '54px',
        fontSize: 16,
        fontWeight: 600,

        '&:not(:last-child)': {
          marginRight: 0,
          borderBottom: `1px solid ${rgba(theme.colors.black, 0.2) ?? ''}`,
        },
      },
    },
  }),
);
