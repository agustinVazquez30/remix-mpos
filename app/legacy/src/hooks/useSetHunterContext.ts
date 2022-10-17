import { AppContext, defaultAppState } from "~/legacy/src/contexts/AppContext";
import { useContext, useEffect } from "react";

export function useSetHunterContext(isHunterRoute = true) {
  const { setIsHunters, setHuntersData } = useContext(AppContext);
  useEffect(() => {
    if (isHunterRoute) {
      setIsHunters(true);
    } else {
      setHuntersData(defaultAppState.hunter);
      setIsHunters(defaultAppState.isHunters);
    }
  }, [isHunterRoute, setHuntersData, setIsHunters]);
}
