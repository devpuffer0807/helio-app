import React from 'react';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import { useAppSelector } from 'modules/common';

import { NotificationMessage } from '../components';
import { Notification, removeNotification } from '../store/notificationsSlice';

let displayedKeys: Array<string | number> = [];

export const useSyncNotifications = (): void => {
  const dispatch = useDispatch();
  const notifications = useAppSelector(
    store => store.notifications.notifications,
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const addNotificationToDisplay = (key: string | number) => {
    displayedKeys.push(key);
  };

  const removeDisplayedNotification = (key: string | number) => {
    displayedKeys = [
      ...displayedKeys.filter(displayedKey => displayedKey !== key),
    ];
  };

  React.useEffect(() => {
    notifications.forEach((notification: Notification) => {
      const { key, message, variant, title, ...rest } = notification;
      // do nothing if snackbar is already displayed
      if (displayedKeys.some(displayedKey => displayedKey === key)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        content: (key, message) => (
          <NotificationMessage
            message={message}
            title={title}
            variant={variant}
            onClose={() => closeSnackbar(key)}
          />
        ),
        variant,
        ...rest,
        onExited: (event, key) => {
          // remove this snackbar from redux store
          dispatch(removeNotification(key));
          removeDisplayedNotification(key);
        },
      });

      // keep track of snackbars that we've displayed
      addNotificationToDisplay(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};
