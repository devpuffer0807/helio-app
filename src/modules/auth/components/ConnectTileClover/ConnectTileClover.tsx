import { useTranslation } from 'modules/i18n';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import {
  EWalletId,
  getCloverProvider,
  getIsClover,
  getIsCloverInjected,
  getWalletIcon,
  getWalletName,
} from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { ConnectTile } from '../ConnectTile';
import { translation } from './translation';

const DOWNLOAD_CLOVER_URL = 'https://clv.org/';
const walletId = EWalletId.clover;

export function ConnectTileClover(): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const [connect, { isLoading }] = useLazyAuthConnectQuery();
  const isInjected = getIsCloverInjected();
  const cloverProvider = getCloverProvider();
  const isCloverActive = getIsClover(cloverProvider);
  const isDisabled = isInjected && !isCloverActive;

  const tooltip = useLocaleMemo(() => {
    if (isDisabled) {
      return t(keys.disabled);
    }
    return undefined;
  }, [isDisabled]);

  return (
    <ConnectTile
      installLink={isInjected ? '' : DOWNLOAD_CLOVER_URL}
      icon={getWalletIcon(walletId)}
      isDisabled={isLoading || isDisabled}
      title={getWalletName(walletId)}
      tooltip={tooltip}
      onClick={() => connect(walletId)}
    />
  );
}
