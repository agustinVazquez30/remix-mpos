import { BuyButton, BuyButtonVariants } from "~/legacy/src/commons/BuyButton";
import { Container, Nav } from "./styles";
import { SplitIOTreatmentNames, useSplitIO } from "~/legacy/src/config/SplitIo";
import { Button } from "@30sas/web-ui-kit-core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ROUTES } from "~/legacy/src/constants";
import TreintaLogo from "~/legacy/src/assets/treinta.png";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useScrollTo } from "~/legacy/src/hooks/useScrollTo";
import { useTranslation } from "react-i18next";

const IconUser = () => <></>;

export const Header = () => {
  const { t } = useTranslation();
  const scrollTo = useScrollTo(100);
  const navigate = useNavigate();
  const { State: showBuyButton, loading } = useSplitIO(
    SplitIOTreatmentNames.ActivationBuyInHeader
  );
  const { State: showVideoLanding } = useSplitIO(
    SplitIOTreatmentNames.ActivationVideoLanding
  );

  const navs = useMemo(() => {
    const defaultNavs = [
      {
        label: t("header.uniqueDataphone"),
        route: t("anchorTags.aboutAnchor"),
      },
      {
        label: t("header.calcaulateFirstSale"),
        route: t("anchorTags.calculatorAnchor"),
      },
      { label: t("header.anyProblem"), route: t("anchorTags.supportAnchor") },
    ];
    if (showVideoLanding) {
      defaultNavs.push({
        label: t("header.activation"),
        route: t("anchorTags.activation"),
      });
    }
    return defaultNavs;
  }, [t, showVideoLanding]);

  return (
    <Container>
      <LazyLoadImage
        loading="lazy"
        src={TreintaLogo}
        alt="Treinta"
        className="logo"
      />
      {navs.map(({ label, route }, idx) => (
        <Nav
          tabIndex={idx + 1}
          key={label}
          onClick={() => {
            scrollTo(route);
          }}
        >
          {label}
        </Nav>
      ))}
      <div className="right">
        {!loading &&
          (showBuyButton ? (
            <BuyButton variant={BuyButtonVariants.header} />
          ) : (
            <>
              <a
                href="https://play.google.com/store/apps/details?id=com.treintaapp"
                target="_blank"
                rel="noreferrer"
              >
                gplay
              </a>
              <Button
                StartIcon={IconUser}
                label={t("header.signIn")}
                size="medium"
                textVariant="Smallbold"
                onClick={() => navigate(ROUTES.LOGIN)}
                dataTestId="signin-button"
              />
            </>
          ))}
      </div>
    </Container>
  );
};
