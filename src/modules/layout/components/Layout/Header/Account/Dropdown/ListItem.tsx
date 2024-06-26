import { MouseEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import { ReactComponent as IconArrowDown } from 'assets/icon-arrow-down.svg';
import { copyText, truncateNumber } from 'modules/common';
import { t } from 'modules/i18n';
import { useLazyAddTokenToWalletQuery } from 'modules/store/actions/addTokenToWallet';
import { rgba } from 'modules/theme';

interface Props {
  address: string;
  symbol: string;
  balance: BigNumber;
  tokenIcon: string;
  decimals?: number;
}

export function ListItem({
  address,
  symbol,
  balance,
  tokenIcon,
  decimals,
}: Props): JSX.Element {
  const { classes, cx } = useStyles();
  const [addTokenToWallet] = useLazyAddTokenToWalletQuery();
  const [selected, setSelected] = useState(false);

  const handleClickAdd = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    void addTokenToWallet({
      address,
      symbol,
      decimals: 18,
    });
  };

  return (
    <button
      type="button"
      className={classes.container}
      onClick={() => setSelected(value => !value)}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.row}
      >
        <Box display="flex" alignItems="center" gap="6px">
          <img src={tokenIcon} alt="" />

          <Typography variant="body2">{symbol}</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          {truncateNumber(balance, decimals)}

          <span
            className={cx(
              classes.buttonIcon,
              selected && classes.buttonIconActive,
            )}
          >
            <IconArrowDown />
          </span>
        </Box>
      </Box>

      {selected && (
        <Box display="flex" gap="12px" mt={2}>
          <Box className={classes.button} onClick={() => copyText(address)}>
            {t('header.account.copy-token-address')}
          </Box>

          <Box className={classes.button} onClick={handleClickAdd}>
            {t('header.account.add-to-wallet', { unit: symbol })}
          </Box>
        </Box>
      )}
    </button>
  );
}

const useStyles = makeStyles()(theme => ({
  container: {
    width: '100%',
    cursor: 'pointer',
    padding: '16px 0',
    background: 'none',
    border: 'none',
    color: theme.colors.black,
  },
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: '8px',
    padding: '5px 10px',
    fontSize: '12px',
    flexGrow: 1,
    transition: 'all .07s ease',

    '&':
      theme.palette.mode === 'light'
        ? {
            borderColor: theme.colors.stroke,
          }
        : {
            borderColor: rgba(theme.colors.black, 0.15) as string,
            color: rgba(theme.colors.black, 0.5) as string,
          },

    '&:hover':
      theme.palette.mode === 'light'
        ? {
            borderColor: rgba(theme.colors.black, 0.2),
          }
        : {
            borderColor: rgba(theme.colors.black, 0.5),
            color: theme.colors.black,
          },
  },
  row: {
    '&:hover span': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.colors.dropdownAddress
          : (rgba(theme.colors.black, 0.2) as string),
      border: 'none',
      color:
        theme.palette.mode === 'light'
          ? (rgba(theme.colors.black, 0.3) as string)
          : (rgba(theme.colors.stroke, 0.5) as string),
    },
  },
  buttonIcon: {
    height: 24,
    width: 24,
    padding: '1px 0 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor:
      theme.palette.mode === 'light'
        ? theme.colors.stroke
        : rgba(theme.colors.stroke, 0.1),

    borderRadius: '6px',
    marginLeft: '8px',
    cursor: 'pointer',
    transition: 'all .05s ease',
    color: rgba(theme.colors.black, 0.3) as string,
  },
  buttonIconActive: {
    transform: 'rotate(180deg)',
  },
}));
