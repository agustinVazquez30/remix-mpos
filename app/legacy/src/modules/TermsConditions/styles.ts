import styled from 'styled-components';

export const Container = styled.div`
  ${({theme}) => theme.fonts.nunito.medium}
  text-align: justify;
  color: ${({theme}) => theme.colors.gray[800]};

  & .title {
    margin: 0px;
    margin-bottom: 14px;
    ${({theme}) => theme.fonts.nunito.xxxlargebold}
    color: ${({theme}) => theme.colors.primary[900]};
  }
`;

export const ItemOne = styled.li`
  margin: 25px 25px;
`;

export const ItemTwo = styled.li`
  margin: 15px 0 15px 30px;
`;

export const ItemThree = styled.li`
  margin: 15px 0 15px 35px;
`;
