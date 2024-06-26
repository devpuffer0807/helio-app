import {
  EWalletId,
  getIsBitKeepInjected,
  getWalletIcon,
  getWalletName,
} from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { getMobileAuthCallbackURL } from '../../utils/getMobileAuthCallbackURL';
import { ConnectTileMobile } from '../ConnectTileMobile';

export function ConnectTileBitKeepMobile(): JSX.Element {
  const walletId = EWalletId.bitKeep;
  const callback = getMobileAuthCallbackURL(walletId);
  const MOBILE_DEEP_LINK = `https://bkcode.vip/?action=dapp&url=${callback}`;
  const [connect] = useLazyAuthConnectQuery();

  return (
    <ConnectTileMobile
      icon={getWalletIcon(walletId)}
      title={getWalletName(walletId)}
      mobileDeepLink={MOBILE_DEEP_LINK}
      onClick={getIsBitKeepInjected() ? () => connect(walletId) : undefined}
    />
  );
}
