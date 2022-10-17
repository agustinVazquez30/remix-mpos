import {Background, SmallSpinner} from './styled';

type SpinnerType = {
  fullScreen?: boolean;
  testId?: string;
};

export const Spinner = ({
  fullScreen = false,
  testId = 'spinner',
}: SpinnerType) => (
  <Background fullScreen={fullScreen} data-testid={testId}>
    <SmallSpinner />
  </Background>
);
