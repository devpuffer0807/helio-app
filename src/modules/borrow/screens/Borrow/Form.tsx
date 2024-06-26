import React, { ChangeEvent, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import {
  BORROW_LIMIT_PERCENTS,
  HUNDRED,
  keepValueInRange,
  Modal,
  NumberField,
  SAFE_BORROW_LIMIT_PERCENTS,
  Slider,
  Tooltip,
  truncateNumber,
  Warning,
  ZERO,
} from 'modules/common';
import { ReactComponent as ArrowRightIcon } from 'modules/common/assets/arrow-right.svg';
import { useCollateralToken } from 'modules/core';
import loanTokenIcon from 'modules/core/assets/loanToken.svg';
import { t } from 'modules/i18n';
import { useGetAccountDataQuery } from 'modules/store/actions/getAccountData';
import { useGetBorrowAPRQuery } from 'modules/store/actions/getBorrowAPR';
import { useGetMinLoanTokenAmountQuery } from 'modules/store/actions/getMinLoanTokenAmount';
import { SliderOkClasses } from 'modules/theme';

import { BorrowRoutesConfig } from '../../Routes';

interface Props {
  executed: boolean;
  onSubmit(depositValue: BigNumber): void;
}

interface FormValues {
  amount: string;
  percent: number;
}

export function Form({ executed, onSubmit }: Props): JSX.Element {
  const navigate = useNavigate();
  const [{ token }] = useCollateralToken();
  const { data: fetchedBorrowAPR } = useGetBorrowAPRQuery({ token });
  const { data } = useGetAccountDataQuery({ token });
  const { classes } = useStyles();

  const { data: minBorrowAmountData } = useGetMinLoanTokenAmountQuery({
    token,
  });

  const {
    borrowLimit = ZERO,
    borrowedPercent = ZERO,
    borrowed = ZERO,
    collateral = ZERO,
    collateralRatio = ZERO,
  } = data ?? {};

  const minBorrowAmount = borrowed.isGreaterThanOrEqualTo(
    minBorrowAmountData ?? ZERO,
  )
    ? ZERO
    : minBorrowAmountData;

  const balance = useMemo(
    () => borrowLimit.minus(borrowed),
    [borrowLimit, borrowed],
  );
  const balanceLimit = balance.isLessThanOrEqualTo(ZERO)
    ? ZERO
    : borrowLimit
        .multipliedBy(BORROW_LIMIT_PERCENTS)
        .div(HUNDRED)
        .minus(borrowed);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      amount: '',
      percent: borrowedPercent?.toNumber() ?? 0,
    },
  });

  const amountInputValue = watch('amount');
  const percent = watch('percent');
  const isPercentError = percent > SAFE_BORROW_LIMIT_PERCENTS;
  const borrowAPR = truncateNumber(fetchedBorrowAPR ?? ZERO, 2);

  const convertedAmount = useMemo(() => {
    const convertedValue = new BigNumber(amountInputValue);

    return convertedValue.isNaN() ? ZERO : convertedValue;
  }, [amountInputValue]);

  const totalBorrowAmount = useMemo(
    () => convertedAmount.plus(borrowed),
    [borrowed, convertedAmount],
  );

  useEffect(() => {
    if (borrowedPercent.isZero()) {
      return;
    }

    setValue(
      'percent',
      keepValueInRange(borrowedPercent, ZERO, HUNDRED)
        .decimalPlaces(2)
        .toNumber(),
      { shouldValidate: true },
    );
  }, [setValue, borrowedPercent]);

  const onInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const amount = event.target.value || '0';
    const convertedAmount = new BigNumber(amount);
    if (convertedAmount.isNaN() || borrowLimit.isZero()) {
      return;
    }

    const newPercent = convertedAmount
      .plus(borrowed)
      .dividedBy(collateral.multipliedBy(collateralRatio))
      .multipliedBy(HUNDRED);

    setValue(
      'percent',
      keepValueInRange(newPercent, ZERO, HUNDRED).decimalPlaces(2).toNumber(),
      { shouldValidate: true },
    );
  };

  const handleChangeSlider = (_: Event, value: number | number[]) => {
    const convertedValue = new BigNumber(
      Array.isArray(value) ? value[0] : value,
    );
    if (convertedValue.isGreaterThan(BORROW_LIMIT_PERCENTS)) {
      return null;
    }

    const newPercent = convertedValue.isLessThan(borrowedPercent)
      ? borrowedPercent
      : convertedValue;

    const newAmount = convertedValue
      .dividedBy(HUNDRED)
      .multipliedBy(collateral.multipliedBy(collateralRatio))
      .minus(borrowed);

    setValue(
      'amount',
      truncateNumber(
        keepValueInRange(newAmount, ZERO, borrowLimit),
        undefined,
        true,
      ),
      {
        shouldValidate: true,
      },
    );
    setValue('percent', newPercent.toNumber());
  };

  return (
    <Modal
      title={t('borrow.borrow.title')}
      onClose={() => {
        navigate(BorrowRoutesConfig.dashboard.generatePath());
      }}
    >
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(({ amount }) => onSubmit(new BigNumber(amount)))}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: '20px', mb: '50px' }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              opacity: 0.5,
              marginRight: '5px',
              textAlign: { md: 'center' },
            }}
          >
            {t('borrow.borrow.borrow-apr', { value: `${borrowAPR}%` })}
          </Typography>
          <Tooltip
            title={t('borrow.borrow.borrow-apr-tooltip', {
              unit: t('units.LOAN_TOKEN'),
            })}
          />
        </Box>

        <NumberField
          name="amount"
          control={control}
          balance={balanceLimit}
          min={minBorrowAmount}
          variant="filled"
          label={t('borrow.borrow.borrow-amount')}
          error={!!errors.amount}
          helperText={errors.amount?.message}
          onChange={onInputChange}
          unit={t('units.LOAN_TOKEN')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <img src={loanTokenIcon} alt="" />

                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ marginLeft: '10px' }}
                  >
                    {t('units.LOAN_TOKEN')}
                  </Typography>
                </Box>
              </InputAdornment>
            ),
          }}
        />

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

                <span>
                  {t('units.LOAN_TOKEN-value', {
                    value: truncateNumber(totalBorrowAmount),
                  })}
                </span>
              </Typography>
            }
          >
            {t('borrow.borrow.total-loan')}
          </ListItem>
        </List>

        <Divider />

        <Typography variant="body1" fontWeight={700} sx={{ marginTop: '28px' }}>
          {t('borrow.borrow.borrow-utilization')}
        </Typography>

        <Slider
          name="percent"
          control={control}
          sx={{ mb: 1, mt: 4 }}
          error={isPercentError}
          classes={SliderOkClasses}
          placeholder={t('borrow.borrow.limit', {
            value: truncateNumber(borrowLimit),
            unit: t('units.LOAN_TOKEN'),
          })}
          onChange={handleChangeSlider}
        />

        {isPercentError && (
          <Warning variant="body2" mt={4} prefix={t('slider.caution')}>
            {t('withdraw.withdraw.caution')}
          </Warning>
        )}

        <Button
          size="large"
          type="submit"
          disabled={executed}
          sx={{ mt: '52px' }}
        >
          {t('borrow.borrow.proceed')}
        </Button>
      </Box>
    </Modal>
  );
}

const useStyles = makeStyles()(theme => ({
  list: {
    '&&': {
      marginTop: 58,
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
}));
