import * as React from "react";
import { Route, Routes as Router } from "react-router-dom";

import { ROUTES } from "~/legacy/src/constants";

const HomeParentRouter = React.lazy(() =>
  import("./HomeParentRouter").then(({ HomeParentRouter }) => ({
    default: HomeParentRouter,
  }))
);

const HunterParentRouter = React.lazy(() =>
  import("./HunterParentRouter").then(({ HunterParentRouter }) => ({
    default: HunterParentRouter,
  }))
);

const HunterLogin = React.lazy(() =>
  import("../pages/HunterLogin" /* webpackChunkName: "hunter-login" */).then(
    ({ HunterLoginPage }) => ({
      default: HunterLoginPage,
    })
  )
);

const PurchaseOrder = React.lazy(() =>
  import(
    "../pages/PurchaseOrder" /* webpackChunkName: "purchase-order" */
  ).then(({ PurchaseOrder }) => ({
    default: PurchaseOrder,
  }))
);

const Login = React.lazy(() =>
  import("../pages/Login" /* webpackChunkName: "login" */).then(
    ({ Login }) => ({
      default: Login,
    })
  )
);
const PosLandingPage = React.lazy(() =>
  import("../pages/PosLandingPage" /* webpackChunkName: "pos-landing" */).then(
    ({ PosLadingPage }) => ({
      default: PosLadingPage,
    })
  )
);
const BasicInformation = React.lazy(() =>
  import(
    "../pages/BasicInformation" /* webpackChunkName: "basic-information" */
  ).then(({ BasicInformation }) => ({
    default: BasicInformation,
  }))
);
const BusinessInformation = React.lazy(() =>
  import(
    "../pages/BusinessInformation" /* webpackChunkName: "business-information" */
  ).then(({ BusinessInformation }) => ({
    default: BusinessInformation,
  }))
);
const DeliveryOrderError = React.lazy(() =>
  import(
    "../pages/DeliveryOrderError" /* webpackChunkName: "delivery-order-error" */
  ).then(({ DeliveryOrderErrorPage }) => ({
    default: DeliveryOrderErrorPage,
  }))
);

const DepositData = React.lazy(() =>
  import("../pages/DepositData" /* webpackChunkName: "deposit-data" */).then(
    ({ DepositData }) => ({
      default: DepositData,
    })
  )
);
const ErrorVerifying = React.lazy(() =>
  import(
    "../pages/ErrorVerifying" /* webpackChunkName: "error-verifying" */
  ).then(({ ErrorVerifyingPage }) => ({
    default: ErrorVerifyingPage,
  }))
);

const Discarded = React.lazy(() =>
  import("../pages/Discarded" /* webpackChunkName: "discaded" */).then(
    ({ DiscardedPage }) => ({
      default: DiscardedPage,
    })
  )
);

const PaymentPending = React.lazy(() =>
  import(
    "../pages/PaymentPending" /* webpackChunkName: "payment-pending" */
  ).then(({ PaymentPending }) => ({
    default: PaymentPending,
  }))
);

const PaymentConfirmation = React.lazy(() =>
  import(
    "../pages/PaymentConfirmation" /* webpackChunkName: "payment-confirmation" */
  ).then(({ PaymentConfirmation }) => ({
    default: PaymentConfirmation,
  }))
);

const PaymentConfirmationCash = React.lazy(() =>
  import(
    "../pages/PaymentConfirmationCash" /* webpackChunkName: "payment-confirmation-cash" */
  ).then(({ PaymentConfirmationCash }) => ({
    default: PaymentConfirmationCash,
  }))
);
const PaymentError = React.lazy(() =>
  import("../pages/PaymentError" /* webpackChunkName: "payment-error" */).then(
    ({ PaymentError }) => ({
      default: PaymentError,
    })
  )
);
const ManualErrorVerifying = React.lazy(() =>
  import(
    "../pages/ManualErrorVerifying" /* webpackChunkName: "manual-error-verifying" */
  ).then(({ ManualErrorVerifyingPage }) => ({
    default: ManualErrorVerifyingPage,
  }))
);

