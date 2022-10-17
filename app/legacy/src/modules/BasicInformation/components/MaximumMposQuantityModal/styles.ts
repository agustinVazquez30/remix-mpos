import styled from 'styled-components';

export const PopupContent = styled.div`
  text-align: center;
  width: 100%;
  color: red;

  & .title {
    color: ${({theme}) => theme.colors.secondary[700]};
    margin: 16px 0;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      margin: 24px 0;
    }
  }
`;
