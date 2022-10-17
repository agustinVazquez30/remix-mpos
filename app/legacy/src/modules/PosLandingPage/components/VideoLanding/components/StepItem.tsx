import * as React from 'react';
import {StepItemContainer} from './StepItem.styles';

interface StepItemProps {
  index: number;
  title: string;
}

export const StepItem: React.FC<StepItemProps> = ({index, title}) => {
  return (
    <StepItemContainer>
      <div className="step__index">{index}</div>
      <p className="step__title">{title}</p>
    </StepItemContainer>
  );
};
