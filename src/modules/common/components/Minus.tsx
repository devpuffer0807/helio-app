import { makeStyles } from 'tss-react/mui';

import { rgba } from 'modules/theme';

type Size = 'medium' | 'large';
type Type = 'default' | 'stretched';

interface Props {
  className?: string;
  size?: Size;
  type?: Type;
  onClick?: () => void;
}

export function Minus({
  className,
  size = 'medium',
  type = 'default',
  onClick,
}: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <button
      className={cx(classes.container, classes[size], classes[type], className)}
      onClick={onClick}
      type="button"
    >
      <div />
    </button>
  );
}

const useStyles = makeStyles()(theme => ({
  container: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.3s',
    backgroundColor:
      theme.palette.mode === 'light' ? theme.colors.white : 'transparent',

    '&:hover': {
      backgroundColor: theme.colors.black,

      '& > div': {
        backgroundColor: theme.colors.white,
      },
    },

    '& > div': {
      height: 2,
      width: 20,
      transition: '0.3s',
    },
  },
  default: {
    color: theme.colors.black,
    borderRadius: '50%',
    border:
      theme.palette.mode === 'dark'
        ? `1px solid ${rgba(theme.colors.black, 0.3) as string}`
        : 'none',

    '& > div': {
      backgroundColor: '#b2b2b2',
    },
  },
  stretched: {
    height: 44,
    width: 55,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor:
      theme.palette.mode === 'light'
        ? rgba(theme.colors.black, 0.2)
        : rgba(theme.colors.black, 0.3),

    color: theme.colors.black,
    borderRadius: '36px',

    '& > div': {
      backgroundColor: theme.colors.black,
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
