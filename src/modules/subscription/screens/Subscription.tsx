import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import {
  CopyIcon,
  Modal,
  StepIcon,
  TELEGRAM_SUBSCRIPTION_LINK,
} from 'modules/common';
import { t } from 'modules/i18n';
import { DashboardRoutesConfig } from 'modules/my-positions';
import { rgba } from 'modules/theme';

import {
  useLazySubscriptionSubscribeQuery,
  useLazySubscriptionUnsubscribeQuery,
  useSubscriptionSubscriptionQuery,
} from '../actions';

export function SubscriptionForm(): JSX.Element {
  const { classes, cx } = useStyles();

  const [isSigned, setSigned] = useState(false);
  const [isUnsubscribed, setUnsubscribed] = useState(false);

  const [subscribe, { data: subscribeData, isLoading: subscribeLoading }] =
    useLazySubscriptionSubscribeQuery();
  const [unsubscribe] = useLazySubscriptionUnsubscribeQuery();
  const { data: subscriptionData, refetch: subscriptionRefetch } =
    useSubscriptionSubscriptionQuery(undefined, {
      pollingInterval: 10_000,
    });

  const onSubscribe = async () => {
    try {
      await subscribe().unwrap();
      setSigned(true);
    } catch {
      setSigned(false);
    }
  };

  const onUnsubscribe = async () => {
    try {
      await unsubscribe().unwrap();
      setUnsubscribed(true);
      void subscriptionRefetch();
    } catch {
      setUnsubscribed(false);
    }
  };

  if (subscriptionData?.isSubscribed) {
    return (
      <Modal title={t('subscription.title')}>
        <Typography
          component="div"
          sx={{
            margin: '28px 0 40px',
          }}
        >
          {t('subscription.description')}
        </Typography>

        <Typography
          component="div"
          fontWeight={700}
          sx={{ marginBottom: '12px' }}
        >
          {t('subscription.telegram-username')}
        </Typography>

        <div className={cx(classes.timeCodeInput, classes.telegramInput)}>
          <Typography component="div">
            @{subscriptionData.telegramName}
          </Typography>

          <Typography
            className={classes.unsubscribeButton}
            variant="subtitle1"
            component="div"
            onClick={onUnsubscribe}
          >
            {t('subscription.unsubscribe')}
          </Typography>
        </div>
      </Modal>
    );
  }

  if (isUnsubscribed) {
    return (
      <Modal title={t('subscription.unsubscribed-title')}>
        <Box margin="50px auto 20px">
          <Button
            size="large"
            component={Link}
            className={cx(classes.button, classes.goToButton)}
            to={DashboardRoutesConfig.dashboard.generatePath()}
          >
            {t('subscription.go-to-dashboard')}
          </Button>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal title={t('subscription.title')}>
      <Box mb="50px">
        <Typography
          sx={{
            margin: '28px 0 40px',
          }}
        >
          {t('subscription.description')}
        </Typography>

        <Typography component="div">{t('subscription.to-sign-up')}</Typography>

        <ol className={classes.steps}>
          <li>
            <Typography>{t('subscription.step-first')}</Typography>
          </li>
          <li>
            <Typography>{t('subscription.step-second')}</Typography>
          </li>
        </ol>
      </Box>

      {isSigned && (
        <>
          <Typography
            component="div"
            fontWeight={700}
            sx={{ marginBottom: '12px' }}
          >
            {t('subscription.verification-code')}
          </Typography>

          <div className={classes.timeCodeInput}>
            <Typography variant="body2" component="div" sx={{ opacity: 0.5 }}>
              {subscribeData?.password}
            </Typography>

            <CopyIcon
              className={classes.copyIcon}
              text={subscribeData?.password ?? ''}
            />
          </div>
        </>
      )}

      <Box display="flex" alignItems="center">
        <Button
          size="large"
          className={classes.button}
          onClick={onSubscribe}
          disabled={isSigned}
        >
          {subscribeLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            t('subscription.sign-message')
          )}
        </Button>

        <Button
          size="large"
          className={cx(classes.button, !isSigned && classes.buttonDisabled)}
          disabled={!isSigned}
          component="a"
          target="_blank"
          href={TELEGRAM_SUBSCRIPTION_LINK}
        >
          {t('subscription.open-telegram-bot')}
        </Button>
      </Box>

      <Stepper
        activeStep={isSigned ? 1 : 0}
        sx={{ maxWidth: 350, width: '100%', margin: '35px auto 0' }}
      >
        <Step>
          <StepLabel icon={1} StepIconComponent={StepIcon} />
        </Step>

        <Step>
          <StepLabel icon={2} StepIconComponent={StepIcon} />
        </Step>
      </Stepper>
    </Modal>
  );
}

const useStyles = makeStyles()(theme => ({
  description: {
    margin: '28px 0 40px',
    fontSize: 16,
  },
  steps: {
    paddingLeft: '23px',
  },
  timeCodeInput: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50px',
    marginBottom: '50px',
    padding: '0 13px',
    lineHeight: '50px',
    background: theme.colors.silver,
    borderRadius: 10,
  },
  copyIcon: {
    margin: '0 8px',
  },
  telegramInput: {
    opacity: 1,
  },
  goToButton: {
    alignSelf: 'center',
    width: '280px',
  },
  unsubscribeButton: {
    display: 'flex',
    alignItems: 'center',
    height: '26px',
    backgroundColor: theme.colors.white,
    borderRadius: '6px',
    color: rgba(theme.colors.black, 0.5),
    padding: '5px 7px',
    cursor: 'pointer',
    transition: '0.3s',

    ':hover': {
      backgroundColor: theme.colors.black,
      color: theme.colors.white,
    },
  },
  button: {
    '&&': {
      borderRadius: 18,
    },
    flex: 1,
    background: theme.colors.black,
    color: theme.colors.white,
    marginTop: '50px',

    '&:not(:last-child)': {
      marginRight: 20,
    },

    [theme.breakpoints.down('md')]: {
      marginTop: 'auto',
    },
  },
  buttonDisabled: {
    opacity: 0.3,
    color: `${theme.colors.white} !important`,
  },
}));
