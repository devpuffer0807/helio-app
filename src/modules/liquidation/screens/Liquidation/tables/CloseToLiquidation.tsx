import React from 'react';
import Box from '@mui/material/Box';
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
  formatPercent,
  Loader,
  truncateNumber,
  useInfiniteScroll,
  ZERO,
} from 'modules/common';
import { t } from 'modules/i18n';
import ExternalIcon from 'modules/liquidation/assets/external.svg';
import { rgba } from 'modules/theme';

import {
  useGetCloseToLiquidationQuery,
  UseGetCloseToLiquidationQueryResponse,
} from '../../../actions';
import EmptyMessage from '../EmptyMessage';

interface Props {
  prices: { [key: string]: BigNumber };
}

export default function CloseToLiquidation({ prices }: Props): JSX.Element {
  const { classes } = useStyles();
  const [ref, { data, hasMore }] = useInfiniteScroll<
    HTMLDivElement,
    UseGetCloseToLiquidationQueryResponse
  >(useGetCloseToLiquidationQuery);
  const { data: users } = data ?? {};

  if (!users || !users.length) {
    return (
      <EmptyMessage message={t('liquidation.close-to-liquidation-empty')} />
    );
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('liquidation.address')}</TableCell>
            <TableCell>{t('liquidation.collateral')}</TableCell>
            <TableCell>{t('liquidation.borrow-utilization')}</TableCell>
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
                  {
                    // todo convert data to Big Number immediately after fetching
                    truncateNumber(new BigNumber(row.collateral))
                  }{' '}
                  {row.tokenName}
                  <Box sx={{ opacity: 0.5 }}>
                    {t('units.$-value', {
                      value: truncateNumber(
                        new BigNumber(row.collateral).multipliedBy(
                          new BigNumber(price),
                        ),
                      ),
                    })}
                  </Box>
                </TableCell>
                <TableCell>
                  {formatPercent(1 - row.rangeFromLiquidation)}
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
