import { Box } from "./styles";
import EmailIcon from "~/legacy/src/assets/email.png";
import MapIcon from "~/legacy/src/assets/map.png";
import { Typography } from "@30sas/web-ui-kit-core";

type StoreInfoType = {
  storeName: string;
  storeAddress: string;
  storeEmail: string;
};

export const StoreInfo = ({
  storeName,
  storeAddress,
  storeEmail,
}: StoreInfoType) => (
  <Box>
    <Typography variant="XLargebold" className="title">
      {storeName}
    </Typography>
    <div className="label-with-icon">
      <img loading="lazy" src={MapIcon} alt="map" className="map-icon" />
      <Typography variant="Large" className="sub-title">
        {storeAddress}
      </Typography>
    </div>
    <div className="label-with-icon">
      <img loading="lazy" src={EmailIcon} alt="email" className="email-icon" />
      <Typography variant="Large" className="sub-title">
        {storeEmail}
      </Typography>
    </div>
  </Box>
);
