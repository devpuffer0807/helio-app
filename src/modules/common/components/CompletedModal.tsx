import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { Modal, TxHashLink } from 'modules/common';
import { t } from 'modules/i18n';

export enum CompletionModalAction {
  Provide,
  Withdraw,
  Borrow,
  Repay,
  DepositUSB,
  WithdrawUSB,
  Liquidate,
}

interface Props {
  utilization?: string;
  loan?: string;
  txHash?: string;
  amount?: string;
  action?: CompletionModalAction;
  children?: React.ReactNode;
  onClose(): void;
}

export function CompletedModal({
  utilization,
  loan,
  txHash,
  amount,
  action,
  onClose,
  children,
}: Props): JSX.Element {
  let amountLabel: string;

  switch (action) {
    case CompletionModalAction.Provide:
      amountLabel = t('modal.completed.provided-collateral');
      break;
    case CompletionModalAction.Withdraw:
      amountLabel = t('modal.completed.withdrawn-collateral');
      break;
    case CompletionModalAction.Borrow:
      amountLabel = t('modal.completed.borrowed');
      break;
    case CompletionModalAction.Repay:
      amountLabel = t('modal.completed.repaid-amount');
      break;
    default:
      amountLabel = '';
  }

  return (
    <Modal title={t('modal.completed.title')} onClose={onClose}>
      <Box display="flex" flexDirection="column">
        <List
          sx={{
            mt: '44px',
            mb: '30px',
            '& > *:last-child': {
              borderBottom: 'none',
            },
          }}
        >
          {amount && (
            <ListItem secondaryAction={amount} divider>
              {amountLabel}
            </ListItem>
          )}

          {utilization && (
            <ListItem secondaryAction={utilization} divider>
              {t('modal.completed.utilization')}
            </ListItem>
          )}

          {loan && (
            <ListItem secondaryAction={loan} divider>
              {t('modal.completed.loan')}
            </ListItem>
          )}

          {txHash && (
            <ListItem secondaryAction={<TxHashLink txHash={txHash} />} divider>
              {t('modal.completed.hash')}
            </ListItem>
          )}
        </List>

        <Box display="flex" flexDirection="column" sx={{ marginTop: 'auto' }}>
          <Button size="large" onClick={onClose}>
            {t('modal.completed.ok')}
          </Button>
          {children}
        </Box>
      </Box>
    </Modal>
  );
}
