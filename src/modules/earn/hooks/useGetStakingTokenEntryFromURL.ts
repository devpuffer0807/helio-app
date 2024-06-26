import { useLocation } from 'react-router-dom';

import { StakingTokenEntry } from '../actions/staking/types';
import { STAKING_TOKEN_ENTRIES } from '../consts';

export function useGetStakingTokenEntryFromURL():
  | StakingTokenEntry
  | undefined {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tokens = params.getAll('token');

  if (tokens.length > 1) {
    return undefined;
  }

  const [token] = tokens;

  return STAKING_TOKEN_ENTRIES.find(entry => entry.id === token);
}
