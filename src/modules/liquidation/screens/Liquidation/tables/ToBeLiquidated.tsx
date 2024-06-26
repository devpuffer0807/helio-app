import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BigNumber from 'bignumber.js';
import { makeStyles } from 'tss-react/mui';

import {
  CopyIcon,
  cropString,
  EXPLORER_URL,
  GuardIsConnected,
  Loader,
  Tooltip,
  truncateNumber,
  useInfiniteScroll,
  useTransactionAction,
  ZERO,
} from 'modules/common';
import { useCollateralToken } from 'modules/core';
import { t } from 'modules/i18n';
import {
  useGetToBeLiquidatedQuery,
  UseGetToBeLiquidatedQueryResponse,
  useLazyLiquidationStartAuctionQuery,
} from 'modules/liquidation/actions';
import ExternalIcon from 'modules/liquidation/assets/external.svg';
import { rgba } from 'modules/theme';

import EmptyMessage from '../EmptyMessage';

interface Props {
  prices: { [key: string]: BigNumber };
}

export default function ToBeLiquidated({ prices }: Props): JSX.Element {
  const { classes } = useStyles();
  const [{ token }] = useCollateralToken();
  const { executeAction } = useTransactionAction(
    useLazyLiquidationStartAuctionQuery,
  );
  const [ref, { data, hasMore }] = useInfiniteScroll<
    HTMLDivElement,
    UseGetToBeLiquidatedQueryResponse
  >(useGetToBeLiquidatedQuery);
  const { data: users } = data ?? {};

  if (!users || !users.length) {
    return <EmptyMessage message={t('liquidation.to-be-liquidated-empty')} />;
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('liquidation.address')}</TableCell>
            <TableCell>{t('liquidation.collateral')}</TableCell>
            <TableCell>
              {t('liquidation.liquidator-gets')}{' '}
              <Tooltip title={t('liquidation.liquidator-gets-tooltip')} />
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(row => {
            const price = new BigNumber(prices[row.collateralCurrency] ?? ZERO);

            return (
              <TableRow
                key={row.userAddress}
                sx={theme => ({
                  borderBottom: `1px solid ${
                    rgba(theme.colors.black, 0.1) ?? ''
                  }`,
                })}
              >
                <TableCell>
                  <Box display="flex" alignItems="center">
                    {cropString(row.userAddress, 8)}

                    <CopyIcon
                      className={classes.copyIcon}
                      text={row.userAddress}
                    />

                    <a
                      className={classes.link}
                      href={`${EXPLORER_URL}/address/${row.userAddress}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Box component="img" src={ExternalIcon} />
                    </a>
                  </Box>
                </TableCell>
                <TableCell>
                  {truncateNumber(new BigNumber(row.collateral))}{' '}
                  {row.tokenName}
                  <Box sx={{ opacity: 0.5 }}>
                    {t('units.$-value', {
                      value: truncateNumber(
                        new BigNumber(row.collateral).multipliedBy(price),
                      ),
                    })}
                  </Box>
                </TableCell>
                <TableCell>
                  {truncateNumber(new BigNumber(row.liquidationCost))}{' '}
                  {row.tokenName}
                  <Box sx={{ opacity: 0.5 }}>
                    {t('units.$-value', {
                      value: truncateNumber(
                        new BigNumber(row.liquidationCost).multipliedBy(price),
                      ),
                    })}
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ width: '200px' }}>
                  <GuardIsConnected>
                    <Button
                      onClick={() =>
                        executeAction({
                          token,
                          user: row.userAddress,
                          collateralCurrency: row.collateralCurrency,
                        })
                      }
                      sx={{
                        padding: '18px',
                      }}
                    >
                      {t('liquidation.liquidate')}
                    </Button>
                  </GuardIsConnected>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {hasMore && (
        <div className={classes.loader} ref={ref}>
          <Loader />
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles()(() => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  copyIcon: {
    margin: '0 8px',
  },
  loader: {
    marginTop: '10px',
  },
}));
