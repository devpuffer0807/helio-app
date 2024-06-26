import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from 'tss-react/mui';

import { ReactComponent as CheckedIcon } from '../assets/checked.svg';

interface Props {
  active?: boolean;
  completed?: boolean;
  className?: string;
  icon: ReactNode;
}

export function StepIcon({
  active,
  completed,
  className,
  icon,
}: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <Box
      className={cx(
        classes.container,
        active && classes.containerActive,
        completed && classes.containerCompleted,
        className,
      )}
    >
      {completed ? <CheckedIcon /> : icon}
    </Box>
  );
}

const useStyles = makeStyles()(theme => {
  const isLightTheme = theme.palette.mode === 'light';

  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      width: 32,
      color: theme.colors.black,
      backgroundColor: isLightTheme ? 'unset' : theme.colors.silver,
      border: isLightTheme ? `1px solid ${theme.colors.silver}` : 'unset',
      borderRadius: '50%',
      fontSize: 14,
      fontWeight: 600,
    },
    containerCompleted: {
      color: theme.colors.black,
      backgroundColor: isLightTheme ? 'unset' : theme.colors.silver,
    },
    containerActive: {
      border: 'unset',
      color: theme.colors.white,
      backgroundColor: theme.colors.black,
    },
  };
});
