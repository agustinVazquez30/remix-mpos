import styled from 'styled-components';

export const Container = styled.div<{
  showExpeditionDate: boolean;
  show: boolean;
}>`
  height: fit-content;
  display: ${({show}) => (show ? 'grid' : 'none')};
  grid-template-areas:
    'input'
    'expedition';
  grid-template-columns: 1fr;

  & .document {
    &__input {
      grid-area: input;
    }
    &__expedition-date {
      grid-area: expedition;
    }

    &__expedition-date,
    &__input {
      max-width: initial !important;
    }
  }

  ${({theme}) => theme.breakpointsMinWidth.sm} {
    grid-template-areas: ${({showExpeditionDate}) =>
      `'${showExpeditionDate ? 'input expedition' : 'input input'}'`};
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 1rem;

    & .document {
      &__input {
        min-width: ${({showExpeditionDate}) =>
          showExpeditionDate ? 'initial' : '100%'};
      }
    }
  }
`;
