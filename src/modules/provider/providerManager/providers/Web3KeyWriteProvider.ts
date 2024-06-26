/* eslint-disable no-console */
import Web3 from 'web3';
import { PromiEvent, TransactionConfig, TransactionReceipt } from 'web3-core';
import { hexToNumber, numberToHex } from 'web3-utils';
import { getProviderInfo } from 'web3modal';

import { RPCConfig } from '../../utils/const';
import { getWalletIcon } from '../../utils/getWalletIcon';
import { getWalletName } from '../../utils/getWalletName';
import { EWalletId } from '../../utils/types';
import { getIsClover } from '../utils/getClover';
import { getIsCoin98 } from '../utils/getIsCoin98';
import { getIsCoinbase } from '../utils/getIsCoinbase';
import { getIsOKX } from '../utils/getIsOKX';
import { getIsTrustWallet } from '../utils/getIsTrustWallet';
import { getMirage } from '../utils/getMirage';
import { isRequestProvider } from '../utils/isRequestProvider';
import { Web3KeyReadProvider } from './Web3KeyReadProvider';

export interface IWalletMeta {
  icon: string;
  name: string;
  id: string;
}

export interface IWeb3SendResult {
  receiptPromise: PromiEvent<TransactionReceipt>;
  transactionHash: string;
}

export interface ITokenInfo {
  address: string;
  symbol?: string;
  decimals?: number;
  image?: string;
  chainId?: number;
}

export interface ISendOptions {
  /**
   * Txn data.
   */
  data?: string;
  /**
   * Gas limit for transaction.
   * @note When `estimate` is `true`, this value will redefined by estimated gas limit.
   */
  gasLimit?: string;
  /**
   * Multiplier for gas limit when estimating gas.
   * When specified, gas limit will be calculated as `gasLimit * gasLimitMultiplier`.
   * @note works only when `estimate` is `true`.
   * @default 1
   */
  gasLimitMultiplier?: number;
  value?: string;
  /**
   * When `true`, will estimate gas limit for transaction.
   * @note `gasLimit` option will be redefined by estimated gas limit.
   */
  estimate?: boolean;
  estimateFee?: boolean;
  nonce?: number;
  /**
   * Additional gas limit for transaction.
   * @note When `estimateFee` is `true`, this value will be added to estimated gas limit.
   */
  extendedGasLimit?: number;
  maxPriorityFeePerGas?: number;
  maxFeePerGas?: number;
}

interface IEthFeeHistoryResult {
  oldestBlock: string;
  baseFeePerGas: string[];
  reward?: string[][];
  gasUsedRatio: number;
}

interface IGetMaxFeesResult {
  maxPriorityFeePerGas: number;
  maxFeePerGas: number;
}

const WATCH_ASSET_TIMEOUT = 500;

const CHAIN_NOT_ADDED_ERROR_CODE = 4902;
const USER_REJECTED_ERROR_CODE = 4001;

const BLOCK_COUNT = '0x8';
const NEWEST_BLOCK = 'latest';
const REWARD_PERCENTILES = [25];
const MAX_FEE_MULTIPLIER = 1.25;

export abstract class Web3KeyWriteProvider extends Web3KeyReadProvider {
  private walletMeta: IWalletMeta | undefined;

  protected accounts: string[] = [];

  protected _currentAccount: string | null = null;

  public abstract inject(): Promise<void>;

  public get currentAccount(): string {
    return this._currentAccount || '';
  }

  public set currentAccount(addr: string | null) {
    this._currentAccount = addr;
  }

  public getWalletMeta(): IWalletMeta {
    if (!this.isConnected()) {
      throw new Error('Provider must be connected');
    }

    return this.walletMeta as IWalletMeta;
  }

  private setWalletMeta() {
    const provider = this.provider as any;
    if (!this.isConnected() || !provider) {
      return;
    }

    let { id: walletId } = getProviderInfo(provider);

    if (getIsOKX(provider)) {
      walletId = EWalletId.okxwallet;
    } else if (getIsCoinbase(provider)) {
      walletId = EWalletId.coinbase;
    } else if (getIsCoin98(provider)) {
      walletId = EWalletId.coin98;
    } else if (getIsTrustWallet(provider)) {
      walletId = EWalletId.trust;
    } else if (getIsClover(provider)) {
      walletId = EWalletId.clover;
    } else if (getMirage(provider)) {
      walletId = EWalletId.mirage;
    }

    this.walletMeta = {
      name: getWalletName(walletId as EWalletId),
      icon: getWalletIcon(walletId as EWalletId),
      id: walletId,
    };
  }

  public async connect(): Promise<void> {
    const web3 = this.getWeb3();
    super.connect();
    this.setWalletMeta();
    await this.getUnlockedAccounts(web3);
  }

  public disconnect(): void {
    super.disconnect();
    this.currentAccount = null;
    this.accounts = [];
  }

