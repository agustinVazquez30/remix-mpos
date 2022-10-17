import {Container} from './styles';
import {ReactNode} from 'react';

type CardType = {
  children: ReactNode;
  className?: string;
};

export const Card = ({children, className}: CardType) => (
  <Container className={className}>{children}</Container>
);
