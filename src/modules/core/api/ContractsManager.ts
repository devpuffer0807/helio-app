import BigNumber from 'bignumber.js';
import { Log } from 'web3-core';
import { AbiItem } from 'web3-utils';

import { ProviderManagerSingleton } from 'modules/api';
import {
  convertToWei,
  getSafeHexAmount,
  increaseGasFeeByMultiplier,
  LOAN_TOKEN_ADDRESS,
  MAIN_TOKEN_ADDRESS,
  STAKED_TOKEN_ADDRESS,
} from 'modules/common';
import {
  BINANCE_POOL_ADDRESS,
  BinancePool,
  CeETHVault,
  CEETHVAULT_ADDRESS,
  COLLATERAL_MAIN_TOKEN_ADDRESS,
  COLLATERAL_SECOND_TOKEN_ADDRESS,
  CollateralToken,
  EllipsisFinance,
  ETH_TOKEN_ADDRESS,
  HayBusdLP,
  MagpieMaster,
  MagpieMasterWombat,
  MagpieMultiRewarderPerSec,
  MagpieRouter,
  Thena,
  Vat,
  VAT_CONTRACT_ADDRESS,
} from 'modules/core';
import {
  ELLIPSIS_FINANCE_ADDRESS,
  HAY_BUSD_LP_STABLE_TOKEN_ADDRESS,
  LOAN_COLLATERAL_SECOND_LP_TOKEN_ADDRESS,
  MAGPIE_HAY_LP_ADDRESS,
  MAGPIE_MASTER_ADDRESS,
  MAGPIE_MASTER_WOMBAT_ADDRESS,
  MAGPIE_ROUTER_ADDRESS,
  PANCAKE_STABLE_SWAP,
  THENA_ADDRESS,
} from 'modules/earn/consts';
import {
  AvailableWriteProviders,
  EEthereumNetworkId,
  Web3KeyWriteProvider,
} from 'modules/provider';

import {
  ETH_PROVIDER_CONTRACT_ADDRESS,
  FARMING_CONTRACT_ADDRESS,
  INTERACTION_CONTRACT_ADDRESS,
  JAR_CONTRACT_ADDRESS,
  PANCAKE_DEPOSIT_PROXY_ADDRESS,
  PANCAKE_DEPOSIT_PROXY_STABLE_ADDRESS,
  PANCAKE_ROUTER_ADDRESS,
  PROVIDER_CONTRACT_ADDRESS,
  REWARDS_CONTRACT_ADDRESS,
  SNBNB_TOKEN_ADDRESS,
  WBETH_TOKEN_ADDRESS,
} from '../consts';
import BINANCE_POOL_ABI from './contracts/binancePool.json';
import CEETHVAULT_ABI from './contracts/ceETHVault.json';
import ELLIPSIS_FINANCE_ABI from './contracts/ellipsisFinance.json';
import ERC20_TOKEN_ABI from './contracts/ERC20Token.json';
import ETH_PROVIDER_ABI from './contracts/ethProvider.json';
import COLLATERAL_MAIN_TOKEN_ABI from './contracts/exchangeCoin.json';
import FARMING_ABI from './contracts/farming.json';
import HAY_BUSD_LP_ABI from './contracts/hayBusdLP.json';
import INTERACTION_ABI from './contracts/interaction.json';
import JAR_ABI from './contracts/jar.json';
import LOAN_COLLATERAL_SECOND_LP_ABI from './contracts/loanCollateralSecondLP.json';
import LOAN_TOKEN_ABI from './contracts/loanToken.json';
import MAGPIE_MASTER_ABI from './contracts/magpieMaster.json';
import MAGPIE_MASTER_WOMBAT_ABI from './contracts/magpieMasterWombat.json';
import MAGPIE_MULTI_REWARDER_PER_SEC_ABI from './contracts/magpieMultiRewarderPerSec.json';
import MAGPIE_ROUTER_ABI from './contracts/magpieRouter.json';
import MAIN_TOKEN_ABI from './contracts/mainToken.json';
import PANCAKE_DEPOSIT_PROXY_ABI from './contracts/pancakeDepositProxy.json';
import PANCAKE_DEPOSIT_PROXY_STABLE_ABI from './contracts/pancakeDepositProxyStable.json';
import PANCAKE_ROUTER_ABI from './contracts/pancakeRouter.json';
import PANCAKE_STRATEGY_ABI from './contracts/pancakeStrategy.json';
import PROVIDER_ABI from './contracts/provider.json';
import REWARDS_ABI from './contracts/rewards.json';
import STABLE_SWAP_ABI from './contracts/stableSwap.json';
import STABLE_SWAP_LP_ABI from './contracts/stableSwapLP.json';
import STAKED_TOKEN_ABI from './contracts/stakedToken.json';
import THENA_ABI from './contracts/thena.json';
import VAT_ABI from './contracts/vat.json';
import WBETH_ABI from './contracts/wBETH.json';
import {
  ERC20Token,
  EthProvider,
  Farming,
  Interaction,
  Jar,
  LoanCollateralSecondLP,
  LoanToken,
  MainToken,
  PancakeDepositProxy,
  PancakeDepositProxyStable,
  PancakeRouter,
  PancakeStrategy,
  Provider,
  Rewards,
  StableSwap,
  StableSwapLP,
  StakedToken,
  WBETH,
} from './types';
import { BaseContract, PayableTx } from './types/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Arguments<T> = T extends (...args: infer A) => any ? A : never;
export type Events<T extends BaseContract> = T['events'];
export type EventCallback<
  Contract extends BaseContract,
  EventName extends keyof Events<Contract>,
