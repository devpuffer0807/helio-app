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

export type AdminChanged = ContractEventLog<{
  previousAdmin: string;
  newAdmin: string;
  0: string;
  1: string;
}>;
export type AuctionFinished = ContractEventLog<{
  token: string;
  keeper: string;
  amount: string;
  0: string;
  1: string;
  2: string;
}>;
export type AuctionStarted = ContractEventLog<{
  token: string;
  user: string;
  amount: string;
  price: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type BeaconUpgraded = ContractEventLog<{
  beacon: string;
  0: string;
}>;
export type Borrow = ContractEventLog<{
  user: string;
  collateral: string;
  amount: string;
  liquidationPrice: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type CollateralDisabled = ContractEventLog<{
  token: string;
  ilk: string;
  0: string;
  1: string;
}>;
export type CollateralEnabled = ContractEventLog<{
  token: string;
  ilk: string;
  0: string;
  1: string;
}>;
export type Deposit = ContractEventLog<{
  user: string;
  amount: string;
  0: string;
  1: string;
}>;
export type Initialized = ContractEventLog<{
  version: string;
  0: string;
}>;
export type Liquidation = ContractEventLog<{
  user: string;
  collateral: string;
  amount: string;
  leftover: string;
  0: string;
  1: string;
  2: string;
  3: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type Payback = ContractEventLog<{
  user: string;
  collateral: string;
  amount: string;
  debt: string;
  liquidationPrice: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}>;
export type Upgraded = ContractEventLog<{
  implementation: string;
  0: string;
}>;
export type Withdraw = ContractEventLog<{
  user: string;
  amount: string;
  0: string;
  1: string;
}>;

export interface Interaction extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): Interaction;
  clone(): Interaction;
  methods: {
    availableToBorrow(
      token: string,
      usr: string
    ): NonPayableTransactionObject<string>;

    borrow(
      token: string,
      hayAmount: number | string | BN
    ): NonPayableTransactionObject<string>;

    borrowApr(token: string): NonPayableTransactionObject<string>;

    borrowed(token: string, usr: string): NonPayableTransactionObject<string>;

    buyFromAuction(
      token: string,
      auctionId: number | string | BN,
      collateralAmount: number | string | BN,
      maxPrice: number | string | BN,
      receiverAddress: string
    ): NonPayableTransactionObject<void>;

    collateralPrice(token: string): NonPayableTransactionObject<string>;

    collateralRate(token: string): NonPayableTransactionObject<string>;

    collateralTVL(token: string): NonPayableTransactionObject<string>;

    collaterals(arg0: string): NonPayableTransactionObject<{
      gem: string;
      ilk: string;
      live: string;
      clip: string;
      0: string;
      1: string;
      2: string;
      3: string;
    }>;

    currentLiquidationPrice(
      token: string,
      usr: string
    ): NonPayableTransactionObject<string>;

    deny(usr: string): NonPayableTransactionObject<void>;

    deposit(
      participant: string,
      token: string,
      dink: number | string | BN
    ): NonPayableTransactionObject<string>;

    depositTVL(token: string): NonPayableTransactionObject<string>;

    deposits(arg0: string): NonPayableTransactionObject<string>;

    dog(): NonPayableTransactionObject<string>;

    drip(token: string): NonPayableTransactionObject<void>;

    dropRewards(token: string, usr: string): NonPayableTransactionObject<void>;

    estimatedLiquidationPrice(
      token: string,
      usr: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<string>;

    estimatedLiquidationPriceHAY(
      token: string,
      usr: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<string>;

    free(token: string, usr: string): NonPayableTransactionObject<string>;

    getAllActiveAuctionsForToken(
      token: string
    ): NonPayableTransactionObject<
      [string, string, string, string, string, string][]
    >;

    getAuctionStatus(
      token: string,
      auctionId: number | string | BN
    ): NonPayableTransactionObject<{
      0: boolean;
      1: string;
      2: string;
      3: string;
    }>;

    hay(): NonPayableTransactionObject<string>;

    hayJoin(): NonPayableTransactionObject<string>;

    hayPrice(token: string): NonPayableTransactionObject<string>;

    helioProviders(arg0: string): NonPayableTransactionObject<string>;

    helioRewards(): NonPayableTransactionObject<string>;

    initialize(
      vat_: string,
      spot_: string,
      hay_: string,
      hayJoin_: string,
      jug_: string,
      dog_: string,
      rewards_: string
    ): NonPayableTransactionObject<void>;

    jug(): NonPayableTransactionObject<string>;

    locked(token: string, usr: string): NonPayableTransactionObject<string>;

    owner(): NonPayableTransactionObject<string>;

    payback(
      token: string,
      hayAmount: number | string | BN
    ): NonPayableTransactionObject<string>;

    poke(token: string): NonPayableTransactionObject<void>;

    proxiableUUID(): NonPayableTransactionObject<string>;

    rely(usr: string): NonPayableTransactionObject<void>;

    removeCollateralType(token: string): NonPayableTransactionObject<void>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    resetAuction(
      token: string,
      auctionId: number | string | BN,
      keeper: string
    ): NonPayableTransactionObject<void>;

    setCollateralType(
      token: string,
      gemJoin: string,
      ilk: string | number[],
      clip: string,
      mat: number | string | BN
    ): NonPayableTransactionObject<void>;

    setCores(
      vat_: string,
      spot_: string,
      hayJoin_: string,
      jug_: string
    ): NonPayableTransactionObject<void>;

    setHayApprove(): NonPayableTransactionObject<void>;

    setHelioProvider(
      token: string,
      helioProvider: string
    ): NonPayableTransactionObject<void>;

    setRewards(rewards: string): NonPayableTransactionObject<void>;

    spotter(): NonPayableTransactionObject<string>;

    startAuction(
      token: string,
      user: string,
      keeper: string
    ): NonPayableTransactionObject<string>;

    stringToBytes32(source: string): NonPayableTransactionObject<string>;

    totalPegLiquidity(): NonPayableTransactionObject<string>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    upchostClipper(token: string): NonPayableTransactionObject<void>;

    upgradeTo(newImplementation: string): NonPayableTransactionObject<void>;

    upgradeToAndCall(
      newImplementation: string,
      data: string | number[]
    ): PayableTransactionObject<void>;

    vat(): NonPayableTransactionObject<string>;

    wards(arg0: string): NonPayableTransactionObject<string>;

    willBorrow(
      token: string,
      usr: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<string>;

    withdraw(
      participant: string,
      token: string,
      dink: number | string | BN
    ): NonPayableTransactionObject<string>;
  };
  events: {
    AdminChanged(cb?: Callback<AdminChanged>): EventEmitter;
    AdminChanged(
      options?: EventOptions,
      cb?: Callback<AdminChanged>
    ): EventEmitter;

    AuctionFinished(cb?: Callback<AuctionFinished>): EventEmitter;
    AuctionFinished(
      options?: EventOptions,
      cb?: Callback<AuctionFinished>
    ): EventEmitter;

    AuctionStarted(cb?: Callback<AuctionStarted>): EventEmitter;
    AuctionStarted(
      options?: EventOptions,
      cb?: Callback<AuctionStarted>
    ): EventEmitter;

    BeaconUpgraded(cb?: Callback<BeaconUpgraded>): EventEmitter;
    BeaconUpgraded(
      options?: EventOptions,
      cb?: Callback<BeaconUpgraded>
    ): EventEmitter;

    Borrow(cb?: Callback<Borrow>): EventEmitter;
    Borrow(options?: EventOptions, cb?: Callback<Borrow>): EventEmitter;

    CollateralDisabled(cb?: Callback<CollateralDisabled>): EventEmitter;
    CollateralDisabled(
      options?: EventOptions,
      cb?: Callback<CollateralDisabled>
    ): EventEmitter;

    CollateralEnabled(cb?: Callback<CollateralEnabled>): EventEmitter;
    CollateralEnabled(
      options?: EventOptions,
      cb?: Callback<CollateralEnabled>
    ): EventEmitter;

    Deposit(cb?: Callback<Deposit>): EventEmitter;
    Deposit(options?: EventOptions, cb?: Callback<Deposit>): EventEmitter;

    Initialized(cb?: Callback<Initialized>): EventEmitter;
    Initialized(
      options?: EventOptions,
      cb?: Callback<Initialized>
    ): EventEmitter;

    Liquidation(cb?: Callback<Liquidation>): EventEmitter;
    Liquidation(
      options?: EventOptions,
      cb?: Callback<Liquidation>
    ): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    Payback(cb?: Callback<Payback>): EventEmitter;
    Payback(options?: EventOptions, cb?: Callback<Payback>): EventEmitter;

    Upgraded(cb?: Callback<Upgraded>): EventEmitter;
    Upgraded(options?: EventOptions, cb?: Callback<Upgraded>): EventEmitter;

    Withdraw(cb?: Callback<Withdraw>): EventEmitter;
    Withdraw(options?: EventOptions, cb?: Callback<Withdraw>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "AdminChanged", cb: Callback<AdminChanged>): void;
  once(
    event: "AdminChanged",
    options: EventOptions,
    cb: Callback<AdminChanged>
  ): void;

  once(event: "AuctionFinished", cb: Callback<AuctionFinished>): void;
  once(
    event: "AuctionFinished",
    options: EventOptions,
    cb: Callback<AuctionFinished>
  ): void;

  once(event: "AuctionStarted", cb: Callback<AuctionStarted>): void;
  once(
    event: "AuctionStarted",
    options: EventOptions,
    cb: Callback<AuctionStarted>
  ): void;

  once(event: "BeaconUpgraded", cb: Callback<BeaconUpgraded>): void;
  once(
    event: "BeaconUpgraded",
    options: EventOptions,
    cb: Callback<BeaconUpgraded>
  ): void;

  once(event: "Borrow", cb: Callback<Borrow>): void;
  once(event: "Borrow", options: EventOptions, cb: Callback<Borrow>): void;

  once(event: "CollateralDisabled", cb: Callback<CollateralDisabled>): void;
  once(
    event: "CollateralDisabled",
    options: EventOptions,
    cb: Callback<CollateralDisabled>
  ): void;

  once(event: "CollateralEnabled", cb: Callback<CollateralEnabled>): void;
  once(
    event: "CollateralEnabled",
    options: EventOptions,
    cb: Callback<CollateralEnabled>
  ): void;

  once(event: "Deposit", cb: Callback<Deposit>): void;
  once(event: "Deposit", options: EventOptions, cb: Callback<Deposit>): void;

  once(event: "Initialized", cb: Callback<Initialized>): void;
  once(
    event: "Initialized",
    options: EventOptions,
    cb: Callback<Initialized>
  ): void;

  once(event: "Liquidation", cb: Callback<Liquidation>): void;
  once(
    event: "Liquidation",
    options: EventOptions,
    cb: Callback<Liquidation>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "Payback", cb: Callback<Payback>): void;
  once(event: "Payback", options: EventOptions, cb: Callback<Payback>): void;

  once(event: "Upgraded", cb: Callback<Upgraded>): void;
  once(event: "Upgraded", options: EventOptions, cb: Callback<Upgraded>): void;

  once(event: "Withdraw", cb: Callback<Withdraw>): void;
  once(event: "Withdraw", options: EventOptions, cb: Callback<Withdraw>): void;
}
