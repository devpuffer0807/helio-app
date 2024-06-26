import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from 'tss-react/mui';

import { FONTS } from 'modules/theme';

interface Props {
  message: string;
}

export default function EmptyMessage({ message }: Props): JSX.Element {
  const { classes } = useStyles();
  return (
    <Box className={classes.container}>
      <Typography className={classes.message} variant="h2">
        {message}
      </Typography>
    </Box>
  );
}

const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing(2),

    height: '70vh',
    borderRadius: '32px',
  },
  message: {
    opacity: 0.5,

    '&&': {
      fontFamily: FONTS.accentTwo,
    },
  },
}));
