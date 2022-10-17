import {Card} from './styles';
import {ReactNode} from 'react';
import {TreintaLogoIcon} from '@30sas/web-ui-kit-icons';
import {Typography} from '@30sas/web-ui-kit-core';

type TreintaCardType = {
  alert?: ReactNode;
  children?: ReactNode;
  testId?: string;
  title: string;
};

export const TreintaCard = ({
  alert,
  children,
  testId,
  title,
}: TreintaCardType) => {
  return (
    <Card data-testid={testId}>
      {alert && <div className="alert">{alert}</div>}
      <TreintaLogoIcon className="logo" height={48} width={148} />
      <Typography className="title" variant="XXLargebold" margin="0">
        {title}
      </Typography>
      {children}
    </Card>
  );
};
