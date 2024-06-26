import {
  EWalletId,
  getIsMetaMaskInjected,
  getWalletIcon,
  getWalletName,
} from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { getMobileAuthCallbackURL } from '../../utils/getMobileAuthCallbackURL';
import { ConnectTileMobile } from '../ConnectTileMobile';

export function ConnectTileMetaMaskMobile(): JSX.Element {
  const walletId = EWalletId.injected;
  const callback = getMobileAuthCallbackURL(walletId);
  const MOBILE_DEEP_LINK = `https://metamask.app.link/dapp/${callback}`;
  const [connect] = useLazyAuthConnectQuery();

  return (
    <ConnectTileMobile
      icon={getWalletIcon(walletId)}
      title={getWalletName(walletId)}
      mobileDeepLink={MOBILE_DEEP_LINK}
      onClick={getIsMetaMaskInjected() ? () => connect(walletId) : undefined}
    />
  );
}
