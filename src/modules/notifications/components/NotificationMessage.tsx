import React, { FC, forwardRef, ReactNode } from 'react';
import { makeStyles } from 'tss-react/mui';

import { Colors } from 'modules/theme';

import { Notification } from '../store';
import { CloseButton } from './CloseButton';

type Props = {
  message: ReactNode;
  title?: ReactNode;
  variant: Notification['variant'];
  onClose: () => void;
};

export const NotificationMessage: FC<Props> = forwardRef<
  HTMLInputElement,
  Props
>(({ title, message, variant, onClose }: Props, ref) => {
  const { classes } = useStyles({ withoutTitle: !title, variant });

  return (
    <div ref={ref}>
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.titleWrapper}>
            <span className={classes.divider} />
            {title && <span className={classes.title}>{title}&nbsp;</span>}
          </div>
          <span className={classes.message}>{message}</span>
        </div>
        <CloseButton onClick={onClose} />
      </div>
    </div>
  );
});

NotificationMessage.displayName = 'NotificationMessage';

const useStyles = makeStyles<{
  withoutTitle: boolean;
  variant: Notification['variant'];
}>()((theme, { withoutTitle, variant }) => ({
  root: {
    border: '1px solid #595959',
    borderRadius: 12,
    backgroundColor: theme.colors.secondary,
    padding: '10px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    top: 2,

    [theme.breakpoints.down('sm')]: {
      display: withoutTitle ? 'flex' : 'block',
    },
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  divider: {
    width: 4,
    height: 26,
    marginRight: 10,
    borderRadius: 12,
    background: theme.colors[variant as keyof Colors] ?? theme.colors.black,
  },

  title: {
    color: theme.colors[variant as keyof Colors] ?? theme.colors.black,
    fontSize: 14,
  },

  message: {
    fontSize: 14,
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginTop: withoutTitle ? 0 : 8,
    },
  },
}));
