import { useTranslation } from 'modules/i18n';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import {
  EWalletId,
  getBitKeepProvider,
  getIsBitKeep,
  getIsBitKeepInjected,
  getWalletIcon,
  getWalletName,
} from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { ConnectTile } from '../ConnectTile';
import { translation } from './translation';

const DOWNLOAD_BITKEEP_URL = 'https://bitkeep.com/en/download?type=2';
const walletId = EWalletId.bitKeep;

export function ConnectTileBitKeep(): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const [connect, { isLoading }] = useLazyAuthConnectQuery();
  const isInjected = getIsBitKeepInjected();
  const bitKeepProvider = getBitKeepProvider();
  const isBitKeepActive = getIsBitKeep(bitKeepProvider);
  const isDisabled = isInjected && !isBitKeepActive;

  const tooltip = useLocaleMemo(() => {
    if (isDisabled) {
      return t(keys.disabled);
    }
    return undefined;
  }, [isDisabled]);

  return (
    <ConnectTile
      installLink={isInjected ? '' : DOWNLOAD_BITKEEP_URL}
      icon={getWalletIcon(walletId)}
      isDisabled={isLoading}
      title={getWalletName(walletId)}
      tooltip={tooltip}
      onClick={() => connect(walletId)}
    />
  );
}
