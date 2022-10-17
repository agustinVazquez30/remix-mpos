import styled from 'styled-components';

interface WarningCustomContainerProps {
  bgColor?: string;
}

export const WarningCustomContainer = styled.div<WarningCustomContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.25rem 0.5rem;
  border-radius: 4px;

  background-color: ${({bgColor, theme}) =>
    bgColor ?? theme.colors.warning[500]};

  .warning {
    &__text {
      font-family: 'Nunito Sans';
      font-size: 0.75rem;
      line-height: 1rem;
      font-weight: 700;
      font-style: normal;
    }
  }
`;
