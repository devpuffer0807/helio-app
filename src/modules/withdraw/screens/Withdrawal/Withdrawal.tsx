import React, { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import Button from '@mui/material/Button';
import BigNumber from 'bignumber.js';

import { BorrowRoutesConfig } from 'modules/borrow';
import {
  CompletedModal,
  CompletionModalAction,
  InProgressModal,
  TransactionFailedModal,
  truncateNumber,
  useNavigateSearch,
  useTransactionAction,
  ZERO,
} from 'modules/common';
import {
  CollateralToken,
  getCollateralToken,
  useCollateralToken,
} from 'modules/core';
import { t } from 'modules/i18n';
import { Layout } from 'modules/layout';
import { useLazyAddTokenToWalletQuery } from 'modules/store/actions/addTokenToWallet';

import {
  useLazyWithdrawGetWithdrawnCollateralQuery,
  useLazyWithdrawWithdrawQuery,
} from '../../actions';
import { Form } from './Form';

function WithdrawalContent(): JSX.Element {
  const navigate = useNavigateSearch();
  const [{ token, unit: collateralUnit }] = useCollateralToken();
  const [addTokenToWallet] = useLazyAddTokenToWalletQuery();
  const [isStakedToken, setIsStakedToken] = useState(false);
  const [withdrawalTokenIndex, setWithdrawalTokenIndex] = useState(0);
  const { loading, data, executed, executeAction, error } =
    useTransactionAction(useLazyWithdrawWithdrawQuery);

  const [{ withdrawalTokens }] = useCollateralToken();

  const transactionHash = data?.receipt?.transactionHash ?? '';

  const strategy = React.useMemo(() => {
    return withdrawalTokens[withdrawalTokenIndex]?.address || '';
  }, [withdrawalTokenIndex, withdrawalTokens]);

  const tokenAddress = React.useMemo(() => {
    if (
      token === CollateralToken.Second ||
      token === CollateralToken.WBETH ||
      token === CollateralToken.SnBNB
    ) {
      return getCollateralToken(token).address;
    }
    return withdrawalTokens[withdrawalTokenIndex].token_address;
  }, [withdrawalTokenIndex, token, withdrawalTokens]);

  const unit = React.useMemo(() => {
    if (
      token === CollateralToken.Second ||
      token === CollateralToken.SnBNB ||
      token === CollateralToken.WBETH
    ) {
      return collateralUnit;
    }
    return withdrawalTokens[withdrawalTokenIndex].name;
  }, [withdrawalTokenIndex, token, collateralUnit, withdrawalTokens]);

  const [getWithdrawnCollateral, { data: withdrawnAmount }] =
    useLazyWithdrawGetWithdrawnCollateralQuery();

  useEffect(() => {
    if (!transactionHash.length) return;

    void getWithdrawnCollateral({ strategy, transactionHash, token });
  }, [transactionHash, getWithdrawnCollateral, strategy, token]);

  const withdrawnCollateral = `${truncateNumber(
    withdrawnAmount || ZERO,
  )} ${unit}`;

  const handleSubmit = (values: FieldValues) => {
    setIsStakedToken(values.isStakedToken);
    setWithdrawalTokenIndex(values.withdrawalTokenIndex);
    void executeAction({
      token,
      strategy: values.strategy,
      amount: new BigNumber(values.withdraw),
      tokenIndex: values.withdrawalTokenIndex,
    });
  };

  const handleClickAddToken = () => {
    void addTokenToWallet({
      address: tokenAddress,
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
        action={CompletionModalAction.Withdraw}
        amount={withdrawnAmount?.isZero() ? undefined : withdrawnCollateral}
        txHash={data.receipt.transactionHash}
        onClose={() =>
          navigate(BorrowRoutesConfig.dashboard.generatePath(), {
            token,
          })
        }
      >
        {isStakedToken && (
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
          navigate(BorrowRoutesConfig.dashboard.generatePath(), { strategy })
        }
      />
    );
  }

  return <Form executed={executed} onSubmit={handleSubmit} />;
}

export function Withdrawal(): JSX.Element {
  return (
    <Layout>
      <WithdrawalContent />
    </Layout>
  );
}
