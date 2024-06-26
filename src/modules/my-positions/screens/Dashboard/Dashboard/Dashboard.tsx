import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import {
  CompletedModal,
  InProgressModal,
  MAIN_TOKEN_ADDRESS,
  TransactionFailedModal,
  useTransactionAction,
} from 'modules/common';
import { useTranslation } from 'modules/i18n';
import { Layout } from 'modules/layout';
import { useLazyMyPositionClaimQuery } from 'modules/my-positions/actions';
import { useLazyAddTokenToWalletQuery } from 'modules/store/actions/addTokenToWallet';

import { MyPositions } from '../MyPositions';
import { translation } from './translation';

export function Dashboard(): JSX.Element {
  return (
    <Layout>
      <Content />
    </Layout>
  );
}

function Content(): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const [addTokenToWallet] = useLazyAddTokenToWalletQuery();
  const { loading, data, executed, executeAction, error } =
    useTransactionAction(useLazyMyPositionClaimQuery);
  const [formOpened, setFormOpened] = useState<boolean>(false);
  const receipt = data?.receipt;

  const onClose = () => setFormOpened(false);

  const handleClickAddToken = () => {
    void addTokenToWallet({
      address: MAIN_TOKEN_ADDRESS,
      symbol: t('units.MAIN_TOKEN'),
      decimals: 18,
    });
  };

  useEffect(() => {
    if (error || receipt) {
      setFormOpened(true);
    }
  }, [error, receipt]);

  if (loading) {
    return <InProgressModal txHash={data?.transactionHash} />;
  }

  if (receipt && formOpened) {
    return (
      <CompletedModal txHash={receipt.transactionHash} onClose={onClose}>
        <Button
          size="large"
          variant="outlined"
          onClick={handleClickAddToken}
          sx={{ mt: '20px' }}
        >
          {t(keys.addToken, {
            token: t('units.MAIN_TOKEN'),
          })}
        </Button>
      </CompletedModal>
    );
  }

  if (error && formOpened) {
    return (
      <TransactionFailedModal
        txHash={data?.transactionHash}
        onClose={onClose}
      />
    );
  }

  return (
    <MyPositions
      executed={executed}
      onSubmit={amount => executeAction(amount)}
    />
  );
}
