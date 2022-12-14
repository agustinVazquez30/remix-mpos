import { COUNTRIES, CountriesIds, getCountry } from "@30sas/web-ui-kit-utils";
import { LoginPayload } from "~/legacy/src/contexts/AppContext";

export enum ROUTES {
  HOME = "/",
  PURCHASE_ORDER = "purchase-order",
  BASIC_INFORMATION = "basic-information",
  BUSINESS_INFORMATION = "business-information",
  DEPOSIT_INFORMATION = "deposit-information",
  DELIVERY_ORDER_ERROR = "delivery-order-error",
  DISCARDED = "discarded",
  ERROR_VERIFYING = "error-verifying",
  LOGIN = "login",
  OTP_LOGIN = "otp-login",
  PAYMENT_CONFIRMATION = "payment-confirmation",
  PAYMENT_CONFIRMATION_CASH = "payment-confirmation-cash",
  PAYMENT_ERROR = "payment-error",
  PAYMENT_PENDING = "payment-pending",
  SHIPMENT_INFORMATION = "shipment-information",
  STORE_SELECTION = "store-selection",
  VOUCHERS = "vouchers/:transactionId",
  TERMS_CONDITIONS = "terminos-condiciones-politicas-privacidad-datafono",
  MANUAL_ERROR_VERIFYING = "manual-error-verifying",
  HUNTERS = "hunters",
}

export enum verifyingErrorType {
  MANUAL_ERROR_VERIFYING = "manual_error_verifying",
  ERROR_VERIFYING = "error_verifying",
}

export const ROUTES_ALLOWED = [
  ROUTES.PAYMENT_ERROR,
  ROUTES.PAYMENT_CONFIRMATION,
  ROUTES.PAYMENT_CONFIRMATION_CASH,
  ROUTES.PAYMENT_PENDING,
  ROUTES.PURCHASE_ORDER,
  ROUTES.HUNTERS,
];

export enum TreintaAppEvents {
  NAVIGATE = "navigate",
}

export const CANCEL_REQUEST = "cancel-request-by-unmount-component";

export const ReturnUrlFinish = (buttonSignIn: boolean, loading: boolean) => {
  if (buttonSignIn && !loading) {
    return `${window.ENV?.REACT_APP_WEB_LOGIN_URL}`;
  } else {
    return `${window.ENV?.REACT_APP_WEB_URL}`;
  }
};

const countryID =
  typeof process !== "undefined"
    ? process?.env.REACT_APP_COUNTRY
    : typeof window !== "undefined"
    ? window.ENV?.REACT_APP_COUNTRY || 1
    : 1;

export const DefaultCountry = {
  countryId: Number(countryID || -1),
  countryCode: getCountry(Number(countryID || -1) as CountriesIds).code || "",
};

export const GTMConfig = {
  gtmId:
    typeof process !== "undefined"
      ? process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID
      : window.ENV?.REACT_APP_GOOGLE_TAG_MANAGER_ID || "random",
};

export enum FranchisesCards {
  VISA = 4,
  MASTERCARD = 5,
}

export enum Origins {
  MPOS = 12,
}

export enum LoginTypes {
  EMAIL = "email",
  OTP = "otp",
}

export enum MposPurchaseSteps {
  PURCHASE_SUMARY = "purchaseSummary",
  BASIC_INFORMATION = "basicInformation",
  BUSINESS_INFORMATION = "businessInformation",
  SHIPMENT_INFORMATION = "shipmentInformation",
  DEPOSIT_INFORMATION = "depositInformation",
}

export const MposPurchaseMappedRoutes: {
  [step in MposPurchaseSteps | "default"]: ROUTES;
} = {
  default: ROUTES.HOME,
  purchaseSummary: ROUTES.HOME,
  basicInformation: ROUTES.BASIC_INFORMATION,
  businessInformation: ROUTES.BUSINESS_INFORMATION,
  shipmentInformation: ROUTES.SHIPMENT_INFORMATION,
  depositInformation: ROUTES.DEPOSIT_INFORMATION,
};

export enum PaymentTypes {
  PAYMENT_LINK = 7,
  PAYMENT_CONTRA_ENTREGA = 8,
  MPOS = 12,
}

export interface PhoneNumber {
  countryId: number;
  countryCode: string;
  number: string;
}

export interface Store {
  id: string;
  label: string;
}

