/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type { ContractOptions } from 'web3-eth-contract';
import type { NonPayableTransactionObject, BaseContract } from './types';

export interface CeETHVault extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions,
  ): CeETHVault;
  clone(): CeETHVault;
  methods: {
    getWithdrawalFee(): NonPayableTransactionObject<string>;
  };
  events: {};
}
