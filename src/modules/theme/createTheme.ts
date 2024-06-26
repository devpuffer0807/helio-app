import type { PaletteMode } from '@mui/material';
import { alpha } from '@mui/material';
import { buttonClasses } from '@mui/material/Button';
import { createTheme as createMuiTheme, Theme } from '@mui/material/styles';
import { switchClasses } from '@mui/material/Switch';

import { DARK_COLORS, FONTS, LIGHT_COLORS } from './consts';
import { getGlobalStyles } from './getGlobalStyles';
import { rgba } from './utils';

export function createTheme(mode: PaletteMode): Theme {
  const baseTheme = createMuiTheme({
    palette: { mode },
    colors: mode === 'light' ? LIGHT_COLORS : DARK_COLORS,

    breakpoints: {
      values: {
        xs: 0,
        sm: 900,
        md: 1080,
        lg: 1280,
        xl: 1536,
      },
    },

    typography: {
      fontFamily: FONTS.default,
    },
  });

  return createMuiTheme(baseTheme, {
    palette: {
      mode,
      common: {
        black: baseTheme.colors.white,
        white: baseTheme.colors.black,
      },

      primary: {
        main: baseTheme.colors.black,
        dark: baseTheme.colors.black,
      },

      secondary: {
        main: baseTheme.colors.white,
      },

      text: {
        primary: baseTheme.colors.black,
        secondary: baseTheme.colors.white,
      },

      error: {
        main: baseTheme.colors.red,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: getGlobalStyles(baseTheme.colors),
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: baseTheme.colors.black,
            fontSize: 16,
          },

          h1: {
            fontFamily: FONTS.accent,
            fontWeight: 500,
            fontSize: 32,
            margin: 0,
          },

          h2: {
            fontFamily: FONTS.accent,
            fontWeight: 500,
            fontSize: 28,
            margin: 0,

            [baseTheme.breakpoints.down('md')]: {
              fontSize: 24,
            },
          },

          h4: {
            fontFamily: FONTS.accent,
            fontWeight: 400,
            fontSize: 18,
            margin: 0,
          },

          h5: {
            fontSize: 16,
            margin: 0,
          },

          h6: {
            fontWeight: 600,
            fontSize: 14,
            margin: 0,
          },

          body1: {
            fontSize: 15,
            lineHeight: '18px',
            color: baseTheme.colors.black,

            [baseTheme.breakpoints.down('md')]: {
              fontSize: 14,
            },
          },

          body2: {
            fontSize: 14,
            fontWeight: 400,
          },

          body3: {
            fontSize: 14,
            fontWeight: 400,
            opacity: 0.5,
          },

          subtitle1: {
            fontSize: 13,
            fontWeight: 400,
          },

          subtitle2: {
            fontSize: 12,
            fontWeight: 400,
          },

          subtitle3: {
            fontSize: 10,
            fontWeight: 400,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 32,
            backgroundColor: baseTheme.colors.secondary,
            backgroundImage: 'none',
            boxShadow: 'none',
            backdropFilter: 'blur(210px)',

            [baseTheme.breakpoints.down('md')]: {
              borderRadius: 24,
            },
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            height: 60,
            borderRadius: 12,
            paddingRight: 16,

            [`&.${buttonClasses.disabled}`]: {
              color: rgba(baseTheme.colors.black, 0.5),
            },
          },

          input: {
            height: 32,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 16,

            '&:not(:last-child)': {
              paddingRight: 16,
              marginRight: 12,
              borderRight: `1px solid ${
                rgba(baseTheme.colors.black, 0.2) ?? ''
              }`,
            },

            [`&.${buttonClasses.disabled}`]: {
              color: rgba(baseTheme.colors.black, 0.5),
              WebkitTextFillColor: rgba(baseTheme.colors.black, 0.5),
            },
          },
        },
      },

      MuiFilledInput: {
        styleOverrides: {
          root: {
            height: 60,
            borderRadius: 12,
            paddingRight: 16,
            background: baseTheme.colors.TextFieldBackground,

            '&:before, &:after': {
              display: 'none',
            },

            '&:hover': {
              backgroundColor: rgba(
                baseTheme.colors.black,
                baseTheme.palette.mode === 'light' ? 0.06 : 0.09,
              ) as string,
            },
          },

          input: {
            height: 32,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 16,
            borderRadius: 0,

            ':-webkit-autofill': {
              borderRadius: 0,
            },

            '&:not(:last-child)': {
              paddingRight: 16,
              borderRight: `1px solid ${
                rgba(baseTheme.colors.black, 0.2) ?? ''
              }`,
              marginRight: 12,
            },
          },
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },

        styleOverrides: {
          root: {
            fontWeight: 600,
            backgroundColor: baseTheme.colors.black,
            color: baseTheme.colors.white,
            textTransform: 'initial',
            transition: '0.3s',

            '&:hover': {
              backgroundColor: baseTheme.colors.primary,
              color: baseTheme.colors.buttonFilledTextHover,
            },

            '&:disabled': {
              background: baseTheme.colors.disabled,
              borderColor: baseTheme.colors.disabled,
              color: baseTheme.colors.white,
            },
          },

          outlined: {
            backgroundColor: 'transparent',
            color: baseTheme.colors.black,
            border: `1px solid ${rgba(baseTheme.colors.black, 0.2) ?? ''}`,

            '&:hover': {
              opacity: 1,
              color: baseTheme.colors.white,
              backgroundColor: baseTheme.colors.black,
              borderColor: baseTheme.colors.black,
            },

            '&:disabled': {
              color: rgba(baseTheme.colors.white, 0.8),
            },
          },

          sizeSmall: {
            fontSize: 13,
            borderRadius: 36,
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 13.5,
            paddingRight: 13.5,
            height: 30,
            minHeight: 30,
          },

          sizeMedium: {
            fontSize: 14,
            borderRadius: 36,
            height: 44,
            minHeight: 44,
          },

          sizeLarge: {
            fontSize: 16,
            borderRadius: 28,
            height: 60,
            minHeight: 60,
          },
        },

        variants: [
          {
            props: { size: 'tiny' },
            style: {
              fontSize: 14,
              borderRadius: 20,
              paddingTop: 7,
              paddingBottom: 7,
              paddingLeft: 14,
              paddingRight: 14,
              height: 28,
              minWidth: 80,
            },
          },
        ],
      },

      MuiSlider: {
        defaultProps: {
          valueLabelDisplay: 'off',
        },

        styleOverrides: {
          root: {
            marginTop: 20,
            marginBottom: 0,
            height: 6,

            '@media (pointer: coarse)': {
              padding: '13px 0',
            },
          },

          mark: {
            top: 'calc(96% - 23px)',
            width: 1,
            height: 18,
            borderRadius: 0,
            backgroundColor: baseTheme.colors.sliderRail,

            '&[data-index="0"]': {
              display: 'none',
            },
          },

          markLabel: {
            top: -16,
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1,
            color: rgba(baseTheme.colors.black, 0.3),

            [baseTheme.breakpoints.down('md')]: {
              transform: 'translateX(-100%)',
            },

            '@media (pointer: coarse)': {
              top: -20,
            },

            '&[data-index="0"]': {
              transform: 'initial',

              '&:not(.faded)': {
                opacity: 1,
              },

              '@media (pointer: coarse)': {
                transform: 'initial',
              },

              '&.ok': {
                color: baseTheme.colors.sliderGreen,
              },

              '&.error': {
                color: baseTheme.colors.red,
              },
            },

            '&[data-index]:last-of-type': {
              transform: 'translateX(-100%)',
            },

            '&.ok + .MuiSlider-mark.MuiSlider-markActive': {
              backgroundColor: baseTheme.colors.sliderGreen,
            },

            '&.error + .MuiSlider-mark.MuiSlider-markActive': {
              backgroundColor: baseTheme.colors.red,
            },
          },

          rail: {
            borderRadius: 0,
            backgroundColor: baseTheme.colors.sliderRail,
            opacity: 1,
            height: 8,
          },

          track: {
            color: baseTheme.colors.black,
            border: 'none',
            borderRadius: 0,
            height: 8,

            '&.ok': {
              color: baseTheme.colors.sliderGreen,
            },

            '&.error': {
              color: baseTheme.colors.red,
            },
          },

          thumb: {
            backgroundColor: baseTheme.colors.black,
            width: 22,
            height: 22,
            boxShadow:
              '0px 0px 3px #6BEF69, 0px 4px 4px rgba(108, 214, 107, 0.34)',

            '&:before, &:after': {
              display: 'none',
            },

            '&.ok': {
              backgroundColor: baseTheme.colors.sliderGreen,
              '&:hover, &:active': {
                boxShadow: '0px 0px 0px 6px rgba(107, 239, 105, 0.19)',
              },
            },

            '&.error': {
              backgroundColor: baseTheme.colors.red,
              boxShadow:
                '0px 0px 3px #FF2929, 0px 4px 4px rgba(255, 41, 41, 0.34)',
              '&:hover, &:active': {
                boxShadow: '0px 0px 0px 6px rgba(255, 41, 41, 0.2)',
              },
            },
          },
        },
      },

      MuiList: {
        styleOverrides: {
          root: {
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },

      MuiMenu: {
        styleOverrides: {
          list: {
            padding: '0 20px',
          },
        },
      },

      MuiMenuItem: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            fontSize: 14,
            lineHeight: 1,
            opacity: 0.5,
            minHeight: 'unset',
            padding: '14px 0',

            '&:first-of-type': {
              paddingTop: 16,
            },

            '&:last-of-type': {
              paddingBottom: 16,
            },

            '&:hover': {
              opacity: 1,
              backgroundColor: 'unset',
            },

            '&&.Mui-selected': {
              opacity: 1,
              backgroundColor: 'unset',
            },
          },
        },
      },

      MuiListItem: {
        styleOverrides: {
          root: {
            padding: '16px 0',
            fontSize: 14,
            fontWeight: 700,
            color: baseTheme.colors.light,

            [baseTheme.breakpoints.down('md')]: {
              padding: '14px 0',
            },
          },
          secondaryAction: {
            fontFeatureSettings: "'calt' off",
            fontWeight: 400,
          },

          divider: {
            borderBottom: `1px solid ${
              rgba(baseTheme.colors.black, 0.1) || ''
            }`,
          },
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: {
            padding: '20px 0',
          },
        },
      },

      MuiListItemSecondaryAction: {
        styleOverrides: {
          root: {
            right: 0,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 0,
            paddingRight: 0,
            fontSize: 14,
            fontWeight: 400,
            color: baseTheme.colors.black,
            [baseTheme.breakpoints.down('sm')]: {
              paddingTop: 60,
            },
          },
        },
      },

      MuiTabs: {
        styleOverrides: {
          root: {
            minHeight: 'unset',
          },
          flexContainer: {
            '&&': {
              gap: '24px',
            },
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            color: rgba(baseTheme.colors.black, 0.5),
            '&&': {
              padding: '12px 8px',
              minWidth: 'unset',
              minHeight: 'unset',
              textTransform: 'unset',
              fontWeight: 600,
              fontSize: 16,
            },
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          head: {
            padding: '12px 22px',
            backgroundColor: baseTheme.colors.secondary,
            boxShadow: '0px 21px 13px -9px rgba(0, 0, 0, 0.04)',
            fontWeight: 600,
            fontSize: 14,
            lineHeight: '17px',
            color: rgba(baseTheme.colors.black, 0.5),
            borderBottom: 'none',
            whiteSpace: 'nowrap',

            '&:first-of-type': {
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
            },

            '&:last-child': {
              borderTopRightRadius: 12,
              borderBottomRightRadius: 12,
            },
          },
          body: {
            padding: '23px 22px',
            borderBottom: `none`,
            whiteSpace: 'nowrap',
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: baseTheme.colors.secondary,
            borderRadius: 0,
          },
          paperAnchorBottom: {
            '&&': {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          },
        },
      },

      MuiCircularProgress: {
        styleOverrides: {
          root: {
            padding: 10,
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: baseTheme.colors.gray,
            borderRadius: '12px',
            color: baseTheme.colors.black,
            padding: '9px 19px',
            boxShadow:
              '0px 0px 1px rgba(0, 0, 0, 0.25), 0px 10px 13px -9px rgba(0, 0, 0, 0.1)',
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          select: {
            display: 'flex',
            alignItems: 'center',
            padding: '6px 16px 6px 10px',
            fontWeight: 600,
            fontSize: 14,
            lineHeight: '14px',
            minHeight: 'unset',

            '&:focus': {
              backgroundColor: 'transparent',
            },

            img: {
              width: 24,
              marginRight: 10,
            },

            '&&': {
              minWidth: '50px',
              marginRight: 'unset',
              border: `1px solid ${alpha(baseTheme.colors.black, 0.1)}`,
              borderRadius: '36px',
            },
          },

          icon: {
            '&&': {
              top: 'unset',
              right: '14px',
              transition: 'transform .15s ease',
            },
          },
        },
      },

      MuiPopover: {
        styleOverrides: {
          root: {
            '& *[class*=MuiMenu-paper]': {
              borderRadius: '12px',
              overflow: 'hidden',
              background: baseTheme.colors.secondary,
              color: baseTheme.colors.black,
              border:
                baseTheme.palette.mode === 'dark' &&
                `1px solid ${rgba(baseTheme.colors.white, 0.1) as string}`,
              boxShadow:
                baseTheme.palette.mode === 'light' &&
                `0px 0px 1px ${
                  rgba(baseTheme.colors.black, 0.26) as string
                }, 0px 3px 8px ${rgba(baseTheme.colors.black, 0.06) as string}`,
              marginTop: '10px',
            },
          },
          paper: {
            marginTop: '18px',
            boxShadow: 'none',
            padding: 0,
            overflow: 'visible',
            background: 'transparent',
            border: 'none',
          },
        },
      },

      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: 0,
            color: rgba(baseTheme.colors.black, 0.3),

            '&.Mui-checked': {
              color: baseTheme.colors.primary,
            },
          },
          icon: {
            fontSize: '30px',
          },
        },
      },

      MuiFormHelperText: {
        styleOverrides: {
          root: {
            margin: '12px 0px 0px',
            fontSize: 14,
            fontWeight: 400,
          },
          '&.Mui-error': {
            color: baseTheme.colors.red,
          },
        },
      },

      MuiSvgIcon: {
        styleOverrides: {
          root: {
            '&[data-testid="CheckBoxOutlineBlankIcon"], &[data-testid="CheckBoxIcon"]':
              {
                fontSize: 30,
              },
          },
        },
      },

      MuiStepConnector: {
        styleOverrides: {
          line: {
            borderTopWidth: 2,
            borderColor: baseTheme.colors.silver,
          },
        },
      },

      MuiStep: {
        styleOverrides: {
          root: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },

      MuiStepLabel: {
        styleOverrides: {
          iconContainer: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },

      MuiSwitch: {
        styleOverrides: {
          root: {
            padding: 0,
            width: 36,
            height: 14,
          },
          switchBase: {
            padding: '0',
            color: '#CCCCCC',
            [`&.${switchClasses.checked}`]: {
              color:
                baseTheme.palette.mode === 'light'
                  ? baseTheme.colors.black
                  : 'unset',
              transform: 'translateX(16px)',

              [`& + .${switchClasses.track}`]: {
                backgroundColor: `${baseTheme.colors.stroke} !important`,
              },
            },
            '&&:hover': {
              background: 'transparent',
            },
          },
          thumb: {
            boxShadow: 'unset',
            borderRadius: '7px',
            height: '14px',
          },
          track: {
            backgroundColor: baseTheme.colors.stroke,
            '&&&': {
              opacity: 1,
            },
          },
        },
      },
    },
  });
}
