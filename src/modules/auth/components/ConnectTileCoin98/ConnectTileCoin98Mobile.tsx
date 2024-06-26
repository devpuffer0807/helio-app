import {
  EWalletId,
  // getIsCoin98Injected,
  getWalletIcon,
  getWalletName,
} from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { getMobileAuthCallbackURL } from '../../utils/getMobileAuthCallbackURL';
import { ConnectTileMobile } from '../ConnectTileMobile';

export function ConnectTileCoin98Mobile(): JSX.Element {
  const walletId = EWalletId.coin98ViaWalletConnect;
  const callback = getMobileAuthCallbackURL(walletId);
  const MOBILE_DEEP_LINK = `https://coin98.com/dapp/${callback}`;
  const [connect] = useLazyAuthConnectQuery();

  return (
    <ConnectTileMobile
      icon={getWalletIcon(walletId)}
      title={getWalletName(walletId)}
      mobileDeepLink={MOBILE_DEEP_LINK}
      onClick={() => connect(walletId)}
    />
  );
}
