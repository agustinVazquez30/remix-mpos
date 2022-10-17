import {Typography} from '@30sas/web-ui-kit-core';
import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3fr 0.5fr 0.5r;
  grid-template-areas:
    'info image'
    'buy-now image'
    'actions image';
  padding-left: 5rem;
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    padding-left: 0;
    grid-template-columns: 1fr;
    grid-template-rows: 1.1fr 1.5fr 0.2fr 0.5fr;
    grid-template-areas:
      'info'
      'image'
      'buy-now'
      'actions';
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;
  .pos-image {
    width: 30rem;
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      width: 21rem;
      left: 0;
    }
  }
`;

export const BuyNow = styled(Typography)`
  grid-area: buy-now;
  margin: 0.5rem 1rem;
  ${({theme}) => theme.fonts.nunito.large}
  .buy-now-new-price {
    ${({theme}) => theme.fonts.nunito.xxlargebold}
    color: ${({theme}) => theme.colors.success[600]};
  }

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    margin: 0.5rem auto 0;
  }

  ${({theme}) => theme.breakpointsMaxWidth.sm} {
    padding: 0 1rem;
  }
`;

export const SectionInfo = styled.div`
  align-self: flex-end;
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    margin-left: 0;
    padding-left: 1rem;
  }
  & .title {
    font-size: 4.5rem;
    line-height: 5.5rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.gray[800]};
    margin: 1rem;

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      line-height: 2.3rem;
      font-size: 1.9rem;
    }
  }

  & .subtitle {
    margin: 0px 0px 1rem 1rem;
    ${({theme}) => theme.fonts.nunito.xlargebold}
    color: ${({theme}) => theme.colors.gray[700]};
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      line-height: 2.5rem;
      ${({theme}) => theme.fonts.nunito.mediumbold}
      margin: 0px 0px 0px 1rem;
    }
  }

  & .commission {
    margin: 0px 0px 1rem 1rem;
    font-weight: bold;
    ${({theme}) => theme.fonts.nunito.xxxlargebold}
    color: ${({theme}) => theme.colors.success[600]};
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      font-size: 1.4rem;
    }
  }

  & .subtitle-bold {
    ${({theme}) => theme.fonts.nunito.xlargebold}
    color: ${({theme}) => theme.colors.gray[800]};
  }
`;

export const ActionsContainer = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: row;
  margin: 1rem;
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0.5rem 0 0 0;
    padding: 0 1rem;
  }
  .faqButton,
  .buyButton {
    width: 18em;
    height: 2.5rem;
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      width: 100%;
    }
  }
  .buyButton {
    margin-right: 1.5em;
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      margin-right: 0;
      margin-bottom: 1rem;
    }
  }
  .default-text {
    font-family: 'Nunito Sans';
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 700;
    font-style: normal;
    color: rgb(255, 255, 255);
    text-transform: none;
  }
  .through {
    text-decoration: line-through;
    margin-left: 4px;
    margin-right: 4px;
    font-family: 'Nunito Sans';
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 700;
    font-style: normal;
    color: rgb(255, 255, 255);
    text-transform: none;
  }
`;
