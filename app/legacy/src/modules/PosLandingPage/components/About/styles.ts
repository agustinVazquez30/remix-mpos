import styled from 'styled-components';

export const SectionDetails = styled.div`
  background-color: ${({theme}) => theme.colors.gray[100]};
  padding: 1rem 5rem 2rem 5rem;

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    padding: 1rem 1.5rem;
    background-color: inherit;
  }

  .title {
    text-align: center;
    margin-bottom: 3rem;

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      font-size: 1.5rem;
    }
  }

  .subtitle {
    text-align: center;
  }
`;

export const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'left-side data-phone right-side';
  column-gap: 2rem;

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    grid-template-columns: 1fr;
    grid-template-rows: 0.7fr 1fr 1fr;
    row-gap: 2rem;
    grid-template-areas:
      'data-phone'
      'left-side'
      'right-side';
  }
`;

export const DetailsSides = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  row-gap: 2rem;
`;

export const DetailItems = styled.div`
  background-color: #fff6d6;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem;
`;

export const DetailImage = styled.div`
  display: flex;
  justify-content: center;
`;

export const PosDetailImg = styled.img`
  width: 30rem;
  height: auto;

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    width: 19rem;
    height: auto;
  }
`;

export const BanksContainer = styled.div`
  .title {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
`;

export const BankList = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr, 10);
  grid-template-areas: '. . bancolombia davivienda nequi daviplata red-aval more . .';
  ${({theme}) => theme.breakpointsMaxWidth.md} {
    column-gap: 1rem;
    justify-content: center;
    grid-template-columns: repeat(1fr, 2);
    grid-template-areas:
      'bancolombia bancolombia'
      'davivienda davivienda'
      'nequi daviplata'
      'red-aval red-aval'
      'more more';
  }

  img,
  p {
    justify-self: center;
    align-self: center;
  }
`;
