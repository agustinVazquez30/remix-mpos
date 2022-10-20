import { WhatsappButton } from "~/legacy/src/commons/components";
import { StepByStep } from "~/legacy/src/layouts";
import { BasicInformation } from "~/legacy/src/modules/BasicInformation/BasicInformation";

export default function Index() {
  return (
    <>
      <StepByStep
        form={<BasicInformation />}
        maxWidthForm="688px"
        floatButton={<WhatsappButton />}
      />
    </>
  );
}
