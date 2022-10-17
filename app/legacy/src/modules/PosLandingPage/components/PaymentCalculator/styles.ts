import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: inherit;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  padding-bottom: 80px;

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    padding-bottom: 10px;
  }

  .title {
    color: ${({theme}) => theme.colors.gray[800]};
    text-align: center;
    width: 100%;
    margin-bottom: ${({theme}) => theme.spacing.xl};
    font-size: 32px;
    margin-right: 0;
    margin-left: 0;

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      font-size: 22px;
    }
  }

  .calculatorContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      flex-direction: column-reverse;
    }
  }

  .imgCalculator {
    max-width: 640px;
    max-height: 668px;
    margin-right: ${({theme}) => theme.spacing.sm};
    margin-bottom: auto;
    padding: 0;

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      width: auto;
      margin-left: ${({theme}) => theme.spacing.sm};
    }
  }

  .dataSection {
    margin-top: 0;
    margin-right: ${({theme}) => theme.spacing.sm};
    margin-bottom: ${({theme}) => theme.spacing.md};
    margin-left: ${({theme}) => theme.spacing.sm};
    width: 540px;

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      width: auto;
    }
  }

  .dataContainer {
    padding: 22px;
    border: 1px solid ${({theme}) => theme.colors.gray[400]};
    border-radius: ${({theme}) => theme.spacing.sm};

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      padding: ${({theme}) => theme.spacing.md};
    }
  }

  .titleSection {
    color: ${({theme}) => theme.colors.gray[800]};
    text-align: center;
    margin-bottom: ${({theme}) => theme.spacing.xl};
    font-size: 20px;

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      font-size: 16px;
    }
  }

  .rowData {
    display: flex;
    flex-direction: row;
    margin-bottom: ${({theme}) => theme.spacing.xl};

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      flex-direction: column;
    }
  }

  .valueContainer {
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    width: auto;
  }

  #IVAWrapper {
    max-width: 35%;
    width: 35%;
    margin-bottom: ${({theme}) => theme.spacing.sm};
    margin-left: ${({theme}) => theme.spacing.xl};

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      width: auto;
      max-width: 100%;
      margin-top: ${({theme}) => theme.spacing.sm};
      margin-left: ${({theme}) => theme.spacing.xl};
    }
  }

  .imgAdd {
    width: 18px;
    height: 18px;
    margin-right: ${({theme}) => theme.spacing.sm};
    margin-top: auto;
    margin-bottom: 24px;

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      margin-bottom: 14px;
    }
  }

  .inputWrapper {
    flex-grow: 1;
  }

  .locationLabel {
    color: ${({theme}) => theme.colors.gray[800]};
    font-weight: 600;
    margin-bottom: ${({theme}) => theme.spacing.xxs};
    margin-left: 0;

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      font-size: 14px;
    }
  }

  .infoReteICA {
    margin-top: 0;
    margin-bottom: ${({theme}) => theme.spacing.sm};
    margin-left: 0;
    color: ${({theme}) => theme.colors.gray[600]};
  }

  .rowOptions {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: ${({theme}) => theme.spacing.md};

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      flex-direction: column;
    }
  }

  #optionWrapper {
    max-width: 100% !important;
    width: 30%;
    margin-bottom: ${({theme}) => theme.spacing.sm};

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      width: 100%;
    }
  }

  #optionWrapper .css-1le28he-MuiInputBase-root {
    border-radius: 4px 0px 0px 4px;
    border-right: 0px;
    text-align: center;

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      border-radius: 4px;
      border-right: 1px solid gray;
    }
  }

  #subOptionWrapper {
    max-width: 100% !important;
    width: 70%;
    margin-bottom: ${({theme}) => theme.spacing.md};

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      width: 100%;
      max-width: 100%;
      margin-bottom: 0;
    }
  }

  #subOptionWrapper .css-1le28he-MuiInputBase-root {
    border-radius: 0px 4px 4px 0px;
    text-align: center;

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      border-radius: 4px;
    }
  }

  .commissionLabel {
    margin-left: 34px;
    color: ${({theme}) => theme.colors.gray[600]};
    font-weight: 500;
    margin-top: -15px;
    margin-bottom: 0;
  }

  .commissionValue {
    margin-left: 5px;
    color: ${({theme}) => theme.colors.gray[600]};
    font-weight: 200;
    font-size: 16px;
  }

  .beforeTaxesLabel {
    margin-left: 34px;
    color: ${({theme}) => theme.colors.gray[800]};
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0;
  }

  .beforeTaxesValue {
    margin-left: 5px;
    color: ${({theme}) => theme.colors.gray[800]};
    font-weight: 600;
    font-size: 18px;
  }

  .infoRowIVA {
    display: flex;
    flex-direction: row;
    margin-bottom: ${({theme}) => theme.spacing.md};
    align-items: center;
  }

  .infoRow {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .taxesTitle {
    font-weight: 700;
    font-size: 20px;
    margin-left: 0;
    margin-top: 15px;
    margin-bottom: 35px;
  }

  .infoLabel {
    margin-left: 0;
    color: ${({theme}) => theme.colors.gray[800]};
    font-weight: 500;
    margin-top: -15px;
  }

  .reteInfoLabel {
    color: ${({theme}) => theme.colors.gray[700]};
    font-weight: 500;
    margin-top: 0px;
    margin-bottom: 0;
    margin-left: 0;
  }

  .reteInfoValue {
    margin-left: 0px;
    margin-top: 11px;
    margin-bottom: 16px;
    color: ${({theme}) => theme.colors.gray[600]};
    font-weight: 200;
    font-size: 16px;
  }

  .lawTaxesLabel {
    margin-left: 0;
    color: ${({theme}) => theme.colors.gray[800]};
    font-weight: 700;
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 0;
  }

  .imgValue {
    width: 1rem;
    margin-right: 0.5rem;
  }

  .buttonsSection {
    display: flex;
    flex-direction: row;

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      flex-direction: column;
    }
  }

  .buttonCalculate {
    width: 50%;

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      width: 100%;
    }
  }

  .buttonOrder {
    width: 50%;
    margin-right: 15px;

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      width: 100%;
      margin: 0;
      margin-bottom: 10px;
    }
  }

  .buttonRecalculate {
    width: 50%;
    border: 1px solid ${({theme}) => theme.colors.gray[800]};
    background-color: #fff;
    margin-left: 15px;
    font-weight: 300;

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      width: 100%;
      margin: 0;
      margin-top: 14px;
    }
  }

  .alertSection {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: ${({theme}) => theme.corners.lg};
    border: 1px solid ${({theme}) => theme.colors.success[500]};
    background-color: ${({theme}) => theme.colors.success[300]};
    margin-top: 20px;
    margin-bottom: 30px;
    padding-left: 13px;
    padding-right: 13px;

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      flex-direction: column;
      justify-content: center;
      margin-bottom: 30px;
    }
  }

  .recieveLabel {
    color: ${({theme}) => theme.colors.success[400]};
    font-size: 15px;
    margin-right: 0;

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      text-align: center;
      margin-top: 0;
    }
  }

  .receiveContainer {
    display: flex;
    flex-direction: row;

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      margin-right: auto;
      margin-left: auto;
    }
  }

  .receiveValue {
    color: ${({theme}) => theme.colors.gray[800]};
    font-weight: 600;
    font-size: 18px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 0;
  }

  .receiveIcon {
    width: 17px;
    height: 17px;
    margin-right: ${({theme}) => theme.spacing.sm};
    margin-top: auto;
    margin-bottom: 18px;

    ${({theme}) => theme.breakpointsMaxWidth.lg} {
      margin-top: 15px;
      margin-bottom: -5;
    }
  }

  .imgFaq {
    width: 21px;
    height: 21px;
    margin-right: ${({theme}) => theme.spacing.xs};
    margin-bottom: 1px;
    margin-right: 10px;
  }
`;
