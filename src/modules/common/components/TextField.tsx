import React, { forwardRef, ReactNode } from 'react';
import Box from '@mui/material/Box';
import MUITextField from '@mui/material/TextField';
import { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { rgba } from 'modules/theme';

export interface TextFieldProps
  extends Omit<MUITextFieldProps, 'label' | 'name'> {
  label?: string;
  additionalLabel?: ReactNode;
  defaultValue?: string;
  additionalLabelOnClick?: () => void;
}

function TextFieldComponent(
  { label, additionalLabel, additionalLabelOnClick, ...props }: TextFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.container}>
      {(label || additionalLabel) && (
        <div className={classes.info}>
          <Typography variant="body1" fontWeight={700}>
            {label}
          </Typography>

          <Box display="flex" alignItems="center">
            <Typography
              className={cx(
                classes.additionalLabel,
                additionalLabelOnClick && classes.additionalLabelActive,
              )}
              onClick={additionalLabelOnClick}
              variant="subtitle2"
              component="div"
            >
              {additionalLabel}
            </Typography>
          </Box>
        </div>
      )}

      <MUITextField {...props} ref={ref} placeholder="0" />
    </div>
  );
}

export const TextField = forwardRef(TextFieldComponent);

const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  additionalLabel: {
    '&&': {
      color: rgba(theme.colors.black, 0.5),
    },
  },
  additionalLabelActive: {
    '&&': {
      transition: '0.3s',
      cursor: 'pointer',

      '&:hover': {
        color: theme.colors.black,
      },
    },
  },
}));
