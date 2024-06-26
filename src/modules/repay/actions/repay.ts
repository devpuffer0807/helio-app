import BigNumber from 'bignumber.js';

import { ProviderManagerSingleton } from 'modules/api';
import { convertToHex } from 'modules/common';
import {
  CollateralToken,
  ContractsManager,
  getCollateralToken,
} from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';
import { getAccountData } from 'modules/store/actions/getAccountData';
import { getLiquidationPrice } from 'modules/store/actions/getLiquidationPrice';
import { getLoanTokenBalance } from 'modules/store/actions/getLoanTokenBalance';
import { getNativeBalance } from 'modules/store/actions/getNativeBalance';

export const {
  useLazyRepayRepayQuery,
  endpoints: { repayRepay },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    repayRepay: build.query<
      IWeb3SendResult,
      { token: CollateralToken; amount: BigNumber }
    >({
      queryFn: async ({ token, amount }, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getInteractionContract();
        const { address } = getCollateralToken(token);

        const data = contract.methods
          .payback(address, convertToHex(amount))
          .encodeABI();

        const gasInfo = await sdk.getGasInfo({
          args: [address, convertToHex(amount)],
          contract,
          method: 'payback',
        });

        const result = await provider.sendTransactionAsync(
          account,
          contract.options.address,
          {
            data,
            gasLimit: gasInfo.gasLimit.toString(),
          },
        );

        return { data: result };
      },
      onQueryStarted: async ({ token }, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        void data.receiptPromise.once('receipt', () => {
          void dispatch(
            getNativeBalance.initiate(
              { token },
              {
                subscribe: false,
                forceRefetch: true,
              },
            ),
          );
          void dispatch(
            getAccountData.initiate(
              { token },
              {
                subscribe: false,
                forceRefetch: true,
              },
            ),
          );
          void dispatch(
            getLoanTokenBalance.initiate(undefined, {
              subscribe: false,
              forceRefetch: true,
            }),
          );
          void dispatch(
            getLiquidationPrice.initiate(
              { token },
              {
                subscribe: false,
                forceRefetch: true,
              },
            ),
          );
        });
      },
    }),
  }),
});
