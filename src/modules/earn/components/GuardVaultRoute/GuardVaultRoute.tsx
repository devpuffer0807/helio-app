import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { EarnRoutesConfig } from '../../EarnRoutesConfig';
import { useGetVaultEntryFromURL } from '../../hooks/useGetVaultEntryFromURL';

interface Props {
  children: ReactElement;
}

export function GuardVaultRoute({ children }: Props): JSX.Element {
  const vaultEntry = useGetVaultEntryFromURL();

  if (!vaultEntry) {
    return <Navigate to={EarnRoutesConfig.dashboard.generatePath()} replace />;
  }

  return children;
}