const ShipmentInformation = React.lazy(() =>
  import(
    "../pages/ShipmentInformation" /* webpackChunkName: "shipment-information" */
  ).then(({ ShipmentInformation }) => ({
    default: ShipmentInformation,
  }))
);

const TermsConditions = React.lazy(() =>
  import("../pages/TermsConditions").then(({ TermsConditions }) => ({
    default: TermsConditions,
  }))
);

const OTPLogin = React.lazy(() =>
  import("../pages/OTPLogin" /* webpackChunkName: "otp-login" */).then(
    ({ OTPLogin }) => ({
      default: OTPLogin,
    })
  )
);

const StoreSelection = React.lazy(() =>
  import(
    "../pages/StoreSelection" /* webpackChunkName: "store-selection" */
  ).then(({ StoreSelection }) => ({
    default: StoreSelection,
  }))
);

const Vouchers = React.lazy(() =>
  import("../pages/Vouchers" /* webpackChunkName: "vouchers" */).then(
    ({ Vouchers }) => ({ default: Vouchers })
  )
);

export const Routes = () => {
  const sharedRoutes = React.useCallback(() => {
    return (
      <>
        <Route path={ROUTES.BASIC_INFORMATION} element={<BasicInformation />} />
        <Route
          path={ROUTES.BUSINESS_INFORMATION}
          element={<BusinessInformation />}
        />
        <Route
          path={ROUTES.SHIPMENT_INFORMATION}
          element={<ShipmentInformation />}
        />
        <Route path={ROUTES.DEPOSIT_INFORMATION} element={<DepositData />} />
        <Route
          path={ROUTES.PAYMENT_CONFIRMATION}
          element={<PaymentConfirmation />}
        />
        <Route
          path={ROUTES.PAYMENT_CONFIRMATION_CASH}
          element={<PaymentConfirmationCash />}
        />
        <Route path={ROUTES.PAYMENT_PENDING} element={<PaymentPending />} />
        {/* Login */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.OTP_LOGIN} element={<OTPLogin />} />
        <Route path={ROUTES.STORE_SELECTION} element={<StoreSelection />} />
        {/* Fallbacks */}
        <Route path={ROUTES.PAYMENT_ERROR} element={<PaymentError />} />
        <Route
          path={ROUTES.MANUAL_ERROR_VERIFYING}
          element={<ManualErrorVerifying />}
        />
        <Route path={ROUTES.DISCARDED} element={<Discarded />} />
        <Route path={ROUTES.ERROR_VERIFYING} element={<ErrorVerifying />} />
        <Route
          path={ROUTES.DELIVERY_ORDER_ERROR}
          element={<DeliveryOrderError />}
        />
      </>
    );
  }, []);

  return (
    <React.Suspense fallback={"cargando"}>
      <Router>
        <Route path={ROUTES.LOGIN}>
          <Route index element={<Login />} />
        </Route>
        <Route path={ROUTES.HOME} element={<HomeParentRouter />}>
          <Route index element={<PosLandingPage />} />
          <Route path={ROUTES.PURCHASE_ORDER} element={<PurchaseOrder />} />
          {sharedRoutes()}
          <Route path={ROUTES.TERMS_CONDITIONS} element={<TermsConditions />} />
          <Route path={ROUTES.VOUCHERS} element={<Vouchers />} />
          <Route path={"*"} element={<PosLandingPage />} />
        </Route>
        <Route path={`/${ROUTES.HUNTERS}`} element={<HunterParentRouter />}>
          <Route index element={<HunterLogin />} />
          <Route path={ROUTES.PURCHASE_ORDER} element={<PurchaseOrder />} />
          {sharedRoutes()}
          <Route path={"*"} element={<PurchaseOrder />} />
        </Route>
      </Router>
    </React.Suspense>
  );
};
