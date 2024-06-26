import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import {
  MAX_DECIMALS,
  Modal,
  NumberField,
  truncateNumber,
  ZERO,
} from 'modules/common';
import { EarnRoutesConfig } from 'modules/earn/EarnRoutesConfig';
import { useTranslation } from 'modules/i18n';

import { useGetStakedAmountQuery } from '../../actions/vaults/getStakedAmount';
import { BoostedVaultEntry } from '../../actions/vaults/types';
import { useGetVaultEntryFromURL } from '../../hooks/useGetVaultEntryFromURL';
import { POOL_ICONS_MAP } from '../../utils/poolIconsMap';
import { translation } from './translation';

interface FormValues extends FieldValues {
  lp: string;
}

interface UnstakeArgs {
  value: BigNumber;
  poolId: string;
}

interface Props {
  onSubmit: (args: UnstakeArgs) => Promise<void>;
}

export function BoostedVaultUnstakeModal({
  onSubmit,
}: Props): JSX.Element | null {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t, keys } = useTranslation(translation);
  const { classes } = useStyles();
  const vaultEntry = useGetVaultEntryFromURL() as BoostedVaultEntry;
  const { data: vault } = vaultEntry.useGetInfo();
  const { data: stakedTokens } = useGetStakedAmountQuery(vaultEntry.poolId);
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      lp: '',
    },
  });

  if (!vault) {
    return null;
  }

  const { name: poolName } = vault;

  const handleClickMaxLP = () => {
    const value = stakedTokens ?? ZERO;

    setValue('lp', truncateNumber(value, MAX_DECIMALS, true), {
      shouldValidate: true,
    });
  };

  const handleFormSubmit = async ({ lp }: FormValues) => {
    try {
      setIsLoading(true);
      const value = new BigNumber(lp);
      await onSubmit({
        value,
        poolId: vaultEntry.poolId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={t(keys.unstake, { tokenName: vault.lpToken.name })}
      onClose={() => {
        navigate(EarnRoutesConfig.dashboard.generatePath());
      }}
    >
      <div className={classes.poolName}>
        {POOL_ICONS_MAP[poolName]}
        {poolName}
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={classes.fieldWrapper}>
          <NumberField
            name="lp"
            balance={stakedTokens}
            control={control}
            variant="filled"
            label={t(keys.LPAmount)}
            error={!!errors.lp}
            additionalLabel={t(keys.available, {
              amount: truncateNumber(stakedTokens ?? ZERO, MAX_DECIMALS),
            })}
            additionalLabelOnClick={handleClickMaxLP}
            helperText={errors.lp?.message}
          />
        </div>
        <Button size="large" type="submit" fullWidth>
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            t(keys.farmingUnstake)
          )}
        </Button>
      </form>
    </Modal>
  );
}

const useStyles = makeStyles()(theme => ({
  fieldWrapper: {
    marginBottom: theme.spacing(5),
  },
  poolName: {
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(6),
  },
}));