  /**
   * Custom replacement for web3js [methods.myMethod.send](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-send).
   */
  public async sendTransactionAsync(
    from: string,
    to: string,
    sendOptions: ISendOptions,
  ): Promise<IWeb3SendResult> {
    const web3 = this.getWeb3();
    const safeGasPrice = await this.getSafeGasPriceWei();

    console.log(`Safe Gas Price: ${safeGasPrice}`);

    const {
      data,
      estimate = false,
      estimateFee = false,
      extendedGasLimit,
      gasLimit = '0',
      value = '0',
      gasLimitMultiplier = 1,
    } = sendOptions;
    let { nonce } = sendOptions;

    if (!nonce) {
      nonce = await web3.eth.getTransactionCount(from);
    }

    console.log(`Nonce: ${nonce}`);

    const tx: TransactionConfig = {
      from,
      to,
      value: numberToHex(value),
      gas: numberToHex(gasLimit),
      gasPrice: safeGasPrice.toString(10),
      data,
      nonce,
      chainId: numberToHex(this.currentChain) as unknown as number,
    };

    if (estimate) {
      try {
        const estimatedGas = await web3.eth.estimateGas(tx);
        const multipliedGasLimit = Math.round(
          estimatedGas * gasLimitMultiplier,
        );

        if (extendedGasLimit) {
          tx.gas = numberToHex(multipliedGasLimit + extendedGasLimit);
        } else {
          tx.gas = numberToHex(multipliedGasLimit);
        }
      } catch (e) {
        throw new Error(
          (e as Partial<Error>).message ??
            'Failed to estimate gas limit for transaction.',
        );
      }
    }

    const { maxFeePerGas, maxPriorityFeePerGas } = estimateFee
      ? await this.getMaxFees().catch(() => sendOptions)
      : sendOptions;

    if (maxPriorityFeePerGas !== undefined) {
      tx.maxPriorityFeePerGas = numberToHex(maxPriorityFeePerGas);
    }

    if (maxFeePerGas !== undefined) {
      tx.maxFeePerGas = numberToHex(maxFeePerGas);
    }

    console.log('Sending transaction via Web3: ', tx);

    return new Promise((resolve, reject) => {
      const promise = web3.eth.sendTransaction(tx);

      promise
        .once('transactionHash', async (transactionHash: string) => {
          console.log(`Just signed transaction has is: ${transactionHash}`);

          const rawTx = await web3.eth.getTransaction(transactionHash);

          console.log(
            `Found transaction in node: `,
            JSON.stringify(rawTx, null, 2),
          );

          resolve({
            receiptPromise: promise,
            transactionHash,
          });
        })
        .catch(reject);
    });
  }

  private async getMaxFees(): Promise<IGetMaxFeesResult> {
    const { provider } = this;
    if (!isRequestProvider(provider)) {
      throw new Error(
        'This provider does not support the getting max fees method',
      );
    }

    const {
      baseFeePerGas: baseFeePerGasValues,
      reward: rewards = [],
    }: IEthFeeHistoryResult = await provider.request!({
      method: 'eth_feeHistory',
      params: [BLOCK_COUNT, NEWEST_BLOCK, REWARD_PERCENTILES],
    });

    const linearConvertedRewards = rewards
      .flat()
      .map(value => hexToNumber(value))
      .filter(value => value > 0);
    const maxPriorityFeePerGas = linearConvertedRewards.length
      ? Math.round(
          linearConvertedRewards.reduce((a, b) => a + b, 0) /
            linearConvertedRewards.length,
        )
      : 0;
    const baseFeePerGas = Math.max(
      ...baseFeePerGasValues.map(value => hexToNumber(value)),
    );

    return {
      maxPriorityFeePerGas,
      maxFeePerGas: Math.round(
        (baseFeePerGas + maxPriorityFeePerGas) * MAX_FEE_MULTIPLIER,
      ),
    };
  }

  private async getUnlockedAccounts(web3: Web3): Promise<string[]> {
    const unlockedAccounts: string[] = await web3.eth.getAccounts();

    const [currentAccount] = unlockedAccounts;
    if (!unlockedAccounts.length || !currentAccount) {
      throw new Error('Unable to detect unlocked MetaMask account');
    }
    this.currentAccount = currentAccount;
    this.accounts = unlockedAccounts;
    return unlockedAccounts;
  }

  /**
   * Specification can be found [here](https://eips.ethereum.org/EIPS/eip-747#wallet_watchasset).
   */
  public async addTokenToWallet({
    chainId,
    ...options
  }: ITokenInfo): Promise<boolean> {
    const { provider } = this;

    if (!isRequestProvider(provider)) {
      throw new Error('This provider does not support the adding new tokens');
    }

    if (chainId) {
      await this.switchNetwork(chainId);
      // need to wait before triggering wallet_watchAsset to keep wallet window open
      await new Promise(resolve => setTimeout(resolve, WATCH_ASSET_TIMEOUT));
    }

    return provider.request!({
      method: 'wallet_watchAsset',
      params: { type: 'ERC20', options },
    }).catch(() => false);
  }

  public async switchNetwork(chainId: number): Promise<any> {
    const config = RPCConfig[chainId];
    const { provider } = this;

    if (!isRequestProvider(provider)) {
      throw new Error(
        'This provider does not support the network switching method',
      );
    }

    try {
      return await provider.request?.({
        /**
         * Method [API](https://docs.metamask.io/guide/rpc-api.html#wallet-switchethereumchain)
         */
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: config.chainId }],
      });
    } catch (switchError) {
      const errorCode = (switchError as { code?: number | string }).code;

      if (errorCode === CHAIN_NOT_ADDED_ERROR_CODE) {
        // chain isn't added
        return provider
          .request?.({
            /**
             * Method [API](https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain)
             */
            method: 'wallet_addEthereumChain',
            params: [config],
          })
          .catch(() => {
            throw new Error('addError');
          });
      }

      if (errorCode === USER_REJECTED_ERROR_CODE) {
        // user rejected swtich network
        throw new Error('User declined to switch network');
      }

      // handle other "switch" errors
      throw new Error(
        'Switch network error. Perhaps the network is not added to the RPC Config.',
      );
    }
  }
}
