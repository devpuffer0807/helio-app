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

export type Cage = ContractEventLog<{}>;
export type Exit = ContractEventLog<{
  user: string;
  amount: string;
  0: string;
  1: string;
}>;
export type ExitDelayUpdated = ContractEventLog<{
  exitDelay: string;
  0: string;
}>;
export type Initialized = ContractEventLog<{
  version: string;
  0: string;
}>;
export type Join = ContractEventLog<{
  user: string;
  amount: string;
  0: string;
  1: string;
}>;
export type Redeem = ContractEventLog<{
  user: string[];
  0: string[];
}>;
export type Replenished = ContractEventLog<{
  reward: string;
  0: string;
}>;
export type SpreadUpdated = ContractEventLog<{
  newDuration: string;
  0: string;
}>;

export interface Jar extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): Jar;
  clone(): Jar;
  methods: {
    HAY(): NonPayableTransactionObject<string>;

    addOperator(): NonPayableTransactionObject<void>;

    balanceOf(arg0: string): NonPayableTransactionObject<string>;

    cage(): NonPayableTransactionObject<void>;

    decimals(): NonPayableTransactionObject<string>;

    deny(guy: string): NonPayableTransactionObject<void>;

    earned(account: string): NonPayableTransactionObject<string>;

    endTime(): NonPayableTransactionObject<string>;

    exit(wad: number | string | BN): NonPayableTransactionObject<void>;

    exitDelay(): NonPayableTransactionObject<string>;

    extractDust(): NonPayableTransactionObject<void>;

    flashLoanDelay(): NonPayableTransactionObject<string>;

    initialize(
      _name: string,
      _symbol: string,
      _hayToken: string,
      _spread: number | string | BN,
      _exitDelay: number | string | BN,
      _flashLoanDelay: number | string | BN
    ): NonPayableTransactionObject<void>;

    join(wad: number | string | BN): NonPayableTransactionObject<void>;

    lastTimeRewardApplicable(): NonPayableTransactionObject<string>;

    lastUpdate(): NonPayableTransactionObject<string>;

    live(): NonPayableTransactionObject<string>;

    name(): NonPayableTransactionObject<string>;

    operators(arg0: string): NonPayableTransactionObject<string>;

    rate(): NonPayableTransactionObject<string>;

    redeemBatch(accounts: string[]): NonPayableTransactionObject<void>;

    rely(guy: string): NonPayableTransactionObject<void>;

    removeOperator(): NonPayableTransactionObject<void>;

    replenish(
      wad: number | string | BN,
      newSpread: boolean
    ): NonPayableTransactionObject<void>;

    rewards(arg0: string): NonPayableTransactionObject<string>;

    setExitDelay(
      _exitDelay: number | string | BN
    ): NonPayableTransactionObject<void>;

    setSpread(_spread: number | string | BN): NonPayableTransactionObject<void>;

    spread(): NonPayableTransactionObject<string>;

    stakeTime(arg0: string): NonPayableTransactionObject<string>;

    symbol(): NonPayableTransactionObject<string>;

    tokensPerShare(): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;

    tps(): NonPayableTransactionObject<string>;

    tpsPaid(arg0: string): NonPayableTransactionObject<string>;

    unstakeTime(arg0: string): NonPayableTransactionObject<string>;

    wards(arg0: string): NonPayableTransactionObject<string>;

    withdrawn(arg0: string): NonPayableTransactionObject<string>;
  };
  events: {
    Cage(cb?: Callback<Cage>): EventEmitter;
    Cage(options?: EventOptions, cb?: Callback<Cage>): EventEmitter;

    Exit(cb?: Callback<Exit>): EventEmitter;
    Exit(options?: EventOptions, cb?: Callback<Exit>): EventEmitter;

    ExitDelayUpdated(cb?: Callback<ExitDelayUpdated>): EventEmitter;
    ExitDelayUpdated(
      options?: EventOptions,
      cb?: Callback<ExitDelayUpdated>
    ): EventEmitter;

    Initialized(cb?: Callback<Initialized>): EventEmitter;
    Initialized(
      options?: EventOptions,
      cb?: Callback<Initialized>
    ): EventEmitter;

    Join(cb?: Callback<Join>): EventEmitter;
    Join(options?: EventOptions, cb?: Callback<Join>): EventEmitter;

    Redeem(cb?: Callback<Redeem>): EventEmitter;
    Redeem(options?: EventOptions, cb?: Callback<Redeem>): EventEmitter;

    Replenished(cb?: Callback<Replenished>): EventEmitter;
    Replenished(
      options?: EventOptions,
      cb?: Callback<Replenished>
    ): EventEmitter;

    SpreadUpdated(cb?: Callback<SpreadUpdated>): EventEmitter;
    SpreadUpdated(
      options?: EventOptions,
      cb?: Callback<SpreadUpdated>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Cage", cb: Callback<Cage>): void;
  once(event: "Cage", options: EventOptions, cb: Callback<Cage>): void;

  once(event: "Exit", cb: Callback<Exit>): void;
  once(event: "Exit", options: EventOptions, cb: Callback<Exit>): void;

  once(event: "ExitDelayUpdated", cb: Callback<ExitDelayUpdated>): void;
  once(
    event: "ExitDelayUpdated",
    options: EventOptions,
    cb: Callback<ExitDelayUpdated>
  ): void;

  once(event: "Initialized", cb: Callback<Initialized>): void;
  once(
    event: "Initialized",
    options: EventOptions,
    cb: Callback<Initialized>
  ): void;

  once(event: "Join", cb: Callback<Join>): void;
  once(event: "Join", options: EventOptions, cb: Callback<Join>): void;

  once(event: "Redeem", cb: Callback<Redeem>): void;
  once(event: "Redeem", options: EventOptions, cb: Callback<Redeem>): void;

  once(event: "Replenished", cb: Callback<Replenished>): void;
  once(
    event: "Replenished",
    options: EventOptions,
    cb: Callback<Replenished>
  ): void;

  once(event: "SpreadUpdated", cb: Callback<SpreadUpdated>): void;
  once(
    event: "SpreadUpdated",
    options: EventOptions,
    cb: Callback<SpreadUpdated>
  ): void;
}
