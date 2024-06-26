import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { API_DEV_URL } from 'modules/common/consts';

const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  baseURL: API_DEV_URL,
};

export interface LiquidationUser {
  userAddress: string;
  tokenName: string;
  collateral: string;
  liquidationCost: string;
  rangeFromLiquidation: number;
  collateralCurrency: string;
}

export interface CloseToLiquidationUser {
  userAddress: string;
  tokenName: string;
  collateral: string;
  liquidationCost: string;
  liquidationPrice: string;
  rangeFromLiquidation: number;
  collateralCurrency: string;
}

export interface LiquidatedUser {
  liquidationCost: string;
  ts: number;
  userAddress: string;
  tokenName: string;
  collateralAmount: string;
  collateralCurrency: string;
}

export interface GetToBeLiquidatedResponse {
  users: LiquidationUser[];
}

export interface GetCloseToLiquidationResponse {
  users: CloseToLiquidationUser[];
}

export interface GetLiquidationCollateralPriceResponse {
  [collateralCurrency: string]: string;
}

export class LiquidationApi {
  private static instance?: LiquidationApi;

  public api: AxiosInstance;

  private constructor() {
    LiquidationApi.instance = this;

    this.api = axios.create({ ...AXIOS_DEFAULT_CONFIG });
  }

  public static getInstance(): LiquidationApi {
    if (LiquidationApi.instance) {
      return LiquidationApi.instance;
    }

    return new LiquidationApi();
  }

  async getCloseToLiquidation({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<GetCloseToLiquidationResponse> {
    const queryParams = new URLSearchParams();

    queryParams.set('start', String(offset));
    queryParams.set('count', String(limit));

    const { data } = await this.api.get<GetCloseToLiquidationResponse>(
      `/liquidations/orange?${queryParams.toString()}`,
    );

    return data;
  }

  async getToBeLiquidated({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<GetToBeLiquidatedResponse> {
    const queryParams = new URLSearchParams();

    queryParams.set('start', String(offset));
    queryParams.set('count', String(limit));

    const { data } = await this.api.get<GetToBeLiquidatedResponse>(
      `/liquidations/red?${queryParams.toString()}`,
    );

    return data;
  }

  async getLiquidated({
    limit,
    offset,
  }: {
    offset: number;
    limit: number;
  }): Promise<LiquidatedUser[]> {
    const queryParams = new URLSearchParams();

    queryParams.set('start', String(offset));
    queryParams.set('count', String(limit));

    const { data } = await this.api.get<LiquidatedUser[]>(
      `/liquidated?${queryParams.toString()}`,
    );

    return data;
  }

  async getLiquidationCollateralPrices(): Promise<GetLiquidationCollateralPriceResponse> {
    const { data } = await this.api.get<GetLiquidationCollateralPriceResponse>(
      `/price`,
    );

    return data;
  }
}
