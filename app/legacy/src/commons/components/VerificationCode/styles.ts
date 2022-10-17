import styled, {css} from 'styled-components';

export const MainContainer = styled.div<{
  hasError: boolean;
}>`
  & .container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  & .helper-text {
    color: ${({theme}) => theme.colors.danger[500]};
    margin-top: 8px;
  }
`;

export const Field = styled.div`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Input = styled.input<{
  hasValue: boolean;
  hasError: boolean;
  isValid: boolean;
}>`
  color: ${({theme}) => theme.colors.secondary[700]};
  border: solid 0.5px ${({theme}) => theme.colors.gray[500]};
  border-radius: ${({theme}) => theme.corners.xl};
  font-size: ${({theme}) => theme.fonts['nunito'].xlarge};
  height: 48px;
  margin: 0 8px;
  text-align: center;
  width: 40px;

  ${({theme}) => theme.breakpointsMinWidth.sm} {
    height: 64px;
    width: 52px;
  }

  ${({hasError, theme}) =>
    hasError &&
    css`
      border: solid 2px ${theme.colors.danger[500]};
      color: ${theme.colors.danger[500]};
    `}

  ${({isValid, theme}) =>
    isValid &&
    css`
      border: solid 2px ${theme.colors.success[500]};
    `}

  :focus {
    border: 1px solid ${({theme}) => theme.colors.gray[900]};
    outline: none;
  }
`;
