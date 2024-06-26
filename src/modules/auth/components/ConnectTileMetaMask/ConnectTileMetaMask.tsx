import { EWalletId, getWalletIcon, getWalletName } from 'modules/provider';

import { ConnectTile } from '../ConnectTile';
import { useConnectTileMetaMask } from './useConnectTileMetaMask';

const DOWNLOAD_METAMASK_URL = 'https://metamask.io/download/';
const walletId = EWalletId.injected;

export function ConnectTileMetaMask(): JSX.Element {
  const { isDisabled, isInjected, tooltip, handleClick } =
    useConnectTileMetaMask();

  return (
    <ConnectTile
      installLink={isInjected ? '' : DOWNLOAD_METAMASK_URL}
      icon={getWalletIcon(walletId)}
      isDisabled={isDisabled}
      title={getWalletName(walletId)}
      tooltip={tooltip}
      onClick={handleClick}
    />
  );
}
