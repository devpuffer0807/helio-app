import { BoostedVaultEntry } from '../actions/vaults/types';
import { BOOSTED_VAULT_ENTRIES } from '../consts';

export function findBoostedVaultEntryByPid(
  pid: string,
): BoostedVaultEntry | undefined {
  return BOOSTED_VAULT_ENTRIES.find(entry => entry.poolId === pid);
}
