import { AbstractProvider, provider as Provider } from 'web3-core';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
type RequestProvider = WithRequired<AbstractProvider, 'request'>;

export function isRequestProvider(
  provider: Provider,
): provider is RequestProvider {
  return !!provider && typeof provider === 'object' && 'request' in provider;
}
