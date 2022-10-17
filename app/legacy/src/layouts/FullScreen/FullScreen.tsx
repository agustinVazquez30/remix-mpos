import {MainContainer} from './styles';
import {ReactNode} from 'react';

export const FullScreen = ({children}: {children: ReactNode}) => {
  return <MainContainer>{children}</MainContainer>;
};
