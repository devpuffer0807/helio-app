import { useTheme } from '@mui/material/styles';

import { t } from 'modules/i18n';

interface Props {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

export function AxisTick({ x, y, payload }: Props): JSX.Element | null {
  const theme = useTheme();

  if (!x || !y || !payload?.value) return null;

  if (payload.value === 'auto') return null;

  const date = t('analytics.axis-date', {
    date: new Date(payload.value),
  });
  const offsetY = 16;

  return (
    <g transform={`translate(${x},${y + offsetY})`}>
      <text
        textAnchor="middle"
        fill={theme.colors.chartTick}
        fontWeight={500}
        fontSize="11"
      >
        {date}
      </text>
    </g>
  );
}
