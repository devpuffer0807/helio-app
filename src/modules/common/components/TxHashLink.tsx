import { makeStyles } from 'tss-react/mui';

import { cropString, EXPLORER_URL } from 'modules/common';

import { ReactComponent as LinkIcon } from '../assets/link.svg';

interface Props {
  txHash: string;
}

export function TxHashLink({ txHash }: Props): JSX.Element {
  const { classes } = useStyles();

  return (
    <a
      className={classes.link}
      href={`${EXPLORER_URL}/tx/${txHash}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span>{cropString(txHash)}</span>

      <div className={classes.imageWrapper}>
        <LinkIcon />
      </div>
    </a>
  );
}

const useStyles = makeStyles()(theme => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',

    '&, &:visited, &:active': {
      color: theme.colors.black,
    },

    '& > span': {
      fontWeight: 400,
      fontSize: 14,
      fontFeatureSettings: "'calt' off",
      marginTop: 3,
    },

    '& > div': {
      opacity: 0.5,
      transition: '0.3s',
    },

    '&:hover > div': {
      opacity: 1,
    },
  },
  imageWrapper: {
    width: 24,
    height: 24,
    marginLeft: 6,
  },
}));
