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

export type Add = ContractEventLog<{
  pid: string;
  lpToken: string;
  rewarder: string;
  0: string;
  1: string;
  2: string;
}>;
export type Deposit = ContractEventLog<{
  user: string;
  pid: string;
  amount: string;
  0: string;
  1: string;
  2: string;
}>;
export type DepositFor = ContractEventLog<{
  user: string;
  pid: string;
  amount: string;
  0: string;
  1: string;
  2: string;
}>;
export type EmergencyWithdraw = ContractEventLog<{
  user: string;
  pid: string;
  amount: string;
  0: string;
  1: string;
  2: string;
}>;
export type EmergencyWomWithdraw = ContractEventLog<{
  owner: string;
  balance: string;
  0: string;
  1: string;
}>;
export type Harvest = ContractEventLog<{
  user: string;
  pid: string;
  amount: string;
  0: string;
  1: string;
  2: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type Paused = ContractEventLog<{
  account: string;
  0: string;
}>;
export type SetRewarder = ContractEventLog<{
  pid: string;
  rewarder: string;
  0: string;
  1: string;
}>;
export type Unpaused = ContractEventLog<{
  account: string;
  0: string;
}>;
export type UpdateEmissionPartition = ContractEventLog<{
  user: string;
  basePartition: string;
  boostedPartition: string;
  0: string;
  1: string;
  2: string;
}>;
export type UpdateVeWOM = ContractEventLog<{
  user: string;
  oldVeWOM: string;
  newVeWOM: string;
  0: string;
  1: string;
  2: string;
}>;
export type UpdateVoter = ContractEventLog<{
  user: string;
  oldVoter: string;
  newVoter: string;
  0: string;
  1: string;
  2: string;
}>;
export type Withdraw = ContractEventLog<{
  user: string;
  pid: string;
  amount: string;
  0: string;
  1: string;
  2: string;
}>;

export interface MagpieMasterWombat extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): MagpieMasterWombat;
  clone(): MagpieMasterWombat;
  methods: {
    ACC_TOKEN_PRECISION(): NonPayableTransactionObject<string>;

    REWARD_DURATION(): NonPayableTransactionObject<string>;

    add(_lpToken: string, _rewarder: string): NonPayableTransactionObject<void>;

    basePartition(): NonPayableTransactionObject<string>;

    boostedPartition(): NonPayableTransactionObject<string>;

    calRewardPerUnit(_pid: number | string | BN): NonPayableTransactionObject<{
      accWomPerShare: string;
      accWomPerFactorShare: string;
      0: string;
      1: string;
    }>;

    deposit(
      _pid: number | string | BN,
      _amount: number | string | BN
    ): NonPayableTransactionObject<{
      reward: string;
      additionalRewards: string[];
      0: string;
      1: string[];
    }>;

    depositFor(
      _pid: number | string | BN,
      _amount: number | string | BN,
      _user: string
    ): NonPayableTransactionObject<void>;

    emergencyWithdraw(
      _pid: number | string | BN
    ): NonPayableTransactionObject<void>;

    emergencyWomWithdraw(): NonPayableTransactionObject<void>;

    getAssetPid(asset: string): NonPayableTransactionObject<string>;

    initialize(
      _wom: string,
      _veWom: string,
      _voter: string,
      _basePartition: number | string | BN
    ): NonPayableTransactionObject<void>;

    lastTimeRewardApplicable(
      _periodFinish: number | string | BN
    ): NonPayableTransactionObject<string>;

    massUpdatePools(): NonPayableTransactionObject<void>;

    migrate(_pids: (number | string | BN)[]): NonPayableTransactionObject<void>;

    multiClaim(_pids: (number | string | BN)[]): NonPayableTransactionObject<{
      reward: string;
      amounts: string[];
      additionalRewards: string[][];
      0: string;
      1: string[];
      2: string[][];
    }>;

    notifyRewardAmount(
      _lpToken: string,
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    owner(): NonPayableTransactionObject<string>;

    pause(): NonPayableTransactionObject<void>;

    paused(): NonPayableTransactionObject<boolean>;

    pendingTokens(
      _pid: number | string | BN,
      _user: string
    ): NonPayableTransactionObject<{
      pendingRewards: string;
      bonusTokenAddresses: string[];
      bonusTokenSymbols: string[];
      pendingBonusRewards: string[];
      0: string;
      1: string[];
      2: string[];
      3: string[];
    }>;

    poolInfo(_pid: number | string | BN): NonPayableTransactionObject<{
      lpToken: string;
      allocPoint: string;
      rewarder: string;
      sumOfFactors: string;
      accWomPerShare: string;
      accWomPerFactorShare: string;
      lastRewardTimestamp: string;
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
    }>;

    poolInfoV3(arg0: number | string | BN): NonPayableTransactionObject<{
      lpToken: string;
      rewarder: string;
      periodFinish: string;
      sumOfFactors: string;
      rewardRate: string;
      accWomPerShare: string;
      accWomPerFactorShare: string;
      lastRewardTimestamp: string;
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: string;
      7: string;
    }>;

    poolLength(): NonPayableTransactionObject<string>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    rewarderBonusTokenInfo(
      _pid: number | string | BN
    ): NonPayableTransactionObject<{
      bonusTokenAddresses: string[];
      bonusTokenSymbols: string[];
      0: string[];
      1: string[];
    }>;

    setNewMasterWombat(
      _newMasterWombat: string
    ): NonPayableTransactionObject<void>;

    setRewarder(
      _pid: number | string | BN,
      _rewarder: string
    ): NonPayableTransactionObject<void>;

    setVeWom(_newVeWom: string): NonPayableTransactionObject<void>;

    setVoter(_newVoter: string): NonPayableTransactionObject<void>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    unpause(): NonPayableTransactionObject<void>;

    updateEmissionPartition(
      _basePartition: number | string | BN
    ): NonPayableTransactionObject<void>;

    updateFactor(
      _user: string,
      _newVeWomBalance: number | string | BN
    ): NonPayableTransactionObject<void>;

    updatePool(_pid: number | string | BN): NonPayableTransactionObject<void>;

    userInfo(
      arg0: number | string | BN,
      arg1: string
    ): NonPayableTransactionObject<{
      amount: string;
      factor: string;
      rewardDebt: string;
      pendingWom: string;
      0: string;
      1: string;
      2: string;
      3: string;
    }>;

    veWom(): NonPayableTransactionObject<string>;

    voter(): NonPayableTransactionObject<string>;

    withdraw(
      _pid: number | string | BN,
      _amount: number | string | BN
    ): NonPayableTransactionObject<{
      reward: string;
      additionalRewards: string[];
      0: string;
      1: string[];
    }>;

    wom(): NonPayableTransactionObject<string>;
  };
  events: {
    Add(cb?: Callback<Add>): EventEmitter;
    Add(options?: EventOptions, cb?: Callback<Add>): EventEmitter;

    Deposit(cb?: Callback<Deposit>): EventEmitter;
    Deposit(options?: EventOptions, cb?: Callback<Deposit>): EventEmitter;

    DepositFor(cb?: Callback<DepositFor>): EventEmitter;
    DepositFor(options?: EventOptions, cb?: Callback<DepositFor>): EventEmitter;

    EmergencyWithdraw(cb?: Callback<EmergencyWithdraw>): EventEmitter;
    EmergencyWithdraw(
      options?: EventOptions,
      cb?: Callback<EmergencyWithdraw>
    ): EventEmitter;

    EmergencyWomWithdraw(cb?: Callback<EmergencyWomWithdraw>): EventEmitter;
    EmergencyWomWithdraw(
      options?: EventOptions,
      cb?: Callback<EmergencyWomWithdraw>
    ): EventEmitter;

    Harvest(cb?: Callback<Harvest>): EventEmitter;
    Harvest(options?: EventOptions, cb?: Callback<Harvest>): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    Paused(cb?: Callback<Paused>): EventEmitter;
    Paused(options?: EventOptions, cb?: Callback<Paused>): EventEmitter;

    SetRewarder(cb?: Callback<SetRewarder>): EventEmitter;
    SetRewarder(
      options?: EventOptions,
      cb?: Callback<SetRewarder>
    ): EventEmitter;

    Unpaused(cb?: Callback<Unpaused>): EventEmitter;
    Unpaused(options?: EventOptions, cb?: Callback<Unpaused>): EventEmitter;

    UpdateEmissionPartition(
      cb?: Callback<UpdateEmissionPartition>
    ): EventEmitter;
    UpdateEmissionPartition(
      options?: EventOptions,
      cb?: Callback<UpdateEmissionPartition>
    ): EventEmitter;

    UpdateVeWOM(cb?: Callback<UpdateVeWOM>): EventEmitter;
    UpdateVeWOM(
      options?: EventOptions,
      cb?: Callback<UpdateVeWOM>
    ): EventEmitter;

    UpdateVoter(cb?: Callback<UpdateVoter>): EventEmitter;
    UpdateVoter(
      options?: EventOptions,
      cb?: Callback<UpdateVoter>
    ): EventEmitter;

    Withdraw(cb?: Callback<Withdraw>): EventEmitter;
    Withdraw(options?: EventOptions, cb?: Callback<Withdraw>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Add", cb: Callback<Add>): void;
  once(event: "Add", options: EventOptions, cb: Callback<Add>): void;

  once(event: "Deposit", cb: Callback<Deposit>): void;
  once(event: "Deposit", options: EventOptions, cb: Callback<Deposit>): void;

  once(event: "DepositFor", cb: Callback<DepositFor>): void;
  once(
    event: "DepositFor",
    options: EventOptions,
    cb: Callback<DepositFor>
  ): void;

  once(event: "EmergencyWithdraw", cb: Callback<EmergencyWithdraw>): void;
  once(
    event: "EmergencyWithdraw",
    options: EventOptions,
    cb: Callback<EmergencyWithdraw>
  ): void;

  once(event: "EmergencyWomWithdraw", cb: Callback<EmergencyWomWithdraw>): void;
  once(
    event: "EmergencyWomWithdraw",
    options: EventOptions,
    cb: Callback<EmergencyWomWithdraw>
  ): void;

  once(event: "Harvest", cb: Callback<Harvest>): void;
  once(event: "Harvest", options: EventOptions, cb: Callback<Harvest>): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "Paused", cb: Callback<Paused>): void;
  once(event: "Paused", options: EventOptions, cb: Callback<Paused>): void;

  once(event: "SetRewarder", cb: Callback<SetRewarder>): void;
  once(
    event: "SetRewarder",
    options: EventOptions,
    cb: Callback<SetRewarder>
  ): void;

  once(event: "Unpaused", cb: Callback<Unpaused>): void;
  once(event: "Unpaused", options: EventOptions, cb: Callback<Unpaused>): void;

  once(
    event: "UpdateEmissionPartition",
    cb: Callback<UpdateEmissionPartition>
  ): void;
  once(
    event: "UpdateEmissionPartition",
    options: EventOptions,
    cb: Callback<UpdateEmissionPartition>
  ): void;

  once(event: "UpdateVeWOM", cb: Callback<UpdateVeWOM>): void;
  once(
    event: "UpdateVeWOM",
    options: EventOptions,
    cb: Callback<UpdateVeWOM>
  ): void;

  once(event: "UpdateVoter", cb: Callback<UpdateVoter>): void;
  once(
    event: "UpdateVoter",
    options: EventOptions,
    cb: Callback<UpdateVoter>
  ): void;

  once(event: "Withdraw", cb: Callback<Withdraw>): void;
  once(event: "Withdraw", options: EventOptions, cb: Callback<Withdraw>): void;
}
