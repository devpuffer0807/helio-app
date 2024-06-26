import { ReactElement } from 'react';

import { CHAIN_ID } from 'modules/common';
import { Layout } from 'modules/layout';
import { getAccount } from 'modules/store/actions/getAccount';
import { getChainId } from 'modules/store/actions/getChainId';

import { useLazyAuthSwitchNetworkQuery } from './actions';
import { Connect } from './Connect';
import { UnsupportedNetwork } from './UnsupportedNetwork';

interface IGuardRouteProps {
  children: ReactElement;
}

export function GuardRoute({ children }: IGuardRouteProps): JSX.Element {
  const { data: currentAccount } = getAccount.useQueryState();
  const { data: currentChainId } = getChainId.useQueryState();

  const [switchNetwork] = useLazyAuthSwitchNetworkQuery();

  if (!currentAccount || !currentChainId) {
    return (
      <Layout>
        <Connect requiredChainId={CHAIN_ID} />
      </Layout>
    );
  }

  if (currentAccount && CHAIN_ID !== currentChainId) {
    return (
      <Layout>
        <UnsupportedNetwork
          currentChainId={currentChainId}
          requiredChainId={CHAIN_ID}
          onSwitch={() => switchNetwork(currentChainId)}
        />
      </Layout>
    );
  }

  return children;
}
