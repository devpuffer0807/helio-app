import React, { FC, useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import BigNumber from 'bignumber.js';
import {
  SnackbarProvider as OriginalSnackbarProvider,
  SnackbarProviderProps,
} from 'notistack';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import {
  GTM_ID,
  isProdEnv,
  isReactSnap,
  useInitializeLocale,
  WarningModal,
} from 'modules/common';
import { store } from 'modules/store';
import { ThemeProvider } from 'modules/theme';

import packageJSON from '../package.json';
import { Routes } from './Routes';

BigNumber.config({ EXPONENTIAL_AT: [-100, 100], DECIMAL_PLACES: 18 });

const SnackbarProvider =
  OriginalSnackbarProvider as unknown as FC<SnackbarProviderProps>;

export function App(): JSX.Element {
  const { isInitialized } = useInitializeLocale();

  useEffect(() => {
    if (isProdEnv()) {
      TagManager.initialize({ gtmId: GTM_ID });
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router basename={packageJSON.homepage}>
          <SnackbarProvider>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
              <CssBaseline />

              {isInitialized && <Routes />}
            </QueryParamProvider>
          </SnackbarProvider>
        </Router>
        {!isReactSnap && <WarningModal />}
      </ThemeProvider>
    </Provider>
  );
}
