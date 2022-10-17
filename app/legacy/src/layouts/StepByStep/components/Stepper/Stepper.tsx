import { STEPS } from "../../constants";
import { Step } from "../Step/Step";
import { useShowZendesk } from "~/legacy/src/utils/zendesk";

type StepperType = {
  currentStep: string;
};

export const Stepper = ({ currentStep }: StepperType) => {
  const stepsKeys = Object.keys(STEPS);
  const stepsValues = Object.values(STEPS);
  const activeIndex = stepsValues.findIndex(
    (item) => currentStep === item.path
  );

  useShowZendesk();

  return (
    <div>
      {stepsKeys.map((key, index, array) => (
        <Step
          key={`${index}-${key}`}
          index={index}
          activeIndex={activeIndex}
          title={STEPS[key].title}
          isLast={array.length === index + 1}
          path={STEPS[key].path}
        />
      ))}
    </div>
  );
};
