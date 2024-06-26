import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { EarnRoutesConfig } from '../../EarnRoutesConfig';
import { useGetStakingTokenEntryFromURL } from '../../hooks/useGetStakingTokenEntryFromURL';

interface Props {
  children: ReactElement;
}

export function GuardStakingToken({ children }: Props): JSX.Element {
  const tokenEntry = useGetStakingTokenEntryFromURL();

  if (!tokenEntry) {
    return <Navigate to={EarnRoutesConfig.dashboard.generatePath()} replace />;
  }

  return children;
}
