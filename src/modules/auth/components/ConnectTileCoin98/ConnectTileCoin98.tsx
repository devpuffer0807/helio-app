import {
  EWalletId,
  getIsCoin98Injected,
  getWalletIcon,
  getWalletName,
} from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { ConnectTile } from '../ConnectTile';

const DOWNLOAD_COIN98_URL = 'https://coin98.com/';
const walletId = EWalletId.coin98;

export function ConnectTileCoin98(): JSX.Element {
  const [connect, { isLoading }] = useLazyAuthConnectQuery();
  const isInjected = getIsCoin98Injected();

  return (
    <ConnectTile
      installLink={isInjected ? '' : DOWNLOAD_COIN98_URL}
      icon={getWalletIcon(walletId)}
      isDisabled={isLoading}
      title={getWalletName(walletId)}
      onClick={() => connect(walletId)}
    />
  );
}
