import {Alert} from '@30sas/web-ui-kit-core';
import {DocumentAlertProps} from './types';

export const DocumentAlert: React.FC<DocumentAlertProps> = ({
  icon,
  backgroundColor,
  textColor,
  backgroundType,
  textType,
  withBorder,
  alertText,
  textVariant,
  alertHeight,
}) => {
  return (
    <Alert
      Icon={icon}
      className="document-alert"
      backgroundColor={backgroundColor}
      backgroundType={backgroundType}
      textColor={textColor}
      textType={textType}
      textVariant={textVariant}
      withBorder={withBorder}
      height={alertHeight}
      text={
        <span className="document-alert__text" role="alert">
          {alertText}
        </span>
      }
    />
  );
};
