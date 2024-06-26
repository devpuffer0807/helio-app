import { EWalletId, getWalletIcon, getWalletName } from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { ConnectTile } from '../ConnectTile';

const walletId = EWalletId.math;

export function ConnectTileMath(): JSX.Element {
  const [connect, { isLoading }] = useLazyAuthConnectQuery();

  return (
    <ConnectTile
      icon={getWalletIcon(walletId)}
      isDisabled={isLoading}
      title={getWalletName(walletId)}
      onClick={() => connect(walletId)}
    />
  );
}
