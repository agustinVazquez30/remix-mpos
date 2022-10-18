import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { LeftImage } from "~/legacy/src/layouts";
import { PurchaseSummaryLoad } from "~/legacy/src/modules";
import { WhatsappButton } from "~/legacy/src/commons/components";
import YourMPOS from "~/legacy/src/assets/your-mpos.png";
import YourNewMPOS from "~/legacy/src/assets/mpos-background.png";
import { useAppContext } from "~/legacy/src/contexts/AppContext";
import { useEffect } from "react";

export const PurchaseOrder = ({ data }: any) => {
  const { splitIOKeyValue, setSplitIOKeyValue } = useAppContext();

  const { State: isActivationPOSValuesSummary, loading: isLoadingSplit } =
    useSplitIO(SplitIOTreatmentNames.ActivationPOSValuesSummary);

  const showNewImage =
    splitIOKeyValue[SplitIOTreatmentNames.ActivationPOSValuesSummary];

  const imageToUse =
    showNewImage || showNewImage === undefined ? YourNewMPOS : YourMPOS;

  useEffect(() => {
    if (!isLoadingSplit && showNewImage === undefined) {
      setSplitIOKeyValue({
        [SplitIOTreatmentNames.ActivationPOSValuesSummary]:
          isActivationPOSValuesSummary,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingSplit]);

  return (
    <LeftImage
      image={imageToUse}
      form={<PurchaseSummaryLoad data={data} />}
      floatButton={<WhatsappButton />}
    />
  );
};
