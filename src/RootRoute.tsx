import { Outlet } from 'react-router-dom';

import { useAuth } from 'modules/auth';
import { useWeb3EventHandler } from 'modules/common';
import { useSyncNotifications } from 'modules/notifications';

export function RootRoute(): JSX.Element {
  useSyncNotifications();
  useAuth();
  useWeb3EventHandler();

  return <Outlet />;
}
