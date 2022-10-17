import styled from 'styled-components';

export const SectionApp = styled.div`
  background-color: ${({theme}) => theme.colors.info[100]};
  padding: 1em 5em 2em 5em;
  display: grid;
  grid-template-columns: repeat(1fr, 2);
  grid-template-areas: 'description image';

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    background-color: inherit;
    text-align: center;
    padding: 1rem 1.5rem;
    grid-template-columns: 1fr;
    grid-template-areas:
      'image'
      'description';
  }

  .title {
    margin: 1rem 0;
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      font-size: 24px;
    }
  }

  .link {
    display: flex;
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      text-align: center;
      justify-content: center;
    }
    margin: 0;
  }

  .desc {
    margin: 0;
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      padding: 0 1.5rem;
    }
  }

  .data-phone-button {
    width: 13rem;
    ${({theme}) => theme.breakpointsMaxWidth.md} {
      width: 100%;
    }
  }
`;

export const MposBalanceImage = styled.img`
  max-width: 650px;
  max-height: 543px;

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    width: 20rem;
  }
`;
