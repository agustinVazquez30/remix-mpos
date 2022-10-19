import { FC } from "react";

interface Icons {
  DocumentTickIcon: FC<React.SVGProps<SVGSVGElement>>;
  BankIcon: FC<React.SVGProps<SVGSVGElement>>;
  MapIcon: FC<React.SVGProps<SVGSVGElement>>;
  UserInfoIcon: FC<React.SVGProps<SVGSVGElement>>;
}

export type IconType =
  | "DocumentTickIcon"
  | "BankIcon"
  | "MapIcon"
  | "UserInfoIcon";

export const Icon = ({
  name,
  className,
  height,
  width,
  testId,
}: {
  name: IconType;
  className?: string;
  height?: number;
  width?: number;
  testId?: string;
}) => {
  return <></>;
};
