import { Outlet } from "react-router-dom";
import { useSetHunterContext } from "~/legacy/src/hooks/useSetHunterContext";

export function HomeParentRouter() {
  useSetHunterContext(false);
  return <Outlet />;
}
