import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import {
  MAX_DECIMALS,
  Modal,
  NumberField,
  Tooltip,
  truncateNumber,
  ZERO,
} from 'modules/common';
import { EarnRoutesConfig } from 'modules/earn/EarnRoutesConfig';
import { useTranslation } from 'modules/i18n';
import { rgba } from 'modules/theme';

import {
  StakingTokenEntry,
  StakingTokenInfo,
} from '../../actions/staking/types';
import { useGetStakingTokenEntryFromURL } from '../../hooks/useGetStakingTokenEntryFromURL';
import { translation } from './translation';

interface FormValues extends FieldValues {
  loanToken: string;
}

interface Props {
  onSubmit: (value: BigNumber) => Promise<void>;
}

interface StakingUnstakeModalViewProps {
  onSubmit: (value: BigNumber) => Promise<void>;
  stakingTokenInfo: StakingTokenInfo;
}

export function TokenUnstakeModal(props: Props): JSX.Element | null {
  const stakingTokenEntry =
    useGetStakingTokenEntryFromURL() as StakingTokenEntry;

  const { data: tokenInfo } = stakingTokenEntry.useGetInfo();

  if (!tokenInfo) {
    return null;
  }

  return <StakingUnstakeModalView {...props} stakingTokenInfo={tokenInfo} />;
}

function StakingUnstakeModalView({
  onSubmit,
  stakingTokenInfo,
}: StakingUnstakeModalViewProps): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { classes } = useStyles();
  const {
    staked: balance,
    rewardToken: { balance: rewards },
    token: { name: tokenName },
  } = stakingTokenInfo;

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      loanToken: '',
    },
  });

  const loanTokenInputValue = new BigNumber(watch('loanToken'));
  const loanTokenUnstakeValue = loanTokenInputValue.isGreaterThan(ZERO)
    ? loanTokenInputValue
    : ZERO;
  const totalValue = loanTokenUnstakeValue.plus(rewards);

  const handleClickMaxLP = () => {
    setValue('loanToken', truncateNumber(balance, MAX_DECIMALS, true), {
      shouldValidate: true,
    });
  };

  const handleFormSubmit = async ({ loanToken }: FormValues) => {
    try {
      setIsLoading(true);
      await onSubmit(new BigNumber(loanToken));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      onClose={() => navigate(EarnRoutesConfig.dashboard.generatePath())}
      title={t(keys.unstakeToken, { token: tokenName })}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.root}>
        <div className={classes.fieldWrapper}>
          <NumberField
            name="loanToken"
            balance={balance}
            control={control}
            variant="filled"
            label={t(keys.tokenAmount, { token: tokenName })}
            error={!!errors.loanToken}
            additionalLabel={t(keys.available, {
              amount: truncateNumber(balance, MAX_DECIMALS),
            })}
            additionalLabelOnClick={handleClickMaxLP}
            helperText={errors.loanToken?.message}
          />
        </div>
        <div>
          <div className={classes.rewardsWrap}>
            <div className={classes.rewards}>
              <Typography variant="body2" fontWeight={700} mr={0.5}>
                {t(keys.rewards)}
              </Typography>
              <Tooltip title={t(keys.rewardsTooltip)} />
            </div>
            <Typography variant="body2">
              {t(keys.amountToken, {
                amount: rewards.toFixed(3),
                token: tokenName,
              })}
            </Typography>
          </div>
          <div className={classes.totalWrap}>
            <Typography variant="body2" fontWeight={700}>
              {t(keys.total)}
            </Typography>
            <Typography variant="body2">
              {t(keys.amountToken, {
                amount: truncateNumber(totalValue),
                token: tokenName,
              })}
            </Typography>
          </div>
        </div>
        <Button size="large" type="submit" fullWidth>
          {isLoading ? <CircularProgress color="inherit" /> : t(keys.unstake)}
        </Button>
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
  rewardsWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${rgba(theme.colors.black, 0.2) ?? ''}`,
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  rewards: {
    display: 'flex',
    alignItems: 'center',
  },
  totalWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
  },
}));