> = Arguments<Events<Contract>[EventName]>[1];
export type GasInfo = {
  gasRatio: BigNumber;
  gasLimit: BigNumber;
};

export type EventPayload<
  Contract extends BaseContract,
  EventName extends keyof Events<Contract>,
> = Arguments<EventCallback<Contract, EventName>>[1];

export interface JsonInterface extends AbiItem {
  signature?: string;
}

interface GetGasInfoParams<
  Contract extends BaseContract,
  Method extends keyof Contract['methods'],
> {
  contract: Contract;
  method: Method;
  value?: BigNumber;
  args?: Parameters<Contract['methods'][Method]>;
}

export class ContractsManager {
  private static instance?: ContractsManager;

  private readonly provider: Web3KeyWriteProvider;

  public get currentAccount(): string {
    return this.provider.currentAccount;
  }

  private constructor(provider: Web3KeyWriteProvider) {
    ContractsManager.instance = this;

    this.provider = provider;
  }

  public static disconnect(): void {
    delete ContractsManager.instance;
  }

  public static async getInstance(): Promise<ContractsManager> {
    const providerInstance = await ProviderManagerSingleton.getInstance();
    const provider = await providerInstance.getProvider(
      AvailableWriteProviders.ethCompatible,
    );

    if (ContractsManager.instance) {
      return ContractsManager.instance;
    }

    const instance = new ContractsManager(provider as Web3KeyWriteProvider);
    const isCorrectChain = await ContractsManager.isCorrectNetwork(
      provider as Web3KeyWriteProvider,
    );

    if (isCorrectChain && !provider.isConnected()) {
      await provider.connect();
    }

    return instance;
  }

  static async isCorrectNetwork(
    provider: Web3KeyWriteProvider,
  ): Promise<boolean> {
    const web3 = provider.getWeb3();
    const chainId = await web3.eth.getChainId();

    return [
      EEthereumNetworkId.smartchain,
      EEthereumNetworkId.smartchainTestnet,
    ].includes(chainId);
  }

  private async getContract<T extends BaseContract>(
    address: string,
    abi: unknown,
  ): Promise<T> {
    const web3 = (await this.getProvider()).getWeb3();

    return new web3.eth.Contract(abi as AbiItem[], address) as unknown as T;
  }

  public async getProvider(isForceRead = false): Promise<Web3KeyWriteProvider> {
    if (isForceRead) {
      return this.provider;
    }

    const isCorrectChain = await ContractsManager.isCorrectNetwork(
      this.provider,
    );

    if (isCorrectChain && !this.provider.isConnected()) {
      await this.provider.connect();
    }

    return this.provider;
  }

  public getStakedTokenContract(): Promise<StakedToken> {
    return this.getContract(STAKED_TOKEN_ADDRESS, STAKED_TOKEN_ABI);
  }

  public async getInteractionContract(): Promise<Interaction> {
    return this.getContract(INTERACTION_CONTRACT_ADDRESS, INTERACTION_ABI);
  }

