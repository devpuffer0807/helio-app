import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  COLLATERAL_TOKEN,
  CollateralToken,
  CollateralTokenData,
  DISABLE_MULTI_COLLATERAL,
} from 'modules/core';

export function useCollateralToken(): [
  CollateralTokenData,
  (token: CollateralToken) => void,
] {
  const [searchParams, setSearchParams] = useSearchParams({
    token: CollateralToken.Main,
  });

  const setToken = (token: CollateralToken) => setSearchParams({ token });
  const token = useMemo(
    () => searchParams.get('token') as CollateralToken,
    [searchParams],
  );

  if (DISABLE_MULTI_COLLATERAL) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return [COLLATERAL_TOKEN[CollateralToken.Main], () => {}];
  }

  const currentToken =
    !token || !Object.values(CollateralToken).includes(token)
      ? CollateralToken.Main
      : token;

  return [COLLATERAL_TOKEN[currentToken], setToken];
}
