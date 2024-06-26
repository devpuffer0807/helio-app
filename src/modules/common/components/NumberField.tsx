import React, { ChangeEvent, forwardRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import BigNumber from 'bignumber.js';

import { useValidateNumber } from 'modules/common';

import { TextField, TextFieldProps } from './TextField';

interface Props<T extends FieldValues> extends TextFieldProps {
  name: Path<T>;
  control: Control<T>;
  balance?: BigNumber;
  min?: BigNumber;
  unit?: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const regExp = /^(\d*\.{0,1}\d{0,18}$)/;

function InputNumberComponent<T extends FieldValues>(
  { name, control, balance, onChange, min, unit, ...props }: Props<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const validateAmount = useValidateNumber({
    balance,
    max: balance,
    min,
    unit,
  });
  const { field } = useController({
    name,
    control,
    rules: { validate: validateAmount },
  });

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { value } = event.target;

    if (regExp.exec(value)) {
      if (onChange) {
        onChange(event);
      }

      field.onChange(event);
    }
  };

  return (
    <TextField
      {...props}
      ref={ref}
      value={field.value}
      onChange={handleChange}
      autoComplete="off"
      inputMode="numeric"
    />
  );
}

export const NumberField = forwardRef(InputNumberComponent);
