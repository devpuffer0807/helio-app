import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { useTranslation } from 'modules/i18n';

import { ReactComponent as LoadingIcon } from './assets/loading-icon.svg';
import { translation } from './translation';

interface Props {
  className?: string;
}

export function Loader({ className }: Props): JSX.Element {
  const { classes, cx } = useStyles();
  const { t, keys } = useTranslation(translation);

  return (
    <div className={cx(classes.root, className)}>
      <LoadingIcon className={classes.icon} />
      <Typography variant="h5" fontWeight={600} className={classes.text}>
        {t(keys.loading)}
      </Typography>
    </div>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    color: theme.colors.black,
    border: `1px solid ${theme.colors.black}`,
    opacity: 0.1,
    padding: '14px',
    borderRadius: '12px',
  },
  text: {
    '&&': {
      color: theme.colors.black,
    },
  },
  icon: {
    animation: 'rotation 1s linear infinite',
    transformOrigin: 'center',

    '@keyframes rotation': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '50%': {
        transform: 'rotate(180deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
  },
}));
