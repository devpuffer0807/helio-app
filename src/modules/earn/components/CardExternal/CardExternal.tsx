import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import { useTranslation } from 'modules/i18n';
import { FONTS, rgba } from 'modules/theme';

import { Tooltip, truncateNumber } from '../../../common';
import { ReactComponent as ExternalLinkIcon } from '../../assets/external-link.svg';
import { POOL_ICONS_MAP } from '../../utils/poolIconsMap';
import { TOKEN_ICONS_MAP } from '../../utils/tokenIconsMap';
import { translation } from './translation';

interface Props {
  tokenName: string;
  poolName?: string;
  label?: string;
  link: string;
  useTVL?: () => BigNumber;
  useAPR?: () => BigNumber;
  showAPR: boolean;
  showTVL: boolean;
  useAPRDetails?: () => Record<string, string> | undefined;
  type: `'STAKE'` | `'POOL'`;
  description: string;
}

function TooltipContent({
  details,
}: {
  details: Record<string, string>;
}): JSX.Element {
  const { classes } = useStyles();

  return (
    <div>
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

export function CardExternal({
  poolName,
  label,
  tokenName,
  link,
  useTVL,
  useAPR,
  showAPR,
  showTVL,
  useAPRDetails,
  type = `'STAKE'`,
  description,
}: Props): JSX.Element {
  const { t, keys } = useTranslation(translation);
  const { classes } = useStyles();
  const TVL = useTVL?.();
  const APR = useAPR?.();
  const APRDetails = useAPRDetails?.();

  const showExternalLink = React.useMemo(() => {
    return !showAPR && APR?.isZero() && !showTVL && TVL?.isZero();
  }, [showAPR, APR, showTVL, TVL]);

  return (
    <Paper className={classes.root}>
      {poolName && (
        <Paper className={classes.poolLabel}>
          {POOL_ICONS_MAP[poolName]}
          <Typography className={classes.pool} variant="subtitle1">
            {label}
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
          <div className={classes.aprAndTvl}>
            {showExternalLink && (
              <Button
                className={classes.extLink}
                onClick={() => {
                  window.open(link, '_blank');
                }}
              >
                {t(keys.tvlAndApy)}
                <ExternalLinkIcon />
              </Button>
            )}

            {showAPR && APR && !APR.isNaN() && !APR.isZero() && (
              <div className={classes.apr}>
                <Typography variant="h5" className={classes.aprInfo}>
                  {t(keys.APR, {
                    value: t('units.percent-no-space', {
                      value: truncateNumber(APR, 2),
                    }),
                  })}
                </Typography>

                {APRDetails && (
                  <Tooltip title={<TooltipContent details={APRDetails} />} />
                )}
              </div>
            )}

            {showTVL && TVL && (
              <div className={classes.tvl}>
                <Typography variant="h5" className={classes.tvlInfo}>
                  {t(keys.TVL, {
                    value: t('units.$-value', {
                      value: t('units.compactShort', { value: TVL.toString() }),
                    }),
                  })}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </Box>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
        <Button variant="contained" className={classes.externalButton}>
          {type === `'STAKE'` ? t(keys.farmingStake) : t(keys.addLiquidity)}{' '}
          <ExternalLinkIcon />
        </Button>
      </a>
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
  buttons: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: 15,
  },
  externalButton: {
    '&&': {
      minWidth: 158,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
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
    marginTop: -75,

    [theme.breakpoints.down('sm')]: {
      marginTop: -30,
    },
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
  tvl: {},
}));
