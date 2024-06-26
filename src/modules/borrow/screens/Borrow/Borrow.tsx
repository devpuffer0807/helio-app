import { useState } from 'react';
import Button from '@mui/material/Button';
import BigNumber from 'bignumber.js';

import {
  CompletedModal,
  CompletionModalAction,
  InProgressModal,
  LOAN_TOKEN_ADDRESS,
  TransactionFailedModal,
  truncateNumber,
  useGetBorrowUtilization,
  useNavigateSearch,
  useTransactionAction,
  ZERO,
} from 'modules/common';
import { useCollateralToken } from 'modules/core';
import { t } from 'modules/i18n';
import { Layout } from 'modules/layout';
import { useLazyAddTokenToWalletQuery } from 'modules/store/actions/addTokenToWallet';
import { useGetAccountDataQuery } from 'modules/store/actions/getAccountData';

import { useLazyBorrowBorrowQuery } from '../../actions';
import { BorrowRoutesConfig } from '../../Routes';
import { Form } from './Form';

export function Borrow(): JSX.Element {
  return (
    <Layout>
      <ProvideContent />
    </Layout>
  );
}

function ProvideContent(): JSX.Element {
  const navigate = useNavigateSearch();
  const [addTokenToWallet] = useLazyAddTokenToWalletQuery();
  const [{ token }] = useCollateralToken();
  const { data: accountData } = useGetAccountDataQuery({ token });
  const { loading, data, executed, executeAction, error } =
    useTransactionAction(useLazyBorrowBorrowQuery);

  const borrowed = accountData?.borrowed ?? ZERO;
  const [amount, setAmount] = useState(ZERO);
  const utilization = useGetBorrowUtilization(token);

  const loan = t('units.LOAN_TOKEN-value', {
    value: truncateNumber(borrowed ?? ZERO, 2),
  });

  const borrowAmount = t('units.LOAN_TOKEN-value', {
    value: truncateNumber(amount ?? ZERO, 2),
  });

  const borrowUtilization = t('units.percent', {
    value: truncateNumber(utilization, 2),
  });

  const handleClickAddToken = () => {
    void addTokenToWallet({
      address: LOAN_TOKEN_ADDRESS,
      symbol: t('units.LOAN_TOKEN'),
      decimals: 18,
    });
  };

  const handleSubmit = (amount: BigNumber) => {
    setAmount(amount);
    void executeAction({ token, amount });
  };

  if (loading) {
    return <InProgressModal txHash={data?.transactionHash} />;
  }

  if (data?.receipt) {
    return (
      <CompletedModal
        action={CompletionModalAction.Borrow}
        amount={borrowAmount}
        utilization={borrowUtilization}
        txHash={data?.receipt.transactionHash}
        loan={loan}
        onClose={() => {
          navigate(BorrowRoutesConfig.dashboard.generatePath(), { token });
        }}
      >
        <Button
          size="large"
          variant="outlined"
          onClick={handleClickAddToken}
          sx={{ mt: '20px' }}
        >
          {t('borrow.add-token', {
            token: t('units.LOAN_TOKEN'),
          })}
        </Button>
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

  return <Form executed={executed} onSubmit={handleSubmit} />;
}
