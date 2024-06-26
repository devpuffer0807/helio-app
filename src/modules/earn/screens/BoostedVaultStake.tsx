import { useNavigate } from 'react-router-dom';

import {
  CompletedModal,
  InProgressModal,
  TransactionFailedModal,
  useTransactionAction,
} from 'modules/common';
import { EarnRoutesConfig } from 'modules/earn/EarnRoutesConfig';
import { Layout } from 'modules/layout';

import { BoostedVaultEntry } from '../actions/vaults/types';
import { BoostedVaultStakeModal } from '../components/BoostedVaultStakeModal';
import { useGetVaultEntryFromURL } from '../hooks/useGetVaultEntryFromURL';

export function BoostedVaultStake(): JSX.Element {
  return (
    <Layout>
      <StakeContent />
    </Layout>
  );
}

function StakeContent(): JSX.Element {
  const navigate = useNavigate();
  const vaultEntry = useGetVaultEntryFromURL() as BoostedVaultEntry;

  const {
    loading: isLoadingDepositPair,
    data: depositPairData,
    executeAction: depositPair,
    error: depositPairError,
  } = useTransactionAction(vaultEntry.useDepositPair);
  const {
    loading: isLoadingDepositLP,
    data: depositLPData,
    executeAction: depositLP,
    error: depositLPError,
  } = useTransactionAction(vaultEntry.useDepositLP);

  const error = depositPairError || depositLPError;
  const txnHash =
    depositPairData.transactionHash || depositLPData.transactionHash;
  const receipt = depositPairData.receipt || depositLPData.receipt;
  const isLoading = isLoadingDepositPair || isLoadingDepositLP;

  if (isLoading) {
    return <InProgressModal txHash={txnHash} />;
  }

  if (receipt) {
    return (
      <CompletedModal
        txHash={receipt.transactionHash}
        onClose={() => {
          navigate(EarnRoutesConfig.dashboard.generatePath());
        }}
      />
    );
  }

  if (error) {
    return (
      <TransactionFailedModal
        txHash={txnHash}
        onClose={() => navigate(EarnRoutesConfig.dashboard.generatePath())}
      />
    );
  }

  return (
    <BoostedVaultStakeModal
      onSubmitStakePair={depositPair}
      onSubmitStakeLP={depositLP}
    />
  );
}
