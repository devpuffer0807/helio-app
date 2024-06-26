import { EWalletId, getWalletIcon, getWalletName } from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { ConnectTile } from '../ConnectTile';

const DOWNLOAD_BINANCE_URL =
  'https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp';
const walletId = EWalletId.binanceWallet;

export function ConnectTileBinance(): JSX.Element {
  const [connect, { isLoading }] = useLazyAuthConnectQuery();
  const isInjected = !!window.BinanceChain;

  return (
    <ConnectTile
      installLink={isInjected ? '' : DOWNLOAD_BINANCE_URL}
      icon={getWalletIcon(walletId)}
      isDisabled={isLoading}
      title={getWalletName(walletId)}
      onClick={() => connect(walletId)}
    />
  );
}
