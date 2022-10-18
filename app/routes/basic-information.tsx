import { useAppContext } from "~/legacy/src/contexts/AppContext";

export default function Index() {
  const { purchaseSummary } = useAppContext();
  return <>basic-information.tsx</>;
}
