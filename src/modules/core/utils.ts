import { COLLATERAL_TOKEN, CollateralToken } from './consts';
import { CollateralTokenData } from './types';

export function getCollateralToken(
  token?: CollateralToken,
): CollateralTokenData {
  if (token) {
    return COLLATERAL_TOKEN[token];
  }

  const params = new URL(document.location.toString()).searchParams;
  const tokenKey =
    (params.get('token') as CollateralToken) ?? CollateralToken.Main;

  if (!Object.values(CollateralToken).includes(tokenKey)) {
    return COLLATERAL_TOKEN[CollateralToken.Main];
  }

  return COLLATERAL_TOKEN[tokenKey];
}
