import { useEffect } from 'react';

import { EWalletId } from 'modules/provider';

import { useLazyAuthConnectQuery } from '../actions';

export function useAuth(): void {
  const [connect] = useLazyAuthConnectQuery();

  useEffect(() => {
    const walletId = localStorage.getItem('walletId') as EWalletId;
    void localStorage.removeItem('walletId');

    if (!walletId) {
      return;
    }
    void connect(walletId);
  }, [connect]);
}
