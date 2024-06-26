import { useEffect } from 'react';
import MuiModal, { ModalProps } from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';
import { useQueryParam } from 'use-query-params';
import { isMobile } from 'web3modal';

import {
  DESKTOP_HEADER_HEIGHT,
  isProdEnv,
  WALLET_PARAM_ID,
} from 'modules/common';
import { Close } from 'modules/common/components/Modal';
import { useTranslation } from 'modules/i18n';
import { EWalletId } from 'modules/provider';

import { useLazyAuthConnectQuery } from '../actions';
import { translation } from '../translation';
import { ConnectTileBinance } from './ConnectTileBinance';
import {
  ConnectTileBitKeep,
  ConnectTileBitKeepMobile,
} from './ConnectTileBitKeep';
import { ConnectTileClover } from './ConnectTileClover';
import {
  ConnectTileCoin98,
  ConnectTileCoin98Mobile,
} from './ConnectTileCoin98';
import {
  ConnectTileCoinbase,
  ConnectTileCoinbaseMobile,
} from './ConnectTileCoinbase';
import { ConnectTileHuobi } from './ConnectTileHuobi';
import { ConnectTileImToken } from './ConnectTileImToken';
import { ConnectTileMath } from './ConnectTileMath';
import {
  ConnectTileMetaMask,
  ConnectTileMetaMaskMobile,
} from './ConnectTileMetaMask';
import { ConnectTileTrust, ConnectTileTrustMobile } from './ConnectTileTrust';
import { ConnectTileWalletConnect } from './ConnectTileWalletConnect';

interface Props extends Omit<ModalProps, 'children'> {
  onClose: () => void;
}

export function ConnectWalletsModal(props: Props): JSX.Element {
  const [wallet, setWallet] = useQueryParam<string | undefined>(
    WALLET_PARAM_ID,
  );
  const { t, keys } = useTranslation(translation);
  const { onClose } = props;
  const [connect] = useLazyAuthConnectQuery();

  const isMobileDevice = isMobile();

  useEffect(() => {
    if (isMobileDevice && wallet) {
      if (wallet === EWalletId.injected) {
        void connect(EWalletId.injected);
      } else if (wallet === EWalletId.trust) {
        void connect(EWalletId.trust);
      } else if (wallet === EWalletId.coinbase) {
        void connect(EWalletId.coinbase);
      }
      setWallet(undefined);
    }
  }, [wallet, setWallet, connect, isMobileDevice]);

  const { classes } = useStyles();

  return (
    <MuiModal {...props}>
      <button onClick={onClose} type="button" className={classes.area}>
        <button
          type="button"
          onClick={event => event.stopPropagation()}
          className={classes.container}
        >
          <Close onClose={onClose} className={classes.close} />

          <Typography variant="h2" textAlign="center" marginBottom="50px">
            {t(keys.connectWalletToContinue)}
          </Typography>

          {isMobileDevice ? (
            <>
              <ConnectTileMetaMaskMobile />
              {isProdEnv() && <ConnectTileTrustMobile />}
              <ConnectTileBitKeepMobile />
              <ConnectTileCoinbaseMobile />
              <ConnectTileCoin98Mobile />
            </>
          ) : (
            <>
              <ConnectTileMetaMask />
              <ConnectTileTrust />
              <ConnectTileBitKeep />
              <ConnectTileCoinbase />
              <ConnectTileCoin98 />
              <ConnectTileClover />
              <ConnectTileBinance />
            </>
          )}

          <ConnectTileWalletConnect />
          <ConnectTileImToken />
          <ConnectTileMath />
          <ConnectTileHuobi />
        </button>
      </button>
    </MuiModal>
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
    paddingTop: DESKTOP_HEADER_HEIGHT,

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
    margin: theme.spacing(12, 0, 2),
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
}));
