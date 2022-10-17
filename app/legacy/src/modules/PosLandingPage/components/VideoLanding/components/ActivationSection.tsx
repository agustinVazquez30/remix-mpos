import { useCallback, useRef } from "react";
import { ActivationSectionContainer } from "./ActivationSection.styles";
import { StepItem } from "./StepItem";
import { useTranslation } from "react-i18next";

export const ActivationSection = () => {
  const { t } = useTranslation();
  const stepsRef = useRef([
    t("posLandingPage.videoLanding.steps.buy"),
    t("posLandingPage.videoLanding.steps.recieve"),
    t("posLandingPage.videoLanding.steps.insert"),
    t("posLandingPage.videoLanding.steps.ready"),
  ]);

  const handleOnDownload = useCallback(() => {
    // next: refactor to useAsync()
    window
      .fetch("hi")
      .then((res) => res.blob())
      .then((blob) => {
        const file = new Blob([blob], { type: "application/pdf" });
        const fileURL = window.URL.createObjectURL(file);
        const __unsafeLink = document.createElement("a");
        __unsafeLink.href = fileURL;
        __unsafeLink.download = "POS-manual-de-usuario.pdf";
        __unsafeLink.click();
      });
  }, []);

  return (
    <ActivationSectionContainer>
      <p className="activation__title">
        {t("posLandingPage.videoLanding.activationSection.title")}
      </p>
      <p className="activation__subtitle">
        {t("posLandingPage.videoLanding.activationSection.subtitle")}
      </p>
      {stepsRef.current.map((title, idx) => (
        <StepItem index={idx + 1} title={title} key={`${idx + 1}-${title}`} />
      ))}
      <button className="activation__button" onClick={handleOnDownload}>
        {t("posLandingPage.videoLanding.activationSection.download")}
      </button>
    </ActivationSectionContainer>
  );
};
