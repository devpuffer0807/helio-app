import React, { ChangeEvent, useMemo, useState } from 'react';
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
import { rgba } from 'modules/theme';

import {
  BoostedVault,
  BoostedVaultEntry,
  DepositPairArgs,
} from '../../actions/vaults/types';
import { useGetVaultEntryFromURL } from '../../hooks/useGetVaultEntryFromURL';
import { translation } from './translation';

interface FormValues extends FieldValues {
  first: string;
  second: string;
}

interface Props {
  vault: BoostedVault;
  onSubmit: (args: DepositPairArgs) => Promise<void>;
}

export function GetLPForm({ onSubmit, vault }: Props): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues = vault.tokens.reduce(
    (acc, c) => ({ ...acc, [c.name]: '' }),
    {},
  );
  const vaultEntry = useGetVaultEntryFromURL() as BoostedVaultEntry;

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
  });

  const {
    strategyAddress,
    poolId,
    APR,
    proxyAddress,
    tokens: [firstToken, secondToken],
  } = vault;

  const { data: shares } = vaultEntry.useGetShares({
    strategyAddress,
    poolId,
  });

  const {
    approve: approveFirstToken,
    approvedAmount: firstTokenApprovedAmount,
  } = useApproveAmount(useLazyApproveQuery, useGetApprovedAmountQuery, {
    tokenAddress: firstToken.address,
    targetAddress: proxyAddress,
  });
  const {
    approve: approveSecondToken,
    approvedAmount: secondTokenApprovedAmount,
  } = useApproveAmount(useLazyApproveQuery, useGetApprovedAmountQuery, {
    tokenAddress: secondToken.address,
    targetAddress: proxyAddress,
  });

  const rawFirstTokenInputValue = watch(firstToken.name);
  const rawSecondTokenInputValue = watch(secondToken.name);

  const firstTokenInputValue = useMemo(
    () =>
      new BigNumber(
        rawFirstTokenInputValue === '' ? ZERO : rawFirstTokenInputValue,
      ),
    [rawFirstTokenInputValue],
  );
  const secondTokenInputValue = useMemo(
    () =>
      new BigNumber(
        rawSecondTokenInputValue === '' ? ZERO : rawSecondTokenInputValue,
      ),
    [rawSecondTokenInputValue],
  );
  const isFirstTokenApproved =
    firstTokenApprovedAmount.isGreaterThanOrEqualTo(firstTokenInputValue) &&
    firstTokenInputValue.isGreaterThan(ZERO);
  const isSecondTokenApproved =
    secondTokenApprovedAmount.isGreaterThanOrEqualTo(secondTokenInputValue) &&
    secondTokenInputValue.isGreaterThan(ZERO);

  const totalInputValue = firstTokenInputValue.plus(secondTokenInputValue);

  const calculatedAPR = totalInputValue.isGreaterThan(ZERO)
    ? APR.div(HUNDRED).multipliedBy(totalInputValue)
    : ZERO;

  const stepperValue = () => {
    if (!isSecondTokenApproved && !isFirstTokenApproved) {
      return 0;
    }

    if (!isSecondTokenApproved) {
      return 1;
    }

    return 2;
  };

  const buttonText = () => {
    if (!rawFirstTokenInputValue || !rawSecondTokenInputValue) {
      return t(keys.getLPAndStake);
    }
    if (!isFirstTokenApproved) {
      return t(keys.approveToken, { token: firstToken.name });
    }
    if (!isSecondTokenApproved) {
      return t(keys.approveToken, { token: secondToken.name });
    }
    return t(keys.getLPAndStake);
  };

  const handleChange = (
    name: string,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = new BigNumber(event.target.value);
    const token = vault.tokens.find(token => token.name !== name);
    const anotherToken = vault.tokens.find(token => token.name !== name);

    if (!token || !anotherToken || !token.isBound) {
      return;
    }

    if (value.isGreaterThanOrEqualTo(ZERO) && token.equivalent) {
      setValue(
        anotherToken.name,
        truncateNumber(
          value.multipliedBy(token.equivalent),
          MAX_DECIMALS,
          true,
        ),
        {
          shouldValidate: true,
        },
      );
    } else if (value.isNaN()) {
      setValue(token.name, '');
    }
  };

  const handleClickMax = (name: string) => {
    const token = vault.tokens.find(token => token.name === name);

    if (!token) {
      return;
    }

    setValue(name, truncateNumber(token.balance, MAX_DECIMALS, true), {
      shouldValidate: true,
    });

    if (
      token.isBound &&
      token.balance.isGreaterThanOrEqualTo(ZERO) &&
      token.equivalent
    ) {
      const anotherToken = vault.tokens.find(t => t.name !== token.name);

      if (anotherToken) {
        setValue(
          anotherToken.name,
          truncateNumber(
            token.balance.multipliedBy(token.equivalent),
            MAX_DECIMALS,
            true,
          ),
          {
            shouldValidate: true,
          },
        );
      }
    }
  };

  const handleFormSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      if (!isFirstTokenApproved) {
        await approveFirstToken(new BigNumber(values[firstToken.name]));
      } else if (!isSecondTokenApproved) {
        await approveSecondToken(new BigNumber(values[secondToken.name]));
      } else {
        await onSubmit({
          firstAmount: new BigNumber(values[firstToken.name]),
          secondAmount: new BigNumber(values[secondToken.name]),
          firstAddress: firstToken.address,
          secondAddress: secondToken.address,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={classes.fields}>
        {vault.tokens.map(token => (
          <NumberField
            key={token.address}
            name={token.name}
            control={control}
            balance={token.balance ?? ZERO}
            variant="filled"
            label={`${token.name} ${t(keys.amount)}`}
            error={!!errors[token.name]}
            helperText={errors[token.name]?.message}
            additionalLabel={t(keys.available, {
              amount: truncateNumber(token.balance ?? ZERO, MAX_DECIMALS),
            })}
            additionalLabelOnClick={() => handleClickMax(token.name)}
            onChange={event => handleChange(token.name, event)}
          />
        ))}
      </div>
      <Typography variant="body1" fontSize={16} fontWeight={700}>
        {t(keys.pricesAndPoolShare)}
      </Typography>
      <div className={classes.info}>
        {vault.tokens.map((token, index, array) => {
          const tokenInPair = index === 1 ? array[0] : array[1];

          return (
            <div className={classes.infoPiece} key={token.name}>
              <Typography
                variant="body1"
                fontWeight={500}
                mb={1.2}
                className={classes.label}
              >
                {token.name} {t(keys.per)} {tokenInPair.name}
              </Typography>
              <Typography variant="h5">
                {token.equivalent ? truncateNumber(token.equivalent) : ''}
              </Typography>
            </div>
          );
        })}
        <div className={classes.infoPiece}>
          <Typography
            variant="body1"
            fontWeight={500}
            mb={1.2}
            className={classes.label}
          >
            {t(keys.ShareOfPool)}
          </Typography>
          <Typography variant="h5">
            {shares
              ? t('units.percent-no-space', {
                  value: truncateNumber(shares, 2),
                })
              : ''}
          </Typography>
        </div>
      </div>

      <div className={classes.yearlyEarning}>
        <Typography variant="h6">{t(keys.yearlyEarning)}</Typography>
        <Typography variant="body2">
          {t('units.≈$-value', { value: truncateNumber(calculatedAPR, 2) })}
        </Typography>
      </div>
      <Typography variant="body3">
        {t(keys.APR, {
          value: t('units.percent-no-space', {
            value: truncateNumber(APR, 2),
          }),
        })}
      </Typography>

      <Button size="large" type="submit" fullWidth className={classes.button}>
        {isLoading ? <CircularProgress color="inherit" /> : buttonText()}
      </Button>

      <Stepper
        activeStep={stepperValue()}
        sx={{ maxWidth: '350px', width: '100%', margin: '35px auto 0' }}
      >
        <Step>
          <StepLabel icon={1} StepIconComponent={StepIcon} />
        </Step>

        <Step>
          <StepLabel icon={2} StepIconComponent={StepIcon} />
        </Step>

        <Step>
          <StepLabel icon={3} StepIconComponent={StepIcon} />
        </Step>
      </Stepper>
    </form>
  );
}

const useStyles = makeStyles()(theme => ({
  fields: {
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    border: `1px solid ${rgba(theme.colors.black, 0.1) as string}`,
    borderRadius: 18,
    padding: '27px 20px',
    marginTop: '18px',
    marginBottom: '40px',
  },
  infoPiece: {
    width: '33.33333%',
    textAlign: 'center',

    '&:nth-of-type(2)': {
      borderLeft: `1px solid ${rgba(theme.colors.black, 0.1) as string}`,
      borderRight: `1px solid ${rgba(theme.colors.black, 0.1) as string}`,
    },
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
  label: {
    '&&': {
      color: rgba(theme.colors.black, 0.5),
    },
  },
}));
