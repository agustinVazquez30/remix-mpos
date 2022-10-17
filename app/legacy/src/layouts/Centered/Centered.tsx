import {Container} from './styles';
import {ReactNode} from 'react';

export const Centered = ({children}: {children: ReactNode}) => {
  return <Container>{children}</Container>;
};
