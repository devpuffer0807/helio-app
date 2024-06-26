import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { DESKTOP_HEADER_HEIGHT } from 'modules/common';
import { Close } from 'modules/common/components/Modal';
import { t } from 'modules/i18n';

export function WarningModal(): JSX.Element {
  const { classes } = useStyles();

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open}>
      <div className={classes.area}>
        <div className={classes.container}>
          <Close onClose={onClose} className={classes.close} />

          <Typography variant="h2" textAlign="center" marginBottom="27px">
            {t('exploit.attention')}
          </Typography>

          <Typography variant="body2">
            <span className={classes.important}>{t('exploit.suspended')}</span>
          </Typography>
          <Typography variant="body2">{t('exploit.announcement')}</Typography>
          <br />
          <Typography variant="body2">
            {t('exploit.keep-updated')}{' '}
            <a href="https://twitter.com/Helio_Money" className={classes.link}>
              https://twitter.com/Helio_Money
            </a>
          </Typography>

          <div className={classes.footer}>
            <Button size="large" fullWidth onClick={onClose}>
              {t('exploit.close')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

const useStyles = makeStyles()(theme => ({
  area: {
    padding: 0,
    background: 'none',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    overflowY: 'scroll',
    [theme.breakpoints.down('md')]: {
      paddingTop: 0,
      alignItems: 'flex-start',
    },
  },

  container: {
    background: 'none',
    border: 'none',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 700,
    backgroundColor: theme.colors.secondary,
    borderRadius: 36,
    width: '100%',
    padding: '60px 70px',
    margin: `${DESKTOP_HEADER_HEIGHT}px 0`,
    height: 'max-content',

    [theme.breakpoints.down('md')]: {
      padding: '54px 16px',
      margin: 0,
      borderRadius: 0,
      maxWidth: '100%',
      minHeight: '100vh',
    },
  },

  close: {
    position: 'absolute',
    top: 34,
    right: 34,

    [theme.breakpoints.down('md')]: {
      top: 24,
      right: 24,
    },
  },

  important: {
    fontWeight: 600,
  },

  link: {
    color: theme.colors.black,
    textDecoration: 'underline',
  },

  footer: {
    width: '100%',
    marginTop: 60,
  },
}));
