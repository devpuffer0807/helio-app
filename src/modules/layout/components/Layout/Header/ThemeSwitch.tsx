import React, { forwardRef, useContext } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import {
  DARK_COLORS,
  LIGHT_COLORS,
  rgba,
  ToggleModeContext,
} from 'modules/theme';

import { ReactComponent as MoonIcon } from './assets/moon.svg';
import { ReactComponent as SunIcon } from './assets/sun.svg';

interface Props {
  className?: string;
}

function ThemeSwitchComponent(
  { className }: Props,
  ref: React.ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const theme = useTheme();
  const toggleTheme = useContext(ToggleModeContext);

  const { classes, cx } = useStyles();

  return (
    <Box
      ref={ref}
      className={cx(classes.root, className)}
      onClick={toggleTheme}
    >
      {theme.palette.mode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Box>
  );
}

export const ThemeSwitch = forwardRef(ThemeSwitchComponent);

const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor:
      theme.palette.mode === 'light'
        ? LIGHT_COLORS.white
        : DARK_COLORS.grayTint,
    color: rgba(theme.colors.black, theme.palette.mode === 'light' ? 0.3 : 0.5),
    borderRadius: 14,
    boxShadow:
      theme.palette.mode === 'light'
        ? `0px 10px 13px ${rgba(theme.colors.black, 0.1) ?? ''}`
        : 'none',
    width: 36,
    height: 36,
    marginLeft: 12,
    transition: 'all .05s ease',

    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'light' ? 'transparent' : DARK_COLORS.secondary,
    },
  },
}));
