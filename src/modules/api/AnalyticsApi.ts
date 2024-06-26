import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import BigNumber from 'bignumber.js';

import { API_DEV_URL } from 'modules/common/consts';

export const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  baseURL: API_DEV_URL,
};

export interface GetTotalValueLocked {
  ts: string;
  // eslint-disable-next-line camelcase
  token_address: string;
  // eslint-disable-next-line camelcase
  token_name: string;
  amount: string;
  // eslint-disable-next-line camelcase
  collateral_price: string;
}

export interface GetTotalBorrowed {
  ts: string;
  // eslint-disable-next-line camelcase
  token_address: string;
  // eslint-disable-next-line camelcase
  token_name: string;
  amount: string;
}

export interface GetTotalLiquidity {
  ts: string;
  amount: string;
}

export interface GetTotalBorrowers {
  ts: string;
  amount: string;
}

export interface GetTotalReservePool {
  ts: string;
  amount: string;
}

export interface FarmingAPRStable {
  apr: BigNumber;
  cakeApr: BigNumber;
  lpApr: BigNumber;
  ourApr: BigNumber;
}

export interface FarmingAPR {
  apr: BigNumber;
  cakeApr: BigNumber;
  lpApr: BigNumber;
  ourApr: BigNumber;
  pancakeStable: FarmingAPRStable;
}

export class AnalyticsApi {
  private static instance?: AnalyticsApi;

  public api: AxiosInstance;

  private constructor() {
    AnalyticsApi.instance = this;

    this.api = axios.create({ ...AXIOS_DEFAULT_CONFIG });
  }

  public static getInstance(): AnalyticsApi {
    if (AnalyticsApi.instance) {
      return AnalyticsApi.instance;
    }

    return new AnalyticsApi();
  }

  async getTotalValueLocked(
    tokenAddress: string,
    fromDate: number,
  ): Promise<GetTotalValueLocked[]> {
    const { data } = await this.api.get(
      `/tvl/${tokenAddress}?from=${fromDate}`,
    );

    return data;
  }

  async getTotalBorrowed(
    tokenAddress: string,
    fromDate: number,
  ): Promise<GetTotalBorrowed[]> {
    const { data } = await this.api.get(
      `/debt/${tokenAddress}?from=${fromDate}`,
    );

    return data;
  }

  async getTotalLiquidity(fromDate: number): Promise<GetTotalLiquidity[]> {
    const { data } = await this.api.get(`/total_liquidity?from=${fromDate}`);

    return data;
  }

  async getTotalBorrowers(fromDate: number): Promise<GetTotalBorrowers[]> {
    const { data } = await this.api.get(`/borrowers?from=${fromDate}`);

    return data;
  }

  async getTotalReservePool(fromDate: number): Promise<GetTotalReservePool[]> {
    const { data } = await this.api.get(`/surpluses?from=${fromDate}`);

    return data;
  }

  async getAPR(): Promise<FarmingAPR> {
    const { data } = await this.api.get('/apr');

    return data;
  }
}
