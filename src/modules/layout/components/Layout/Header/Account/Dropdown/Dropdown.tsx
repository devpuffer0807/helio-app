import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import { ReactComponent as CrossIcon } from 'assets/icon-cross.svg';
import {
  CopyIcon,
  EXPLORER_URL,
  featuresConfig,
  LOAN_TOKEN_ADDRESS,
  MAIN_TOKEN_ADDRESS,
} from 'modules/common';
import loanTokenIcon from 'modules/core/assets/loanToken.svg';
import mainTokenIcon from 'modules/core/assets/mainToken.svg';
import { t } from 'modules/i18n';
import { rgba } from 'modules/theme';

import { ReactComponent as ShareIcon } from '../assets/share.svg';
import { Disconnect } from './Disconnect';
import { ListItem } from './ListItem';

interface Props {
  address: string;
  loanTokenBalance: BigNumber;
  mainTokenBalance: BigNumber;
  onClose: () => void;
  userAddress: string;
}

export function Dropdown({
  address,
  loanTokenBalance,
  mainTokenBalance,
  onClose,
  userAddress,
}: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.container}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 500,
            fontSize: 24,
          }}
        >
          {t('header.account.wallet')}
        </Typography>

        <Box
          sx={{
            cursor: 'pointer',
            position: 'relative',
            bottom: '3px',
          }}
          onClick={onClose}
        >
          <CrossIcon />
        </Box>
      </Box>

      <div className={classes.address}>
        <span>{userAddress}</span>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CopyIcon text={address} />

          <a
            className={cx(classes.link, classes.icon)}
            href={`${EXPLORER_URL}/address/${address}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ShareIcon />
          </a>
        </Box>
      </div>

      <div>
        <ListItem
          address={LOAN_TOKEN_ADDRESS}
          symbol={t('units.LOAN_TOKEN')}
          balance={loanTokenBalance}
          tokenIcon={loanTokenIcon}
        />

        {featuresConfig.dropdownMainToken && (
          <>
            <Divider />

            <ListItem
              address={MAIN_TOKEN_ADDRESS}
              symbol={t('units.MAIN_TOKEN')}
              balance={mainTokenBalance}
              tokenIcon={mainTokenIcon}
              decimals={5}
            />
          </>
        )}
      </div>

      <Box mt="14px">
        <Disconnect />
      </Box>
    </div>
  );
}

const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    background: theme.colors.secondary,
    border:
      theme.palette.mode === 'dark'
        ? `1px solid ${rgba(theme.colors.black, 0.1) as string}`
        : undefined,
    boxShadow:
      '0px 0px 1px rgba(0, 0, 0, 0.25), 0px 10px 13px -9px rgba(0, 0, 0, 0.1)',

    [theme.breakpoints.up('md')]: {
      borderRadius: 24,
      minWidth: 360,
    },
  },
  address: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: '6px',
    background: theme.colors.dropdownAddress,
    padding: '12px 10px 12px 16px',
    height: 40,
    color: rgba(theme.colors.black, 0.5),
    fontSize: 14,
    borderRadius: 10,
    fontWeight: 400,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    marginLeft: '4px',

    '&, &:visited, &:active': {
      color: theme.colors.black,
    },

    '& > span': {
      fontWeight: 400,
      fontSize: 13,
      marginLeft: 4,
    },
  },
  icon: {
    '&&': {
      opacity: 0.3,
      color: theme.colors.black,

      '&:hover': {
        opacity: 0.5,
      },
    },
  },
}));
