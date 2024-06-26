/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EWalletId } from 'modules/provider';

export type AuthState = {
  walletId: EWalletId | null;
};

const initialState: AuthState = {
  walletId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setWalletId: (state, action: PayloadAction<string>) => {
      state.walletId = action.payload as EWalletId;
    },
  },
});

export const {
  reducer: authReducer,
  actions: { setWalletId },
} = authSlice;
