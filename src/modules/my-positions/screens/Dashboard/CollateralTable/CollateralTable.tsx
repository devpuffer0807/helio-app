import { createSearchParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import { BorrowRoutesConfig } from 'modules/borrow';
import { CollateralRoutesConfig } from 'modules/collateral';
import {
  CollateralTableData,
  Minus,
  Plus,
  SAFE_BORROW_LIMIT_PERCENTS,
  Tooltip,
  truncateNumber,
  useCollateralTableData,
  useGetBorrowUtilization,
  useNavigateSearch,
  ZERO,
} from 'modules/common';
import { CollateralToken, getCollateralToken } from 'modules/core';
import { useTranslation } from 'modules/i18n';
import { RepayRoutesConfig } from 'modules/repay';
import { WithdrawCollateralRoutesConfig } from 'modules/withdraw';

import { translation } from './translation';

export function CollateralTable(): JSX.Element {
  const navigate = useNavigateSearch();
  const { t, keys } = useTranslation(translation);
  const { classes } = useStyles();

  const data = useCollateralTableData();
  const utilization: Record<CollateralToken, BigNumber> = {
    [CollateralToken.Main]: useGetBorrowUtilization(CollateralToken.Main),
    [CollateralToken.Second]: useGetBorrowUtilization(CollateralToken.Second),
    [CollateralToken.Eth]: useGetBorrowUtilization(CollateralToken.Eth),
    [CollateralToken.SnBNB]: useGetBorrowUtilization(CollateralToken.SnBNB),
    [CollateralToken.WBETH]: useGetBorrowUtilization(CollateralToken.WBETH),
  };

  return (
    <Box>
      <TableContainer
        sx={theme => ({
          [theme.breakpoints.down('md')]: {
            maxWidth: 'calc(100vw - 48px)',
          },
        })}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t(keys.collateral)}</TableCell>
              <TableCell>{t(keys.amount)}</TableCell>
              <TableCell />
              <TableCell>{t(keys.borrowingUtilization)}</TableCell>
              <TableCell>{t(keys.borrowed)}</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="h6"
                    mr="6px"
                    component="div"
                    color="inherit"
                  >
                    {t(keys.netBorrowingAPR)}
                  </Typography>

                  <Tooltip title={t(keys.netBorrowingAPRTooltip)} />
                </Box>
              </TableCell>
              <TableCell>{t(keys.actions)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data)
              .filter(
                (values): values is [CollateralToken, CollateralTableData] =>
                  !!values[1]?.data,
              )
              .map(([token, tableData]) => {
                if (!tableData?.data) {
                  return null;
                }

                const {
                  collateral = ZERO,
                  availableToBorrow = ZERO,
                  borrowed = ZERO,
                  collateralPrice = ZERO,
                } = tableData.data;
                const { icon, unit } = getCollateralToken(token);

                const isSafeThresholdExceeded = utilization[
                  token
                ].isGreaterThan(SAFE_BORROW_LIMIT_PERCENTS);

                return (
                  <TableRow key={token}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <img src={icon} alt="" width={24} />

                        <Typography variant="body2" ml={1}>
                          {unit}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <div>
                          <Typography variant="body2">
                            {`${truncateNumber(collateral)} ${unit}`}
                          </Typography>
                          <Typography variant="body3">
                            {t('units.$-value', {
                              value: truncateNumber(
                                collateral.multipliedBy(collateralPrice),
                              ),
                            })}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>

                    <TableCell>
                      {collateral && (
                        <div className={classes.buttons}>
                          {token !== CollateralToken.Second && (
                            <Plus
                              onClick={() =>
                                navigate(
                                  CollateralRoutesConfig.provide.generatePath(),
                                  { token },
                                )
                              }
                            />
                          )}

                          {collateral.isGreaterThan(ZERO) && (
                            <Minus
                              onClick={() =>
                                navigate(
                                  WithdrawCollateralRoutesConfig.provide.generatePath(),
                                  { token },
                                )
                              }
                            />
                          )}
                        </div>
                      )}
                    </TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Typography
                          variant="body2"
                          sx={theme => ({
                            color: isSafeThresholdExceeded
                              ? theme.colors.red
                              : theme.colors.green,
                            mr: '8px',
                          })}
                        >
                          {t('units.percent-no-space', {
                            value: truncateNumber(utilization[token], 2),
                          })}
                        </Typography>

                        <Box
                          className={classes.pulse}
                          sx={theme => ({
                            width: `${utilization[token].toNumber()}%`,
                            backgroundColor: isSafeThresholdExceeded
                              ? theme.colors.red
                              : theme.colors.green,
                          })}
                        />
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {t('units.LOAN_TOKEN-value', {
                          value: truncateNumber(borrowed),
                        })}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {t('units.percent-no-space', {
                          value: truncateNumber(tableData.netBorrowAPR, 2),
                        })}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" gap="10px">
                        {availableToBorrow.isGreaterThan(ZERO) && (
                          <Button
                            variant="outlined"
                            component={Link}
                            to={{
                              pathname:
                                BorrowRoutesConfig.borrow.generatePath(),
                              search: `?${createSearchParams({
                                token,
                              }).toString()}`,
                            }}
                            sx={{ padding: '0 19px' }}
                          >
                            {t(keys.borrow)}
                          </Button>
                        )}

                        {borrowed.isGreaterThan(ZERO) && (
                          <Button
                            variant="outlined"
                            component={Link}
                            to={{
                              pathname: RepayRoutesConfig.repay.generatePath(),
                              search: `?${createSearchParams({
                                token,
                              }).toString()}`,
                            }}
                            sx={{ padding: '0 19px' }}
                          >
                            {t(keys.repay)}
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const useStyles = makeStyles()(theme => ({
  pulse: {
    width: 125,
    height: 4,
    background: theme.colors.white,
    borderRadius: '2px',
    position: 'relative',
    overflow: 'hidden',

    '&:before': {
      content: '""',
      display: 'block',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-30px',
    gap: '10px',
  },
}));
