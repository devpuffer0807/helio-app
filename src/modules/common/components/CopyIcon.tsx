import React from 'react';
import { makeStyles } from 'tss-react/mui';

import { ReactComponent as CopyImage } from '../assets/copy.svg';
import { copyText } from '../utils/copyText';

interface Props {
  className?: string;
  text: string;
}

export function CopyIcon({ className, text }: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <CopyImage
      className={cx(classes.copyIcon, className)}
      onClick={() => copyText(text)}
    />
  );
}

const useStyles = makeStyles()(theme => ({
  copyIcon: {
    cursor: 'pointer',
    opacity: 0.3,
    transition: '0.3s',
    color: theme.colors.black,

    '&:hover': {
      opacity: 0.5,
    },
  },
}));
