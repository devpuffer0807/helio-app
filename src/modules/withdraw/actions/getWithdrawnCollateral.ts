import BigNumber from 'bignumber.js';

import { convertFromWei } from 'modules/common';
import { CollateralToken, ContractsManager } from 'modules/core';
import { web3Api } from 'modules/store';

export const {
  useLazyWithdrawGetWithdrawnCollateralQuery,
  endpoints: { withdrawGetWithdrawnCollateral },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    withdrawGetWithdrawnCollateral: build.query<
      BigNumber | null,
      { transactionHash: string; strategy: string; token: CollateralToken }
    >({
      queryFn: async ({ strategy, transactionHash, token }) => {
        const sdk = await ContractsManager.getInstance();

        let amount: string;

        switch (token) {
          case CollateralToken.Second: {
            const contract = await sdk.getInteractionContract();
            const [event] = await sdk.getEventsFromReceipt(
              contract,
              'Withdraw',
              transactionHash,
            );

            if (!event) {
              return { data: null };
            }

            amount = event.returnValues.amount;
            break;
          }
          case CollateralToken.SnBNB: {
            const contract = await sdk.getInteractionContract();
            const [event] = await sdk.getEventsFromReceipt(
              contract,
              'Withdraw',
              transactionHash,
            );

            if (!event) {
              return { data: null };
            }

            amount = event.returnValues.amount;
            break;
          }
          case CollateralToken.WBETH: {
            const contract = await sdk.getInteractionContract();
            const [event] = await sdk.getEventsFromReceipt(
              contract,
              'Withdraw',
              transactionHash,
            );

            if (!event) {
              return { data: null };
            }

            amount = event.returnValues.amount;
            break;
          }
          case CollateralToken.Main: {
            // strategy === ''
            const contract = await sdk.getProviderContract();
            const [event] = await sdk.getEventsFromReceipt(
              contract,
              'Withdrawal',
              transactionHash,
            );

            if (!event) {
              return { data: null };
            }

            amount = event.returnValues.amount;
            break;
          }
          case CollateralToken.Eth: {
            const contract = await sdk.getEthProviderContract();
            const [event] = await sdk.getEventsFromReceipt(
              contract,
              'Withdrawal',
              transactionHash,
            );

            if (!event) {
              return { data: null };
            }

            amount = event.returnValues.amount;
            break;
          }
          default:
            {
              const contract = await sdk.getProviderContract();
              const [event] = await sdk.getEventsFromReceipt(
                contract,
                'WithdrawalInToken',
                transactionHash,
              );

              if (!event) {
                return { data: null };
              }

              amount = event.returnValues.amount;

              amount = await contract.methods
                .estimateInToken(strategy, amount)
                .call();
            }
            break;
        }

        return { data: convertFromWei(amount) };
      },
    }),
  }),
});
