import {
  ArrowContainer,
  Popover,
  PopoverAlign,
  PopoverPosition,
} from 'react-tiny-popover';
import {FC, ReactNode} from 'react';
import {Typography} from '@30sas/web-ui-kit-core';

export interface popoverIconProps {
  align?: PopoverAlign;
  arrowColor: string;
  textColor: string;
  isOpen: boolean;
  nodeEl?: ReactNode;
  nodeClassNameContainer: string;
  popoverText?: string;
  positions: PopoverPosition[];
  popoverStyle: Record<string, string>;
  SetIsOpen: () => void;
  onClickOutside: () => void;
}
export const PopoverContainer: FC<popoverIconProps> = ({
  align,
  arrowColor,
  textColor,
  isOpen,
  nodeEl,
  nodeClassNameContainer,
  popoverText,
  positions,
  popoverStyle,
  SetIsOpen,
  onClickOutside,
}) => {
  return (
    <Popover
      isOpen={isOpen}
      positions={positions}
      onClickOutside={onClickOutside}
      align={align}
      content={({position, childRect, popoverRect}) => (
        <ArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
          arrowColor={arrowColor}
          arrowSize={10}
          arrowStyle={{opacity: 1}}>
          <div style={popoverStyle}>
            <Typography
              dataTestId="info-popover"
              style={{color: textColor}}
              variant="Small">
              {popoverText}
            </Typography>
          </div>
        </ArrowContainer>
      )}>
      <div className={nodeClassNameContainer} onClick={SetIsOpen}>
        {nodeEl}
      </div>
    </Popover>
  );
};
