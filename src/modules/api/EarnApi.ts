import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import {
  API_ELLIPSIS_URL,
  API_PLANET_FINANCE_HAY_BUSD,
  API_PLANET_FINANCE_HAY_USDT,
  API_QUOLL_FINANCE,
  API_THENA_FINANCE,
} from '../common';

export const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
};

interface Reward {
  address: string;
  symbol: string;
  name: string;
  decimals: string;
  rewardEnd: string;
  rewardsApy: number;
  lpSupply: string;
}

export interface EllipsisFinancePool {
  address: string;
  epsVersion: number;
  poolType: string;
  balance: number;
  apy: number;
  apyFormatted: string;
  epsApy: number;
  virtualPrice: number;
  isStableCoin: number;
  volume: number;
  totalVol: number;
  name: string;
  gauge: boolean;
  lpPid: number;
  tvl: string;
  rewards: Reward[];
}

export interface EllipsisFinancePools {
  success: boolean;
  data: {
    allPools: EllipsisFinancePool[];
  };
}

export interface QuollPool {
  pid: number;
  name: string;
  tvl: string;
  apr: number;
}

export interface TokenInfo {
  address: string;
  decimals: number;
  amount: string;
  symbol: string;
}

export interface ThenaResponse {
  success: boolean;
  data: ThenaPool[];
}
export interface ThenaPool {
  address: string;
  symbol: string;
  totalSupply: number;
  lpPrice: number;
  isGame: boolean;
  type: string;
  gauge: {
    apr: string;
    projectedApr: number;
    voteApr: number;
    totalSupply: number;
    address: string;
    fee: string;
    bribe: string;
    weight: number;
    bribes: {
      bribe: TokenInfo[];
      fee: TokenInfo[];
      isAlive: boolean;
    };
    token0: {
      address: string;
      reserve: number;
    };
    token1: {
      address: string;
      reserve: number;
    };
  };
}

export interface PlanetResponse {
  success: boolean;
  data: PlanetFinance;
}

export interface PlanetFinance {
  avgPoolApy: number;
  tvl: number;
  name: string;
  userBalanceUsd: number;
  userTotalApy: number;
  userTotalApr: number;
  wallet: string;
}

export class EarnApi {
  private static instance?: EarnApi;

  public api: AxiosInstance;

  private constructor() {
    EarnApi.instance = this;

    this.api = axios.create({ ...AXIOS_DEFAULT_CONFIG });
  }

  public static getInstance(): EarnApi {
    if (EarnApi.instance) {
      return EarnApi.instance;
    }

    return new EarnApi();
  }

  async getEllipsisFinancePool(
    address: string,
  ): Promise<EllipsisFinancePool | undefined> {
    const { data } = await this.api.get<EllipsisFinancePools>(
      `${API_ELLIPSIS_URL}/getPoolsCrypto`,
    );

    return data.data.allPools.find(pool => pool.address === address);
  }

  async getQuollPool(): Promise<QuollPool | undefined> {
    const { data } = await this.api.get<QuollPool[]>(
      `${API_QUOLL_FINANCE}/pools`,
    );

    return data.find(pool => pool.name === 'HAY');
  }

  async getThenaFusion(): Promise<ThenaPool[] | undefined> {
    const { data: responseData } = await this.api.get<ThenaResponse>(
      `${API_THENA_FINANCE}/fusions`,
    );

    const { data } = responseData;

    return data;
  }

  async getPlanetFinanceHayBusdPool(
    address: string,
  ): Promise<PlanetFinance | undefined> {
    const { data } = await this.api.get<PlanetFinance>(
      `${API_PLANET_FINANCE_HAY_BUSD}/${address}`,
    );

    return data;
  }

  async getPlanetFinanceHayUsdtPool(
    address: string,
  ): Promise<PlanetFinance | undefined> {
    const { data } = await this.api.get<PlanetFinance>(
      `${API_PLANET_FINANCE_HAY_USDT}/${address}/23`,
    );

    return data;
  }
}
