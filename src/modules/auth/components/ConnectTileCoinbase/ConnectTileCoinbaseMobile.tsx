import {
  EWalletId,
  getIsCoinbaseInjected,
  getWalletIcon,
  getWalletName,
} from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { getMobileAuthCallbackURL } from '../../utils/getMobileAuthCallbackURL';
import { ConnectTileMobile } from '../ConnectTileMobile';

export function ConnectTileCoinbaseMobile(): JSX.Element {
  const walletId = EWalletId.coinbase;
  const callback = getMobileAuthCallbackURL(walletId);
  const MOBILE_DEEP_LINK = `https://go.cb-w.com/dapp?cb_url=${callback}`;
  const [connect] = useLazyAuthConnectQuery();

  return (
    <ConnectTileMobile
      icon={getWalletIcon(walletId)}
      title={getWalletName(walletId)}
      mobileDeepLink={MOBILE_DEEP_LINK}
      onClick={getIsCoinbaseInjected() ? () => connect(walletId) : undefined}
    />
  );
}