  public getLoanTokenContract(): Promise<LoanToken> {
    return this.getContract(LOAN_TOKEN_ADDRESS, LOAN_TOKEN_ABI);
  }

  public getMainTokenContract(): Promise<MainToken> {
    return this.getContract(MAIN_TOKEN_ADDRESS, MAIN_TOKEN_ABI);
  }

  public getRewardsContract(): Promise<Rewards> {
    return this.getContract(REWARDS_CONTRACT_ADDRESS, REWARDS_ABI);
  }

  public getWBETHContract(): Promise<WBETH> {
    return this.getContract(WBETH_TOKEN_ADDRESS, WBETH_ABI);
  }

  public getProviderContract(): Promise<Provider> {
    return this.getContract(PROVIDER_CONTRACT_ADDRESS, PROVIDER_ABI);
  }

  public async getEthProviderContract(): Promise<EthProvider> {
    return this.getContract(ETH_PROVIDER_CONTRACT_ADDRESS, ETH_PROVIDER_ABI);
  }

  public getVatContract(): Promise<Vat> {
    return this.getContract(VAT_CONTRACT_ADDRESS, VAT_ABI);
  }

  public getBinancePoolContract(): Promise<BinancePool> {
    return this.getContract(BINANCE_POOL_ADDRESS, BINANCE_POOL_ABI);
  }

  public getCEETHVaultContract(): Promise<CeETHVault> {
    return this.getContract(CEETHVAULT_ADDRESS, CEETHVAULT_ABI);
  }

  public getCollateralTokenContract(
    token: CollateralToken,
  ): Promise<ERC20Token> {
    switch (token) {
      case CollateralToken.Second:
        return this.getContract(
          COLLATERAL_SECOND_TOKEN_ADDRESS,
          ERC20_TOKEN_ABI,
        );
      case CollateralToken.Eth:
        return this.getContract(ETH_TOKEN_ADDRESS, ERC20_TOKEN_ABI);
      case CollateralToken.WBETH:
        return this.getContract(WBETH_TOKEN_ADDRESS, ERC20_TOKEN_ABI);
      case CollateralToken.SnBNB:
        return this.getContract(SNBNB_TOKEN_ADDRESS, ERC20_TOKEN_ABI);
      case CollateralToken.Main:
      default:
        return this.getContract(
          COLLATERAL_MAIN_TOKEN_ADDRESS,
          COLLATERAL_MAIN_TOKEN_ABI,
        );
    }
  }

  public getJarContract(): Promise<Jar> {
    return this.getContract(JAR_CONTRACT_ADDRESS, JAR_ABI);
  }

  public getERC20Contract(address: string): Promise<ERC20Token> {
    return this.getContract(address, ERC20_TOKEN_ABI);
  }

  public getLoanCollateralSecondLPContract(): Promise<LoanCollateralSecondLP> {
    return this.getContract(
      LOAN_COLLATERAL_SECOND_LP_TOKEN_ADDRESS,
      LOAN_COLLATERAL_SECOND_LP_ABI,
    );
  }

  public getFarmingContract(): Promise<Farming> {
    return this.getContract(FARMING_CONTRACT_ADDRESS, FARMING_ABI);
  }

  public getHayBusdLPContract(): Promise<HayBusdLP> {
    return this.getContract(
      LOAN_COLLATERAL_SECOND_LP_TOKEN_ADDRESS,
      HAY_BUSD_LP_ABI,
    );
  }

  public getPancakeRouterContract(): Promise<PancakeRouter> {
    return this.getContract(PANCAKE_ROUTER_ADDRESS, PANCAKE_ROUTER_ABI);
  }

  public getPancakeDepositProxyContract(): Promise<PancakeDepositProxy> {
    return this.getContract(
      PANCAKE_DEPOSIT_PROXY_ADDRESS,
      PANCAKE_DEPOSIT_PROXY_ABI,
    );
  }

  public getPancakeDepositProxyStableContract(): Promise<PancakeDepositProxyStable> {
    return this.getContract(
      PANCAKE_DEPOSIT_PROXY_STABLE_ADDRESS,
      PANCAKE_DEPOSIT_PROXY_STABLE_ABI,
    );
  }

  public getPancakeStableSwapContract(): Promise<StableSwap> {
    return this.getContract(PANCAKE_STABLE_SWAP, STABLE_SWAP_ABI);
  }

