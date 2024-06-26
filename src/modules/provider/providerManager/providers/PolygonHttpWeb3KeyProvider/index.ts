import Web3 from 'web3';

import { Web3KeyReadProvider } from '../Web3KeyReadProvider';

export class PolygonHttpWeb3KeyProvider extends Web3KeyReadProvider {
  private url: string;

  constructor(url: string) {
    super();

    this.web3 = new Web3();
    this.url = url;
    this.web3.setProvider(new Web3.providers.HttpProvider(url));
  }

  public get rpcUrl(): string {
    return this.url;
  }
}
