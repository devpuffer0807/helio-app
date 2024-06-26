import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Step, StepLabel, Stepper } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import {
  HUNDRED,
  MAX_DECIMALS,
  NumberField,
  StepIcon,
  truncateNumber,
  useApproveAmount,
  ZERO,
} from 'modules/common';
import { useTranslation } from 'modules/i18n';
import { useLazyApproveQuery } from 'modules/store/actions/approve';
import { useGetApprovedAmountQuery } from 'modules/store/actions/getApprovedAmount';

import { BoostedVault, DepositLPArgs } from '../../actions/vaults/types';
import { translation } from './translation';

interface FormValues extends FieldValues {
  lp: string;
}

interface Props {
  vault: BoostedVault;
  onSubmit: (args: DepositLPArgs) => Promise<void>;
}

export function StakeLPForm({ onSubmit, vault }: Props): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      lp: '',
    },
  });

  const {
    APR,
    poolId,
    farmingAddress,
    lpToken: { address: lpAddress, price: lpPrice, balance: lpBalance },
  } = vault;

  const { approve, approvedAmount } = useApproveAmount(
    useLazyApproveQuery,
    useGetApprovedAmountQuery,
    {
      tokenAddress: lpAddress,
      targetAddress: farmingAddress,
    },
  );

  const lpInputValue = new BigNumber(watch('lp'));
  const isLPApproved =
    approvedAmount.isGreaterThanOrEqualTo(lpInputValue) &&
    lpInputValue.isGreaterThan(ZERO);
  const calculatedAPR = lpInputValue.isGreaterThan(ZERO)
    ? APR.div(HUNDRED).multipliedBy(lpInputValue).multipliedBy(lpPrice)
    : ZERO;

  const buttonText = isLPApproved ? t(keys.stakeLP) : t(keys.approve);

  const handleClickMaxLP = () => {
    setValue('lp', truncateNumber(lpBalance, MAX_DECIMALS, true), {
      shouldValidate: true,
    });
  };

  const handleFormSubmit = async ({ lp }: FormValues) => {
    try {
      setIsLoading(true);
      if (!isLPApproved) {
        await approve(new BigNumber(lp));
      } else {
        const value = new BigNumber(lp);
        await onSubmit({ value, lpAddress, poolId });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={classes.fieldWrapper}>
        <NumberField
          name="lp"
          balance={lpBalance}
          control={control}
          variant="filled"
          label={t(keys.LPAmount)}
          error={!!errors.lp}
          additionalLabel={t(keys.available, {
            amount: truncateNumber(lpBalance, MAX_DECIMALS),
          })}
          additionalLabelOnClick={handleClickMaxLP}
          helperText={errors.lp?.message}
        />
      </div>

      <div className={classes.yearlyEarning}>
        <Typography variant="h6">{t(keys.yearlyEarning)}</Typography>
        <Typography variant="body2">
          {t('units.≈$-value', { value: truncateNumber(calculatedAPR, 2) })}
        </Typography>
      </div>
      <Typography variant="body3">
        {t(keys.APR, {
          value: t('units.percent-no-space', { value: truncateNumber(APR, 2) }),
        })}
      </Typography>

      <Button size="large" type="submit" fullWidth className={classes.button}>
        {isLoading ? <CircularProgress color="inherit" /> : buttonText}
      </Button>

      <Stepper
        activeStep={isLPApproved ? 1 : 0}
        sx={{ maxWidth: '350px', width: '100%', margin: '35px auto 0' }}
      >
        <Step>
          <StepLabel icon={1} StepIconComponent={StepIcon} />
        </Step>

        <Step>
          <StepLabel icon={2} StepIconComponent={StepIcon} />
        </Step>
      </Stepper>
    </form>
  );
}

const useStyles = makeStyles()(theme => ({
  fieldWrapper: {
    marginBottom: theme.spacing(5),
  },
  yearlyEarning: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    '&&': {
      marginTop: 40,
    },
  },
}));
