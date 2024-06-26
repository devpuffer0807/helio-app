/* eslint-disable camelcase */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import BigNumber from 'bignumber.js';

export const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  baseURL: process.env.REACT_APP_API_COINGECKO,
};

interface CoinInfo {
  market_data: {
    current_price: {
      usd: number;
    };
  };
}

export class CoingeckoApi {
  private static instance?: CoingeckoApi;

  public api: AxiosInstance;

  private constructor() {
    CoingeckoApi.instance = this;

    this.api = axios.create({ ...AXIOS_DEFAULT_CONFIG });
  }

  public static getInstance(): CoingeckoApi {
    if (CoingeckoApi.instance) {
      return CoingeckoApi.instance;
    }

    return new CoingeckoApi();
  }

  async getWombatPrice(): Promise<BigNumber> {
    const { data } = await this.api.get<CoinInfo>(
      'api/v3/coins/binance-smart-chain/contract/0xad6742a35fb341a9cc6ad674738dd8da98b94fb1',
    );

    return new BigNumber(data.market_data.current_price.usd);
  }

  async getTHEPrice(): Promise<BigNumber> {
    const { data } = await this.api.get<CoinInfo>(
      'api/v3/coins/binance-smart-chain/contract/0xf4c8e32eadec4bfe97e0f595add0f4450a863a11',
    );

    return new BigNumber(data.market_data.current_price.usd);
  }
}
