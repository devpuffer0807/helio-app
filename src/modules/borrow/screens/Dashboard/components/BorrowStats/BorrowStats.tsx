import React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from 'tss-react/mui';

import { ZERO } from 'modules/common';
import { useCollateralToken } from 'modules/core';
import { useGetAccountDataQuery } from 'modules/store/actions/getAccountData';

import { BorrowPanel } from './BorrowPanel';
import { CollateralPanel } from './CollateralPanel';
import { Rewards } from './Rewards';

interface Props {
  className?: string;
}

export function BorrowStats({ className }: Props): JSX.Element {
  const [{ token }] = useCollateralToken();
  const { data } = useGetAccountDataQuery({ token });
  const { collateral = ZERO, collateralPrice = ZERO } = data ?? {};

  const { classes, cx } = useStyles();

  return (
    <Box className={cx(classes.root, className)}>
      <CollateralPanel
        collateral={collateral}
        equivalent={collateralPrice.multipliedBy(collateral)}
      />
      <Rewards />
      <BorrowPanel data={data} />
    </Box>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'minmax(420px, 1fr) minmax(max-content, 602px)',
    gridTemplateRows: '300px 200px',
    gridGap: 20,

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '230px 388px 230px',

      'div:nth-of-type(1)': {
        order: 1,
      },
      'div:nth-of-type(2)': {
        order: 3,
      },
      'div:nth-of-type(3)': {
        order: 2,
      },
    },

    [theme.breakpoints.down('sm')]: {
      gridTemplateRows: '265px 485px 342px',
    },
  },
}));
