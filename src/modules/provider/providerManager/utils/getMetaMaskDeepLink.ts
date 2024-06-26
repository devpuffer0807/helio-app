import { removeHttp } from './removeHttp';

/**
 * [Deeplink generator](https://metamask.github.io/metamask-deeplinks/)
 *
 * @param link Link to redirect user after connection.
 * @returns Deep link to MetaMask.
 */
export function getMetaMaskDeepLink(link: string): string {
  return `https://metamask.app.link/dapp/${removeHttp(link)}`;
}
