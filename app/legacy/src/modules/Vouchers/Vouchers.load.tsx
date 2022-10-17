import { FC, useEffect, useState } from "react";

import { Vouchers, VouchersType } from "./Vouchers";

import ModalNotTransaction from "~/legacy/src/modules/Vouchers/components/ModalNotTransaction/ModalNotTransaction";
import { ROUTES } from "~/legacy/src/constants";
import { Spinner } from "~/legacy/src/commons/components";
import Swal from "sweetalert";
import { jsPDF } from "jspdf";
import moment from "moment";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "~/legacy/src/hooks";
import { validationCarType } from "~/legacy/src/utils/typeValidations";

type VoucherData = Omit<VouchersType, "onGeneratePDF">;

const VALID_PAYMENT = "APPROVED";

export const VouchersLoad: FC = (): JSX.Element => {
  const [voucherData, setVoucherData] = useState<VoucherData>();
  const [signatureURL, setSignatureURL] = useState<string>();
  const [storeId, setStoreId] = useState<string>();
  const [showModalNotTransaction, setShowModalNotTransaction] =
    useState<boolean>(true);
  const [error] = useState<boolean>(false); // eslint-disable-line
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const { refetch: getSignature } = useQuery({
    api: "orchestrator",
    requestData: {
      url: `mpos/voucher/signature/${transactionId}`,
      method: "GET",
    },
    enableRefetch: true,
    onSuccess: (response) => {
      setSignatureURL(response.signatureUrl);
    },
  });

  const { refetch: getStore } = useQuery({
    api: "orchestrator",
    requestData: {
      url: `/store/find-api-key?ids=${storeId}`,
      method: "GET",
    },
    onSuccess: (response) => {
      const newVoucherData = { ...voucherData };
      const [{ name, imageUrl, address, email }] = response;

      newVoucherData.storeName = name ?? "Nombre no encontrado";
      newVoucherData.storeEmail = email ?? "Correo no encontrado";
      newVoucherData.storeAddress = address ?? "Dirección no encontrada";
      newVoucherData.logoStore = imageUrl;
      setVoucherData(newVoucherData as VoucherData);
    },
  });

  const { refetch: getTransaction, isLoading: isLoadingGetTransaction } =
    useQuery({
      api: "orchestrator",
      requestData: {
        url: `/datalake/voucher?externalId=${transactionId}`,
        method: "GET",
      },
      onSuccess: (response) => {
        const newVoucherData = { ...voucherData };
        if (Object.keys(response.voucher).length === 0) {
          setShowModalNotTransaction(false);
        } else {
          const {
            amount,
            storeId,
            createdAt,
            status,
            extraTaxAmount,
            maskedPan,
            authCode,
            paymentType,
            installments,
            acqRrn,
            taxAmount,
          } = response.voucher;
          newVoucherData.transactionDate = moment(createdAt).format(
            "DD/MM/YYYY h:mm:ss A"
          );
          newVoucherData.total = amount;
          newVoucherData.creditCardNumber = maskedPan;
          newVoucherData.authorizationCode = authCode;
          newVoucherData.paymentMethod = paymentType;
          newVoucherData.intallments = installments;
          newVoucherData.acqRrn = acqRrn;
          newVoucherData.subTotal = amount - extraTaxAmount - taxAmount;
          newVoucherData.extraTaxAmount = extraTaxAmount;
          newVoucherData.taxAmount = taxAmount;
          newVoucherData.status =
            status === VALID_PAYMENT ? "Aprobado" : "Rechazado";
          newVoucherData.cardType = validationCarType(
            parseInt(maskedPan.substring(0, 1))
          );
          setVoucherData(newVoucherData as VoucherData);
          setStoreId(storeId);
        }
      },
      onError: () => {
        setShowModalNotTransaction(false);
      },
    });

  useEffect(() => {
    getTransaction();
    getSignature();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (storeId?.length) {
      getStore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  useEffect(() => {
    setShowModalNotTransaction(true);
    if (error) {
      Swal("Error", "Transacción no encontrada", "error").then(() =>
        navigate(ROUTES.HOME, { replace: true })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onClose = () => {
    navigate(ROUTES.HOME, { replace: true });
    setShowModalNotTransaction(false);
  };

  const onGeneratePDF = () => {
    const PDF_WIDTH = 580;
    const UNIT = "px";
    const htmlToPDF = document.getElementById("htmlToPDF");
    const pdf = new jsPDF("p", UNIT, [PDF_WIDTH, 1000]);

    if (htmlToPDF) {
      const clonehtmlToPDF: any = htmlToPDF.cloneNode(true);

      clonehtmlToPDF.style.width = `${PDF_WIDTH}${UNIT}`;

      pdf.html(clonehtmlToPDF, {
        callback: (pdf) => {
          pdf.save("voucher.pdf");
        },
      });
    }
  };

  return (
    <>
      {showModalNotTransaction && voucherData ? (
        <Vouchers
          {...voucherData}
          signatureURL={signatureURL ?? ""}
          onGeneratePDF={() => onGeneratePDF()}
        />
      ) : (
        <ModalNotTransaction
          show={!showModalNotTransaction}
          onClose={() => onClose()}
        />
      )}
      {isLoadingGetTransaction && <Spinner fullScreen={true} />}
    </>
  );
};
