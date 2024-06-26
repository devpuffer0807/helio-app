import React, { ChangeEventHandler } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { selectClasses } from '@mui/material/Select';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import { MAX_DECIMALS, truncateNumber, ZERO } from 'modules/common';
import { CollateralToken, useCollateralToken } from 'modules/core';
import { TOKEN_ICONS_MAP } from 'modules/earn/utils/tokenIconsMap';
import { t } from 'modules/i18n';
import { rgba } from 'modules/theme';

import { Select } from './Select';

type Props<T extends FieldValues> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
  additionalLabel: JSX.Element;
  label: string;
  withdrawingPeriod: string;
  withdrawingTokenIndex: number;
  withdrawableAmountByStrategy?: {
    [key: string]: BigNumber;
  };
  withdrawableFeeAmountByStrategy?: {
    [key: string]: BigNumber;
  };
  withdrawInputValue?: BigNumber;
  handleSelectChange: ChangeEventHandler<HTMLInputElement>;
  additionalLabelOnClick?: () => void;
};

export function WithdrawingTokenSelect<T extends FieldValues>({
  additionalLabel,
  label,
  withdrawingPeriod,
  withdrawingTokenIndex,
  withdrawableAmountByStrategy,
  withdrawableFeeAmountByStrategy,
  withdrawInputValue,
  handleSelectChange,
  additionalLabelOnClick,
  ...rest
}: Props<T>): JSX.Element {
  const { classes, cx } = useStyles();
  const [{ withdrawalTokens }] = useCollateralToken();

  const selectedWithdrawableAmount = React.useMemo(() => {
    if (withdrawalTokens[withdrawingTokenIndex].name === CollateralToken.Main) {
      return withdrawInputValue;
    }

    if (withdrawableAmountByStrategy !== undefined) {
      return withdrawableAmountByStrategy[
        withdrawalTokens[withdrawingTokenIndex].name
      ];
    }

    return ZERO;
  }, [
    withdrawInputValue,
    withdrawableAmountByStrategy,
    withdrawingTokenIndex,
    withdrawalTokens,
  ]);

  const selectedWithdrawableFeeAmount = React.useMemo(() => {
    if (withdrawableFeeAmountByStrategy !== undefined) {
      return withdrawableFeeAmountByStrategy[
        withdrawalTokens[withdrawingTokenIndex].name
      ];
    }

    return ZERO;
  }, [
    withdrawableFeeAmountByStrategy,
    withdrawingTokenIndex,
    withdrawalTokens,
  ]);

  const getWithdrawableAmount = (name: string) => {
    if (name === CollateralToken.Main) {
      return withdrawInputValue;
    }

    if (withdrawableAmountByStrategy !== undefined)
      return withdrawableAmountByStrategy[name];

    return ZERO;
  };

  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <Typography variant="body1" fontWeight={700}>
          {label}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography
            className={cx(
              classes.additionalLabel,
              additionalLabelOnClick && classes.additionalLabelActive,
            )}
            onClick={additionalLabelOnClick}
            variant="subtitle2"
            component="div"
          >
            {additionalLabel}
          </Typography>
        </Box>
      </div>
      <Select
        className={classes.select}
        value={withdrawingTokenIndex}
        renderValue={() => (
          <Box className={classes.selected}>
            {withdrawalTokens[withdrawingTokenIndex].name ===
            CollateralToken.Main
              ? truncateNumber(selectedWithdrawableAmount || ZERO)
              : truncateNumber(
                  selectedWithdrawableAmount || ZERO,
                  MAX_DECIMALS,
                )}

            <Box className={classes.tokenInfo}>
              <Box className={classes.tokenPeriod}>
                <Typography
                  variant="subtitle2"
                  fontWeight="300"
                  sx={theme => ({
                    marginRight: 1,
                    [theme.breakpoints.down('md')]: {
                      fontSize: 10,
                      marginRight: 0,
                    },
                  })}
                >
                  {withdrawingPeriod}
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="500"
                  sx={theme => ({
                    [theme.breakpoints.down('md')]: {
                      fontSize: 13,
                    },
                  })}
                >
                  {withdrawalTokens[withdrawingTokenIndex].period}
                </Typography>
                {selectedWithdrawableFeeAmount.comparedTo(ZERO) === 1 && (
                  <Box className={classes.tokenFee}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="300"
                      sx={theme => ({
                        marginRight: 1,
                        marginLeft: 1,
                        [theme.breakpoints.down('md')]: {
                          marginRight: 0,
                          fontSize: 10,
                        },
                      })}
                    >
                      {t('withdraw.withdraw.fee')}
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="500"
                      sx={theme => ({
                        [theme.breakpoints.down('md')]: {
                          fontSize: 13,
                          marginLeft: 0.5,
                        },
                      })}
                    >
                      {t('withdraw.withdraw.percent', {
                        value: truncateNumber(selectedWithdrawableFeeAmount),
                      })}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              {TOKEN_ICONS_MAP[withdrawalTokens[withdrawingTokenIndex].name]}
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={theme => ({
                  ml: 1,
                  [theme.breakpoints.down('md')]: {
                    ml: 0.5,
                    fontSize: 14,
                  },
                })}
              >
                {withdrawalTokens[withdrawingTokenIndex].name}
              </Typography>
            </Box>
          </Box>
        )}
        onChange={handleSelectChange}
        {...rest}
      >
        {withdrawalTokens.map(token => (
          <MenuItem value={token.name} divider key={token.name}>
            <Box className={classes.selectItem}>
              {token.name === CollateralToken.Main
                ? truncateNumber(getWithdrawableAmount(token.name) || ZERO)
                : truncateNumber(
                    getWithdrawableAmount(token.name) || ZERO,
                    MAX_DECIMALS,
                  )}
              <Box className={classes.tokenInfo}>
                <Box className={classes.tokenPeriod}>
                  <Typography
                    variant="subtitle2"
                    fontWeight="300"
                    sx={theme => ({
                      marginRight: 1,
                      [theme.breakpoints.down('md')]: {
                        marginRight: 0,
                        fontSize: 10,
                      },
                    })}
                  >
                    {withdrawingPeriod}
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="500"
                    sx={theme => ({
                      [theme.breakpoints.down('md')]: {
                        fontSize: 13,
                      },
                    })}
                  >
                    {token.period}
                  </Typography>
                  {withdrawableFeeAmountByStrategy &&
                    withdrawableFeeAmountByStrategy[token.name].comparedTo(
                      ZERO,
                    ) === 1 && (
                      <Box className={classes.tokenFee}>
                        <Typography
                          variant="subtitle2"
                          fontWeight="300"
                          sx={theme => ({
                            marginRight: 1,
                            marginLeft: 1,
                            [theme.breakpoints.down('md')]: {
                              marginRight: 0,
                              fontSize: 10,
                            },
                          })}
                        >
                          {t('withdraw.withdraw.fee')}
                        </Typography>
                        <Typography
                          variant="h3"
                          fontWeight="500"
                          sx={theme => ({
                            [theme.breakpoints.down('md')]: {
                              fontSize: 13,
                              marginLeft: 0.5,
                            },
                          })}
                        >
                          {t('withdraw.withdraw.percent', {
                            value: truncateNumber(
                              withdrawableFeeAmountByStrategy
                                ? withdrawableFeeAmountByStrategy[token.name]
                                : ZERO,
                            ),
                          })}
                        </Typography>
                      </Box>
                    )}
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                {TOKEN_ICONS_MAP[token.name]}
                <Typography variant="h3" fontWeight="bold" sx={{ ml: 1 }}>
                  {token.name}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  select: {
    '&&': {
      [`&& .${selectClasses.select}`]: {
        padding: '0 50px 0 20px',
        borderWidth: 1,
        borderStyle: 'solid',
      },

      [`& .${selectClasses.icon}`]: {
        right: 20,
      },
    },
  },
  selected: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  additionalLabel: {
    '&&': {
      color: rgba(theme.colors.black, 0.5),
    },
  },
  additionalLabelActive: {
    '&&': {
      transition: '0.3s',
      cursor: 'pointer',

      '&:hover': {
        color: theme.colors.black,
      },
    },
  },
  selectItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  tokenInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenPeriod: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  tokenFee: {
    display: 'flex',
    flexDirection: 'row',
  },
}));
