import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import { CHAIN_ID } from 'modules/common';
import { CollateralToken } from 'modules/core';
import { getAccount } from 'modules/store/actions/getAccount';
import { getAccountData } from 'modules/store/actions/getAccountData';
import { getBorrowAPR } from 'modules/store/actions/getBorrowAPR';
import { getChainId } from 'modules/store/actions/getChainId';
import { getLiquidationPrice } from 'modules/store/actions/getLiquidationPrice';
import { getLoanTokenBalance } from 'modules/store/actions/getLoanTokenBalance';
import { getMainTokenBalance } from 'modules/store/actions/getMainTokenBalance';
import { getNativeBalance } from 'modules/store/actions/getNativeBalance';
import { getRewardsAPR } from 'modules/store/actions/getRewardsAPR';
import { getSpaceIdAccount } from 'modules/store/actions/getSpaceIdAccount';
import { getStakedTokenBalance } from 'modules/store/actions/getStakedTokenBalance';
import { subscriptionSubscription } from 'modules/subscription/actions';

export async function getApplicationData(
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
): Promise<void> {
  await dispatch(
    getAccount.initiate(undefined, {
      subscribe: true,
      forceRefetch: true,
    }),
  );
  const { data: chainId } = await dispatch(
    getChainId.initiate(undefined, {
      subscribe: true,
      forceRefetch: true,
    }),
  );

  if (chainId !== CHAIN_ID) return;

  void dispatch(
    getStakedTokenBalance.initiate(undefined, {
      subscribe: true,
      forceRefetch: true,
    }),
  );

  Object.values(CollateralToken).forEach(token => {
    void dispatch(
      getAccountData.initiate(
        { token },
        {
          subscribe: true,
          forceRefetch: true,
        },
      ),
    );

    void dispatch(
      getNativeBalance.initiate(
        { token },
        {
          subscribe: true,
          forceRefetch: true,
        },
      ),
    );

    void dispatch(
      getLiquidationPrice.initiate(
        { token },
        {
          subscribe: true,
          forceRefetch: true,
        },
      ),
    );

    void dispatch(
      getBorrowAPR.initiate(
        { token },
        {
          subscribe: true,
          forceRefetch: true,
        },
      ),
    );

    void dispatch(
      getRewardsAPR.initiate(
        { token },
        {
          subscribe: true,
          forceRefetch: true,
        },
      ),
    );
  });

  void dispatch(
    getLoanTokenBalance.initiate(undefined, {
      subscribe: true,
      forceRefetch: true,
    }),
  );

  void dispatch(
    getMainTokenBalance.initiate(undefined, {
      subscribe: true,
      forceRefetch: true,
    }),
  );

  void dispatch(
    subscriptionSubscription.initiate(undefined, {
      subscribe: true,
      forceRefetch: true,
    }),
  );

  void dispatch(
    getSpaceIdAccount.initiate(undefined, {
      subscribe: true,
      forceRefetch: true,
    }),
  );
}
