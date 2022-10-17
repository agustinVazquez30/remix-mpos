import {WarningCustomContainer} from './styles';

interface WarningCustomProps {
  label: string;
  bgColor?: string;
  className?: string;
}

export const WarningCustom: React.FC<WarningCustomProps> = ({
  bgColor,
  label,
  className = '',
}) => {
  return (
    <WarningCustomContainer className={className} bgColor={bgColor}>
      <p className="warning__text">{label}</p>
    </WarningCustomContainer>
  );
};
