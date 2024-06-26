import { SliderTypeMap } from '@mui/material/Slider';

export interface Colors {
  black: string;
  primary: string;
  secondary: string;
  dark: string;
  gray: string;
  silver: string;
  sliderRail: string;
  lightGray: string;
  grayTint: string;
  light: string;
  white: string;
  darkRed: string;
  red: string;
  green: string;
  sliderGreen: string;
  brighterGreen: string;
  orange: string;
  blue: string;
  chartTick: string;
  buttonFilledTextHover: string;
  dropdownAddress: string;
  TextFieldBackground: string;
  stroke: string;
  disabled: string;
}

export const LIGHT_COLORS: Colors = {
  white: '#ffffff',
  primary: '#FFD600',
  secondary: '#ffffff',
  dark: '#131313',
  gray: '#ffffff',
  light: '#898989',
  lightGray: '#EEF0F4',
  grayTint: '#484A4F',
  silver: '#EFEFEF',
  sliderRail: '#EFEFEF',
  black: '#000000',
  red: '#FF2929',
  darkRed: '#D80303',
  green: '#00D930',
  sliderGreen: '#6BEF69',
  brighterGreen: '#009E52',
  orange: '#FF8440',
  blue: '#0084FF',
  chartTick: '#82899A',
  buttonFilledTextHover: '#000000',
  dropdownAddress: '#EFEFEF',
  TextFieldBackground: '#EFEFEF',
  stroke: '#E6E6E6',
  disabled: '#D3D3D3',
};

export const DARK_COLORS: Colors = {
  white: '#000000',
  primary: '#FFD600',
  secondary: '#292B2E',
  dark: '#131313',
  gray: '#2A2A2A',
  light: '#898989',
  lightGray: '#EEF0F4',
  grayTint: '#484A4F',
  silver: '#1A1C1F',
  sliderRail: '#515255',
  black: '#ffffff',
  darkRed: '#D80303',
  red: '#FF2929',
  green: '#6BEF69',
  sliderGreen: '#6BEF69',
  brighterGreen: '#009E52',
  orange: '#FF8440',
  blue: '#0084FF',
  TextFieldBackground: '#414244',
  chartTick: '#82899A',
  buttonFilledTextHover: '#000000',
  dropdownAddress: '#3E4043',
  stroke: '#E6E6E6',
  disabled: '#D3D3D3',
};

export const FONTS = {
  default: 'Inter, sans-serif',
  accent: '"Verbatim Extended", sans-serif',
  accentTwo: '"Verbatim", sans-serif',
};

export const SliderErrorClasses: SliderTypeMap['props']['classes'] = {
  markLabel: 'error',
  track: 'error',
  thumb: 'error',
};

export const SliderOkClasses: SliderTypeMap['props']['classes'] = {
  markLabel: 'ok',
  track: 'ok',
  thumb: 'ok',
};

export const SliderFadedClasses: SliderTypeMap['props']['classes'] = {
  markLabel: 'faded',
};
