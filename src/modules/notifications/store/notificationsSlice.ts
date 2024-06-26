/* eslint-disable no-param-reassign */
import { ReactNode } from 'react';
import { uid } from 'react-uid';
import {
  createListenerMiddleware,
  createSlice,
  isRejected,
  PayloadAction,
} from '@reduxjs/toolkit';
import { OptionsObject } from 'notistack';

import { getErrorMessage } from 'modules/common';

export type Notification = Pick<OptionsObject, 'autoHideDuration' | 'persist'> &
  Required<Pick<OptionsObject, 'key' | 'variant'>> & {
    title?: ReactNode;
    message: ReactNode;
  };

export type NotificationsState = {
  notifications: Notification[];
};

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (
      state,
      { payload }: PayloadAction<Omit<Notification, 'key'>>,
    ) => {
      state.notifications.push({
        key: uid(payload),
        ...payload,
      });
    },
    removeNotification: (
      state,
      { payload: key }: PayloadAction<string | number>,
    ) => {
      state.notifications = state.notifications.filter(
        notification => notification.key !== key,
      );
    },
  },
});

export const notificationMiddleware = createListenerMiddleware();

notificationMiddleware.startListening({
  matcher: isRejected,
  effect: (error, { dispatch }) => {
    const errorMessage = getErrorMessage(error);

    if (errorMessage) {
      dispatch(
        addNotification({
          message: errorMessage,
          variant: 'error',
        }),
      );
    }
  },
});

export const {
  reducer: notificationsReducer,
  actions: { addNotification, removeNotification },
} = notificationsSlice;
