import { makeStyles } from 'tss-react/mui';

import { rgba } from 'modules/theme';

import { ReactComponent as CloseIcon } from './assets/close.svg';
import { ReactComponent as CloseIconMobile } from './assets/close_mobile.svg';

interface Props {
  className?: string;
  onClose(): void;
}

export function Close({ className, onClose }: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <button
      type="button"
      onClick={onClose}
      className={cx(classes.container, className)}
    >
      <CloseIcon />
      <CloseIconMobile />
    </button>
  );
}

const useStyles = makeStyles()(theme => ({
  container: {
    padding: 0,
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: '0.3s',
    color: rgba(theme.colors.black, 0.5),

    '&:hover': {
      color: theme.colors.black,
    },

    '& > svg': {
      [theme.breakpoints.up('md')]: {
        '&:last-child': {
          display: 'none',
        },
      },

      [theme.breakpoints.down('md')]: {
        '&:first-of-type': {
          display: 'none',
        },
      },
    },
  },
}));
