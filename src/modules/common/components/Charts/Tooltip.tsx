import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import format from 'date-fns/format';
import { TooltipProps } from 'recharts';
import { makeStyles } from 'tss-react/mui';

import { truncateNumber, ZERO } from 'modules/common';

type Props = TooltipProps<number, string> & {
  lines: {
    key: string;
    strokeColor: string;
    unit: string;
  }[];
};

export function Tooltip({
  active,
  payload,
  label,
  lines,
}: Props): JSX.Element | null {
  const { classes } = useStyles();
  if (!active || !payload || !payload.length || !label) return null;

  const date = format(new Date(label), 'ccc, MMM d, h:mm a');

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={theme => ({
        padding: '12px',
        boxShadow:
          '0px 0px 1px rgba(0, 0, 0, 0.26), 0px 3px 8px rgba(0, 0, 0, 0.06)',
        borderRadius: '12px',
        backgroundColor: theme.colors.white,
        gap: '8px',
      })}
    >
      {payload.map((data, i) => (
        <Box
          key={data.dataKey}
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          {payload.length !== 0 && (
            <Box
              className={classes.point}
              sx={{ backgroundColor: data.color }}
            />
          )}
          <Typography variant="subtitle1" fontSize={13}>
            {truncateNumber(new BigNumber(data.value ?? ZERO), 2)}{' '}
            {lines[i].unit}
          </Typography>
        </Box>
      ))}
      <Typography variant="subtitle1" sx={{ opacity: 0.5 }} fontSize={13}>
        {date}
      </Typography>
    </Box>
  );
}

const useStyles = makeStyles()({
  point: {
    width: '8px',
    height: '8px',
    borderRadius: '100%',
    marginRight: '6px',
  },
});
