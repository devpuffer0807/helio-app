import InterWoff2 from 'assets/fonts/Inter.woff2';
import VerbatimBoldWoff from 'assets/fonts/Verbatim-Bold.woff';
import VerbatimBoldWoff2 from 'assets/fonts/Verbatim-Bold.woff2';
import VerbatimExtendedRegularWoff from 'assets/fonts/Verbatim-Extended.woff';
import VerbatimExtendedRegularWoff2 from 'assets/fonts/Verbatim-Extended.woff2';
import VerbatimExtendedBoldWoff from 'assets/fonts/Verbatim-ExtendedBold.woff';
import VerbatimExtendedBoldWoff2 from 'assets/fonts/Verbatim-ExtendedBold.woff2';
import VerbatimExtendedLightWoff from 'assets/fonts/Verbatim-ExtendedLight.woff';
import VerbatimExtendedLightWoff2 from 'assets/fonts/Verbatim-ExtendedLight.woff2';
import VerbatimExtendedMediumWoff from 'assets/fonts/Verbatim-ExtendedMedium.woff';
import VerbatimExtendedMediumWoff2 from 'assets/fonts/Verbatim-ExtendedMedium.woff2';
import VerbatimMediumWoff from 'assets/fonts/Verbatim-Medium.woff';
import VerbatimMediumWoff2 from 'assets/fonts/Verbatim-Medium.woff2';
import VerbatimRegularWoff from 'assets/fonts/Verbatim-Regular.woff';
import VerbatimRegularWoff2 from 'assets/fonts/Verbatim-Regular.woff2';

import { Colors } from './consts';

export function getGlobalStyles(colors: Colors): string {
  return `
  
  @font-face {
    font-family: 'Inter';
    font-weight: 100 1000;
    font-display: swap;
    src: local('Inter'), url(${
      InterWoff2 as string
    }) format('woff2 supports variations'), local('Inter'), url(${
    InterWoff2 as string
  }) format('woff2-variations');
  }
  
  @font-face {
    font-family: 'Verbatim Extended';
    font-style: normal;
    font-display: swap;
    font-weight: 300;
    src: local('Verbatim Extended'), local('Verbatim Extended Light'), url(${
      VerbatimExtendedLightWoff2 as string
    }) format('woff2'), local('Verbatim Extended'), local('Verbatim Extended Light'), url(${
    VerbatimExtendedLightWoff as string
  }) format('woff');
  }

  @font-face {
    font-family: 'Verbatim Extended';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: local('Verbatim Extended'), local('Verbatim Extended Regular'), url(${
      VerbatimExtendedRegularWoff2 as string
    }) format('woff2'), local('Verbatim Extended'), local('Verbatim Extended Regular'), url(${
    VerbatimExtendedRegularWoff as string
  }) format('woff');
  }
  
  @font-face {
    font-family: 'Verbatim Extended';
    font-style: normal;
    font-display: swap;
    font-weight: 700;
    src: local('Verbatim Extended'), local('Verbatim Extended Bold'), url(${
      VerbatimExtendedBoldWoff2 as string
    }) format('woff2'), local('Verbatim Extended'), local('Verbatim Extended Bold'), url(${
    VerbatimExtendedBoldWoff as string
  }) format('woff');
  }
  
  @font-face {
    font-family: 'Verbatim Extended';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src: local('Verbatim Extended'), local('Verbatim Extended Medium'), url(${
      VerbatimExtendedMediumWoff2 as string
    }) format('woff2'), local('Verbatim Extended'), local('Verbatim Extended Medium'), url(${
    VerbatimExtendedMediumWoff as string
  }) format('woff');
  }
  
  @font-face {
    font-family: 'Verbatim';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: local('Verbatim'), local('Verbatim Regular'), url(${
      VerbatimRegularWoff2 as string
    }) format('woff2'), local('Verbatim'), local('Verbatim Regular'), url(${
    VerbatimRegularWoff as string
  }) format('woff');
  }
  
  @font-face {
    font-family: 'Verbatim';
    font-style: normal;
    font-display: swap;
    font-weight: 500;
    src: local('Verbatim'), local('Verbatim Medium'), url(${
      VerbatimMediumWoff2 as string
    }) format('woff2'), local('Verbatim'), local('Verbatim Medium'), url(${
    VerbatimMediumWoff as string
  }) format('woff');
  }
  
  @font-face {
    font-family: 'Verbatim';
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: local('Verbatim'), local('Verbatim Bold'), url(${
      VerbatimBoldWoff2 as string
    }) format('woff2'), local('Verbatim'), local('Verbatim Bold'), url(${
    VerbatimBoldWoff as string
  }) format('woff');
  }

  html {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    scroll-behavior: smooth;
  }

  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background: ${colors.silver};
    box-sizing: border-box;
    color: ${colors.black};
    font-size: 16px;
    flex-direction: column;
    flex: 1;
    margin: 0;
    padding: 0;
    position: relative;
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
  }

  button, input, optgroup, select, textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 110%;
    margin: 0;
  }

  ::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  :-moz-focusring {
    outline: 1px dotted ButtonText;
  }
`;
}
