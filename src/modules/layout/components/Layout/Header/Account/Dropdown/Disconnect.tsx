import { MouseEvent } from 'react';
import { makeStyles } from 'tss-react/mui';

import { useLazyAuthDisconnectQuery } from 'modules/auth';
import { t } from 'modules/i18n';
import { rgba } from 'modules/theme';

export function Disconnect(): JSX.Element {
  const { classes } = useStyles();
  const [disconnect] = useLazyAuthDisconnectQuery();

  const onDisconnect = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    void disconnect();
  };

  return (
    <button className={classes.disconnect} type="button" onClick={onDisconnect}>
      {t('header.account.disconnect')}
    </button>
  );
}

const useStyles = makeStyles()(theme => ({
  disconnect: {
    width: '100%',
    background: 'none',
    border: `1px solid ${rgba(theme.colors.black, 0.2) ?? ''}`,
    borderRadius: '36px',
    padding: '11px 5px',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '17px',
    color: rgba(theme.colors.black, 0.5),
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'color .05s ease',

    '&:hover': {
      color: theme.colors.black,
    },
  },
}));
