import styled from 'styled-components';

export const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  grid-template-areas: 'main-image left-side  right-side';
  column-gap: 2rem;
  margin-bottom: 5rem;

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    row-gap: 2rem;
    grid-template-areas:
      'main-image'
      'left-side'
      'right-side';
  }
`;

export const DetailsSides = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  row-gap: 2rem;
`;

export const TextSection = styled.div`
  background-color: #ecf3f9;
  border-radius: 12px;
  padding: 1rem 0 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    overflow: hidden;
  }

  & .message {
    margin: 0 1.8rem 1rem 0;
  }
`;

export const ContainerMposImage = styled.div`
  height: 125px;
  width: auto;
  align-self: flex-end;
  position: relative;
`;

export const DetailItems = styled.div`
  background-color: #ecf3f9;
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
