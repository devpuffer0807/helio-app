import { ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import BigBubble from 'modules/common/assets/big-bubble.svg';

import { Close } from './Close';

interface Props {
  children: ReactNode;
  title?: ReactNode;
  spinner?: boolean;
  onClose?(): void;
}

export function Modal({
  children,
  spinner = false,
  title,
  onClose,
}: Props): JSX.Element {
  const { classes } = useStyles({ isSpinnerVisible: spinner });

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {spinner && <img src={BigBubble} className={classes.spinner} alt="" />}
        <Typography variant="h2" textAlign="center">
          {title}
        </Typography>

        {children}

        {onClose && <Close className={classes.close} onClose={onClose} />}
      </div>
    </div>
  );
}

const useStyles = makeStyles<{ isSpinnerVisible: boolean }>()(
  (theme, { isSpinnerVisible }) => ({
    container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      height: '100%',

      [theme.breakpoints.down('md')]: {
        margin: '0 auto',
        width: '100%',
      },
    },
    content: {
      position: 'relative',
      margin: '10px 0 105px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: theme.colors.secondary,
      borderRadius: 36,
      width: '100%',
      maxWidth: 700,
      padding: `${isSpinnerVisible ? '130px' : '56px'} 40px 40px`,
      overflow: 'hidden',
      isolation: 'isolate',

      [theme.breakpoints.down('md')]: {
        padding: `${isSpinnerVisible ? '130px' : '56px'} 20px 30px`,
        margin: '40px 0 0',

        '& > *:not(:first-of-type)': {
          flex: 1,
        },
      },
    },
    close: {
      position: 'absolute',
      top: 28,
      right: 28,
    },

    spinner: {
      position: 'absolute',
      top: '-24rem',
      display: 'flex',
      alignSelf: 'center',
      animation: 'spin 5s linear infinite',

      [theme.breakpoints.down('md')]: {
        top: '-24rem',
      },

      '@keyframes spin': {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(359deg)',
        },
      },
    },
  }),
);
