import { Button, Calendar, Popup, Typography } from "@30sas/web-ui-kit-core";
import CalendarIcon from "~/legacy/src/assets/calendar.png";
import { PopupContent } from "./styles";
import { SelectionDateModalProps } from "./models";
import { getUTCNow } from "~/legacy/src/utils/dates";
import { isHoliday } from "~/legacy/src/commons/holidays";
import { useState } from "react";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "~/legacy/src/hooks";

const SUNDAY = 0;
const FINAL_WORKDAY_HOUR = 22;

const getMinDate = (): Date => {
  const utcNow = getUTCNow();
  const increment = utcNow.getHours() >= FINAL_WORKDAY_HOUR ? 2 : 1;

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + increment);
  minDate.setHours(0, 0, 1, 0);

  while (true) {
    if (shouldDisableDay(minDate)) {
      minDate.setDate(minDate.getDate() + 1);
    } else {
      break;
    }
  }
  return minDate;
};

const shouldDisableDay = (date: Date): boolean => {
  return date.getDay() === SUNDAY || isHoliday(date);
};

export const SelectionDateModal = ({
  show,
  onClose,
  onSaveDate,
}: SelectionDateModalProps) => {
  const { t } = useTranslation();
  const { breakpointsUnits } = useTheme();
  const windowSize = useWindowSize();

  const [deliveryDate, setDeliveryDate] = useState<string>(
    getMinDate().toISOString()
  );

  const handleChangeDate = (value: any) => {
    const date = value as Date;
    setDeliveryDate(date.toISOString());
  };

  return (
    <Popup
      open={show}
      onClose={() => onClose()}
      padding="16px"
      width={windowSize.width > breakpointsUnits.sm ? 448 : "92%"}
    >
      <PopupContent>
        <img
          loading="lazy"
          src={CalendarIcon}
          alt={t("depositData.dateModal.altIcon")}
          className="calendar-icon"
        />
        <Typography className="title" variant="XLargebold" margin="0">
          {t("depositData.dateModal.title")}
        </Typography>
        <div className="padding">
          <Typography variant="Medium" margin="0">
            {t("depositData.dateModal.description")}
          </Typography>
          <div className="calendar">
            <Calendar
              locale="es"
              dataTestId="calendar-id"
              openTo="day"
              views={["year", "month", "day"]}
              label={t("depositData.dateModal.label")}
              onChange={handleChangeDate}
              value={new Date(deliveryDate)}
              formatDate="dd/MM/yyyy"
              disabled={false}
              minDate={getMinDate()}
              shouldDisableDate={shouldDisableDay}
            />
          </div>
          <Button
            label={t("depositData.dateModal.buttonSave")}
            size="medium"
            upper={false}
            color="success"
            colorType="600"
            hoverColor="success"
            hoverColorType="500"
            textColor="neutrals"
            textColorType="100"
            textVariant="Mediumbold"
            variant="primary"
            disabled={!deliveryDate?.length}
            onClick={() => {
              onSaveDate(deliveryDate);
              onClose();
            }}
            fullWidth={true}
          />

          <Button
            label={t("depositData.dateModal.buttonSkip")}
            size="medium"
            upper={false}
            color="neutrals"
            colorType="100"
            hoverColor="secondary"
            hoverColorType="100"
            textColor="secondary"
            textColorType="700"
            textVariant="Mediumbold"
            borderColor="secondary"
            borderColorType="700"
            variant="secondary"
            disabled={!deliveryDate?.length}
            onClick={() => {
              onSaveDate(null);
              onClose();
            }}
            fullWidth={true}
          />
        </div>
      </PopupContent>
    </Popup>
  );
};
