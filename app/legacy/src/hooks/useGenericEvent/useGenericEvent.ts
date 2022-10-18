import { Event, GenerateEvent, Platforms } from "./types";
import {
  newAmplitudeEvent,
  updateUserIfNeeded,
} from "~/legacy/src/config/Amplitude";
import { getBasicInfoProperties } from "~/legacy/src/utils/getEventProperties";
import { useAppContext } from "~/legacy/src/contexts/AppContext";

const DEFAULT_PLATFORMS: Platforms = {
  amplitude: true,
  braze: true,
};

export const useGenericEvent = () => {
  const {
    isLogged,
    basicInformation,
    utmParameters,
    temporalCredentials,
    hunter,
    isHunters,
  } = useAppContext();

  return <EventArgs>({
    eventName,
    eventArgs,
    customBasicInfo,
    isFreshData,
    platforms = DEFAULT_PLATFORMS,
    setDefaultArgs = true,
  }: GenerateEvent<EventArgs>) => {
    console.log("MOCK EVENT");
    // const userBasicInfo = getBasicInfoProperties({
    //   ...basicInformation,
    //   userId: isLogged ? basicInformation.userId : temporalCredentials.userId,
    //   ...(customBasicInfo ? customBasicInfo : {}),
    // });

    // const event: Event<EventArgs> = [
    //   eventName,
    //   {
    //     ...(setDefaultArgs
    //       ? {
    //           ...userBasicInfo,
    //           utmParameters,
    //         }
    //       : {}),
    //     ...(hunter.id || isHunters ? { isHunters: true } : { isOrganic: true }),
    //     ...(eventArgs || {}),
    //   },
    // ];

    // if (platforms.amplitude) {
    //   updateUserIfNeeded(userBasicInfo.userId);
    //   newAmplitudeEvent(...event);
    // }
    // if (platforms.braze) {
    //   if (isFreshData) {
    //     updateUserBasicInformation(userBasicInfo);
    //   }
    //   newBrazeEvent(...event);
    // }
  };
};
