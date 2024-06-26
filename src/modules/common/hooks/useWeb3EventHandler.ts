import { useEffect, useState } from 'react';
import { isMobile } from 'web3modal';

import { ProviderManagerSingleton } from 'modules/api';
import {
  useLazyAuthDisconnectQuery,
  useLazyAuthUpdateAccountAddressQuery,
  useLazyAuthUpdateConnectedNetworkQuery,
} from 'modules/auth';
import {
  EventProvider,
  EWalletId,
  getProvider,
  ProviderEvents,
} from 'modules/provider';

import { useAppSelector } from './useAppSelector';

export const useWeb3EventHandler = (): void => {
  const walletId = useAppSelector(store => store.auth.walletId);

  const [eventProvider, setEventProvider] = useState<EventProvider | null>(
    null,
  );

  const [updateAccount] = useLazyAuthUpdateAccountAddressQuery();
  const [updateChainId] = useLazyAuthUpdateConnectedNetworkQuery();
  const [disconnect] = useLazyAuthDisconnectQuery();

  useEffect(() => {
    const getWeb3 = async (walletId: EWalletId | null) => {
      if (!walletId) return;

      const instance = await ProviderManagerSingleton.getInstance();
      const provider = await instance.getETHWriteProvider(walletId);
      const eventProvider = getProvider(provider.getWeb3().currentProvider);
      setEventProvider(eventProvider);
    };

    if (isMobile() && walletId === EWalletId.trust) return;

    void getWeb3(walletId);
  }, [walletId]);

  useEffect(() => {
    if (!walletId) return;

    eventProvider?.on(ProviderEvents.AccountsChanged, (addresses: string[]) => {
      if (!addresses.length) return;

      void updateAccount({
        walletId,
        address: addresses[0],
      });
    });
    eventProvider?.on(ProviderEvents.ChainChanged, (chainId: string) => {
      const selectedChainId = Number.parseInt(chainId, 16);

      void updateChainId({
        walletId,
        chainId: selectedChainId,
      });
    });
    eventProvider?.on(ProviderEvents.Disconnect, () => {
      void disconnect();
    });

    return () => {
      if (eventProvider?.removeAllListeners) {
        eventProvider.removeAllListeners(ProviderEvents.AccountsChanged);
        eventProvider.removeAllListeners(ProviderEvents.ChainChanged);
        eventProvider.removeAllListeners(ProviderEvents.Disconnect);
      }
    };
  }, [eventProvider, walletId, updateAccount, updateChainId, disconnect]);
};
