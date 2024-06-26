import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  value: number;
  index: number;
}

export function TabPanel({
  children,
  value,
  index,
  ...restProps
}: Props): JSX.Element {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...restProps}
    >
      {value === index && children}
    </div>
  );
}
