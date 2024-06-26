import { ReactNode } from 'react';
import { TextField } from '@mui/material';
import { inputBaseClasses } from '@mui/material/InputBase';
import { selectClasses, SelectProps } from '@mui/material/Select';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { makeStyles } from 'tss-react/mui';

import { rgba } from 'modules/theme';

import { ReactComponent as IconArrowDown } from '../assets/icon-arrow-down.svg';

type Props = TextFieldProps & {
  children: ReactNode;
  renderValue?: SelectProps['renderValue'];
};

export function Select({
  className,
  children,
  renderValue,
  ...rest
}: Props): JSX.Element {
  const { classes } = useStyles();

  return (
    <TextField
      className={classes.root}
      select
      SelectProps={{
        className,
        renderValue,
        IconComponent: IconArrowDown,
      }}
      {...rest}
    >
      {children}
    </TextField>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    [`& .${selectClasses.icon}`]: {
      color: rgba(theme.colors.black, 0.5) as string,
    },
    [`& .${inputBaseClasses.formControl}`]: {
      padding: 'unset',
      height: 'unset',
      borderRadius: 'unset',
      border: 'unset',

      '& fieldset': {
        display: 'none',
      },
    },
  },
}));
