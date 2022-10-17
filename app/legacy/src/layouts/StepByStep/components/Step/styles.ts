import styled from 'styled-components';

export const Container = styled.div<{
  isActive: boolean;
  isCompleted: boolean;
  isFinished: boolean;
}>`
  & .step {
    display: flex;
    flex-direction: row;
    align-items: center;

    & .step-circle {
      display: flex;
      width: 40px;
      min-width: 40px;
      height: 40px;
      justify-content: center;
      align-items: center;
      margin-right: 16px;
      border-radius: 100%;
      border-width: 2px;
      border-style: solid;
      padding: 2px;
      border-color: ${({theme, isActive}) =>
        isActive ? theme.colors.primary[500] : 'transparent'};
      background-color: ${({theme, isActive}) =>
        isActive ? theme.colors.neutrals[100] : 'transparent'};

      & .inner-circle {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        background-color: ${({theme, isActive, isCompleted}) => {
          if (isActive) {
            return theme.colors.primary[500];
          } else if (isCompleted) {
            return theme.colors.primary[300];
          } else {
            return theme.colors.primary[200];
          }
        }};

        img {
          width: 18px;
          height: 18px;
        }

        & .circle-text {
          color: ${({theme, isActive}) =>
            isActive ? theme.colors.primary[900] : theme.colors.primary[700]};
        }
      }
    }

    & .step-title {
      color: ${({theme, isActive, isCompleted}) =>
        isActive || isCompleted
          ? theme.colors.secondary[700]
          : theme.colors.gray[600]};
    }
  }

  & .separator {
    display: flex;
    justify-content: center;
    padding-top: 8px;
    padding-bottom: 8px;
    width: 40px;

    & .separator-line {
      width: 2px;
      height: 24px;
      background-color: ${({theme, isCompleted}) =>
        isCompleted ? theme.colors.primary[500] : theme.colors.primary[300]};
    }
  }

  cursor: ${({isCompleted, isFinished}) =>
    isCompleted && isFinished ? 'pointer' : 'default'};
`;
