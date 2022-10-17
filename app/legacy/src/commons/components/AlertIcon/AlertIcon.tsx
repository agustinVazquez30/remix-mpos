import { Circle } from "./styles";
import Warning from "~/legacy/src/assets/exclamation-warning.png";

interface AlertIconProps {
  altText: string;
}

export const AlertIcon: React.FC<AlertIconProps> = ({ altText }) => {
  return (
    <Circle>
      <img loading="lazy" src={Warning} alt={altText} />
    </Circle>
  );
};
