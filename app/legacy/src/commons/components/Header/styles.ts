import styled from 'styled-components';

export const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 30;
  background: ${({theme}) => theme.colors.neutrals[100]};

  min-height: 84px;

  width: 100%;
  max-width: 100%;
  padding: 0 16px;
  display: none;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & .right {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  & .logo {
    width: 123px;
    height: 39px;
  }

  ${({theme}) => theme.breakpointsMinWidth.sm} {
    display: flex;
  }
`;

export const Nav = styled.div`
  color: ${({theme}) => theme.colors.gray[700]};
  ${({theme}) => theme.fonts.nunito.medium}
  text-decoration: none;
  cursor: pointer;
`;
