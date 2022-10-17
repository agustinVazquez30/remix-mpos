import { Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "~/legacy/src/constants";
import { Spinner } from "~/legacy/src/commons/components";
import { useHunterValidation } from "~/legacy/src/hooks/useHunterValidation";
import { useSetHunterContext } from "~/legacy/src/hooks/useSetHunterContext";

export interface HunterOutletContext {
  isLogged: boolean;
}

export function HunterParentRouter() {
  const { pathname } = useLocation();
  const { status, isLogged } = useHunterValidation(
    pathname !== `/${ROUTES.HUNTERS}`
  );

  useSetHunterContext();

  if (status === "pending") return <Spinner fullScreen={true} />;

  return isLogged ? <Outlet /> : null;
}
