import {GradientColor, ThemeColors} from '@30sas/web-ui-kit-theme';
import {MemoExoticComponent, SVGProps} from 'react';

export interface DocumentAlertProps {
  icon: MemoExoticComponent<(props: SVGProps<SVGSVGElement>) => JSX.Element>;
  backgroundColor: keyof ThemeColors;
  backgroundType: GradientColor;
  textColor: keyof ThemeColors;
  textType: GradientColor;
  withBorder: boolean;
  alertText: string;
  textVariant?: 'Small' | 'XSmall' | 'XSmallbold';
  alertHeight?: string;
}
