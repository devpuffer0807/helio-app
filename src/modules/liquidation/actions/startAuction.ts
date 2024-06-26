import { ProviderManagerSingleton } from 'modules/api';
import { DEFAULT_FETCH_LIMIT } from 'modules/common';
import { CollateralToken, ContractsManager } from 'modules/core';
import { AvailableWriteProviders, IWeb3SendResult } from 'modules/provider';
import { web3Api } from 'modules/store';
import { getAccount } from 'modules/store/actions/getAccount';
import { getAccountData } from 'modules/store/actions/getAccountData';
import { getLiquidationPrice } from 'modules/store/actions/getLiquidationPrice';
import { getLoanTokenBalance } from 'modules/store/actions/getLoanTokenBalance';
import { getNativeBalance } from 'modules/store/actions/getNativeBalance';

import { getLiquidated } from './getLiquidated';
import { getToBeLiquidated } from './getToBeLiquidated';

export const {
  useLazyLiquidationStartAuctionQuery,
  endpoints: { liquidationStartAuction },
} = web3Api.injectEndpoints({
  endpoints: build => ({
    liquidationStartAuction: build.query<
      IWeb3SendResult,
      { token: CollateralToken; user: string; collateralCurrency: string }
    >({
      queryFn: async ({ user, collateralCurrency }, { getState }) => {
        const state: RootState = getState();
        const { data: account = '' } = getAccount.select()(state);
        const instance = await ProviderManagerSingleton.getInstance();
        const provider = await instance.getETHWriteProvider(
          AvailableWriteProviders.ethCompatible,
        );
        const sdk = await ContractsManager.getInstance();
        const contract = await sdk.getInteractionContract();

        const gasInfo = await sdk.getGasInfo({
          args: [collateralCurrency, user, account],
          contract,
          method: 'startAuction',
        });

        const data = contract.methods
          .startAuction(collateralCurrency, user, account)
          .encodeABI();

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
          void dispatch(
            getToBeLiquidated.initiate(
              { offset: 0, limit: DEFAULT_FETCH_LIMIT },
              { forceRefetch: true },
            ),
          );
          void dispatch(
            getLiquidated.initiate(
              { offset: 0, limit: DEFAULT_FETCH_LIMIT },
              { forceRefetch: true },
            ),
          );
        });
      },
    }),
  }),
});
