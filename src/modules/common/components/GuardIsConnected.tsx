import { ReactNode } from 'react';

import { getAccount } from 'modules/store/actions/getAccount';

type Props = {
  children: ReactNode;
};

export function GuardIsConnected({ children }: Props): JSX.Element | null {
  const { data: currentAccount } = getAccount.useQueryState();

  if (!currentAccount) {
    return null;
  }

  return children as JSX.Element;
}
