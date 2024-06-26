import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { CollateralRoutesConfig } from 'modules/collateral';
import {
  CollateralTableData,
  GuardIsConnected,
  Minus,
  Plus,
  truncateNumber,
  useCollateralTableData,
  useNavigateSearch,
  ZERO,
} from 'modules/common';
import { CollateralToken, getCollateralToken } from 'modules/core';
import { t } from 'modules/i18n';
import { WithdrawCollateralRoutesConfig } from 'modules/withdraw';

export function CollateralList(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigateSearch();
  const data = useCollateralTableData();

  return (
    <TableContainer
      sx={{
        [theme.breakpoints.down('md')]: {
          width: '100vw',
          margin: '0 -16px',
        },
      }}
    >
      <Table
        sx={{
          [theme.breakpoints.down('md')]: {
            minWidth: 1188,
            margin: '0 16px',
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell width="100">{t('borrow.dashboard.assets')}</TableCell>
            <TableCell>{t('borrow.dashboard.price')}</TableCell>
            <TableCell>{t('borrow.dashboard.collateral-ratio')}</TableCell>
            <TableCell>{t('borrow.dashboard.collateral')}</TableCell>
            <TableCell>{t('borrow.dashboard.borrowed')}</TableCell>
            <TableCell>{t('borrow.dashboard.net-borrowing-apr')}</TableCell>
            <TableCell>{t('borrow.dashboard.actions')}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.entries(data)
            .filter(
              (values): values is [CollateralToken, CollateralTableData] =>
                !!values[1]?.data,
            )
            .map(([token, tableData]) => {
              if (!tableData.data) {
                return null;
              }

              const {
                collateral,
                collateralPrice,
                collateralPercent,
                borrowed,
              } = tableData.data;
              const { unit, icon: collateralTokenIcon } =
                getCollateralToken(token);
              const isCollateralized = collateral.isGreaterThan(ZERO);

              return (
                <TableRow key={token}>
                  <TableCell sx={{ width: '16%' }}>
                    <Box display="flex" alignItems="center">
                      <img src={collateralTokenIcon} alt="" width={24} />
                      <Box ml={1.5}>{unit}</Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {t('units.$-value', {
                      value: truncateNumber(collateralPrice),
                    })}
                  </TableCell>
                  <TableCell>{truncateNumber(collateralPercent, 2)}%</TableCell>
                  <TableCell>
                    {truncateNumber(collateral)} {unit}
                    <Box sx={{ opacity: 0.5 }}>
                      {t('units.$-value', {
                        value: truncateNumber(
                          collateral.multipliedBy(collateralPrice),
                        ),
                      })}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {truncateNumber(borrowed)} {t('units.LOAN_TOKEN')}
                  </TableCell>
                  <TableCell>
                    {t('units.percent-no-space', {
                      value: truncateNumber(tableData.netBorrowAPR, 2),
                    })}
                  </TableCell>

                  <TableCell align="right" sx={{ width: '10%' }}>
                    <GuardIsConnected>
                      <Box display="flex" justifyContent="flex-end">
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

                        {isCollateralized && (
                          <Box ml={1.5}>
                            <Minus
                              onClick={() =>
                                navigate(
                                  WithdrawCollateralRoutesConfig.provide.generatePath(),
                                  { token },
                                )
                              }
                            />
                          </Box>
                        )}
                      </Box>
                    </GuardIsConnected>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