export enum TransactionStatus {
  PAID = 1,
  PENDING = 2,
  CANCELED = 6,
}

export enum TransactionTypes {
  RECHARGE_MONEY_BAG = 5,
  MPOS_PURCHASE = 7,
}

export enum MethodPayment {
  PAYMENT = 0,
  CASH_PAYMENT = 1,
  ONLINE_PAYMENT = 2,
}

export enum AccountTypes {
  SAVINGS_ACCOUNT = 1,
  CURRENT_ACCOUNT = 2,
}

export enum DocumentTypes {
  CC = 1,
  CE = 2,
  NIT = 6,
  PEP = 63,
}

export const DocumentFullNameType = [
  { document: "C??dula de Ciudadan??a", id: DocumentTypes.CC },
  { document: "C??dula de extranjer??a", id: DocumentTypes.CE },
  { document: "Permiso Especial de Permanencia", id: DocumentTypes.PEP },
  { document: "NIT", id: DocumentTypes.NIT },
];

export enum UserStatus {
  Active = 1,
  Deleted = 2,
  Inactive = 3,
}

export enum UserTypes {
  OWNER = 1,
  ADMIN = 2,
  EMPLOYEE = 3,
  SELLER = 4,
  BUYER = 5,
}

export enum ServiceStatus {
  FIRST_TIME = 0,
  ACTIVE = 1,
  ONBOARDING = 2,
  PENDING = 3,
  INACTIVE = 4,
}

export enum ServiceTypes {
  WEB_CATALOG = 1,
  PAYMENT_LINKS = 2,
  MPOS = 3,
}

export const TRANSACTION_DESCRIPTION = "Compra Dat??fono Treinta";

export const ACCOUNT_TYPES = [
  { id: AccountTypes.SAVINGS_ACCOUNT, description: "Ahorros" },
  { id: AccountTypes.CURRENT_ACCOUNT, description: "Corriente" },
];

export const DEFAULT_WHATSAPP_SUPPORT_PHONE = "+14327413593";
export const DEFAULT_FORMATTED_WHATSAPP_SUPPORT_PHONE = "+1 (432) 741-3593";

export const banksMap = new Map();

banksMap.set(COUNTRIES.COLOMBIA, [
  { id: 1, name: "ASOPAGOS S.A.S" },
  { id: 2, name: "BANCO AGRARIO" },
  { id: 3, name: "BANCO AV VILLAS" },
  { id: 4, name: "BANCO CAJA SOCIAL BCSC SA" },
  { id: 5, name: "BANCO COOPERATIVO COOPCENTRAL" },
  { id: 6, name: "BANCO CREDIFINANCIERA SA." },
  { id: 7, name: "BANCO DAVIVIENDA SA" },
  { id: 8, name: "BANCO DE BOGOTA" },
  { id: 9, name: "BANCO DE LAS MICROFINANZAS - BANCAMIA S.A." },
  { id: 10, name: "BANCO DE OCCIDENTE" },
  { id: 11, name: "BANCO FALABELLA S.A." },
  { id: 12, name: "BANCO FINANDINA S.A." },
  { id: 13, name: "BANCO GNB SUDAMERIS" },
  { id: 14, name: "BANCO J.P. MORGAN COLOMBIA S.A." },
  { id: 15, name: "BANCO MUNDO MUJER" },
  { id: 16, name: "BANCO PICHINCHA" },
  { id: 17, name: "BANCO POPULAR" },
  { id: 18, name: "BANCO SANTANDER DE NEGOCIOS COLOMBIA S.A" },
  { id: 19, name: "BANCO SERFINANZA S.A" },
  { id: 20, name: "BANCO W S.A." },
  { id: 21, name: "BANCOLDEX S.A." },
  { id: 22, name: "BANCOLOMBIA" },
  { id: 23, name: "BANCOOMEVA" },
  { id: 24, name: "BBVA COLOMBIA" },
  { id: 25, name: "CITIBANK" },
  { id: 26, name: "COLTEFINANCIERA S.A" },
  { id: 27, name: "CONFIAR COOPERATIVA FINANCIERA" },
  { id: 28, name: "COOFINEP COOPERATIVA FINANCIERA" },
  { id: 29, name: "COOPERATIVA FINANCIERA DE ANTIOQUIA" },
  { id: 30, name: "COOTRAFA COOPERATIVA FINANCIERA" },
  { id: 31, name: "DAVIPLATA" },
  { id: 32, name: "FINANCIERA JURISCOOP S.A. COMPA??IA DE FINANCIAMIENTO" },
  { id: 33, name: "GIROS Y FINANZAS CF" },
  { id: 34, name: "IRIS" },
  { id: 35, name: "ITAU" },
  { id: 36, name: "ITAU antes Corpbanca" },
  { id: 37, name: "MIBANCO S.A." },
  { id: 38, name: "NEQUI" },
  { id: 39, name: "RAPPIPAY" },
  { id: 40, name: "SCOTIABANK COLPATRIA S.A" },
  { id: 41, name: "LULO BANK" },
]);
export enum TypePerson {
  NATURAL = 1,
  LEGAL = 2,
}

