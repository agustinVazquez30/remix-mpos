import 'styled-components';
import {Theme} from '@30sas/web-ui-kit-theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    breakpointsUnits: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    breakpointsMinWidth: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    breakpointsMaxWidth: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    zIndex: {modal: number; loader: number; hide: number};
  }
}
