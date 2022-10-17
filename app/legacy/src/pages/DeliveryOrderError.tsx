import { DeliveryOrderError } from "~/legacy/src/modules/DeliveryOrderError";
import { Information } from "~/legacy/src/layouts";
import React from "react";

export const DeliveryOrderErrorPage: React.FC = (): JSX.Element => {
  return (
    <Information>
      <DeliveryOrderError />
    </Information>
  );
};
