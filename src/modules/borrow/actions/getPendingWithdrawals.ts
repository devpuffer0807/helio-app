import BigNumber from 'bignumber.js';
import { Contract } from 'web3-eth-contract';

import {
  BINANCE_HISTORY_1_DAY_BLOCK_OFFSET,
  BNB_MAX_BLOCK_RANGE,
  convertFromWei,
  DAYS_TO_WITHDRAWAL,
  getBlockchainPastEvents,
  ONE_DAY_IN_SECONDS,
} from 'modules/common';
import { ContractsManager } from 'modules/core';
import { AvailableWriteProviders } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';

import { ProviderManagerSingleton } from '../../api';

const WITHDRAWAL_PERIOD_IN_DAYS = 10;

export interface PendingWithdrawal {
  fulfillmentDate?: Date;
  amount?: BigNumber;
}

export const {
  useGetPendingWithdrawalQuery,
  endpoints: { getPendingWithdrawal },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    getPendingWithdrawal: build.query<PendingWithdrawal, void>({
      queryFn: async (_, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const sdk = await ContractsManager.getInstance();
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const binancePoolContract = await sdk.getBinancePoolContract();
        const providerContract = await sdk.getProviderContract();
        const web3 = provider.getWeb3();
        const latestBlockNumber = await web3.eth.getBlockNumber();

        const events = await getBlockchainPastEvents({
          eventName: 'Withdrawal',
          contract: providerContract as unknown as Contract,
          latestBlockNumber,
          startBlock:
            latestBlockNumber -
            BINANCE_HISTORY_1_DAY_BLOCK_OFFSET * WITHDRAWAL_PERIOD_IN_DAYS,
          rangeStep: BNB_MAX_BLOCK_RANGE,
          filter: {
            recipient: account,
          },
        });
        const event = events[events.length - 1];

        if (!event) {
          return {
            data: {},
          };
        }

        const [block, amount] = await Promise.all([
          web3.eth.getBlock(event.blockHash),
          binancePoolContract.methods.pendingUnstakesOf(account).call(),
        ]);
        const date = new Date(
          (Number(block.timestamp) + ONE_DAY_IN_SECONDS * DAYS_TO_WITHDRAWAL) *
            1000,
        );

        return {
          data: {
            amount: convertFromWei(amount),
            fulfillmentDate: date,
          },
        };
      },
    }),
  }),
});
