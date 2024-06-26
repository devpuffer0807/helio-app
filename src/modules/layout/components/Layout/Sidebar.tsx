import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import darkLogoIcon from 'modules/core/assets/logo-dark.svg';
import lightLogoIcon from 'modules/core/assets/logo-light.svg';
import { t } from 'modules/i18n';
import { rgba } from 'modules/theme';

import { BinanceLabs } from './BinanceLabs';
import { Copyright } from './Copyright';
import { MenuLinks } from './MenuLinks';
import { SocialLinks } from './SocialLinks';

interface Props {
  className?: string;
}

export function Sidebar({ className }: Props): JSX.Element {
  const theme = useTheme();
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <img
        src={theme.palette.mode === 'light' ? lightLogoIcon : darkLogoIcon}
        alt={t('project-name')}
      />

      <MenuLinks className={classes.menuLinks} />

      <Box display="flex" flexDirection="column">
        <SocialLinks />
        <Copyright />
        <BinanceLabs />
      </Box>
    </div>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '36px 36px 28px',
    backgroundColor: theme.colors.secondary,
    overflowY: 'auto',
    boxShadow:
      theme.palette.mode === 'light'
        ? `0px 4px 92px ${rgba(theme.colors.black, 0.08) || ''}`
        : undefined,

    '& > img': {
      maxWidth: '132px',
    },
  },

  menuLinks: {
    margin: '48px 0',
    flex: 1,
  },
}));
