import { Discarded } from "~/legacy/src/commons/components";
import { Information } from "~/legacy/src/layouts";
import React from "react";

export const DiscardedPage: React.FC = (): JSX.Element => {
  return (
    <Information>
      <Discarded />
    </Information>
  );
};
