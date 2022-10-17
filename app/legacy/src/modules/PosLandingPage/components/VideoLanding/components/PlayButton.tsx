import * as React from 'react';
import {PlayButtonContainer, PlayIcon} from './PlayButton.styles';

interface PlayButtonProps {
  onPlay: () => void;
  show: boolean;
}

export const PlayButton: React.FC<PlayButtonProps> = ({onPlay, show}) => {
  return (
    <PlayButtonContainer onClick={onPlay} show={show}>
      <PlayIcon />
    </PlayButtonContainer>
  );
};
