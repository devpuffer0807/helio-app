import { ReactElement } from 'react';
import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';
import { makeStyles } from 'tss-react/mui';

import { ReactComponent as QuestionIcon } from '../assets/question.svg';

interface Props extends Omit<TooltipProps, 'children'> {
  icon?: ReactElement;
}

export function Tooltip({ className, icon, ...props }: Props): JSX.Element {
  const { classes } = useStyles();

  return (
    <MuiTooltip {...props} classes={{ popper: className }} enterTouchDelay={0}>
      {icon || <QuestionIcon className={classes.container} />}
    </MuiTooltip>
  );
}

const useStyles = makeStyles()(theme => ({
  container: {
    cursor: 'pointer',
    opacity: 0.3,
    transition: '0.3s',
    color: theme.colors.black,

    '&:hover': {
      opacity: 0.5,
    },
  },
}));
