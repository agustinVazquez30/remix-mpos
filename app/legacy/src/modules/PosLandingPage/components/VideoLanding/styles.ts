import styled from 'styled-components';

export const VideoLandingContainer = styled.div`
  position: relative;
  min-height: 90vh;
  display: flex;
  justify-content: space-evenly;
  gap: 4rem;
  padding: 0 3rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 85%;
    min-width: 150px;
    max-width: 300px;
    width: 100%;
    background-color: ${({theme}) => theme.colors.primary[500]};
    transform: translateY(-3rem);

    ${({theme}) => theme.breakpointsMaxWidth.md} {
      display: none;
    }
  }

  .video-landing {
    &__video {
      transform: translateX(-3rem);

      &--media {
        border-radius: 1rem;
      }

      ${({theme}) => theme.breakpointsMaxWidth.xl} {
        transform: translateX(0);
      }
    }
  }

  ${({theme}) => theme.breakpointsMaxWidth.md} {
    padding: 0;
    flex-direction: column;
    align-items: center;
  }
`;

export const VideoContainer = styled.div<{width: number; height: number}>`
  position: relative;
  border-radius: 16px;
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  margin-top: 4rem;
  align-self: center;
`;

export const VideoOverlay = styled.div.attrs({
  'aria-label': 'video-landing-overlay',
})<{show: boolean}>`
  position: absolute;
  opacity: ${({show}) => (show ? '.6' : '0')};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 1rem;
  border: 2px solid ${({theme}) => theme.colors.gray['800']};
  background-color: ${({theme}) => theme.colors.gray['800']};
  transition: opacity 0.4s ease;
  z-index: 100;
  pointer-events: none;
`;
