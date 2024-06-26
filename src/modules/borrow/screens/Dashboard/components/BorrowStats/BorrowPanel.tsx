import React from 'react';
import { createSearchParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Slider, { SliderTypeMap } from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { cx } from 'tss-react/@emotion/css';
import { makeStyles } from 'tss-react/mui';

import { BorrowRoutesConfig } from 'modules/borrow';
import {
  HUNDRED,
  keepValueInRange,
  SAFE_BORROW_LIMIT_PERCENTS,
  Tooltip,
  truncateNumber,
  useMarks,
  useNavigateSearch,
  ZERO,
} from 'modules/common';
import { useCollateralToken } from 'modules/core';
import loanTokenIcon from 'modules/core/assets/loanToken.svg';
import { t } from 'modules/i18n';
import { RepayRoutesConfig } from 'modules/repay';
import { AccountData } from 'modules/store/actions/getAccountData';
import { useGetLiquidationPriceQuery } from 'modules/store/actions/getLiquidationPrice';
import { SubscriptionRoutesConfig } from 'modules/subscription';
import { useSubscriptionSubscriptionQuery } from 'modules/subscription/actions';
import {
  rgba,
  SliderErrorClasses,
  SliderFadedClasses,
  SliderOkClasses,
} from 'modules/theme';

import BubbleIcon from './assets/bubble.svg';

interface Props {
  data: AccountData | undefined;
}

export function BorrowPanel({ data }: Props): JSX.Element {
  const navigate = useNavigateSearch();
  const [{ token, unit }] = useCollateralToken();
  const { data: liquidationPrice } = useGetLiquidationPriceQuery({ token });
  const { data: subscription } = useSubscriptionSubscriptionQuery();
  const borrowed = data?.borrowed.decimalPlaces(3, 1).isGreaterThan(ZERO)
    ? truncateNumber(data.borrowed, 3)
    : ZERO.toFormat(2);

  const borrowLimit = data?.borrowLimit ?? ZERO;
  const borrowedPercent = data?.borrowedPercent ?? ZERO;
  const isSafeThresholdExceeded = borrowedPercent.isGreaterThanOrEqualTo(
    SAFE_BORROW_LIMIT_PERCENTS,
  );

  const { classes } = useStyles();

  const marks = useMarks(borrowedPercent?.toNumber());
  const isBorrowActive = !borrowLimit.isZero();

  let sliderClasses: SliderTypeMap['props']['classes'] = SliderFadedClasses;

  if (isSafeThresholdExceeded) {
    sliderClasses = SliderErrorClasses;
  } else if (borrowedPercent.isGreaterThan(ZERO)) {
    sliderClasses = SliderOkClasses;
  }

  const buttons = data?.collateral && (
    <>
      {isBorrowActive && (
        <Button
          component={Link}
          to={{
            pathname: BorrowRoutesConfig.borrow.generatePath(),
            search: `?${createSearchParams({ token }).toString()}`,
          }}
          sx={{ minWidth: '100px' }}
        >
          {t('borrow.dashboard.borrow-button')}
        </Button>
      )}

      {data.borrowed.isGreaterThan(ZERO) && (
        <Button
          variant="outlined"
          component={Link}
          to={{
            pathname: RepayRoutesConfig.repay.generatePath(),
            search: `?${createSearchParams({ token }).toString()}`,
          }}
          sx={{ minWidth: '100px', ml: 1 }}
        >
          {t('borrow.dashboard.repay-button')}
        </Button>
      )}
    </>
  );

  const onSubscriptionChange = () => {
    navigate(SubscriptionRoutesConfig.subscription.generatePath(), { token });
  };

  const sliderTrackClasses = cx(
    sliderClasses?.track,
    classes.sliderTrack,
    borrowedPercent.isGreaterThanOrEqualTo(HUNDRED) &&
      classes.hasRightBorderRadius,
  );
  const sliderMarkLabelClasses = cx(
    classes.sliderMarkLabel,
    sliderClasses?.markLabel,
  );

  return (
    <Paper className={classes.root}>
      <Box display="flex" alignItems="center" className={classes.title}>
        <Typography variant="body1" mr={0.5} fontWeight={500}>
          {t('borrow.dashboard.my-borrowed-funds')}
        </Typography>
        <Tooltip title={t('borrow.dashboard.my-borrowed-funds-tooltip')} />
      </Box>

      <div>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          sx={theme => ({
            flexWrap: 'wrap',
            paddingBottom: '50px',
            borderBottom: `1px solid ${rgba(theme.colors.black, 0.1) ?? ''}`,
            [theme.breakpoints.down('md')]: {
              paddingBottom: '24px',
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          })}
        >
          <Box display="flex" alignItems="baseline">
            <img src={loanTokenIcon} alt="" />

            <Typography variant="h1" component="span" ml={1}>
              {borrowed}
            </Typography>
            <Typography variant="h4" component="span" ml={1} fontWeight={500}>
              {t('units.LOAN_TOKEN')}
            </Typography>
          </Box>
          <Box
            sx={theme => ({
              [theme.breakpoints.down('md')]: {
                mt: 1,
              },
            })}
          >
            {buttons}
          </Box>
        </Box>
        <Box mt="42px">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb="24px"
          >
            <Box display="flex" alignItems="center">
              <Typography variant="body1" mr="4px" fontWeight={500}>
                {t('borrow.borrow.borrow-utilization')}
              </Typography>

              <Tooltip
                className={classes.tooltip}
                title={t(
                  'borrow.borrow.borrow-utilization-tooltip',
                  undefined,
                  true,
                )}
              />
            </Box>

            <Box display="flex" alignItems="center">
              <Switch
                checked={subscription?.isSubscribed ?? false}
                onChange={onSubscriptionChange}
              />
              <Typography variant="body1" className={classes.subscriptionLabel}>
                {t('menu.links.subscription')}
              </Typography>
            </Box>
          </Box>
          <Slider
            disabled
            value={keepValueInRange(borrowedPercent, ZERO, HUNDRED)
              .decimalPlaces(2)
              .toNumber()}
            step={1}
            marks={marks}
            classes={{
              ...sliderClasses,
              track: sliderTrackClasses,
              mark: classes.sliderMark,
              rail: classes.sliderRail,
              markLabel: sliderMarkLabelClasses,
            }}
            components={{ Thumb: () => null }}
          />
          <Box display="flex" justifyContent="space-between" mt="10px">
            <Typography variant="subtitle1" sx={{ opacity: 0.5 }}>
              {t('borrow.dashboard.liquidation-price', {
                token: unit,
                value: t('units.$-value', {
                  value: truncateNumber(liquidationPrice ?? ZERO),
                }),
              })}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.5 }}>
              {t('borrow.dashboard.borrow-limit', {
                value: t('units.$-value', {
                  value: truncateNumber(borrowLimit),
                }),
              })}
            </Typography>
          </Box>
        </Box>
      </div>
    </Paper>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '28px',
    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
      padding: '20px 16px 16px',
    },

    '&:last-child': {
      [theme.breakpoints.up('md')]: {
        gridColumn: '2 / span 2',
        gridRow: '1 / span 2',
      },
    },

    ':after': {
      content: `url(${BubbleIcon})`,
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: -1,

      [theme.breakpoints.down('md')]: {
        top: '-10%',
        right: '-10%',
      },
    },
  },
  subscriptionLabel: {
    opacity: 0.5,

    '&&': {
      fontSize: 13,
      marginLeft: '7px',
    },
  },
  title: {
    marginBottom: 170,

    [theme.breakpoints.down('md')]: {
      marginBottom: 80,
    },
  },
  sliderMark: {
    display: 'none',
  },
  sliderMarkLabel: {
    '&&': {
      top: '-10px',
    },
  },
  sliderRail: {
    '&&': {
      borderRadius: '6px',
      overflow: 'hidden',
    },
  },
  sliderTrack: {
    '&&': {
      borderBottomLeftRadius: '6px',
      borderTopLeftRadius: '6px',
    },
  },
  hasRightBorderRadius: {
    '&&': {
      borderBottomRightRadius: '6px',
      borderTopRightRadius: '6px',
    },
  },
  tooltip: {
    '& a': {
      '&, &:hover, &:active, &:visited': {
        color: theme.colors.black,
      },
    },
  },
}));
