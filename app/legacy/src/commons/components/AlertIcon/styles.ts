import styled from 'styled-components';

export const Circle = styled.div`
  display: flex;
  height: 96px;
  width: 96px;
  margin-bottom: 24px;
  padding: 24px;
  border-radius: 100%;
  background-color: ${({theme}) => theme.colors.warning[100]};
  justify-content: center;
  align-items: center;

  img {
    height: 58px;
    width: 58px;
  }
`;
