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

export type Initialized = ContractEventLog<{
  version: string;
  0: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type StableSwapInfoChanged = ContractEventLog<{
  stableSwap: string;
  swapInfo: [string, string, string, string];
  0: string;
  1: [string, string, string, string];
}>;

export interface PancakeDepositProxyStable extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): PancakeDepositProxyStable;
  clone(): PancakeDepositProxyStable;
  methods: {
    addSupportedTokens(
      stableSwap: string,
      token0: string,
      token1: string,
      pid: number | string | BN
    ): NonPayableTransactionObject<void>;

    depositToFarming(
      stableSwap: string,
      amount0: number | string | BN,
      amount1: number | string | BN,
      minMintAmount: number | string | BN
    ): NonPayableTransactionObject<void>;

    farming(): NonPayableTransactionObject<string>;

    initialize(_farming: string): NonPayableTransactionObject<void>;

    owner(): NonPayableTransactionObject<string>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    supportedPids(arg0: string): NonPayableTransactionObject<{
      token0: string;
      token1: string;
      lp: string;
      pid: string;
      0: string;
      1: string;
      2: string;
      3: string;
    }>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;
  };
  events: {
    Initialized(cb?: Callback<Initialized>): EventEmitter;
    Initialized(
      options?: EventOptions,
      cb?: Callback<Initialized>
    ): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    StableSwapInfoChanged(cb?: Callback<StableSwapInfoChanged>): EventEmitter;
    StableSwapInfoChanged(
      options?: EventOptions,
      cb?: Callback<StableSwapInfoChanged>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Initialized", cb: Callback<Initialized>): void;
  once(
    event: "Initialized",
    options: EventOptions,
    cb: Callback<Initialized>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(
    event: "StableSwapInfoChanged",
    cb: Callback<StableSwapInfoChanged>
  ): void;
  once(
    event: "StableSwapInfoChanged",
    options: EventOptions,
    cb: Callback<StableSwapInfoChanged>
  ): void;
}
