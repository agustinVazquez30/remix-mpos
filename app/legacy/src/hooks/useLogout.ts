import { getAuth, signOut } from "@firebase/auth";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "~/legacy/src/contexts/AppContext";
import { removeHeaders } from "~/legacy/src/config/Api";

export const useLogout = () => {
  const { logOut, isLogged } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const onLogout = async () => {
    if (isLogged) {
      setIsLoading(true);

      await removeHeaders();
      await signOut(auth);
      logOut();

      setIsLoading(false);
    }
  };

  useEffect(() => {
    onLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
  };
};
