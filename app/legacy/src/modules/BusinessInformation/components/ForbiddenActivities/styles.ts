import styled from 'styled-components';

export const Container = styled.div`
  flex-direction: column;
  padding: 15px 12px 12px 12px;
  background-color: ${({theme}) => theme.colors.neutrals[100]};
  overflow-y: auto;
  height: auto;
  max-height: 90vh;

  .title {
    text-align: start;
    margin: 0px 0px 8px 0px;
    display: inline;
  }

  .redTitle {
    color: ${({theme}) => theme.colors.danger[500]};
    margin: 0;
    display: inline;
  }

  .item {
    line-height: 20px;
    color: ${({theme}) => theme.colors.gray[800]};
    margin: 0;
    font-style: normal;
    font-weight: 400;
  }

  ul {
    margin-top: ${({theme}) => theme.spacing.sm};
  }

  li {
    line-height: 20px;
    cursor: default;
    margin-left: 23px;
  }
`;

export const OptionsSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: ${({theme}) => theme.spacing.lg};
  width: 100%;
  padding: 0;

  button {
    border-radius: ${({theme}) => theme.corners.lg};
    border: 0.5px solid ${({theme}) => theme.colors.gray[500]};
    height: 104px;
    padding-bottom: 10px;
    padding-right: 0px;
    margin-bottom: ${({theme}) => theme.spacing.sm};
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    background-color: ${({theme}) => theme.colors.neutrals[100]};

    ${({theme}) => theme.breakpointsMinWidth.sm} {
      margin-left: ${({theme}) => theme.spacing.sm};
      margin-right: ${({theme}) => theme.spacing.sm};
    }

    .buttonIconSuccess {
      width: 29.33px;
      height: 29.33px;
      margin-bottom: ${({theme}) => theme.spacing.xs};
      fill: ${({theme}) => theme.colors.success[600]};
    }

    .buttonIconFailure {
      width: 29.33px;
      height: 29.33px;
      margin-bottom: ${({theme}) => theme.spacing.xs};
      fill: ${({theme}) => theme.colors.danger[500]};
    }

    .buttonLabel {
      margin: 0;
      font-size: 14px;
      color: ${({theme}) => theme.colors.gray[700]};
    }

    .selectedIconContainer {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-content: center;
      top: -2px;
      right: -2px;
      background-color: ${({theme}) => theme.colors.success[600]};
      width: ${({theme}) => theme.spacing.xl};
      height: ${({theme}) => theme.spacing.xl};
      border-radius: 0px ${({theme}) => theme.corners.md} 0px
        ${({theme}) => theme.corners.lg};
      margin: 0px;
      border: 0.13rem solid ${({theme}) => theme.colors.success[400]};
    }

    .selectedIcon {
      fill: ${({theme}) => theme.colors.neutrals[100]};
      width: 15px;
      height: 15px;
    }
  }

  .buttonActive {
    border: 0.13rem solid ${({theme}) => theme.colors.success[400]};
  }

  ${({theme}) => theme.breakpointsMinWidth.sm} {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;

    button {
      width: 50%;
    }
  }
`;

export const ConfirmSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: ${({theme}) => theme.spacing.md};

  .confirmButton {
    width: 100%;

    ${({theme}) => theme.breakpointsMinWidth.sm} {
      width: 208px;
    }
  }
`;
