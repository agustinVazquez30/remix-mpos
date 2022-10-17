import {Button, Typography} from '@30sas/web-ui-kit-core';
import styled from 'styled-components';

export const FAQSection = styled.div`
  display: flex;
  background-color: #f3fcf7;
  padding: 4em 0;

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    padding: 2rem 0;
  }
`;

export const AccordionContainer = styled.div`
  padding: 0 14rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    padding: 0 1rem;
  }

  p {
    margin: 1rem 0;
  }

  .moreFaq {
    border: 2px solid gray;
    width: 24rem;
    margin-top: 2rem;
  }
`;

export const FaqTitle = styled(Typography)`
  text-align: center;
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    font-size: 1.5rem;
  }
`;

export const FaqAnswer = styled(Typography)`
  white-space: break-spaces;
`;

export const MoreFaqButton = styled(Button)``;
