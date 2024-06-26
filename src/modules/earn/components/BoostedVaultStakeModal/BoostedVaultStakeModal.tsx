import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { Modal, TabPanel } from 'modules/common';
import { EarnRoutesConfig } from 'modules/earn/EarnRoutesConfig';
import { useTranslation } from 'modules/i18n';
import { rgba } from 'modules/theme';

import {
  BoostedVaultEntry,
  DepositLPArgs,
  DepositPairArgs,
} from '../../actions/vaults/types';
import { useGetVaultEntryFromURL } from '../../hooks/useGetVaultEntryFromURL';
import { POOL_ICONS_MAP } from '../../utils/poolIconsMap';
import { GetLPForm } from '../GetLPForm';
import { StakeLPForm } from '../StakeLPForm';
import { translation } from './translation';

interface Props {
  onSubmitStakePair: (args: DepositPairArgs) => Promise<void>;
  onSubmitStakeLP: (args: DepositLPArgs) => Promise<void>;
}

export function BoostedVaultStakeModal({
  onSubmitStakePair,
  onSubmitStakeLP,
}: Props): JSX.Element | null {
  const { t, keys } = useTranslation(translation);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { classes } = useStyles();

  const vaultEntry = useGetVaultEntryFromURL() as BoostedVaultEntry;
  const { data: vault } = vaultEntry.useGetInfo();

  if (!vault) {
    return null;
  }

  const {
    name: poolName,
    lpToken: { name: lpName },
  } = vault;

  return (
    <Modal
      title={t(keys.stake, { tokenName: lpName })}
      onClose={() => {
        navigate(EarnRoutesConfig.dashboard.generatePath());
      }}
    >
      <div className={classes.poolName}>
        {POOL_ICONS_MAP[poolName]}
        {poolName}
      </div>

      <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
        <Tab label={t(keys.getLPAndStake)} />
        <Tab label={t(keys.stakeLP)} />
      </Tabs>

      <div className={classes.divider} />

      <TabPanel value={activeTab} index={0}>
        <GetLPForm onSubmit={onSubmitStakePair} vault={vault} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <StakeLPForm onSubmit={onSubmitStakeLP} vault={vault} />
      </TabPanel>
    </Modal>
  );
}

const useStyles = makeStyles()(theme => ({
  poolName: {
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(6),
  },
  divider: {
    height: 1,
    width: 'calc(100% + 80px)',
    position: 'relative',
    bottom: 1,
    marginLeft: '-40px',
    background: rgba(theme.colors.black, 0.1),
    marginBottom: '40px',
  },
}));
