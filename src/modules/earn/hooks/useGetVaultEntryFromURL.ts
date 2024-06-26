import { useLocation } from 'react-router-dom';

import { BoostedVaultEntry } from '../actions/vaults/types';
import { BOOSTED_VAULT_ENTRIES } from '../consts';

export function useGetVaultEntryFromURL(): BoostedVaultEntry | undefined {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tokens = params.getAll('token');
  const type = params.get('type');

  if (tokens.length < 2) {
    return undefined;
  }

  const [firstToken, secondToken] = tokens;
  const id = `${firstToken}-${secondToken}`;

  return BOOSTED_VAULT_ENTRIES.find(p => {
    if (type) {
      return p.id === id && p.type === type;
    }
    return p.id === id;
  });
}
