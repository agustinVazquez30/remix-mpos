import styled from 'styled-components';

export const PlayButtonContainer = styled.div.attrs({
  'aria-label': 'video-landing-play-button',
})<{show: boolean}>`
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  border-radius: 100%;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 1000;
  opacity: ${({show}) => (show ? '1' : '0')};
  pointer-events: ${({show}) => (show ? 'inherit' : 'none')};
  transition: opacity 0.2s ease-out;
`;

export const PlayIcon = styled.div`
  width: 0;
  height: 0;
  border: 0.5rem solid ${({theme}) => theme.colors.secondary['700']};
  border-right-color: transparent;
  border-top-color: transparent;
  border-bottom-color: transparent;
  transform: translateX(0.25rem) scale(1, 0.7);
`;
