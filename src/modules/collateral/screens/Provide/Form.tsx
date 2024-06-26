import React, { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import { BorrowRoutesConfig } from 'modules/borrow';
import {
  HUNDRED,
  keepValueInRange,
  MAX_DECIMALS,
  Modal,
  NumberField,
  Slider,
  StepIcon,
  TextField,
  TokenSelect,
  Tooltip,
  truncateNumber,
  useMarks,
  useNavigateSearch,
  ZERO,
} from 'modules/common';
import { ReactComponent as BorderedArrowIcon } from 'modules/common/assets/form-arrow.svg';
import { DISABLE_MULTI_COLLATERAL, useCollateralToken } from 'modules/core';
import { useTranslation } from 'modules/i18n';
import { useGetAccountDataQuery } from 'modules/store/actions/getAccountData';
import { useGetMinLoanTokenAmountQuery } from 'modules/store/actions/getMinLoanTokenAmount';
import { useGetNativeBalanceQuery } from 'modules/store/actions/getNativeBalance';
import { rgba, SliderOkClasses } from 'modules/theme';

import {
  useGetCollateralApprovedAmountQuery,
  useLazyCollateralApproveQuery,
} from '../../actions';
import { translation } from './translation';

interface Props {
  executed: boolean;
  onSubmit(depositValue: BigNumber): void;
}

interface FormValues extends FieldValues {
  deposit: string;
  percent: number;
}

export function CollateralForm({ executed, onSubmit }: Props): JSX.Element {
  const navigate = useNavigateSearch();
  const { classes } = useStyles();
  const { t, keys } = useTranslation(translation);

  const [
    { token, relayerFee, shouldApprove, minCollateralAmount, unit, icon },
  ] = useCollateralToken();

  const { data: minBorrowAmountData } = useGetMinLoanTokenAmountQuery({
    token,
  });
  const minBorrowAmount = minBorrowAmountData ?? ZERO;

  const { data } = useGetAccountDataQuery({ token });
  const {
    borrowLimit = ZERO,
    borrowed: borrowedAmount = ZERO,
    collateralPercent = ZERO,
    collateralPrice = ZERO,
    collateral = ZERO,
    collateralRatio = ZERO,
  } = data ?? {};

  const { data: balance = ZERO } = useGetNativeBalanceQuery({ token });

  const [approve, { isLoading: isApproveLoading }] =
    useLazyCollateralApproveQuery();
  const { data: approvedAmount = ZERO } = useGetCollateralApprovedAmountQuery({
    token,
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      deposit: '',
      percent: 0,
    },
  });

  const deposit = watch('deposit');
  const depositValue = useMemo(() => new BigNumber(deposit || ZERO), [deposit]);

  const percent = watch('percent');
  const marks = useMarks(percent);

  const isApproved =
    !shouldApprove || depositValue.isLessThanOrEqualTo(approvedAmount);
  const isApproveDisabled = isApproveLoading || isApproved || executed;
  const isSubmitDisabled = isApproveLoading || !isApproved;

  const getBorrowUtilizationPercent = useCallback(
    (collateralAmount: BigNumber) => {
      const totalCollateral = collateral.plus(collateralAmount);

      return collateralRatio.isZero() || totalCollateral.isZero()
        ? ZERO
        : keepValueInRange(
            borrowedAmount
              .multipliedBy(HUNDRED)
              .dividedBy(totalCollateral.multipliedBy(collateralRatio)),
            ZERO,
            HUNDRED,
          );
    },
    [borrowedAmount, collateral, collateralRatio],
  );

  const maxPercent = useMemo(
    () => getBorrowUtilizationPercent(ZERO),
    [getBorrowUtilizationPercent],
  );

  const minPercent = useMemo(
    () => getBorrowUtilizationPercent(balance),
    [balance, getBorrowUtilizationPercent],
  );

  const onDepositUpdate = (amount: BigNumber) => {
    if (amount.isNaN()) {
      return;
    }

    const percent = getBorrowUtilizationPercent(amount);
    if (percent.isNaN()) {
      return;
    }

    setValue(
      'percent',
      keepValueInRange(percent, minPercent, maxPercent)
        .decimalPlaces(2)
        .toNumber(),
      { shouldValidate: true },
    );
  };

  const newBorrowLimit = useMemo(() => {
    return !relayerFee.isZero() && depositValue.isLessThanOrEqualTo(relayerFee)
      ? borrowLimit
      : depositValue
          .minus(relayerFee)
          .multipliedBy(collateralPrice)
          .multipliedBy(collateralPercent)
          .div(HUNDRED)
          .plus(borrowLimit);
  }, [
    relayerFee,
    borrowLimit,
    collateralPercent,
    collateralPrice,
    depositValue,
  ]);

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const amount = event.target.value || '0';
    const convertedAmount = new BigNumber(amount);

    onDepositUpdate(convertedAmount);
  };

  const handleChangeSlider = (_: Event, value: number | number[]) => {
    const percent = keepValueInRange(
      new BigNumber(Array.isArray(value) ? value[0] : value),
      minPercent,
      maxPercent,
    );

    const newDeposit =
      collateralRatio.isZero() || percent.isZero()
        ? ZERO
        : borrowedAmount
            .multipliedBy(HUNDRED)
            .dividedBy(percent.multipliedBy(collateralRatio))
            .minus(collateral);

    setValue('deposit', truncateNumber(newDeposit, MAX_DECIMALS, true), {
      shouldValidate: true,
    });

    setValue('percent', percent.decimalPlaces(2).toNumber());
  };

  const handleMaxAmount = () => {
    setValue('deposit', truncateNumber(balance, 2, true), {
      shouldValidate: true,
    });
    onDepositUpdate(balance);
  };

  const handleApprove = useCallback(
    async (value: BigNumber) => {
      if (value.isLessThanOrEqualTo(approvedAmount)) {
        return;
      }

      await approve({ value, token });
    },
    [token, approve, approvedAmount],
  );

  useEffect(() => {
    if (maxPercent.isZero()) {
      return;
    }

    void setValue('percent', maxPercent.decimalPlaces(2).toNumber());
  }, [maxPercent, setValue]);

  return (
    <Modal
      title={t(keys.title)}
      onClose={() => {
        navigate(BorrowRoutesConfig.dashboard.generatePath(), { token });
      }}
    >
      <form
        className={classes.form}
        onSubmit={handleSubmit(({ deposit }) =>
          onSubmit(new BigNumber(deposit)),
        )}
      >
        <NumberField
          name="deposit"
          control={control}
          balance={balance}
          min={minCollateralAmount}
          variant="filled"
          label={t(keys.depositAmount)}
          error={!!errors.deposit}
          helperText={errors.deposit?.message}
          onChange={onInputChange}
          unit={unit}
          additionalLabel={t(keys.max, {
            value: truncateNumber(balance, 18, true),
            unit,
          })}
          additionalLabelOnClick={
            !minCollateralAmount ||
            balance.isGreaterThanOrEqualTo(minCollateralAmount)
              ? handleMaxAmount
              : undefined
          }
          InputProps={{
            endAdornment: DISABLE_MULTI_COLLATERAL ? (
              <InputAdornment position="end">
                <Box display="flex" alignItems="center">
                  <img src={icon} alt="" />

                  <Typography variant="body1" fontWeight={600} ml={1}>
                    {unit}
                  </Typography>
                </Box>
              </InputAdornment>
            ) : (
              <InputAdornment position="end">
                <TokenSelect enableSecond={false} />
              </InputAdornment>
            ),
          }}
        />

        <BorderedArrowIcon className={classes.arrow} />

        <TextField
          value={truncateNumber(newBorrowLimit, undefined, true)}
          label={t(keys.borrowLimit)}
          disabled
          InputProps={{
            endAdornment: (
              <Typography
                variant="body1"
                fontWeight={600}
                display="flex"
                alignItems="center"
              >
                {t('units.LOAN_TOKEN')}
              </Typography>
            ),
          }}
        />

        {newBorrowLimit?.isLessThan(minBorrowAmount) && (
          <Typography
            className={classes.info}
            variant="subtitle1"
            component="div"
            mt="20px"
          >
            <span className={classes.caution}>{t(keys.caution)}</span>
            &nbsp;
            {t(keys.cautionInfo)}
          </Typography>
        )}

        {borrowedAmount.isGreaterThan(ZERO) && (
          <>
            <Typography variant="body1" fontWeight={700} mb={3} mt={5}>
              {t(keys.borrowUtilization)}
            </Typography>

            <Slider
              name="percent"
              control={control}
              classes={SliderOkClasses}
              step={1}
              marks={marks}
              onChange={handleChangeSlider}
            />
          </>
        )}

        {Number(relayerFee) > 0 && (
          <div className={classes.relayerFee}>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" fontWeight={700} mr={1}>
                {t(keys.relayerFee)}
              </Typography>

              <Tooltip title={t(keys.relayerFeeTooltip)} />
            </Box>

            <Typography variant="body1">
              {`${relayerFee.toString()} ${unit}`}
            </Typography>
          </div>
        )}

        {shouldApprove ? (
          <>
            <div className={classes.approveContainer}>
              <Button
                size="large"
                type="button"
                disabled={isApproveDisabled}
                onClick={() => {
                  void handleApprove(depositValue);
                }}
                sx={{
                  flex: 1,
                  marginRight: '20px',
                }}
              >
                {isApproveLoading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  t(keys.approve)
                )}
              </Button>

              <Button
                size="large"
                type="submit"
                disabled={isSubmitDisabled}
                sx={{ flex: 1 }}
              >
                {t(keys.proceed)}
              </Button>
            </div>

            <Stepper
              className={classes.stepper}
              activeStep={isApproved ? 1 : 0}
            >
              <Step>
                <StepLabel icon={1} StepIconComponent={StepIcon} />
              </Step>

              <Step>
                <StepLabel icon={2} StepIconComponent={StepIcon} />
              </Step>
            </Stepper>
          </>
        ) : (
          <Button
            className={classes.proceedButton}
            disabled={isSubmitDisabled}
            size="large"
            type="submit"
          >
            {t(keys.proceed)}
          </Button>
        )}
      </form>
    </Modal>
  );
}

const useStyles = makeStyles()(theme => ({
  form: {
    marginTop: 48,
    display: 'flex',
    flexDirection: 'column',
  },
  arrow: {
    marginTop: '30px',
    alignSelf: 'center',
  },
  relayerFee: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  approveContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 28,
  },
  stepper: {
    '&&': {
      maxWidth: 350,
      width: '100%',
      margin: '0 auto',
    },
  },
  proceedButton: {
    '&&': {
      flex: 1,
      marginTop: '40px',
    },
  },
  info: {
    '&&': {
      padding: '12px 16px',
      border: `1px solid ${rgba(theme.colors.black, 0.2) ?? ''}`,
      borderRadius: '12px',
    },
  },

  caution: {
    color: theme.colors.red,
  },
}));
