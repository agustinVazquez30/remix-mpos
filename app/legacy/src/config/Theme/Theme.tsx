import {BreakPointsUnits, ZINDEX} from './constants';

import {DefaultTheme} from 'styled-components';
import {TreintaTheme} from '@30sas/web-ui-kit-theme';

export const Theme: DefaultTheme = {
  ...TreintaTheme,
  breakpointsUnits: {
    sm: BreakPointsUnits.SM,
    md: BreakPointsUnits.MD,
    lg: BreakPointsUnits.LG,
    xl: BreakPointsUnits.XL,
    xxl: BreakPointsUnits.XXL,
  },
  breakpointsMinWidth: {
    xs: '@media (min-width: 320px)',
    sm: '@media (min-width: 639px)',
    md: '@media (min-width: 767px)',
    lg: '@media (min-width: 1023px)',
    xl: '@media (min-width: 1279px)',
    xxl: '@media (min-width: 1535px)',
  },
  breakpointsMaxWidth: {
    xs: '@media (max-width: 320px)',
    sm: '@media (max-width: 639px)',
    md: '@media (max-width: 767px)',
    lg: '@media (max-width: 1023px)',
    xl: '@media (max-width: 1279px)',
    xxl: '@media (max-width: 1535px)',
  },
  zIndex: {
    modal: ZINDEX.modal,
    loader: ZINDEX.loader,
    hide: ZINDEX.hide,
  },
};
