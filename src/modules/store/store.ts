import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { wombatAprApi } from 'modules/api/WombatAprApi';
import { wombatTvlApi } from 'modules/api/WombatTvlApi';
import { authReducer } from 'modules/auth/store';
import {
  notificationMiddleware,
  notificationsReducer,
} from 'modules/notifications/store';

import { web3Api } from './queries';

const rootReducer = combineReducers({
  [web3Api.reducerPath]: web3Api.reducer,
  [wombatAprApi.reducerPath]: wombatAprApi.reducer,
  [wombatTvlApi.reducerPath]: wombatTvlApi.reducer,
  auth: authReducer,
  notifications: notificationsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(web3Api.middleware)
      .concat(wombatAprApi.middleware)
      .concat(wombatTvlApi.middleware)
      .concat(notificationMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
