import { ROUTES, ROUTES_ALLOWED } from "~/legacy/src/constants";
import { AppContext } from "~/legacy/src/contexts/AppContext";
import { useContext } from "react";
import { useNavigate, useParams } from "@remix-run/react";

export const useAllowedNavigation = () => {
  return { navigate: () => {}, isAllowedNavigation: true };
};
