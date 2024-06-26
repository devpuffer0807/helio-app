import React, { forwardRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import MuiSlider, { SliderProps as MuiSliderProps } from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { useMarks } from 'modules/common';
import { SliderErrorClasses } from 'modules/theme';

export interface Mark {
  value: number;
  label?: React.ReactNode;
}

interface Props<T extends FieldValues> extends MuiSliderProps {
  name: Path<T>;
  control: Control<T>;
  markSteps?: Mark[];
  error?: boolean;
  placeholder?: string;
}

const DEFAULT_SLIDER_STEP = 1;

function SliderComponent<T extends FieldValues>(
  {
    name,
    control,
    markSteps,
    onChange,
    error,
    placeholder,
    classes,
    ...restProps
  }: Props<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
  });
  const marks = useMarks(field.value, markSteps);

  const handleChange = (
    event: Event,
    value: number | number[],
    activeThumb: number,
  ) => {
    if (Array.isArray(value) || value === field.value) {
      return;
    }

    if (onChange) {
      onChange(event, value, activeThumb);
    } else {
      field.onChange(value);
    }
  };

  return (
    <div>
      <MuiSlider
        {...field}
        step={DEFAULT_SLIDER_STEP}
        marks={marks}
        {...restProps}
        classes={error ?? !!errors[name] ? SliderErrorClasses : classes}
        ref={ref}
        onChange={handleChange}
      />

      {placeholder && (
        <Typography variant="subtitle1" align="right" sx={{ opacity: 0.5 }}>
          {placeholder}
        </Typography>
      )}
    </div>
  );
}

export const Slider = forwardRef(SliderComponent);
