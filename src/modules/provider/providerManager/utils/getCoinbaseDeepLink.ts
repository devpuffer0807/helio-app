/**
 * [Docs](https://docs.cloud.coinbase.com/wallet-sdk/docs/deep-link-into-dapp-browser#universal-link)
 *
 * @param link Link to redirect user after connection.
 * @returns Deep link to Coinbase.
 */
export function getCoinbaseDeepLink(link: string): string {
  const encodedLink = encodeURIComponent(link);
  return `https://go.cb-w.com/dapp?cb_url=${encodedLink}}`;
}
