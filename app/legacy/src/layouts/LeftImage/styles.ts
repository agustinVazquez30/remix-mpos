import styled from 'styled-components';

export const Container = styled.div<{
  showNewImage: boolean;
}>`
  display: flex;
  height: 100vh;
  width: 100vw;

  & .left-container {
    flex: 1;
    background-color: ${({theme}) => theme.colors.primary[100]};
    height: 100vh;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 40px;

    ${({theme}) => theme.breakpointsMinWidth.md} {
      display: flex;
    }

    .container-image {
      position: relative;
      height: 100%;

      .imageMessage {
        color: ${({theme}) => theme.colors.neutrals[100]};

        ${({showNewImage, theme}) =>
          showNewImage
            ? `
        font-size: ${theme.fonts['nunito'].xxlargebold};
        margin: ${theme.spacing.xl} 0 ${theme.spacing.xxl};
        max-width: 70%;`
            : `
        position: absolute;
        top: ${theme.spacing.xxxl};
        left: ${theme.spacing.xxl};
        max-width: 45%;
        `}

        .important-text {
          color: ${({theme}) => theme.colors.primary[500]};
        }
      }

      img {
        height: 100%;
        width: 100%;

        ${({showNewImage}) =>
          showNewImage
            ? `
        object-fit: cover;
        object-position: right center;
        border-radius: 15px;
        `
            : `
        max-height: 600px;
        max-width: 640px;
        `}
      }
    }
  }

  & .right-container {
    position: relative;
    flex: 1;
    background-color: ${({theme}) => theme.colors.neutrals[100]};
    display: flex;
    justify-content: center;
    overflow-y: auto;

    .content {
      height: fit-content;
      width: 100%;
      padding: 16px 16px 120px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .float-button {
      position: fixed;
      bottom: 16px;
      right: 16px;
      height: min-content;

      ${({theme}) => theme.breakpointsMaxWidth.sm} {
        top: 40px;
        position: absolute;
      }

      button {
        span {
          margin: 0;
        }
        path {
          fill: ${({theme}) => theme.colors.success[500]};
        }
      }
    }
  }
`;

export const DetailsContainer = styled.div`
  position: absolute;
  top: ${({theme}) => theme.spacing.xxxl};
  left: ${({theme}) => theme.spacing.xxl};
  height: 90%;
  width: 100%;
`;

export const Details = styled.div`
  display: grid;
  grid-template-columns: 52px 6fr 4fr;
  grid-template-rows: 52px;
  column-gap: 0.5rem;
  align-items: center;
  margin-bottom: ${({theme}) => theme.spacing.xl};
  margin-left: ${({theme}) => theme.spacing.sm};

  p {
    font-weight: 300;
    font-size: ${({theme}) => theme.spacing.md};
    color: ${({theme}) => theme.colors.neutrals[100]};
  }

  .important-text {
    font-weight: 700;
    color: ${({theme}) => theme.colors.primary[500]};
  }

  img {
    border-radius: 10px;
  }
`;
