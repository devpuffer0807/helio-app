import React from 'react';
import Button from '@mui/material/Button';
import BigNumber from 'bignumber.js';

import { BorrowRoutesConfig } from 'modules/borrow';
import {
  CompletedModal,
  CompletionModalAction,
  InProgressModal,
  MAX_DECIMALS,
  TransactionFailedModal,
  truncateNumber,
  useNavigateSearch,
  useTransactionAction,
} from 'modules/common';
import { CollateralToken, useCollateralToken } from 'modules/core';
import { t } from 'modules/i18n';
import { Layout } from 'modules/layout';
import { useLazyAddTokenToWalletQuery } from 'modules/store/actions/addTokenToWallet';

import { useLazyCollateralDepositQuery } from '../../actions';
import { CollateralForm } from './Form';

export function Provide(): JSX.Element {
  return (
    <Layout>
      <ProvideContent />
    </Layout>
  );
}

function ProvideContent(): JSX.Element {
  const navigate = useNavigateSearch();
  const [amount, setAmount] = React.useState(new BigNumber('0'));
  const [{ token, unit, address }] = useCollateralToken();
  const { loading, data, executed, executeAction, error } =
    useTransactionAction(useLazyCollateralDepositQuery);
  const [addTokenToWallet] = useLazyAddTokenToWalletQuery();

  const handleClickAddToken = () => {
    void addTokenToWallet({
      address,
      symbol: unit,
      decimals: 18,
    });
  };

  if (loading) {
    return <InProgressModal txHash={data?.transactionHash} />;
  }

  if (data?.receipt) {
    return (
      <CompletedModal
        amount={`${truncateNumber(amount, MAX_DECIMALS, true)} ${unit}`}
        action={CompletionModalAction.Provide}
        txHash={data?.receipt.transactionHash}
        onClose={() => {
          navigate(BorrowRoutesConfig.dashboard.generatePath(), { token });
        }}
      >
        {token !== CollateralToken.Main && (
          <Button
            type="button"
            onClick={handleClickAddToken}
            size="large"
            variant="outlined"
            sx={{ marginTop: '20px' }}
          >
            {t('withdraw.withdraw.add-token-to-wallet', { unit })}
          </Button>
        )}
      </CompletedModal>
    );
  }

  if (error) {
    return (
      <TransactionFailedModal
        txHash={data?.transactionHash}
        onClose={() =>
          navigate(BorrowRoutesConfig.dashboard.generatePath(), { token })
        }
      />
    );
  }

  return (
    <CollateralForm
      executed={executed}
      onSubmit={amount => {
        setAmount(amount);
        executeAction({ token, amount });
      }}
    />
  );
}
