import React, { ChangeEvent, useEffect, useMemo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import { BorrowRoutesConfig } from 'modules/borrow';
import {
  BORROWED_LIQUIDATION_PERCENT,
  HUNDRED,
  keepValueInRange,
  MAX_DECIMALS,
  Modal,
  NumberField,
  SAFE_BORROW_LIMIT_PERCENTS,
  Slider,
  TextField,
  TokenSelect,
  Tooltip,
  truncateNumber,
  useMarks,
  useNavigateSearch,
  Warning,
  WithdrawingTokenSelect,
  ZERO,
} from 'modules/common';
import { ReactComponent as BorderedArrowIcon } from 'modules/common/assets/form-arrow.svg';
import {
  CollateralToken,
  DISABLE_MULTI_COLLATERAL,
  useCollateralToken,
} from 'modules/core';
import { t } from 'modules/i18n';
import { useGetAccountDataQuery } from 'modules/store/actions/getAccountData';
import { rgba, SliderOkClasses } from 'modules/theme';

import {
  useLazyGetBalanceOfCollateralQuery,
  useLazyGetWithdrawableCollateralFeeQuery,
  useLazyGetWithdrawableCollateralQuery,
} from '../../actions';

interface Props {
  executed: boolean;
  onSubmit: (values: FieldValues) => void;
}

const SLIDER_STEP = 1;

export function Form({ executed, onSubmit }: Props): JSX.Element {
  const navigate = useNavigateSearch();
  const [{ token, unit, icon, minWithdrawalAmount, withdrawalTokens }] =
    useCollateralToken();

  const { classes } = useStyles();

  const { data: accountData } = useGetAccountDataQuery({ token });

  const {
    collateral = ZERO,
    collateralRatio = ZERO,
    borrowed = ZERO,
  } = accountData ?? {};

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      withdraw: '',
      percent: 0,
      withdrawalTokenIndex: 0,
      strategy: withdrawalTokens[0]?.address || '',
      isStakedToken: true,
    },
  });

  const [
    getWithdrawableCollateralByStrategy,
    { data: withdrawableAmountByStrategy },
  ] = useLazyGetWithdrawableCollateralQuery();

  const [
    getWithdrawableCollateralFeeByStrategy,
    { data: withdrawableFeeAmountByStrategy },
  ] = useLazyGetWithdrawableCollateralFeeQuery();

  const [getBalanceOfCollateral, { data: balanceOfCollateral }] =
    useLazyGetBalanceOfCollateralQuery();

  const withdrawInputValue = watch('withdraw');
  const { withdraw: withdrawError } = errors;
  const percentInputValue = watch('percent');
  const withdrawalTokenIndex = watch('withdrawalTokenIndex');
  const marks = useMarks(percentInputValue);

  const withdrawalTokenIndexSelected = useMemo(() => {
    if (withdrawalTokenIndex > withdrawalTokens.length) {
      return 0;
    }
    return withdrawalTokenIndex;
  }, [withdrawalTokenIndex, withdrawalTokens]);

  const selectedUnit = useMemo(() => {
    return withdrawalTokens[withdrawalTokenIndexSelected]?.name;
  }, [withdrawalTokenIndexSelected, withdrawalTokens]);

  const withdrawableAmount = useMemo(() => {
    if (borrowed.isZero()) {
      return collateral;
    }

    const value = collateral
      .minus(borrowed.dividedBy(collateralRatio))
      .multipliedBy(BORROWED_LIQUIDATION_PERCENT.dividedBy(HUNDRED));
    if (value.isLessThan(ZERO) || value.isNaN()) {
      return ZERO;
    }

    return value;
  }, [collateral, borrowed, collateralRatio]);

  useEffect(() => {
    void getWithdrawableCollateralByStrategy({
      amount: withdrawInputValue,
    });
  }, [
    withdrawalTokenIndexSelected,
    withdrawInputValue,
    getWithdrawableCollateralByStrategy,
  ]);

  useEffect(() => {
    void getWithdrawableCollateralFeeByStrategy({
      amount: withdrawInputValue,
    });
  }, [getWithdrawableCollateralFeeByStrategy, withdrawInputValue]);

  useEffect(() => {
    void getBalanceOfCollateral({
      strategy: withdrawalTokens[withdrawalTokenIndexSelected]?.address,
      tokenName: withdrawalTokens[withdrawalTokenIndexSelected]?.name,
    });
  }, [
    withdrawalTokenIndexSelected,
    withdrawableAmount,
    getBalanceOfCollateral,
    withdrawalTokens,
  ]);

  const computedBorrowLimit = useMemo(() => {
    if (withdrawError) {
      return '';
    }

    const withdraw = new BigNumber(withdrawInputValue || 0);

    const borrowLimit = collateral
      .minus(withdraw)
      .multipliedBy(collateralRatio);
    if (borrowLimit.isGreaterThan(ZERO)) {
      return truncateNumber(borrowLimit, 3, true);
    }

    return '';
  }, [collateral, collateralRatio, withdrawError, withdrawInputValue]);

  const minPercent = useMemo(
    () =>
      collateralRatio.isZero() || collateral.isZero()
        ? ZERO
        : borrowed
            .multipliedBy(HUNDRED)
            .dividedBy(collateral.multipliedBy(collateralRatio)),
    [borrowed, collateral, collateralRatio],
  );

  const maxPercent = useMemo(() => {
    const limitPercent = borrowed.isZero()
      ? HUNDRED
      : BORROWED_LIQUIDATION_PERCENT;
    const percent = borrowed
      .multipliedBy(HUNDRED)
      .dividedBy(
        collateral.minus(withdrawableAmount).multipliedBy(collateralRatio),
      );

    return percent.isGreaterThan(limitPercent) ? limitPercent : percent;
  }, [borrowed, collateral, collateralRatio, withdrawableAmount]);

  const handleChangeWithdrawValue = (value: BigNumber) => {
    if (value.isNaN()) {
      setValue('percent', minPercent.decimalPlaces(2).toNumber(), {
        shouldValidate: true,
      });
      return;
    }

    const percent = borrowed
      .multipliedBy(HUNDRED)
      .dividedBy(collateral.minus(value).multipliedBy(collateralRatio));

    const newPercent = percent.isNaN() ? ZERO : percent;
    setValue(
      'percent',
      keepValueInRange(newPercent, minPercent, maxPercent)
        .decimalPlaces(2)
        .toNumber(),
      { shouldValidate: true },
    );
  };

  const additionalLabelOnClick = () => {
    handleChangeWithdrawValue(withdrawableAmount);
    setValue(
      'withdraw',
      truncateNumber(withdrawableAmount, MAX_DECIMALS, true),
      {
        shouldValidate: true,
      },
    );
  };

  const onChangeInputField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    handleChangeWithdrawValue(new BigNumber(event.target.value));
  };

  const handleChangeSlider = (_: Event, value: number | number[]) => {
    const percent = keepValueInRange(
      new BigNumber(Array.isArray(value) ? value[0] : value),
      minPercent,
      maxPercent,
    );
    const newWithdraw =
      collateralRatio.isZero() || percent.isZero()
        ? ZERO
        : collateral.minus(
            borrowed
              .multipliedBy(HUNDRED)
              .dividedBy(percent.multipliedBy(collateralRatio)),
          );

    setValue(
      'withdraw',
      truncateNumber(keepValueInRange(newWithdraw, ZERO, withdrawableAmount)),
      { shouldValidate: true },
    );

    setValue('percent', percent.decimalPlaces(2).toNumber());
  };

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(
      'withdrawalTokenIndex',
      withdrawalTokens.findIndex(token => token.name === event.target.value),
    );
    setValue(
      'isStakedToken',
      withdrawalTokens[
        withdrawalTokens.findIndex(token => token.name === event.target.value)
      ].address !== '',
    );
    setValue(
      'strategy',
      withdrawalTokens[
        withdrawalTokens.findIndex(token => token.name === event.target.value)
      ].address,
    );
  };

  const isWarningShown = Number(percentInputValue) > SAFE_BORROW_LIMIT_PERCENTS;

  const isSubmitDisabled = executed;

  useEffect(() => {
    if (minPercent.isZero()) {
      return;
    }

    void setValue('percent', minPercent.decimalPlaces(2).toNumber());
  }, [minPercent, setValue]);

  return (
    <Modal
      title={t('withdraw.withdraw.title', {
        unit,
      })}
      onClose={() => {
        navigate(BorrowRoutesConfig.dashboard.generatePath(), { token });
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <NumberField
          name="withdraw"
          control={control}
          balance={withdrawableAmount}
          min={minWithdrawalAmount}
          variant="filled"
          unit={unit}
          label={t('withdraw.withdraw.withdrawal-amount')}
          additionalLabel={<Box />}
          error={!!withdrawError}
          helperText={withdrawError?.message}
          onChange={onChangeInputField}
          InputProps={{
            endAdornment: DISABLE_MULTI_COLLATERAL ? (
              <InputAdornment position="end">
                <Box display="flex" alignItems="center" position="relative">
                  <Box
                    className={classes.maxContainer}
                    onClick={additionalLabelOnClick}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      ml={1}
                      position="absolute"
                      left="-100%"
                    >
                      MAX
                    </Typography>
                  </Box>

                  <img src={icon} alt="" />

                  <Typography variant="body1" fontWeight={600} ml={1}>
                    {unit}
                  </Typography>
                </Box>
              </InputAdornment>
            ) : (
              <InputAdornment position="end">
                <TokenSelect />
              </InputAdornment>
            ),
          }}
        />

        <Box
          display="flex"
          alignItems="baseline"
          className={classes.additionalLabel}
          onClick={additionalLabelOnClick}
        >
          <Typography variant="body3" mt={1}>
            {t('withdraw.withdraw.balance')}
          </Typography>
          <Typography variant="body2" mt={1} ml={1} fontWeight={500}>
            {`${truncateNumber(withdrawableAmount)} ${unit}`}
          </Typography>
        </Box>

        {(token === CollateralToken.Main || token === CollateralToken.Eth) && (
          <Box sx={{ mt: 3 }}>
            <WithdrawingTokenSelect
              name="withdrawingToken"
              control={control}
              label={t('withdraw.withdraw.withdrawing-token')}
              withdrawingPeriod={t('withdraw.withdraw.withdrawing-period')}
              withdrawingTokenIndex={withdrawalTokenIndexSelected}
              withdrawableAmountByStrategy={withdrawableAmountByStrategy}
              withdrawableFeeAmountByStrategy={withdrawableFeeAmountByStrategy}
              withdrawInputValue={withdrawInputValue}
              handleSelectChange={handleSelectChange}
              additionalLabel={
                <Box display="flex" alignItems="center">
                  {withdrawalTokens[withdrawalTokenIndexSelected]?.name !==
                    CollateralToken.Main && (
                    <Typography
                      className={classes.additionalLabel}
                      variant="subtitle2"
                      component="div"
                    >
                      {t('withdraw.withdraw.withdrawable', {
                        value: `${truncateNumber(
                          balanceOfCollateral || ZERO,
                        )} ${selectedUnit}`,
                      })}
                    </Typography>
                  )}

                  <Tooltip
                    title={t(
                      'withdraw.withdraw.withdrawable-tooltip',
                      undefined,
                      true,
                    )}
                  />
                </Box>
              }
            />
          </Box>
        )}

        <BorderedArrowIcon className={classes.borderedArrowIcon} />

        <TextField
          label={t('withdraw.withdraw.borrow-limit')}
          value={computedBorrowLimit}
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <div className={classes.adornment}>
                  <Typography variant="body1" fontWeight={600}>
                    {t('units.LOAN_TOKEN')}
                  </Typography>
                </div>
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body1" fontWeight={700} sx={{ marginTop: '40px' }}>
          {t('withdraw.withdraw.period')}
        </Typography>

        <Slider
          sx={{ mb: 1, mt: 4 }}
          name="percent"
          control={control}
          step={SLIDER_STEP}
          marks={marks}
          onChange={handleChangeSlider}
          classes={SliderOkClasses}
          error={isWarningShown}
        />

        {isWarningShown && (
          <Box mb={3}>
            <Warning variant="body2" prefix={t('slider.caution')}>
              {t('withdraw.withdraw.caution')}
            </Warning>
          </Box>
        )}

        {token === CollateralToken.Main && (
          <Box
            sx={theme => ({
              padding: '12px 16px',
              border: `1px solid ${rgba(theme.colors.black, 0.2) ?? ''}`,
              borderRadius: '12px',
            })}
          >
            <Typography variant="body3" mt={1}>
              {t('withdraw.withdraw.info')}
            </Typography>
          </Box>
        )}

        <Button
          size="large"
          type="submit"
          disabled={isSubmitDisabled}
          sx={{ mt: 5 }}
        >
          {t('withdraw.withdraw.proceed')}
        </Button>
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

  adornment: {
    display: 'flex',
    alignItems: 'center',

    '& > img': {
      marginRight: 12,
    },
  },

  borderedArrowIcon: {
    marginTop: 30,
    width: 36,
    alignSelf: 'center',
  },

  listItem: {
    '&&': {
      color: theme.colors.black,
    },
  },

  additionalLabel: {
    '&&': {
      transition: '0.3s',
      cursor: 'pointer',
      marginRight: '4px',
      color: 'inherit',

      '&:hover': {
        color: theme.colors.black,
      },
    },
  },

  maxContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
}));
