/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type TokenExchange = ContractEventLog<{
  buyer: string;
  sold_id: string;
  tokens_sold: string;
  bought_id: string;
  tokens_bought: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}>;
export type AddLiquidity = ContractEventLog<{
  provider: string;
  token_amounts: string[];
  fees: string[];
  invariant: string;
  token_supply: string;
  0: string;
  1: string[];
  2: string[];
  3: string;
  4: string;
}>;
export type RemoveLiquidity = ContractEventLog<{
  provider: string;
  token_amounts: string[];
  fees: string[];
  token_supply: string;
  0: string;
  1: string[];
  2: string[];
  3: string;
}>;
export type RemoveLiquidityOne = ContractEventLog<{
  provider: string;
  token_amount: string;
  coin_amount: string;
  token_supply: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type RemoveLiquidityImbalance = ContractEventLog<{
  provider: string;
  token_amounts: string[];
  fees: string[];
  invariant: string;
  token_supply: string;
  0: string;
  1: string[];
  2: string[];
  3: string;
  4: string;
}>;
export type RampA = ContractEventLog<{
  old_A: string;
  new_A: string;
  initial_time: string;
  future_time: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type StopRampA = ContractEventLog<{
  A: string;
  t: string;
  0: string;
  1: string;
}>;

export interface EllipsisFinance extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): EllipsisFinance;
  clone(): EllipsisFinance;
  methods: {
    initialize(
      _lp_token: string,
      _coins: string[],
      _rate_multipliers: (number | string | BN)[],
      _A: number | string | BN,
      _fee: number | string | BN
    ): NonPayableTransactionObject<void>;

    get_balances(): NonPayableTransactionObject<string[]>;

    admin_fee(): NonPayableTransactionObject<string>;

    A(): NonPayableTransactionObject<string>;

    A_precise(): NonPayableTransactionObject<string>;

    get_virtual_price(): NonPayableTransactionObject<string>;

    calc_token_amount(
      _amounts: (number | string | BN)[],
      _is_deposit: boolean
    ): NonPayableTransactionObject<string>;

    "add_liquidity(uint256[2],uint256)"(
      _amounts: (number | string | BN)[],
      _min_mint_amount: number | string | BN
    ): NonPayableTransactionObject<string>;

    "add_liquidity(uint256[2],uint256,address)"(
      _amounts: (number | string | BN)[],
      _min_mint_amount: number | string | BN,
      _receiver: string
    ): NonPayableTransactionObject<string>;

    get_dy(
      i: number | string | BN,
      j: number | string | BN,
      dx: number | string | BN
    ): NonPayableTransactionObject<string>;

    "exchange(int128,int128,uint256,uint256)"(
      i: number | string | BN,
      j: number | string | BN,
      _dx: number | string | BN,
      _min_dy: number | string | BN
    ): NonPayableTransactionObject<string>;

    "exchange(int128,int128,uint256,uint256,address)"(
      i: number | string | BN,
      j: number | string | BN,
      _dx: number | string | BN,
      _min_dy: number | string | BN,
      _receiver: string
    ): NonPayableTransactionObject<string>;

    "remove_liquidity(uint256,uint256[2])"(
      _burn_amount: number | string | BN,
      _min_amounts: (number | string | BN)[]
    ): NonPayableTransactionObject<string[]>;

    "remove_liquidity(uint256,uint256[2],address)"(
      _burn_amount: number | string | BN,
      _min_amounts: (number | string | BN)[],
      _receiver: string
    ): NonPayableTransactionObject<string[]>;

    "remove_liquidity_imbalance(uint256[2],uint256)"(
      _amounts: (number | string | BN)[],
      _max_burn_amount: number | string | BN
    ): NonPayableTransactionObject<string>;

    "remove_liquidity_imbalance(uint256[2],uint256,address)"(
      _amounts: (number | string | BN)[],
      _max_burn_amount: number | string | BN,
      _receiver: string
    ): NonPayableTransactionObject<string>;

    calc_withdraw_one_coin(
      _burn_amount: number | string | BN,
      i: number | string | BN
    ): NonPayableTransactionObject<string>;

    "remove_liquidity_one_coin(uint256,int128,uint256)"(
      _burn_amount: number | string | BN,
      i: number | string | BN,
      _min_received: number | string | BN
    ): NonPayableTransactionObject<string>;

    "remove_liquidity_one_coin(uint256,int128,uint256,address)"(
      _burn_amount: number | string | BN,
      i: number | string | BN,
      _min_received: number | string | BN,
      _receiver: string
    ): NonPayableTransactionObject<string>;

    ramp_A(
      _future_A: number | string | BN,
      _future_time: number | string | BN
    ): NonPayableTransactionObject<void>;

    stop_ramp_A(): NonPayableTransactionObject<void>;

    admin_balances(
      i: number | string | BN
    ): NonPayableTransactionObject<string>;

    withdraw_admin_fees(): NonPayableTransactionObject<void>;

    factory(): NonPayableTransactionObject<string>;

    lp_token(): NonPayableTransactionObject<string>;

    coins(arg0: number | string | BN): NonPayableTransactionObject<string>;

    balances(arg0: number | string | BN): NonPayableTransactionObject<string>;

    fee(): NonPayableTransactionObject<string>;

    initial_A(): NonPayableTransactionObject<string>;

    future_A(): NonPayableTransactionObject<string>;

    initial_A_time(): NonPayableTransactionObject<string>;

    future_A_time(): NonPayableTransactionObject<string>;
  };
  events: {
    TokenExchange(cb?: Callback<TokenExchange>): EventEmitter;
    TokenExchange(
      options?: EventOptions,
      cb?: Callback<TokenExchange>
    ): EventEmitter;

    AddLiquidity(cb?: Callback<AddLiquidity>): EventEmitter;
    AddLiquidity(
      options?: EventOptions,
      cb?: Callback<AddLiquidity>
    ): EventEmitter;

    RemoveLiquidity(cb?: Callback<RemoveLiquidity>): EventEmitter;
    RemoveLiquidity(
      options?: EventOptions,
      cb?: Callback<RemoveLiquidity>
    ): EventEmitter;

    RemoveLiquidityOne(cb?: Callback<RemoveLiquidityOne>): EventEmitter;
    RemoveLiquidityOne(
      options?: EventOptions,
      cb?: Callback<RemoveLiquidityOne>
    ): EventEmitter;

    RemoveLiquidityImbalance(
      cb?: Callback<RemoveLiquidityImbalance>
    ): EventEmitter;
    RemoveLiquidityImbalance(
      options?: EventOptions,
      cb?: Callback<RemoveLiquidityImbalance>
    ): EventEmitter;

    RampA(cb?: Callback<RampA>): EventEmitter;
    RampA(options?: EventOptions, cb?: Callback<RampA>): EventEmitter;

    StopRampA(cb?: Callback<StopRampA>): EventEmitter;
    StopRampA(options?: EventOptions, cb?: Callback<StopRampA>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "TokenExchange", cb: Callback<TokenExchange>): void;
  once(
    event: "TokenExchange",
    options: EventOptions,
    cb: Callback<TokenExchange>
  ): void;

  once(event: "AddLiquidity", cb: Callback<AddLiquidity>): void;
  once(
    event: "AddLiquidity",
    options: EventOptions,
    cb: Callback<AddLiquidity>
  ): void;

  once(event: "RemoveLiquidity", cb: Callback<RemoveLiquidity>): void;
  once(
    event: "RemoveLiquidity",
    options: EventOptions,
    cb: Callback<RemoveLiquidity>
  ): void;

  once(event: "RemoveLiquidityOne", cb: Callback<RemoveLiquidityOne>): void;
  once(
    event: "RemoveLiquidityOne",
    options: EventOptions,
    cb: Callback<RemoveLiquidityOne>
  ): void;

  once(
    event: "RemoveLiquidityImbalance",
    cb: Callback<RemoveLiquidityImbalance>
  ): void;
  once(
    event: "RemoveLiquidityImbalance",
    options: EventOptions,
    cb: Callback<RemoveLiquidityImbalance>
  ): void;

  once(event: "RampA", cb: Callback<RampA>): void;
  once(event: "RampA", options: EventOptions, cb: Callback<RampA>): void;

  once(event: "StopRampA", cb: Callback<StopRampA>): void;
  once(
    event: "StopRampA",
    options: EventOptions,
    cb: Callback<StopRampA>
  ): void;
}