  public getPancakeStableSwapLPContract(): Promise<StableSwapLP> {
    return this.getContract(
      HAY_BUSD_LP_STABLE_TOKEN_ADDRESS,
      STABLE_SWAP_LP_ABI,
    );
  }

  public getPancakeStrategyContract(
    strategyAddress: string,
  ): Promise<PancakeStrategy> {
    return this.getContract(strategyAddress, PANCAKE_STRATEGY_ABI);
  }

  public getEllipsisFinanceContract(): Promise<EllipsisFinance> {
    return this.getContract(ELLIPSIS_FINANCE_ADDRESS, ELLIPSIS_FINANCE_ABI);
  }

  public getMagpieMasterWombatContract(): Promise<MagpieMasterWombat> {
    return this.getContract(
      MAGPIE_MASTER_WOMBAT_ADDRESS,
      MAGPIE_MASTER_WOMBAT_ABI,
    );
  }

  public getMagpieHayLpContract(): Promise<ERC20Token> {
    return this.getContract(MAGPIE_HAY_LP_ADDRESS, ERC20_TOKEN_ABI);
  }

  public getMagpierewardContract(
    hayRewarder: string,
  ): Promise<MagpieMultiRewarderPerSec> {
    return this.getContract(hayRewarder, MAGPIE_MULTI_REWARDER_PER_SEC_ABI);
  }

  public getMagpieRouterContract(): Promise<MagpieRouter> {
    return this.getContract(MAGPIE_ROUTER_ADDRESS, MAGPIE_ROUTER_ABI);
  }

  public getMagpieMasterContract(): Promise<MagpieMaster> {
    return this.getContract(MAGPIE_MASTER_ADDRESS, MAGPIE_MASTER_ABI);
  }

  public getThenaContract(): Promise<Thena> {
    return this.getContract(THENA_ADDRESS, THENA_ABI);
  }

  public async getEventsFromReceipt<
    EventName extends keyof Events<Contract>,
    Contract extends BaseContract,
  >(
    contract: Contract,
    eventName: EventName,
    transactionHash: string,
  ): Promise<EventPayload<Contract, EventName>[]> {
    const web3 = (await this.getProvider()).getWeb3();
    const receipt = await web3.eth.getTransactionReceipt(transactionHash);

    const abiItem: JsonInterface | undefined =
      contract.options.jsonInterface.find(
        ({ name, type }) => name === eventName && type === 'event',
      );

    const signature = abiItem?.signature;
    if (!signature) {
      return [];
    }

    const logs = receipt.logs.filter((log: Log) =>
      log.topics.includes(signature),
    );
    if (!logs.length) {
      return [];
    }

    return Promise.all(
      logs.map(log => {
        const eventInputs = abiItem.inputs
          ? web3.eth.abi.decodeLog(
              abiItem.inputs,
              log.data,
              log.topics.slice(1),
            )
          : {};

        return {
          address: log.address,
          blockHash: receipt.blockHash,
          blockNumber: receipt.blockNumber,
          event: eventName as string,
          logIndex: log.logIndex,
          raw: {
            data: log.data,
            topics: log.topics,
          },
          returnValues: eventInputs,
          signature: abiItem.signature,
          transactionHash: receipt.transactionHash,
          transactionIndex: receipt.transactionIndex,
        };
      }),
    );
  }

  public async getGasInfo<
    Contract extends BaseContract,
    Method extends keyof Contract['methods'],
  >({
    args,
    value,
    contract,
    method,
  }: GetGasInfoParams<Contract, Method>): Promise<GasInfo> {
    const estimateGasParams: PayableTx = {
      from: this.currentAccount,
    };

    if (value) {
      estimateGasParams.value = getSafeHexAmount(value);
    }

    const estimatedGas = await contract.methods[method](
      ...(args ?? []),
    ).estimateGas(estimateGasParams);

    // it's gas fee * gas price
    const gasRatio = await this.provider.getContractMethodFee(
      increaseGasFeeByMultiplier(estimatedGas),
    );
    const gasPrice = await this.provider.getSafeGasPriceWei();

    return {
      gasRatio,
      gasLimit: new BigNumber(convertToWei(gasRatio)).div(gasPrice),
    };
  }
}
