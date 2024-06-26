import React, { ChangeEvent, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import { BorrowRoutesConfig } from 'modules/borrow';
import {
  DEFAULT_ROUNDING_MODE,
  HUNDRED,
  keepValueInRange,
  MAX_DECIMALS,
  Modal,
  NumberField,
  SAFE_BORROW_LIMIT_PERCENTS,
  Slider,
  StepIcon,
  truncateNumber,
  useNavigateSearch,
  useTransactionAction,
  Warning,
  ZERO,
} from 'modules/common';
import { ReactComponent as ArrowRightIcon } from 'modules/common/assets/arrow-right.svg';
import { useCollateralToken } from 'modules/core';
import loanTokenIcon from 'modules/core/assets/loanToken.svg';
import { useTranslation } from 'modules/i18n';
import { useGetAccountDataQuery } from 'modules/store/actions/getAccountData';
import { useGetLoanTokenBalanceQuery } from 'modules/store/actions/getLoanTokenBalance';
import { useGetMinLoanTokenAmountQuery } from 'modules/store/actions/getMinLoanTokenAmount';
import { SliderOkClasses } from 'modules/theme';

import {
  useLazyRepayApproveQuery,
  useRepayGetApprovedAmountQuery,
} from '../../actions';
import { translation } from './translation';

interface Props {
  executed: boolean;
  onSubmit(value: BigNumber): void;
}

interface FormValues {
  repay: string;
  percent: number;
}

export function Form({ executed, onSubmit }: Props): JSX.Element {
  const navigate = useNavigateSearch();
  const { t, keys } = useTranslation(translation);
  const [{ token }] = useCollateralToken();
  const { data } = useGetAccountDataQuery({ token });
  const { data: USBBalance } = useGetLoanTokenBalanceQuery();
  const { data: minBorrowAmountData } = useGetMinLoanTokenAmountQuery({
    token,
  });
  const minBorrowAmount = minBorrowAmountData ?? ZERO;

  const { classes, cx } = useStyles();

  const borrowedPercent = data?.borrowedPercent ?? ZERO;
  const balance = USBBalance || ZERO;
  const borrowed = data?.borrowed || ZERO;
  const collateralRatio = data?.collateralRatio ?? ZERO;
  const collateral = data?.collateral ?? ZERO;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      repay: '',
      percent: borrowedPercent?.toNumber() ?? 0,
    },
  });

  const { data: approvedAmount = ZERO } = useRepayGetApprovedAmountQuery();
  const { loading, executeAction: approve } = useTransactionAction(
    useLazyRepayApproveQuery,
  );

  const amount = watch('repay');
  const percent = watch('percent');

  const convertedAmount = useMemo(() => {
    const convertedValue = new BigNumber(amount);

    return convertedValue.isNaN() ? ZERO : convertedValue;
  }, [amount]);

  const maxPercent = useMemo(
    () =>
      collateralRatio.isZero()
        ? ZERO
        : borrowed
            .multipliedBy(HUNDRED)
            .dividedBy(collateral.multipliedBy(collateralRatio)),
    [borrowed, collateral, collateralRatio],
  );

  const availableBalance = balance.isGreaterThan(borrowed) ? borrowed : balance;

  const outstandingLoan = convertedAmount.isGreaterThan(borrowed)
    ? ZERO
    : borrowed.minus(convertedAmount);

  useEffect(() => {
    if (borrowedPercent.isZero()) {
      return;
    }

    setValue('percent', borrowedPercent.decimalPlaces(2).toNumber(), {
      shouldValidate: true,
    });
  }, [setValue, borrowedPercent]);

  const isOutstandingLoanError =
    !outstandingLoan.isZero() && outstandingLoan.isLessThan(minBorrowAmount);
  const isApproved = convertedAmount.isLessThanOrEqualTo(approvedAmount);
  const isButtonDisabled = loading || convertedAmount.isZero();

  const isApproveDisabled = isButtonDisabled || isApproved;
  const isSubmitDisabled =
    isButtonDisabled || !isApproved || executed || isOutstandingLoanError;
  const isPercentError = percent > SAFE_BORROW_LIMIT_PERCENTS;

  const handleNumberChange = (value: BigNumber) => {
    if (value.isNaN()) {
      setValue('percent', ZERO.toNumber(), {
        shouldValidate: true,
      });
      return;
    }

    const percent = borrowed
      .minus(value)
      .multipliedBy(HUNDRED)
      .dividedBy(collateral.multipliedBy(collateralRatio));
    const newPercent = percent.isNaN() ? ZERO : percent;

    setValue(
      'percent',
      keepValueInRange(newPercent, ZERO, maxPercent)
        .decimalPlaces(2)
        .toNumber(),
      {
        shouldValidate: true,
      },
    );
  };

  const onChangeRepayField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    handleNumberChange(new BigNumber(event.target.value));
  };

  const changeRepayAmount = (amount: BigNumber) => {
    handleNumberChange(amount);
    setValue('repay', truncateNumber(amount, MAX_DECIMALS, true), {
      shouldValidate: true,
    });
  };

  const handleChangeSlider = (_: Event, value: number | number[]) => {
    const percent = keepValueInRange(
      new BigNumber(Array.isArray(value) ? value[0] : value),
      ZERO,
      maxPercent,
    );

    const newAmount = borrowed.minus(
      percent
        .multipliedBy(collateral)
        .multipliedBy(collateralRatio)
        .dividedBy(HUNDRED),
    );

    setValue(
      'repay',
      truncateNumber(
        keepValueInRange(newAmount, ZERO, borrowed),
        MAX_DECIMALS,
        true,
      ),
      {
        shouldValidate: true,
      },
    );

    setValue('percent', percent.decimalPlaces(2).toNumber());
  };

  return (
    <Modal
      title={t(keys.title)}
      onClose={() => {
        navigate(BorrowRoutesConfig.root, { token });
      }}
    >
      <form
        onSubmit={handleSubmit(({ repay }) => onSubmit(new BigNumber(repay)))}
        className={classes.form}
      >
        <Typography
          variant="subtitle1"
          onClick={() => changeRepayAmount(borrowed)}
          className={classes.subtitle}
        >
          {t(keys.dept, { value: borrowed, unit: t('units.LOAN_TOKEN') })}
        </Typography>

        <NumberField
          name="repay"
          control={control}
          variant="filled"
          label={t(keys.repayAmount)}
          balance={availableBalance}
          unit={t('units.LOAN_TOKEN')}
          additionalLabel={t(keys.maxAmount, {
            value: t('units.LOAN_TOKEN-value', {
              value: truncateNumber(balance),
            }),
          })}
          error={!!errors.repay}
          helperText={errors.repay?.message}
          additionalLabelOnClick={
            availableBalance.isLessThanOrEqualTo(borrowed)
              ? () => changeRepayAmount(availableBalance)
              : undefined
          }
          onChange={onChangeRepayField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <div className={classes.adornment}>
                  <img src={loanTokenIcon} alt="" />

                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ marginLeft: '10px' }}
                  >
                    {t('units.LOAN_TOKEN')}
                  </Typography>
                </div>
              </InputAdornment>
            ),
          }}
        />

        {isOutstandingLoanError && !errors.repay && (
          <Typography variant="body2" mt="12px">
            <span className={classes.red}>{t(keys.invalidAmount)}</span>
            &nbsp;
            {t(keys.makeIt)}
            &nbsp;
            <span
              className={classes.clickable}
              onClick={() =>
                changeRepayAmount(
                  borrowed
                    .minus(minBorrowAmount)
                    .decimalPlaces(MAX_DECIMALS, DEFAULT_ROUNDING_MODE),
                )
              }
            >
              {t('units.LOAN_TOKEN-value', {
                value: truncateNumber(borrowed.minus(minBorrowAmount)),
              })}
            </span>
            &nbsp;
            {t(keys.or)}
            &nbsp;
            <span
              className={classes.clickable}
              onClick={() => changeRepayAmount(borrowed)}
            >
              {t(keys.repayInFull)}
            </span>
          </Typography>
        )}

        <List className={classes.list}>
          <ListItem
            className={classes.listItem}
            secondaryAction={
              <Typography
                className={classes.outstandingLoan}
                variant="body1"
                component="div"
              >
                <span>
                  {t('units.LOAN_TOKEN-value', {
                    value: truncateNumber(borrowed),
                  })}
                </span>

                <ArrowRightIcon />

                <span className={cx(isOutstandingLoanError && classes.red)}>
                  {t('units.LOAN_TOKEN-value', {
                    value: truncateNumber(outstandingLoan),
                  })}
                </span>
              </Typography>
            }
          >
            {t(keys.total)}
          </ListItem>
        </List>

        {isOutstandingLoanError ? (
          <Warning variant="body2" prefix={t(keys.caution)}>
            <br />
            {t(keys.outstandingLoanInfo)}
          </Warning>
        ) : (
          <Divider />
        )}

        <Typography
          variant="body1"
          fontWeight={700}
          sx={{ marginTop: '30px', marginBottom: '14px' }}
        >
          {t(keys.utilization)}
        </Typography>

        <Slider
          name="percent"
          control={control}
          error={isPercentError}
          sx={{ mt: 4, mb: 0.5 }}
          onChange={handleChangeSlider}
          classes={SliderOkClasses}
        />

        {isPercentError && (
          <Warning variant="body2" mt={3} prefix={t(keys.caution)}>
            {t(keys.cautionInfo)}
          </Warning>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '40px',
            marginBottom: '28px',
          }}
        >
          <Button
            size="large"
            type="button"
            disabled={isApproveDisabled}
            onClick={() => {
              void approve(convertedAmount);
            }}
            className={classes.button}
          >
            {loading ? <CircularProgress color="inherit" /> : t(keys.approve)}
          </Button>

          <Button
            size="large"
            type="submit"
            disabled={isSubmitDisabled}
            className={classes.button}
          >
            {t(keys.proceed)}
          </Button>
        </Box>

        <Stepper
          activeStep={isApproved ? 1 : 0}
          sx={{ maxWidth: '350px', width: '100%', margin: '0 auto' }}
        >
          <Step>
            <StepLabel icon={1} StepIconComponent={StepIcon} />
          </Step>

          <Step>
            <StepLabel icon={2} StepIconComponent={StepIcon} />
          </Step>
        </Stepper>
      </form>
    </Modal>
  );
}

const useStyles = makeStyles()(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },

  adornment: {
    display: 'flex',
    alignItems: 'center',
  },

  button: {
    flex: 1,

    '&:not(:last-child)': {
      marginRight: 20,
    },

    [theme.breakpoints.down('md')]: {
      marginTop: 'auto',
    },
  },

  subtitle: {
    '&&': {
      margin: '8px 0 50px',
      opacity: 0.5,
      textAlign: 'center',
      cursor: 'pointer',
      transition: '0.3s',
    },

    '&:hover': {
      opacity: 1,
    },
  },

  list: {
    '&&': {
      marginTop: 40,
      paddingBottom: 30,
    },
  },

  listItem: {
    '&&': {
      color: theme.colors.black,
      padding: 0,
    },
  },

  outstandingLoan: {
    '&&': {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
  },

  red: {
    color: theme.colors.red,
  },

  caution: {
    '&&': {
      padding: '12px 16px',
      border: `1px solid ${alpha(theme.colors.black, 0.2)}`,
      borderRadius: '8px',
    },
  },
  clickable: {
    cursor: 'pointer',
  },
}));
