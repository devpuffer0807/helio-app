import { EWalletId, getWalletIcon, getWalletName } from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { getMobileAuthCallbackURL } from '../../utils/getMobileAuthCallbackURL';
import { ConnectTileMobile } from '../ConnectTileMobile';

export function ConnectTileTrustMobile(): JSX.Element {
  const walletId = EWalletId.trustViaWalletConnect;
  const callback = getMobileAuthCallbackURL(walletId);
  const MOBILE_DEEP_LINK = `https://link.trustwallet.com/open_url?coin_id=714&url=${callback}`;
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
