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

export type Approval = ContractEventLog<{
  owner: string;
  spender: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type MintedRewardsSupply = ContractEventLog<{
  rewardsContract: string;
  amount: string;
  0: string;
  1: string;
}>;
export type Start = ContractEventLog<{
  user: string;
  0: string;
}>;
export type Stop = ContractEventLog<{
  user: string;
  0: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;

export interface MainToken extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): MainToken;
  clone(): MainToken;
  methods: {
    allowance(
      owner: string,
      spender: string
    ): NonPayableTransactionObject<string>;

    approve(
      spender: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    balanceOf(account: string): NonPayableTransactionObject<string>;

    burn(_amount: number | string | BN): NonPayableTransactionObject<boolean>;

    decimals(): NonPayableTransactionObject<string>;

    decreaseAllowance(
      spender: string,
      subtractedValue: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    deny(usr: string): NonPayableTransactionObject<void>;

    increaseAllowance(
      spender: string,
      addedValue: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    mint(
      _to: string,
      _amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    name(): NonPayableTransactionObject<string>;

    rely(usr: string): NonPayableTransactionObject<void>;

    rewards(): NonPayableTransactionObject<string>;

    start(): NonPayableTransactionObject<void>;

    stop(): NonPayableTransactionObject<void>;

    stopped(): NonPayableTransactionObject<boolean>;

    symbol(): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;

    transfer(
      to: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transferFrom(
      from: string,
      to: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    wards(arg0: string): NonPayableTransactionObject<string>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    MintedRewardsSupply(cb?: Callback<MintedRewardsSupply>): EventEmitter;
    MintedRewardsSupply(
      options?: EventOptions,
      cb?: Callback<MintedRewardsSupply>
    ): EventEmitter;

    Start(cb?: Callback<Start>): EventEmitter;
    Start(options?: EventOptions, cb?: Callback<Start>): EventEmitter;

    Stop(cb?: Callback<Stop>): EventEmitter;
    Stop(options?: EventOptions, cb?: Callback<Stop>): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "MintedRewardsSupply", cb: Callback<MintedRewardsSupply>): void;
  once(
    event: "MintedRewardsSupply",
    options: EventOptions,
    cb: Callback<MintedRewardsSupply>
  ): void;

  once(event: "Start", cb: Callback<Start>): void;
  once(event: "Start", options: EventOptions, cb: Callback<Start>): void;

  once(event: "Stop", cb: Callback<Stop>): void;
  once(event: "Stop", options: EventOptions, cb: Callback<Stop>): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;
}
