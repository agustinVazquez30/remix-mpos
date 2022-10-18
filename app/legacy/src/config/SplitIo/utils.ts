import { useEffect, useState } from "react";

import { SplitIOSingleton } from "./splitIo";
import { SplitIOTreatmentOptions } from "./models";
import { getUUID } from "~/legacy/src/utils/generators";

export const useSplitIO = (
  Name: SplitIOTreatmentOptions,
  userId?: string
): Record<string, boolean> => {
  const [State, setState] = useState(false);
  const [loading, setLoading] = useState(true);
  const userID = userId || getUUID();

  useEffect(() => {
    const splitIOInstance = SplitIOSingleton.getInstance();
    const factory = splitIOInstance.initFactory(userID);
    const client: SplitIO.IClient = factory.client();

    client.on(client.Event.SDK_READY, () => {
      const treatment: SplitIO.Treatment = client.getTreatment(Name, {
        userID,
      });

      const treatmentState: Record<string, boolean> = {
        on: true,
        off: false,
        control: false,
      };

      setState(treatmentState[treatment]);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { State, loading };
};
