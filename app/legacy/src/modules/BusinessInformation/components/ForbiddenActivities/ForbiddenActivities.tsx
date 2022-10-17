import { Button, Typography } from "@30sas/web-ui-kit-core";
import { CloseCircleIcon, TickCircleIcon } from "@30sas/web-ui-kit-icons";
import { ConfirmSection, Container, OptionsSection } from "./styles";
import React, { useState } from "react";
import { DEFAULT_FORBIDD_ACTIVITIES } from "~/legacy/src/modules/BusinessInformation/constants";
import { useTranslation } from "react-i18next";

export type ForbiddenActivitiesType = {
  items?: string[];
  LabelYesButton?: string;
  LabelNoButton?: string;
  onSelect?: (hasForbiddenActivities: boolean) => void;
};

export const ForbiddenActivities: React.FC<ForbiddenActivitiesType> = ({
  items,
  LabelYesButton,
  LabelNoButton,
  onSelect,
}): JSX.Element => {
  const [hasForbiddActivities, setHasForbiddActivities] =
    useState<boolean>(false);
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (onSelect) {
      onSelect(hasForbiddActivities);
    }
  };

  return (
    <Container>
      <Typography className="title" variant="XLargebold">
        {t("businessInformation.forbiddenActivities.title.first")}
      </Typography>
      <Typography className="title redTitle" variant="XLargebold">{` ${t(
        "businessInformation.forbiddenActivities.title.middle"
      )} `}</Typography>
      <Typography className="title" variant="XLargebold">
        {t("businessInformation.forbiddenActivities.title.last")}
      </Typography>
      <section>
        <ul>
          {(items || DEFAULT_FORBIDD_ACTIVITIES).map((item, index) => (
            <li key={`forbid-activity-item-${index}`}>
              <Typography className="item" variant="Small">
                {items ? item : t(item as any)}
              </Typography>
            </li>
          ))}
        </ul>
      </section>
      <OptionsSection>
        <button
          className={!hasForbiddActivities ? "buttonActive" : ""}
          onClick={() => setHasForbiddActivities(false)}
        >
          {!hasForbiddActivities && (
            <div className="selectedIconContainer">
              <TickCircleIcon
                data-testid="iconOnNoButton"
                className="selectedIcon"
              />
            </div>
          )}
          <TickCircleIcon className="buttonIconSuccess" />
          <Typography className="buttonLabel" variant="Smallbold">
            {LabelNoButton ?? t("businessInformation.forbiddenActivities.no")}
          </Typography>
        </button>
        <button
          className={hasForbiddActivities ? "buttonActive" : ""}
          onClick={() => setHasForbiddActivities(true)}
        >
          {hasForbiddActivities && (
            <div className="selectedIconContainer">
              <TickCircleIcon
                data-testid="iconOnYesButton"
                className="selectedIcon"
              />
            </div>
          )}
          <CloseCircleIcon className="buttonIconFailure" />
          <Typography className="buttonLabel" variant="Smallbold">
            {LabelYesButton ?? t("businessInformation.forbiddenActivities.yes")}
          </Typography>
        </button>
      </OptionsSection>
      <ConfirmSection>
        <Button
          className="confirmButton"
          color="success"
          colorType="600"
          hoverColor="success"
          hoverColorType="500"
          label={t("commons.confirm")}
          upper={false}
          rounded="xl"
          size="medium"
          textColor="neutrals"
          textColorType="100"
          textVariant="Mediumbold"
          variant="primary"
          onClick={handleSubmit}
        />
      </ConfirmSection>
    </Container>
  );
};
