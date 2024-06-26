export interface IGetTrustWalletDeepLinkArgs {
  /**
   * The link is used when generating a deep link to redirect users after connection.
   */
  link: string;
  // todo: add coinId description.
  coinId?: number;
}

/**
 * @returns Deep link to Trust wallet.
 */
export function getTrustWalletDeepLink({
  link,
  coinId,
}: IGetTrustWalletDeepLinkArgs): string {
  const searchParams = new URLSearchParams();
  searchParams.set('url', link);
  if (coinId) searchParams.set('coin_id', coinId.toString());

  return `https://link.trustwallet.com/open_url?${searchParams.toString()}`;
}
