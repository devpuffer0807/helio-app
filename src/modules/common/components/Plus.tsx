import { makeStyles } from 'tss-react/mui';

import { rgba } from 'modules/theme';

import { ReactComponent as PlusIcon } from '../assets/plus.svg';

type Size = 'medium' | 'large';
type Type = 'default' | 'stretched';

interface Props {
  className?: string;
  size?: Size;
  type?: Type;
  onClick?: () => void;
}

export function Plus({
  className,
  onClick,
  size = 'medium',
  type = 'default',
}: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <button
      className={cx(classes.container, classes[size], classes[type], className)}
      onClick={onClick}
      type="button"
    >
      <PlusIcon />
    </button>
  );
}

const useStyles = makeStyles()(theme => ({
  container: {
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.3s',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.colors.primary,
    },
  },
  default: {
    backgroundColor:
      theme.palette.mode === 'light' ? theme.colors.white : 'transparent',
    border:
      theme.palette.mode === 'dark'
        ? `1px solid ${rgba(theme.colors.black, 0.3) as string}`
        : 'none',
    color: '#b2b2b2',
    borderRadius: '50%',

    '&:hover': {
      backgroundColor: theme.colors.black,
      color: theme.colors.white,
    },
  },
  stretched: {
    height: 44,
    width: 55,
    backgroundColor: theme.colors.black,
    color: theme.colors.white,
    borderRadius: '36px',

    '&:hover': {
      color:
        theme.palette.mode === 'light'
          ? theme.colors.black
          : theme.colors.white,
    },
  },
  medium: {
    height: 40,
    width: 40,
  },
  large: {
    height: 60,
    width: 60,
  },
}));
