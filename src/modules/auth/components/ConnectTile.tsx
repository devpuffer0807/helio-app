import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { useTranslation } from 'modules/i18n';
import { LIGHT_COLORS } from 'modules/theme';

import { translation } from '../translation';

interface IConnectTileProps {
  tooltip?: string;
  title: string;
  icon: string;
  installLink?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function ConnectTile({
  tooltip,
  title,
  icon,
  installLink,
  isDisabled = false,
  onClick,
}: IConnectTileProps): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const { classes, cx } = useStyles();

  const isLink = !!installLink && !isDisabled;

  const linkProps = {
    href: installLink,
    rel: 'noreferrer',
    target: '_blank',
    component: 'a',
  };

  const buttonProps = { onClick: isDisabled ? undefined : onClick };

  return (
    <Tooltip arrow title={isDisabled && tooltip ? t(tooltip) : ''}>
      <Button
        variant="outlined"
        size="large"
        type="button"
        className={cx(classes.button, isDisabled && classes.disabled)}
        {...(isLink ? linkProps : buttonProps)}
      >
        <img src={icon} alt="" />

        <Typography variant="h6" marginLeft="10px">
          {title}
        </Typography>
        {installLink && !isDisabled && (
          <Typography variant="h6" sx={{ ml: 'auto', textDecoration: 'none' }}>
            {t(keys.install)}
          </Typography>
        )}
      </Button>
    </Tooltip>
  );
}

const useStyles = makeStyles()(theme => ({
  button: {
    '&&': {
      justifyContent: 'flex-start',
      height: 70,
      width: '100%',
      minHeight: 70,
      borderRadius: 32,
      padding: '0 28px 0 22px',

      '& > img': {
        width: 42,
      },

      '&:not(:last-child)': {
        marginBottom: 16,
      },

      '&:hover': {
        color: LIGHT_COLORS.black,
        backgroundColor: theme.colors.primary,
        border: `1px solid ${theme.colors.primary}`,
      },
    },
  },
  disabled: {
    '&&': {
      cursor: 'default',
      background: theme.colors.disabled,
      borderColor: theme.colors.disabled,
      color: theme.colors.white,

      '&:hover': {
        background: theme.colors.disabled,
        borderColor: theme.colors.disabled,
        color: theme.colors.white,
      },
    },
  },
}));
