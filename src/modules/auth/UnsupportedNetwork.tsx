import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { ReactComponent as IconArrow } from 'assets/icon-arrow-down.svg';
import {
  CHAIN_ID,
  copyText,
  EXPLORER_URL,
  Modal,
  NETWORK_NAME,
  RPC_URL,
} from 'modules/common';
import { ReactComponent as IconCopy } from 'modules/common/assets/copy.svg';
import { useTranslation } from 'modules/i18n';
import { EEthereumNetworkId } from 'modules/provider';

import { rgba } from '../theme';
import { translation } from './translation';
import { getChainIcon } from './utils';

interface IUnsupportedNetworkProps {
  currentChainId: EEthereumNetworkId;
  requiredChainId: EEthereumNetworkId;
  onSwitch: () => void;
}

export function UnsupportedNetwork({
  currentChainId,
  requiredChainId,
  onSwitch,
}: IUnsupportedNetworkProps): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const { classes, cx } = useStyles();
  const [isNetworkInfoShown, setIsNetworkInfoShown] = useState(false);

  return (
    <Modal title={t(keys.wrongNetwork)}>
      <Box>
        <Typography sx={{ marginBottom: 3 }} variant="body1" align="center">
          {t(keys.currentPageNotAvailable, {
            value: t(`chain.${currentChainId}`),
          })}
        </Typography>
        <Typography variant="body1" align="center">
          {t(keys.pleaseSwitch, {
            value: t(`chain.${currentChainId}`),
          })}
          <Box
            ml={1.5}
            mr={0.5}
            display="inline"
            sx={{ verticalAlign: 'middle' }}
          >
            {getChainIcon(requiredChainId)}
          </Box>
          {t(`chain.${requiredChainId}`)}
        </Typography>
        <Box className={classes.switchButton}>
          <Button sx={{ maxWidth: 270 }} fullWidth onClick={onSwitch}>
            {t(keys.switchNetwork)}
          </Button>
        </Box>
        <Box className={classes.infoBlock}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setIsNetworkInfoShown(!isNetworkInfoShown)}
          >
            {t(keys.networkInformation)}
            <IconArrow
              className={cx(classes.iconArrow, {
                [classes.rotated]: isNetworkInfoShown,
              })}
            />
          </Button>
          {isNetworkInfoShown && (
            <div className={classes.list}>
              <div className={classes.listItem}>
                <Typography className={classes.label} variant="body2">
                  {t(keys.networkName)}
                </Typography>
                <div className={classes.value}>
                  <Typography variant="body2">{NETWORK_NAME}</Typography>
                  <IconCopy
                    className={classes.iconCopy}
                    onClick={() => copyText(NETWORK_NAME)}
                  />
                </div>
              </div>
              <div className={classes.listItem}>
                <Typography className={classes.label} variant="body2">
                  {t(keys.newRPCURL)}
                </Typography>
                <div className={classes.value}>
                  <Typography variant="body2">{RPC_URL}</Typography>
                  <IconCopy
                    className={classes.iconCopy}
                    onClick={() => copyText(RPC_URL)}
                  />
                </div>
              </div>
              <div className={classes.listItem}>
                <Typography className={classes.label} variant="body2">
                  {t(keys.chainID)}
                </Typography>
                <div className={classes.value}>
                  <Typography variant="body2">{CHAIN_ID}</Typography>
                  <IconCopy
                    className={classes.iconCopy}
                    onClick={() => copyText(CHAIN_ID as unknown as string)}
                  />
                </div>
              </div>
              <div className={classes.listItem}>
                <Typography className={classes.label} variant="body2">
                  {t(keys.currencySymbol)}
                </Typography>
                <div className={classes.value}>
                  <Typography variant="body2">
                    {t('units.EXCHANGE_COIN')}
                  </Typography>
                  <IconCopy
                    className={classes.iconCopy}
                    onClick={() => copyText(t('units.EXCHANGE_COIN'))}
                  />
                </div>
              </div>
              <div className={classes.listItem}>
                <Typography className={classes.label} variant="body2">
                  {t(keys.blockExplorerURL)}
                </Typography>
                <div className={classes.value}>
                  <Typography variant="body2">{EXPLORER_URL}</Typography>
                  <IconCopy
                    className={classes.iconCopy}
                    onClick={() => copyText(EXPLORER_URL)}
                  />
                </div>
              </div>
            </div>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

const useStyles = makeStyles()(theme => ({
  switchButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4.5),

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  infoBlock: {
    marginTop: 52,

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    marginTop: 32,
  },
  listItem: {
    '&:last-of-type': {
      paddingTop: 16,
    },
    '&:not(:last-of-type)': {
      padding: '16px 0',
      borderBottom: `1px solid ${rgba(theme.colors.black, 0.1) as string}`,
    },
  },
  label: {
    '&&': {
      fontWeight: 600,
      color: rgba(theme.colors.black, 0.5),
      marginBottom: 6,
    },
  },
  iconArrow: {
    transition: 'transform .15s ease',
    marginLeft: 10,
  },
  rotated: {
    transform: 'rotate(180deg)',
  },
  value: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  iconCopy: {
    color: rgba(theme.colors.black, 0.3),
    transition: 'all .15s ease',
    cursor: 'pointer',

    '&:hover': {
      color: theme.colors.black,
    },
  },
}));
