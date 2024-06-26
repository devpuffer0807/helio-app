import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BigNumber from 'bignumber.js';
import format from 'date-fns/format';
import { makeStyles } from 'tss-react/mui';
import { fromWei } from 'web3-utils';

import {
  CopyIcon,
  cropString,
  EXPLORER_URL,
  Loader,
  truncateNumber,
  useInfiniteScroll,
} from 'modules/common';
import { t } from 'modules/i18n';
import ExternalIcon from 'modules/liquidation/assets/external.svg';
import { rgba } from 'modules/theme';

import {
  useGetLiquidatedQuery,
  UseGetLiquidatedQueryResponse,
} from '../../../actions';
import EmptyMessage from '../EmptyMessage';

export default function History(): JSX.Element {
  const { classes } = useStyles();
  const [ref, { data, hasMore }] = useInfiniteScroll<
    HTMLDivElement,
    UseGetLiquidatedQueryResponse
  >(useGetLiquidatedQuery);
  const { data: users } = data ?? {};

  if (!users || !users.length) {
    return <EmptyMessage message={t('liquidation.history-empty')} />;
  }

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('liquidation.date')}</TableCell>
            <TableCell>{t('liquidation.address')}</TableCell>
            <TableCell>{t('liquidation.collateral-only')}</TableCell>
            <TableCell>{t('liquidation.liquidation-cost')}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(row => {
            return (
              <TableRow
                key={`${row.ts}_${row.userAddress}`}
                sx={theme => ({
                  borderBottom: `1px solid ${
                    rgba(theme.colors.black, 0.1) ?? ''
                  }`,
                })}
              >
                <TableCell>
                  {format(new Date(row.ts * 1000), 'MMMM d, yyyy HH:mm')}
                </TableCell>
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
                  {truncateNumber(
                    new BigNumber(fromWei(row.collateralAmount)),
                    2,
                  )}{' '}
                  {row.tokenName}
                </TableCell>
                <TableCell>
                  {t('units.$-value', {
                    value: truncateNumber(
                      new BigNumber(fromWei(row.liquidationCost)),
                      2,
                    ),
                  })}{' '}
                  {t('liquidation.per')} {row.tokenName}
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
