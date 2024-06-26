import { Mutex } from 'async-mutex';
import { ThemeColors } from 'web3modal';

import { IProvidersMap, ProviderManager } from 'modules/provider';

export const web3ModalTheme: ThemeColors = {
  background: 'rgb(255,255,255)',
  main: 'rgb(137, 137, 137)',
  secondary: 'rgb(137, 137, 137)',
  border: 'rgba(195,195,195,0.14)',
  hover: 'rgb(239, 239, 239)',
};

const mutex = new Mutex();

export class ProviderManagerSingleton {
  private static instance: ProviderManager<IProvidersMap>;

  public static async getInstance(): Promise<ProviderManager<IProvidersMap>> {
    return mutex.runExclusive(() => {
      if (ProviderManagerSingleton.instance) {
        return ProviderManagerSingleton.instance;
      }

      ProviderManagerSingleton.instance = new ProviderManager(web3ModalTheme);

      return ProviderManagerSingleton.instance;
    });
  }
}
