import { useTranslation } from 'modules/i18n';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import {
  EWalletId,
  getIsCoinbaseInjected,
  getIsMetaMaskInjected,
  getIsOKXInjected,
  getIsTrustWalletInjected,
} from 'modules/provider';

import { useLazyAuthConnectQuery } from '../../actions';
import { translation } from './translation';

interface IUseConnectTileMetaMask {
  isDisabled: boolean;
  tooltip?: string;
  isInjected: boolean;
  handleClick: () => void;
}

export const useConnectTileMetaMask = (): IUseConnectTileMetaMask => {
  const { t, keys } = useTranslation(translation);
  const [connect, { isLoading }] = useLazyAuthConnectQuery();

  const isCoinbaseInjected = getIsCoinbaseInjected();
  const isOKXInjected = getIsOKXInjected();
  const isMetamaskInjected = getIsMetaMaskInjected();
  const isTrustWalletInjected = getIsTrustWalletInjected();

  const isOverriddenByCoin98 = !!(
    window.ethereum as { isCoin98: boolean } | undefined
  )?.isCoin98;

  const isOverriddenByCoinbase = isCoinbaseInjected;
  const isOverriddenByOKX = isOKXInjected;
  const isOverriddenByTrustWallet = isTrustWalletInjected;

  const isOverridden =
    isOverriddenByCoin98 ||
    isOverriddenByCoinbase ||
    isOverriddenByOKX ||
    isOverriddenByTrustWallet;

  const tooltip = useLocaleMemo(() => {
    if (isOverridden) {
      return t(keys.disabled);
    }

    return undefined;
  }, [isOverridden]);

  return {
    isDisabled: isOverridden || isLoading,
    tooltip,
    isInjected: isMetamaskInjected,
    handleClick: () => connect(EWalletId.injected),
  };
};
