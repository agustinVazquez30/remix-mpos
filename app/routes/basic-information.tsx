import { useAppContext } from "~/legacy/src/contexts/AppContext";

export default function Index() {
  const { purchaseSummary } = useAppContext();
  return (
    <>
      Info del paso anterior: <br />
      {purchaseSummary.mposQuantity} x {purchaseSummary.mposValue} <br />
      total: {purchaseSummary.total}
    </>
  );
}
