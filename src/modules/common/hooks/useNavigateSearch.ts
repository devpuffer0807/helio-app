import {
  createSearchParams,
  URLSearchParamsInit,
  useNavigate,
} from 'react-router-dom';

import { DISABLE_MULTI_COLLATERAL } from 'modules/core';

export function useNavigateSearch(): (
  pathname: string,
  params: URLSearchParamsInit,
) => void {
  const navigate = useNavigate();

  return (pathname, params) => {
    if (DISABLE_MULTI_COLLATERAL) {
      navigate(pathname);
      return;
    }

    navigate({ pathname, search: `?${createSearchParams(params).toString()}` });
  };
}
