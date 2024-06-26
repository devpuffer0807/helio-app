import React, { useRef } from 'react';
import IconButton from '@mui/material/IconButton';

import { ReactComponent as IconCross } from 'modules/common/assets/cross.svg';

type Props = {
  onClick: () => void;
};

export function CloseButton(props: Props): JSX.Element | null {
  const ref = useRef(null);
  return (
    <IconButton ref={ref} {...props}>
      <IconCross />
    </IconButton>
  );
}
