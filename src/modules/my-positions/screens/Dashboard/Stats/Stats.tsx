import Box from '@mui/material/Box';
import BigNumber from 'bignumber.js';

import { Info } from './Info';
import { Reward } from './Reward';

interface Props {
  executed: boolean;
  reward: BigNumber | null;
  onSubmit(claimValue: BigNumber): void;
}

export function Stats({ executed, reward, onSubmit }: Props): JSX.Element {
  return (
    <Box
      sx={theme => ({
        [theme.breakpoints.up('md')]: {
          display: 'grid',
          gap: '14px',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'minmax(auto, 1fr)',
        },

        [theme.breakpoints.down('md')]: {
          display: 'flex',
          flexFlow: 'column nowrap',
          gap: '28px',
        },
      })}
    >
      <Info />
      <Reward reward={reward} executed={executed} onSubmit={onSubmit} />
    </Box>
  );
}
