import { useNavigate } from 'react-router-dom';

import {
  CompletedModal,
  InProgressModal,
  TransactionFailedModal,
  useTransactionAction,
} from 'modules/common';
import { EarnRoutesConfig } from 'modules/earn/EarnRoutesConfig';
import { Layout } from 'modules/layout';

import { useLazyWithdrawLPQuery } from '../actions/vaults/withdrawLP';
import { BoostedVaultUnstakeModal } from '../components/BoostedVaultUnstakeModal';

export function BoostedVaultUnstake(): JSX.Element {
  return (
    <Layout>
      <UnstakeContent />
    </Layout>
  );
}

function UnstakeContent(): JSX.Element {
  const navigate = useNavigate();
  const { loading, data, executeAction, error } = useTransactionAction(
    useLazyWithdrawLPQuery,
  );

  if (loading) {
    return <InProgressModal txHash={data?.transactionHash} />;
  }

  if (data?.receipt) {
    return (
      <CompletedModal
        txHash={data?.receipt.transactionHash}
        onClose={() => {
          navigate(EarnRoutesConfig.dashboard.generatePath());
        }}
      />
    );
  }

  if (error) {
    return (
      <TransactionFailedModal
        txHash={data?.transactionHash}
        onClose={() => navigate(EarnRoutesConfig.dashboard.generatePath())}
      />
    );
  }

  return <BoostedVaultUnstakeModal onSubmit={executeAction} />;
}
