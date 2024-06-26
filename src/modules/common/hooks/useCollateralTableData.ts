import BigNumber from 'bignumber.js';

import { CollateralToken, DISABLE_MULTI_COLLATERAL } from 'modules/core';
import {
  AccountData,
  useGetAccountDataQuery,
} from 'modules/store/actions/getAccountData';

import { useNetBorrowAPR } from './useNetBorrowAPR';

export interface CollateralTableData {
  data?: AccountData;
  netBorrowAPR: BigNumber;
}

export function useCollateralTableData(): Record<
  CollateralToken,
  CollateralTableData | null
> {
  const { data: mainData } = useGetAccountDataQuery({
    token: CollateralToken.Main,
  });
  const { data: secondData } = useGetAccountDataQuery({
    token: CollateralToken.Second,
  });
  const { data: ethData } = useGetAccountDataQuery({
    token: CollateralToken.Eth,
  });
  const { data: snbnbData } = useGetAccountDataQuery({
    token: CollateralToken.SnBNB,
  });
  const { data: wbethData } = useGetAccountDataQuery({
    token: CollateralToken.WBETH,
  });

  const mainNetBorrowAPR = useNetBorrowAPR(CollateralToken.Main);
  const secondNetBorrowAPR = useNetBorrowAPR(CollateralToken.Second);
  const ethNetBorrowAPR = useNetBorrowAPR(CollateralToken.Eth);
  const snbnbBorrowAPR = useNetBorrowAPR(CollateralToken.SnBNB);
  const wbethBorrowAPR = useNetBorrowAPR(CollateralToken.WBETH);

  return {
    [CollateralToken.Main]: { data: mainData, netBorrowAPR: mainNetBorrowAPR },
    [CollateralToken.Second]: DISABLE_MULTI_COLLATERAL
      ? null
      : {
          data: secondData,
          netBorrowAPR: secondNetBorrowAPR,
        },
    [CollateralToken.Eth]: DISABLE_MULTI_COLLATERAL
      ? null
      : {
          data: ethData,
          netBorrowAPR: ethNetBorrowAPR,
        },
    [CollateralToken.SnBNB]: DISABLE_MULTI_COLLATERAL
      ? null
      : {
          data: snbnbData,
          netBorrowAPR: snbnbBorrowAPR,
        },
    [CollateralToken.WBETH]: DISABLE_MULTI_COLLATERAL
      ? null
      : {
          data: wbethData,
          netBorrowAPR: wbethBorrowAPR,
        },
  };
}
