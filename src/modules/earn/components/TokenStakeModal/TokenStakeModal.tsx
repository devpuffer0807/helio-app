import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Step, StepLabel, Stepper } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import {
  HUNDRED,
  MAX_DECIMALS,
  Modal,
  NumberField,
  StepIcon,
  truncateNumber,
  useApproveAmount,
  ZERO,
} from 'modules/common';
import { useTranslation } from 'modules/i18n';
import { useLazyApproveQuery } from 'modules/store/actions/approve';
import { useGetApprovedAmountQuery } from 'modules/store/actions/getApprovedAmount';

import {
  StakingTokenEntry,
  StakingTokenInfo,
} from '../../actions/staking/types';
import { EarnRoutesConfig } from '../../EarnRoutesConfig';
import { useGetStakingTokenEntryFromURL } from '../../hooks/useGetStakingTokenEntryFromURL';
import { translation } from './translation';

interface FormValues extends FieldValues {
  token: string;
}

interface Props {
  onSubmit: (value: BigNumber) => Promise<void>;
}

interface StakingStakeModalViewProps {
  onSubmit: (value: BigNumber) => Promise<void>;
  stakingTokenInfo: StakingTokenInfo;
}

export function TokenStakeModal(props: Props): JSX.Element | null {
  const stakingTokenEntry =
    useGetStakingTokenEntryFromURL() as StakingTokenEntry;

  const { data: tokenInfo } = stakingTokenEntry.useGetInfo();

  if (!tokenInfo) {
    return null;
  }

  return <StakingStakeModalView {...props} stakingTokenInfo={tokenInfo} />;
}

function StakingStakeModalView({
  onSubmit,
  stakingTokenInfo,
}: StakingStakeModalViewProps): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const {
    targetAddress,
    APR,
    token: {
      address: tokenAddress,
      balance,
      name: tokenName,
      price: tokenPrice,
    },
  } = stakingTokenInfo;

  const { approve, approvedAmount } = useApproveAmount(
    useLazyApproveQuery,
    useGetApprovedAmountQuery,
    {
      tokenAddress,
      targetAddress,
    },
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      token: '',
    },
  });

  const tokenInputValue = new BigNumber(watch('token'));
  const isTokenApproved =
    approvedAmount.isGreaterThanOrEqualTo(tokenInputValue) &&
    tokenInputValue.isGreaterThan(ZERO);
  const buttonText = isTokenApproved ? t(keys.stake) : t(keys.approve);

  const yearlyEarningToken = tokenInputValue.isGreaterThan(ZERO)
    ? tokenInputValue.multipliedBy(APR).div(HUNDRED)
    : ZERO;

  const yearlyEarningUSD = yearlyEarningToken.multipliedBy(tokenPrice);

  const handleClickMaxLP = () => {
    setValue('token', truncateNumber(balance, MAX_DECIMALS, true), {
      shouldValidate: true,
    });
  };

  const handleFormSubmit = async ({ token }: FormValues) => {
    try {
      setIsLoading(true);
      if (!isTokenApproved) {
        await approve(new BigNumber(token));
      } else {
        await onSubmit(new BigNumber(token));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      onClose={() => navigate(EarnRoutesConfig.dashboard.generatePath())}
      title={t(keys.stakeHAY, { token: tokenName })}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.root}>
        <div className={classes.fieldWrapper}>
          <NumberField
            name="token"
            balance={balance}
            control={control}
            variant="filled"
            label={t(keys.tokenAmount, { token: tokenName })}
            error={!!errors.token}
            additionalLabel={t(keys.available, {
              amount: truncateNumber(balance ?? ZERO, MAX_DECIMALS),
            })}
            additionalLabelOnClick={handleClickMaxLP}
            helperText={errors.token?.message}
          />
        </div>
        <div className={classes.yearly}>
          <div>
            <Typography variant="body2" fontWeight={700} mb={0.5}>
              {t(keys.yearlyEarning)}
            </Typography>
            <Typography variant="body3">
              {t(keys.APR, { amount: APR.toFixed(2) })}
            </Typography>
          </div>
          <div className={classes.amountWrap}>
            <Typography variant="body2" mb={0.5}>
              {t(keys.amountToken, {
                amount: truncateNumber(yearlyEarningToken, 2),
                token: tokenName,
              })}
            </Typography>
            <Typography variant="body3">
              {t(keys.amountUSD, {
                amount: truncateNumber(yearlyEarningUSD, 2),
              })}
            </Typography>
          </div>
        </div>
        <Button size="large" type="submit" fullWidth>
          {isLoading ? <CircularProgress color="inherit" /> : buttonText}
        </Button>
        <Stepper
          activeStep={isTokenApproved ? 1 : 0}
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
    </Modal>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    marginTop: 50,
  },
  fieldWrapper: {
    marginBottom: theme.spacing(5),
  },
  yearly: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
  },
  amountWrap: {
    textAlign: 'right',
  },
  description: {
    opacity: 0.5,
  },
}));
