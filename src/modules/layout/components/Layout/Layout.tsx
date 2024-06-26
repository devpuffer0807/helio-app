import { ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

import {
  DESKTOP_HEADER_HEIGHT,
  ExploitWarning,
  MOBILE_HEADER_HEIGHT,
} from 'modules/common';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface Props {
  children: ReactNode;
}

const CONTENT_MAX_WIDTH = 1200;

export function Layout({ children }: Props): JSX.Element {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar className={classes.sidebar} />

      <Header className={classes.header} />
      <ExploitWarning className={classes.exploit} />
      <div className={classes.content}>{children}</div>
    </div>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    minHeight: '100vh',
    gridTemplateAreas: `
    "sidebar header"
    "sidebar exploit"
    "sidebar content";
    `,
    gridTemplateRows: `${DESKTOP_HEADER_HEIGHT}px max-content 1fr`,
    gridTemplateColumns: `230px 1fr`,

    [theme.breakpoints.down('lg')]: {
      gridTemplateAreas: `
      "header"
      "exploit"
      "content";
      `,
      gridTemplateColumns: `1fr`,
    },

    [theme.breakpoints.down('md')]: {
      gridTemplateRows: `${MOBILE_HEADER_HEIGHT}px max-content 1fr`,
      gridRowGap: 24,
    },
  },

  content: {
    gridArea: 'content',
    padding: '0 30px 40px',
    maxWidth: CONTENT_MAX_WIDTH + 60,
    width: '100%',
    margin: '0 auto',

    [theme.breakpoints.down('md')]: {
      maxWidth: CONTENT_MAX_WIDTH + 32,
      padding: '0 16px 40px',
      overflowX: 'auto',
    },
  },

  sidebar: {
    gridArea: 'sidebar',
    position: 'sticky',
    top: 0,
    alignSelf: 'start',

    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },

  header: {
    maxWidth: CONTENT_MAX_WIDTH + 60,
    margin: '0 auto',
    gridArea: 'header',
    padding: '0 30px',
    zIndex: 999,

    [theme.breakpoints.down('md')]: {
      maxWidth: CONTENT_MAX_WIDTH + 32,
      padding: '0 16px',
    },
  },

  exploit: {
    maxWidth: CONTENT_MAX_WIDTH + 60,
    gridArea: 'exploit',
    padding: '0 30px',
    margin: '0 auto',
    zIndex: 999,
    marginBottom: 20,
    width: '100%',

    [theme.breakpoints.down('md')]: {
      maxWidth: CONTENT_MAX_WIDTH + 32,
      padding: '0 16px',
    },
  },
}));
