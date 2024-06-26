import { useEffect } from 'react';

import { BorrowRoutesConfig } from 'modules/borrow';
import {
  CompletedModal,
  CompletionModalAction,
  InProgressModal,
  TransactionFailedModal,
  truncateNumber,
  useGetBorrowUtilization,
  useNavigateSearch,
  useTransactionAction,
} from 'modules/common';
import { useCollateralToken } from 'modules/core';
import { t } from 'modules/i18n';
import { Layout } from 'modules/layout';
import {
  useLazyRepayGetRepaidAmountQuery,
  useLazyRepayRepayQuery,
} from 'modules/repay/actions';
import { useGetAccountDataQuery } from 'modules/store/actions/getAccountData';

import { Form } from './Form';

export function Repay(): JSX.Element {
  return (
    <Layout>
      <RepayContent />
    </Layout>
  );
}

function RepayContent(): JSX.Element {
  const navigate = useNavigateSearch();
  const [{ token }] = useCollateralToken();
  const { loading, data, executed, executeAction, error } =
    useTransactionAction(useLazyRepayRepayQuery);
  const { data: accountData } = useGetAccountDataQuery({ token });

  const transactionHash = data?.receipt?.transactionHash ?? '';
  const utilization = useGetBorrowUtilization(token);

  const [getRepaidAmount, { data: repaidAmountData }] =
    useLazyRepayGetRepaidAmountQuery();

  useEffect(() => {
    if (!transactionHash.length) return;

    void getRepaidAmount(transactionHash);
  }, [transactionHash, getRepaidAmount]);

  if (loading) {
    return <InProgressModal txHash={data?.transactionHash} />;
  }

  if (data?.receipt) {
    return (
      <CompletedModal
        action={CompletionModalAction.Withdraw}
        utilization={t('units.percent', {
          value: truncateNumber(utilization, 2),
        })}
        loan={
          accountData?.borrowed &&
          t('units.LOAN_TOKEN-value', { value: accountData.borrowed })
        }
        amount={
          repaidAmountData?.isZero()
            ? undefined
            : t('units.LOAN_TOKEN-value', {
                value: repaidAmountData?.toString(),
              })
        }
        txHash={data?.receipt.transactionHash}
        onClose={() => {
          navigate(BorrowRoutesConfig.dashboard.generatePath(), { token });
        }}
      />
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
    <Form
      executed={executed}
      onSubmit={amount => executeAction({ token, amount })}
    />
  );
}
