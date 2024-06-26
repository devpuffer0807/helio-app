import {
  EWalletId,
  getIsCoinbaseInjected,
  getWalletIcon,
  getWalletName,
} from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { ConnectTile } from '../ConnectTile';

const DOWNLOAD_COINBASE_URL = 'https://www.coinbase.com/wallet/downloads';
const walletId = EWalletId.coinbase;

export function ConnectTileCoinbase(): JSX.Element {
  const [connect, { isLoading }] = useLazyAuthConnectQuery();
  const isCoinbaseInjected = getIsCoinbaseInjected();

  return (
    <ConnectTile
      installLink={isCoinbaseInjected ? '' : DOWNLOAD_COINBASE_URL}
      icon={getWalletIcon(walletId)}
      isDisabled={isLoading}
      title={getWalletName(walletId)}
      onClick={() => connect(walletId)}
    />
  );
}
