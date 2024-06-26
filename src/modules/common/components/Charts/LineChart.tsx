import { useTheme } from '@mui/material/styles';
import {
  Line,
  LineChart as Chart,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
} from 'recharts';
import { makeStyles } from 'tss-react/mui';

import { rgba } from 'modules/theme';

import { AxisTick } from './AxisTick';
import { Tooltip } from './Tooltip';

interface Props {
  data: unknown[];
  options: {
    xAxis: {
      key: string;
      hide: boolean;
    };
    lines: {
      key: string;
      strokeColor: string;
      unit: string;
    }[];
  };
}

export function LineChart({ data, options }: Props): JSX.Element {
  const theme = useTheme();

  const { xAxis, lines } = options;

  return (
    <ResponsiveContainer>
      <Chart data={data}>
        <XAxis
          dataKey={xAxis.key}
          hide={xAxis.hide}
          tick={<AxisTick />}
          tickLine={false}
          axisLine={false}
          interval="preserveEnd"
        />
        <ChartTooltip
          content={<Tooltip lines={lines} />}
          cursor={{
            stroke: theme.colors.black,
            opacity: 0.2,
            strokeDasharray: 2,
          }}
        />
        {lines.map(line => {
          const { classes } = makeStyles<{ color: string }>()(
            (_, { color }) => ({
              dot: {
                filter: `drop-shadow(0px 0px 3px ${color}) drop-shadow(0px 4px 4px ${
                  rgba(color, 0.34) as string
                })`,
              },
            }),
          )({ color: line.strokeColor });

          return (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.strokeColor}
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 5,
                color: line.strokeColor,
                strokeWidth: 0,
                className: classes.dot,
              }}
              connectNulls
            />
          );
        })}
      </Chart>
    </ResponsiveContainer>
  );
}
