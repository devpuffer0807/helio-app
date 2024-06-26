import { makeStyles } from 'tss-react/mui';

import { ReactComponent as CloseIcon } from './assets/close.svg';
import { ReactComponent as MenuIcon } from './assets/menu.svg';

interface Props {
  active: boolean;
  className?: string;
  onClick: () => void;
}

export function MenuButton({ active, className, onClick }: Props): JSX.Element {
  const Icon = active ? CloseIcon : MenuIcon;

  const { classes, cx } = useStyles();

  return (
    <button
      className={cx(classes.root, className)}
      type="button"
      onClick={onClick}
    >
      <Icon />
    </button>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    position: 'relative',
    height: 36,
    justifyContent: 'center',
    padding: 0,
    width: 36,
    color: theme.colors.black,
  },
}));
