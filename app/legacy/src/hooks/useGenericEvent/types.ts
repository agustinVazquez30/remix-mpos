import {
  BasicInformationState,
  UtmParameters,
} from "~/legacy/src/contexts/AppContext";
import { GenericEvent } from "./models";
import { GetEventProperties } from "~/legacy/src/utils/getEventProperties";

export type Platforms = {
  amplitude?: boolean;
  braze?: boolean;
};

type DefaultArgs = GetEventProperties & {
  utmParameters?: UtmParameters;
};

export type Event<EventArgs> = [
  GenericEvent,
  (DefaultArgs & EventArgs) | Record<string, unknown>
];

export type GenerateEvent<ArgsType> = {
  eventArgs?: ArgsType;
  isFreshData?: boolean;
  platforms?: Platforms;
  eventName: GenericEvent;
  setDefaultArgs?: boolean;
  customBasicInfo?: Partial<BasicInformationState>;
};
