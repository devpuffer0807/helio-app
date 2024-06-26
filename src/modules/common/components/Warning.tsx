import { alpha } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

interface Props extends TypographyProps {
  prefix?: string;
}

export function Warning({ children, className, prefix }: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.container, className)}>
      {prefix && <span className={classes.red}>{prefix}:&nbsp;</span>}
      {children}
    </div>
  );
}

const useStyles = makeStyles()(theme => ({
  container: {
    padding: '12px 16px',
    border: `1px solid ${alpha(theme.colors.black, 0.2)}`,
    borderRadius: 8,
    fontSize: 14,
    lineHeight: '22px',
    color: alpha(theme.colors.black, 0.5),
  },
  red: {
    color: theme.colors.red,
  },
}));
