import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { FARMING_POOLS, LENDING_POOLS } from 'modules/earn/consts';
import { EarnRoutesConfig } from 'modules/earn/EarnRoutesConfig';
import { useTranslation } from 'modules/i18n';
import { Layout } from 'modules/layout';

import {
  BOOSTED_VAULTS_DOCS_LINK,
  FARMING_DOCS_LINK,
  LIQUIDITY_POOLS_DOCS_LINK,
  STAKING_DOCS_LINK,
} from '../../common';
import { FONTS } from '../../theme';
import { useLazyClaimFarmingRewardsQuery } from '../actions/vaults/claimFarmingRewards';
import { Card } from '../components/Card';
import { CardExternal } from '../components/CardExternal';
import { useBoostedExternalVaults } from '../hooks/useBoostedExternalVaults';
import { useLiquidityExternalPools } from '../hooks/useLiquidityExternalPools';
import { useStakingTokens } from '../hooks/useStakingTokens';
import { translation } from './translation';

export function Earn(): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const { classes } = useStyles();
  const stakingTokens = useStakingTokens();
  const boostedExternalVaults = useBoostedExternalVaults();
  const liquidityExternalPools = useLiquidityExternalPools();
  const [claimFarmingRewards] = useLazyClaimFarmingRewardsQuery();

  return (
    <Layout>
      {!!stakingTokens.length && (
        <>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title} variant="body2">
              {t(keys.staking)}
            </Typography>
            <Typography
              variant="body3"
              className={classes.link}
              component="a"
              href={STAKING_DOCS_LINK}
              target="_blank"
              rel="noreferrer"
            >
              {t(keys.howStakingWorks)}
            </Typography>
          </div>
          <div className={classes.cards}>
            {stakingTokens.map(pool => (
              <Card
                key={pool.token.address}
                poolName={pool.poolName}
                tokenName={pool.token.name}
                rewards={pool.rewardToken.balance}
                rewardTokenName={pool.rewardToken.name}
                staked={pool.staked}
                TVL={pool.TVL}
                APR={pool.APR}
                stakePath={EarnRoutesConfig.stakingStake.generatePath(
                  pool.stakingId,
                )}
                unstakePath={EarnRoutesConfig.stakingUnstake.generatePath(
                  pool.stakingId,
                )}
                description={pool.description}
              />
            ))}
          </div>
        </>
      )}
      {!!boostedExternalVaults.length && (
        <div className={classes.titleWrapper}>
          <Typography className={classes.title} variant="body2">
            {t(keys.boostedVaults)}
          </Typography>
          <Typography
            component="a"
            href={BOOSTED_VAULTS_DOCS_LINK}
            variant="body3"
            className={classes.link}
            target="_blank"
            rel="noreferrer"
          >
            {t(keys.howVaultsWorks)}
          </Typography>
        </div>
      )}
      {!!boostedExternalVaults.length && (
        <div className={classes.cards}>
          {boostedExternalVaults.map(vault => {
            if (vault.showOnlyForStakedUsers && vault.staked.isZero()) return;

            return (
              <Card
                key={vault.id}
                poolName={vault.name}
                tokenName={vault.lpToken.name}
                rewards={vault.rewardToken.balance}
                rewardTokenName={vault.rewardToken.name}
                staked={vault.staked}
                APR={vault.APR}
                showZeroAPR={vault.showZeroAPR}
                TVL={vault.TVL}
                stakePath={vault.link}
                unstakePath={vault.link}
                APRDetails={vault.APRDetails}
                onClaim={() => claimFarmingRewards(vault.poolId)}
                isStakeActive={vault.isStakeActive}
                showStaked={false}
                showReward={false}
                description={vault.description}
              />
            );
          })}
        </div>
      )}

      {!!liquidityExternalPools.length && (
        <>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title} variant="body2">
              {t(keys.liquidityPools)}
            </Typography>
            <Typography
              component="a"
              href={LIQUIDITY_POOLS_DOCS_LINK}
              variant="body3"
              className={classes.link}
              target="_blank"
              rel="noreferrer"
            >
              {t(keys.howLiquidityPoolsWorks)}
            </Typography>
          </div>
          <div className={classes.cards}>
            {!!liquidityExternalPools.length &&
              liquidityExternalPools.map(card => (
                <CardExternal
                  key={card.poolName + card.tokenName}
                  poolName={card.poolName}
                  label={card.label}
                  tokenName={card.tokenName}
                  link={card.link}
                  useTVL={card.useTVL}
                  useAPR={card.useAPR}
                  showAPR={card.showAPR}
                  showTVL={card.showTVL}
                  type={`'POOL'`}
                  description={card.description}
                  // useAPRDetails={card.useAPRDetails}
                />
              ))}
          </div>
        </>
      )}
      {!!FARMING_POOLS.length && (
        <>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title} variant="body2">
              {t(keys.farming)}
            </Typography>
            <Typography
              component="a"
              href={FARMING_DOCS_LINK}
              variant="body3"
              className={classes.link}
              target="_blank"
              rel="noreferrer"
            >
              {t(keys.howFarmingWorks)}
            </Typography>
          </div>
          <div className={classes.cards}>
            {FARMING_POOLS.map(card => (
              <CardExternal
                key={card.poolName}
                poolName={card.poolName}
                label={card.label}
                tokenName={card.tokenName}
                link={card.link}
                useTVL={card.useTVL}
                useAPR={card.useAPR}
                showAPR={card.showAPR}
                showTVL={card.showTVL}
                type={`'STAKE'`}
                description={card.description}
              />
            ))}
          </div>
        </>
      )}

      {!!LENDING_POOLS.length && (
        <>
          <div className={classes.titleWrapper}>
            <Typography className={classes.title} variant="body2">
              {t(keys.lending)}
            </Typography>
          </div>
          <div className={classes.cards}>
            {LENDING_POOLS.map(card => (
              <CardExternal
                key={card.poolName}
                poolName={card.poolName}
                label={card.label}
                tokenName={card.tokenName}
                link={card.link}
                useTVL={card.useTVL}
                useAPR={card.useAPR}
                showAPR={card.showAPR}
                showTVL={card.showTVL}
                type={`'STAKE'`}
                description={card.description}
              />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}

const useStyles = makeStyles()(() => ({
  cards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '30px',

    '&:not(:last-of-type)': {
      marginBottom: 60,
    },
  },
  title: {
    '&&': {
      fontFamily: FONTS.accentTwo,
      fontSize: 24,
      fontWeight: 500,
    },
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  link: {
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