export const defaultLoginInfo: LoginPayload = {
  uid: "",
  userId: "",
  loginType: LoginTypes.EMAIL,
  idToken: "",
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: {} as PhoneNumber,
};

export const RoadTypes = [
  {
    id: 1,
    label: "Calle",
  },
  {
    id: 2,
    label: "Carrera",
  },
  {
    id: 3,
    label: "Avenida",
  },
  {
    id: 4,
    label: "Trasversal",
  },
  {
    id: 5,
    label: "Diagonal",
  },
  {
    id: 6,
    label: "Circular",
  },
  {
    id: 7,
    label: "Autopista",
  },
  {
    id: 8,
    label: "Anillo",
  },
  {
    id: 9,
    label: "Zona",
  },
  {
    id: 10,
    label: "Avenida Calle",
  },
  {
    id: 11,
    label: "Avenida Carrera",
  },
];

export const Categories = [
  {
    id: -1,
    label: "Selecciona la categor??a",
    subcategories: [],
  },
  {
    id: 1,
    label: "Alimentos y Bebidas",
    subcategories: [
      {
        id: 1,
        label: "Abarrotes / mercado",
      },
      {
        id: 2,
        label: "Bar /club / discoteca",
      },
      {
        id: 3,
        label: "Catering",
      },
      {
        id: 4,
        label: "Comida r??pida",
      },
      {
        id: 5,
        label: "Licores",
      },
      {
        id: 6,
        label: "Reposter??a / panader??a",
      },
      {
        id: 7,
        label: "Cigarrer??a",
      },
      {
        id: 8,
        label: "Restaurante",
      },
      {
        id: 9,
        label: "Caf??",
      },
    ],
  },
  {
    id: 2,
    label: "Belleza y cuidado personal",
    subcategories: [
      {
        id: 11,
        label: "Centro de tatuajes",
      },
      {
        id: 12,
        label: "Distribuidora",
      },
      {
        id: 13,
        label: "Estilista independiente",
      },
      {
        id: 14,
        label: "Masajista independiente",
      },
      {
        id: 15,
        label: "Sal??n de belleza",
      },
      {
        id: 16,
        label: "Spa",
      },
      {
        id: 17,
        label: "Suplementos",
      },
      {
        id: 18,
        label: "Otro",
      },
    ],
  },
  {
    id: 3,
    label: "Comercio Detallista",
    subcategories: [
      {
        id: 19,
        label: "Artesan??as",
      },
      {
        id: 20,
        label: "Auto partes",
      },
      {
        id: 21,
        label: "Elementos de seguridad",
      },
      {
        id: 22,
        label: "Elementos del hogar",
      },
      {
        id: 23,
        label: "Equipos m??dicos",
      },
      {
        id: 24,
        label: "Farmacia",
      },
      {
        id: 25,
        label: "Florister??a",
      },
      {
        id: 26,
        label: "Insumos",
      },
      {
        id: 27,
        label: "Joyer??a",
      },
      {
        id: 28,
        label: "Jugueter??a / pi??ater??a",
      },
      {
        id: 29,
        label: "Libros / papeler??a",
      },
      {
        id: 30,
        label: "Maquinar??a",
      },
      {
        id: 31,
        label: "Mascotas",
      },
      {
        id: 32,
        label: "Materiales de construcci??n",
      },
      {
        id: 33,
        label: "Muebles / decoraci??n",
      },
      {
        id: 34,
        label: "Perfumer??a",
      },
      {
        id: 35,
        label: "Revendedor",
      },
      {
        id: 36,
        label: "Ropa / accesorios",
      },
      {
        id: 37,
        label: "Tecnolog??a",
      },
      {
        id: 38,
        label: "Tienda de deportes",
      },
      {
        id: 39,
        label: "Tienda naturista",
      },
      {
        id: 40,
        label: "Venta de bicicletas y accesorios",
      },
      {
        id: 41,
        label: "venta de veh??culos nuevos",
      },
      {
        id: 42,
        label: "Venta de veh??culos usados",
      },
      {
        id: 43,
        label: "Venta por catalogo",
      },
      {
        id: 44,
        label: "Otro",
      },
    ],
  },
  {
    id: 4,
    label: "Educaci??n",
    subcategories: [
      {
        id: 45,
        label: "Colegios",
      },
      {
        id: 46,
        label: "Jardin infantil",
      },
      {
        id: 47,
        label: "Servicios de ni??era",
      },
      {
        id: 48,
        label: "Talleres / cursos / capacitaciones",
      },
      {
        id: 49,
        label: "Tutor / profesor",
      },
      {
        id: 50,
        label: "Otro",
      },
    ],
  },
  {
    id: 5,
    label: "Reparaci??n y Limpieza",
    subcategories: [
      {
        id: 51,
        label: "Automotriz y autopartes",
      },
      {
        id: 52,
        label: "Lavander??a",
      },
      {
        id: 53,
        label: "Limpieza del hogar",
      },
      {
        id: 54,
        label: "Moda / zapater??a",
      },
      {
        id: 55,
        label: "Reparaciones locativas",
      },
      {
        id: 56,
        label: "Otro",
      },
    ],
  },
  {
    id: 6,
    label: "Servicios",
    subcategories: [
      {
        id: 57,
        label: "Arquitectura e ingenier??a",
      },
      {
        id: 58,
        label: "autolavado",
      },
      {
        id: 59,
        label: "Carpinter??a",
      },
      {
        id: 60,
        label: "Contabilidad / asesor??as",
      },
      {
        id: 61,
        label: "Dise??o / fotograf??a",
      },
      {
        id: 62,
        label: "Log??stica",
      },
      {
        id: 63,
        label: "Medicina / odontolog??a",
      },
      {
        id: 64,
        label: "Mensajer??a",
      },
      {
        id: 65,
        label: "Seguros",
      },
      {
        id: 66,
        label: "Tecnolog??a y software",
      },
      {
        id: 67,
        label: "Terapias",
      },
      {
        id: 68,
        label: "Veterinaria",
      },
      {
        id: 69,
        label: "??pticas",
      },
      {
        id: 70,
        label: "Otro",
      },
    ],
  },
  {
    id: 7,
    label: "Transporte",
    subcategories: [
      {
        id: 71,
        label: "Alquiler de veh??culos",
      },
      {
        id: 72,
        label: "Bus",
      },
      {
        id: 73,
        label: "Domicilios",
      },
      {
        id: 74,
        label: "Mototaxi",
      },
      {
        id: 75,
        label: "Mudanza",
      },
      {
        id: 76,
        label: "Servicio especial",
      },
      {
        id: 77,
        label: "Taxi",
      },
      {
        id: 78,
        label: "Otro",
      },
    ],
  },
  {
    id: 8,
    label: "Turismo y Entretenimiento",
    subcategories: [
      {
        id: 79,
        label: "Agencia de viajes",
      },
      {
        id: 80,
        label: "Centro de recreaci??n y deporte",
      },
      {
        id: 81,
        label: "Centros culturales",
      },
      {
        id: 82,
        label: "Entrenador personal",
      },
      {
        id: 83,
        label: "Entretenimiento",
      },
      {
        id: 84,
        label: "Eventos/ Festivales",
      },
      {
        id: 85,
        label: "Gimnasio",
      },
      {
        id: 86,
        label: "Hospedaje",
      },
      {
        id: 87,
        label: "Hostales",
      },
      {
        id: 88,
        label: "Hoteles",
      },
      {
        id: 89,
        label: "Moteles",
      },
      {
        id: 90,
        label: "Paquetes tur??sticos",
      },
      {
        id: 91,
        label: "Tours",
      },
      {
        id: 92,
        label: "Turismo",
      },
      {
        id: 93,
        label: "Videojuegos",
      },
      {
        id: 94,
        label: "Otro",
      },
    ],
  },
];

export const DOCUMENT_PEP_COL = 63;
