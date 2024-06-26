import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import { Tooltip, truncateNumber, ZERO } from 'modules/common';
import { useTranslation } from 'modules/i18n';
import { FONTS, rgba } from 'modules/theme';

import { ReactComponent as ExternalLinkIcon } from '../../assets/external-link.svg';
import { POOL_ICONS_MAP } from '../../utils/poolIconsMap';
import { TOKEN_ICONS_MAP } from '../../utils/tokenIconsMap';
import { translation } from './translation';

interface Props {
  tokenName: string;
  rewards: BigNumber;
  rewardTokenName: string;
  staked: BigNumber;
  APR: BigNumber;
  poolName?: string;
  showZeroAPR?: boolean;
  showZeroTVL?: boolean;
  TVL: BigNumber;
  stakePath: string;
  unstakePath: string;
  onClaim?: () => void;
  isStakeActive?: boolean;
  showStaked?: boolean;
  showReward?: boolean;
  APRDetails?: Record<string, string>;
  description: string;
}

function TooltipContent({
  details,
}: {
  details: Record<string, string>;
}): JSX.Element {
  const { classes } = useStyles();

  return (
    <div className={classes.APRDetailsWrap}>
      {Object.entries(details).map(([key, value]) => (
        <div key={key} className={classes.APRDetailsItem}>
          <Typography variant="subtitle1" fontWeight={500}>
            {key}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={500}
            className={classes.APRDetailsItemValue}
          >
            {value}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export function Card({
  poolName,
  tokenName,
  rewards,
  rewardTokenName,
  staked,
  APR,
  TVL,
  stakePath,
  unstakePath,
  onClaim,
  isStakeActive = true,
  showZeroAPR = false,
  showZeroTVL = false,
  showStaked = false,
  showReward = false,
  APRDetails,
  description,
}: Props): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const navigate = useNavigate();
  const { classes } = useStyles();

  const actionStyle = React.useMemo(() => {
    let counter = 0;
    if (isStakeActive) counter++;
    if (staked.isGreaterThan(ZERO)) counter++;
    if (rewards.isGreaterThan(ZERO) && onClaim) counter++;

    switch (counter) {
      case 1:
        return classes.stakeButton1;
      case 2:
        return classes.stakeButton2;
      case 3:
        return classes.stakeButton3;
      default:
    }
    return classes.stakeButton3;
  }, [isStakeActive, staked, rewards, onClaim, classes]);

  const showDivider = React.useMemo(() => {
    return (
      (showZeroAPR ||
        (!APR.isNaN() && !APR.isZero()) ||
        showZeroTVL ||
        (!TVL.isNaN() && !TVL.isZero())) &&
      (showStaked || showReward)
    );
  }, [showZeroAPR, showZeroTVL, TVL, showStaked, showReward, APR]);

  const showExternalLink = React.useMemo(() => {
    return (
      !showZeroAPR &&
      !showZeroTVL &&
      TVL.isZero() &&
      !showStaked &&
      !showReward &&
      APR.isZero()
    );
  }, [showZeroAPR, showZeroTVL, TVL, showStaked, showReward, APR]);

  return (
    <Paper className={classes.root}>
      {poolName && (
        <Paper className={classes.poolLabel}>
          {POOL_ICONS_MAP[poolName]}
          <Typography className={classes.pool} variant="subtitle1">
            {poolName}
          </Typography>
        </Paper>
      )}
      <Box className={classes.name}>
        <div className={classes.title}>
          {TOKEN_ICONS_MAP[tokenName]}
          <Typography variant="h5" className={classes.tokenName}>
            {tokenName}
          </Typography>
        </div>
        <Typography variant="body2" className={classes.description}>
          {description}
        </Typography>
        <div className={classes.detailInfo}>
          {showExternalLink && (
            <div className={classes.extLinkContainer}>
              <Button
                className={classes.extLink}
                onClick={() => {
                  if (stakePath.startsWith('http')) {
                    window.open(stakePath, '_blank');
                  }
                }}
              >
                {t(keys.tvlAndApy)}
                {stakePath.startsWith('http') && <ExternalLinkIcon />}
              </Button>
            </div>
          )}
          <div
            className={
              !(showStaked || showReward)
                ? classes.aprAndTvlMargin
                : classes.aprAndTvl
            }
          >
            {(showZeroAPR || (!APR.isNaN() && !APR.isZero())) && (
              <div className={classes.apr}>
                <Typography variant="h5" className={classes.aprInfo}>
                  {t(keys.APR, {
                    value: truncateNumber(APR, 2),
                  })}
                </Typography>
                {APRDetails && (
                  <Tooltip title={<TooltipContent details={APRDetails} />} />
                )}
              </div>
            )}
            {(showZeroTVL || (!TVL.isNaN() && !TVL.isZero())) && (
              <div>
                <Typography variant="h5" className={classes.tvlInfo}>
                  {t(keys.TVL, {
                    value: t('units.$-value', {
                      value: t('units.compactShort', { value: TVL.toNumber() }),
                    }),
                  })}
                </Typography>
              </div>
            )}
          </div>

          {showDivider && (
            <div className={classes.divider}>
              <Divider variant="fullWidth" />
            </div>
          )}

          <div className={classes.stats}>
            {showStaked && (
              <div className={classes.pairStaked}>
                <Typography
                  variant="body2"
                  className={classes.label}
                  fontWeight={400}
                >
                  {t(keys.staked, {
                    token: tokenName.endsWith(t(keys.LP))
                      ? t(keys.LP)
                      : tokenName,
                  })}
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.staked}
                  fontWeight={600}
                >
                  {truncateNumber(staked)}
                </Typography>
              </div>
            )}
            {showReward && (
              <div className={classes.rewards}>
                <div className={classes.pairRewards}>
                  <div className={classes.tokenRewards}>
                    <Typography
                      variant="body2"
                      className={classes.label}
                      fontWeight={400}
                    >
                      {t(keys.rewards)}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={classes.token}
                      fontWeight={600}
                    >
                      {t(keys.token, {
                        token: rewardTokenName,
                      })}
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    className={classes.staked}
                  >
                    {truncateNumber(rewards)}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>
      </Box>
      <div className={classes.actions}>
        <div className={classes.buttons}>
          {isStakeActive && (
            <Button
              variant="contained"
              className={actionStyle}
              onClick={() => {
                if (stakePath.startsWith('http')) {
                  window.open(stakePath, '_blank');
                } else {
                  navigate(stakePath);
                }
              }}
            >
              {t(keys.farmingStake)}
              {stakePath.startsWith('http') && <ExternalLinkIcon />}
            </Button>
          )}
          {staked.isGreaterThan(ZERO) && (
            <Button
              variant="outlined"
              className={actionStyle}
              onClick={() => {
                if (unstakePath.startsWith('http')) {
                  window.open(unstakePath, '_blank');
                } else {
                  navigate(unstakePath);
                }
              }}
            >
              {t(keys.farmingUnstake)}
              {unstakePath.startsWith('http') && <ExternalLinkIcon />}
            </Button>
          )}
          {rewards.isGreaterThan(ZERO) && onClaim && (
            <Button
              variant="outlined"
              onClick={onClaim}
              className={actionStyle}
            >
              {t(keys.harvest)}
            </Button>
          )}
        </div>
      </div>
    </Paper>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    '&&': {
      position: 'relative',
      display: 'flex',
      padding: theme.spacing(7, 4),
      borderRadius: 24,
      width: 380,
      height: 415,
      flexFlow: 'column nowrap',
      justifyContent: 'space-between',

      [theme.breakpoints.down('xl')]: {
        width: '30%',
      },

      [theme.breakpoints.down('lg')]: {
        width: '30%',
      },

      [theme.breakpoints.down('md')]: {
        width: '45%',
      },

      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
  poolLabel: {
    '&&': {
      position: 'absolute',
      top: '15px',
      left: '10px',
      padding: theme.spacing(0.5, 1.5),
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      borderRadius: 12,

      '& > svg': {
        height: 24,
        width: 'auto',
      },
    },
  },
  pool: {
    '&&': {
      fontWeight: 700,
      fontSize: 15,
    },
  },
  name: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    width: '100%',
    flexDirection: 'column',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    height: 65,

    '& > svg': {
      height: 24,
      width: 'auto',
      overflow: 'visible',
    },
  },
  tokenName: {
    '&&': {
      fontFamily: FONTS.accent,
      fontSize: 17,
      fontWeight: 500,
      marginLeft: 10,
    },
  },
  description: {
    '&&': {
      fontWeight: 400,
      fontSize: 15,
      lineHeight: '18.15px',
      height: 50,
    },
  },
  detailInfo: {
    width: '100%',
    height: 100,
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  actions: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 10,
  },
  divider: {
    width: '100%',
    marginTop: 3,
  },
  stats: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  rewards: {
    display: 'flex',
  },
  pairStaked: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },
  pairRewards: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexFlow: 'column nowrap',
    gap: theme.spacing(0.5),
  },
  tokenRewards: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    '&&': {
      fontSize: 15,
    },
  },
  token: {
    '&&': {
      fontSize: 15,
      marginLeft: 1,
    },
  },
  staked: {
    '&&': {
      fontSize: 24,
    },
  },
  stakeButton1: {
    '&&': {
      minWidth: 158,
    },
  },
  stakeButton2: {
    '&&': {
      minWidth: 110,
    },
  },
  stakeButton3: {
    '&&': {
      minWidth: 80,
    },
  },
  extLinkContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: -112,
  },
  extLink: {
    '&&': {
      backgroundColor: 'transparent',
      color: rgba(theme.colors.black, 0.6),
      fontSize: 20,
      ':hover': {
        backgroundColor: 'transparent',
        color: rgba(theme.colors.black, 0.6),
        fontSize: 20,
      },
    },
  },
  buttons: {
    display: 'flex',
    marginTop: 10,
    gap: '20px',
  },
  apr: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  aprInfo: {
    '&&': {
      fontFamily: FONTS.default,
      fontWeight: 500,
      fontSize: 24,

      [theme.breakpoints.down('xl')]: {
        fontSize: 20,
      },
    },
  },
  tvlInfo: {
    '&&': {
      fontFamily: FONTS.default,
      fontWeight: 500,
      fontSize: 24,

      [theme.breakpoints.down('xl')]: {
        fontSize: 20,
      },
    },
  },
  APRDetailsWrap: {
    maxWidth: '200px',
  },
  APRDetailsItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 26,
    padding: '6px 0',
    borderBottom: `1px solid ${rgba(theme.colors.black, 0.1) as string}`,

    '&:ƒirst-of-type': {
      paddingTop: 6,
    },

    '&:last-of-type': {
      paddingBottom: 6,
      borderBottom: 'none',
    },
  },
  APRDetailsItemValue: {
    '&&': {
      color: rgba(theme.colors.black, 0.6),
    },
  },
  aprAndTvl: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  aprAndTvlMargin: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: -55,

    [theme.breakpoints.down('sm')]: {
      marginTop: -20,
    },
  },
}));
