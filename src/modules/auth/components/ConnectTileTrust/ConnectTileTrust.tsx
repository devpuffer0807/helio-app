import {
  EWalletId,
  getIsTrustWalletInjected,
  getWalletIcon,
  getWalletName,
} from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { ConnectTile } from '../ConnectTile';

const DOWNLOAD_TRUST_URL = 'https://trustwallet.com/';
const walletId = EWalletId.trust;

export function ConnectTileTrust(): JSX.Element {
  const isTrustWalletInjected = getIsTrustWalletInjected();
  const [connect, { isLoading }] = useLazyAuthConnectQuery();

  return (
    <ConnectTile
      installLink={isTrustWalletInjected ? '' : DOWNLOAD_TRUST_URL}
      icon={getWalletIcon(walletId)}
      isDisabled={isLoading}
      title={getWalletName(walletId)}
      onClick={() => connect(walletId)}
    />
  );
}
