export default {
  translation: {
    commons: {
      of: 'de',
      and: 'y',
      continue: 'Continuar',
      confirm: 'Confirmar',
      edit: 'Editar',
      finish: 'Finalizar',
      signature: 'Firma',
      state: 'Estado',
      createdBy: 'Creado por',
      company: 'Treinta',
      total: 'Total',
      subTotal: 'Subtotal',
      taxAmount: 'IVA',
      extraTaxAmount: 'INC',
      rrn: 'RRN',
      intallments: 'Número de cuotas',
      needHelp: '¿Necesitas ayuda?',
      free: 'Gratis',
      step: 'Paso',
      name: 'Nombre',
      confirmData: 'Confirmar datos',
      editData: 'Editar datos',
      writeToSupport: 'Escribir a soporte',
      document: 'Documento',
      bank: 'Banco',
      accountNumber: 'Número de cuenta',
      accountType: 'Tipo de cuenta',
      loginTypes: {
        phone: 'número de celular',
        email: 'correo',
      },
      accountTypes: {
        savings: 'Ahorros',
        current: 'Corriente',
      },
      methodsPayment: {
        online: 'online',
        cash: 'Efectivo',
      },
      yes: 'Sí',
      unknownError:
        'Un error inesperado ha ocurrido, por favor intenta nuevamente.',
      goBack: 'Volver',
      tryAgain: 'Intentar de nuevo',
      contactSupport: 'Contactar a Soporte',
    },
    components: {
      errorMailVeryfing: {
        title: 'No pudimos confirmar tu correo',
        subtitle:
          'Por favor, asegúrate que de que el correo que ingresaste sea el indicado.',
      },
    },
    leftImage: {
      imageMessage: {
        yourMpos: '¡Tu datáfono',
        noContracts: 'sin contratos ni mensualidades!',
        noWifi: {
          begin: 'No necesitas conectarlo',
          end: 'a Wi-Fi.',
        },
        support: {
          begin: 'Soporte 24/7',
          end: 'para lo que necesites.',
        },
        contactlessPayment: {
          begin: 'Puedes recibir',
          end: 'pagos sin contacto.',
        },
        freeShipping: {
          begin: 'Tienes envíos gratis',
          end: 'a toda Colombia.',
        },
      },
    },
    login: {
      startSession: 'Inicia sesión',
      loginWithGoogle: 'Ingresa con Google',
      loginWithPhoneNumber: 'Ingresa con tu número de celular',
      doNotHaveAnAccount: '¿No tienes cuenta?',
      continueWithoutLogin: 'Continuar sin registro',
      notRegistered: {
        title: 'Aún no tienes una cuenta',
        titlePhone: '{{phone}} aún no tiene una cuenta registrada',
        subtitle:
          'Pero no te preocupes, puedes seguir con la compra de tu datáfono.',
        emailWarning: 'Tu correo no está registrado en Treinta.',
        phoneWarning: 'Tu celular no está registrado en Treinta.',
        continueWithPurchase: 'Seguir con la compra del datáfono',
        reWritePhoneNumber: 'Editar número de teléfono',
      },
      infoSession:
        'Facilita tu inicio de sesión ingresando la misma información con la que creaste tu cuenta en Treinta.',
    },
    OTPLogin: {
      sendCode: {
        title: 'Ingresa con tu celular',
        subtitle1: 'Te enviaremos un código de verificación por',
        subtitle2: 'mensaje de texto',
        phoneInput: {
          placeholder: 'Escribe tu número',
          msgError: 'El número que ingresaste no es válido',
        },
        continue: 'Ingresar',
      },
      verifyCode: {
        infoMessage: 'El mensaje puede tardar unos instantes.',
        warningMessage:
          'El código no es válido. Vuelve a intentarlo o solicita uno nuevo',
        title: 'Código de verificación',
        subtitle:
          'Ingresa el código de verificación que hemos enviado al teléfono',
        footer: 'Puedes solicitar un nuevo código en',
        timer: '{{seconds}} segundos',
        resendCode: 'Reenviar código',
        receiveCall: 'Recibir llamada',
      },
    },
    purchaseSummary: {
      title: 'Resumen de compra',
      securityMessage: 'Por seguridad',
      securityMessageBold:
        'vamos a pedirte unos datos personales y de tu negocio.',
      requestAccountNumber: 'También te pediremos el',
      requestAccountNumberBold:
        'número de cuenta donde quieres recibir tu dinero.',
      requestData:
        'Te vamos a solicitar unos datos para generar tu orden de compra.',
      mposValue: 'Valor datáfono',
      tax: 'IVA',
      costOfShipping: 'Costo de envío',
      totalToPay: 'Total a pagar',
      authenticationModal: {
        title: '¿Ya tienes cuenta en Treinta?',
        continueButton: 'No, pero quiero continuar',
      },
      oldPrice: '120.000',
    },
    basicInformation: {
      title: 'Información básica',
      nameInput: {
        label: 'Nombre',
        placeholder: 'Escribe tu nombre',
      },
      lastNameInput: {
        label: 'Apellidos',
        placeholder: 'Escribe tus apellidos',
      },
      phoneInput: {
        label: 'Número de celular',
        placeholder: 'Escribe tu número',
        msgError: 'El número que ingresaste no es válido',
      },
      emailInput: {
        label: 'Correo electrónico',
        placeholder: 'Escribe tu correo',
        msgError: 'Ingresa un correo electrónico válido',
        msgErrorGmail:
          'Asegúrate de registrar tu correo de Gmail para poder continuar con el proceso.',
      },
      termsInput: {
        readAndAccept: 'He leído y acepto los',
        termsAndConditions: 'Términos y condiciones',
        dataPrivacy: 'Políticas de privacidad',
      },
      confirmData: 'Confirma que tus datos estén correctos',
      alreadyExists: {
        email: 'El correo que ingresaste ya tiene una cuenta en Treinta',
        phone: 'El número que ingresaste ya tiene una cuenta en Treinta',
        login: 'Iniciar sesión',
        continueOtherEmail: 'Continuar usando otro correo',
        continueOtherPhone: 'Continuar usando otro número',
        noLoginPOS: {
          youAlreadyHaveAnAccount: 'Ya tienes una cuenta con estos datos',
          wantToAssociateYourPurchase:
            '¿Quieres asociar tu compra a esta cuenta para continuar?',
          yesAssociateMyAccount: 'Sí, asociar compra',
          noAssociateMyAccount: 'No, usar otros datos',
        },
      },
      mposAvailability: {
        title: '¡Excediste el número de datáfonos!',
        message:
          'Selecciona hasta 5 y vuelve a intentar. Contáctanos si necesitas más.',
      },
      errorModal: {
        isDifferentEmail: 'El correo seleccionado no coincide con el ingresado',
        title: 'Tu correo no está registrado en Treinta',
        message:
          'Por favor, revisa tus datos de nuevo y haz otro intento o contacta a Soporte.',
      },
    },
    businessInformation: {
      title: 'Información de negocio',
      description: 'Completa esta información para el proceso de facturación.',
      typePerson: {
        label: 'Selecciona qué tipo de persona eres',
        legal: 'Persona jurídica',
        natural: 'Persona natural',
      },
      document: {
        label: 'Tipo de documento',
        placeholder: 'No. de documento',
      },
      documentError: {
        nit: 'NIT invalido: Verifica el número',
        cc: 'Confirma que la cantidad de dígitos/caracteres esté bien.',
      },
      expeditionDate: {
        label: 'Fecha de expedición',
      },
      nit: {
        label: 'NIT',
        help: 'Recuerda agregar el digito de validación',
        placeholder: '123456789-1',
        error: 'NIT invalido',
      },
      storeInTreinta: {
        label: 'Tienda en Treinta',
        dropdownLabel: '¿A que negocio quieres asociar esta compra?',
        default: 'Selecciona tu tienda en Treinta',
      },
      storeCategory: {
        label: 'Categoría de negocio',
      },
      subCategory: {
        label: 'Subcategoría',
        default: 'Selecciona la subcategoría',
      },
      businessName: {
        label: 'Razón social',
        placeholder: 'Tu razón social',
      },
      storeName: {
        label: 'Nombre de tu negocio',
        placeholder: 'Nombre de tu negocio',
      },
      forbiddenActivities: {
        title: {
          first: '¿Perteneces a alguna de estas',
          middle: 'actividades económicas prohibidas',
          last: 'en tu negocio?',
        },
        yes: 'SÍ realizo alguna o varias de estas actividades prohibidas',
        no: 'NO realizo ninguna de las actividades prohibidas',
        forbidd1:
          'Venta u ofrecimiento de bienes o servicios que no acaten en su totalidad la ley aplicable.',
        forbidd2: 'Venta u ofrecimiento de estupefacientes o drogas ilícitas.',
        forbidd3:
          'Venta u ofrecimiento de bienes o servicios relacionados con imágenes que sean obviamente ofensivas y que carezcan de un valor artístico serio.',
        forbidd4:
          'Actividades relacionadas con la compra o comercialización de fotografías, imágenes de video, imágenes generadas por computadora, caricaturas, simulación u otros medios o actividades, incluyendo, pero no limitados a pornografía infantil, bestialismo, violación (o cualquier otra forma de comportamiento sexual sin consenso de los participantes), mutilación de una persona o una parte del cuerpo sin consenso de los participantes.',
        forbidd5: 'Compra y venta de divisas virtuales.',
        forbidd6: 'Extracción de oro y otros metales preciosos.',
        forbidd7:
          'Extracción de otros minerales metalíferos no ferrosos n.c.p.',
        forbidd8:
          'Extracción de esmeraldas, piedras preciosas y semipreciosas.',
        forbidd9: 'Industrias básicas de metales preciosos.',
        forbidd10: 'Fabricación de armas y municiones.',
        forbidd11: 'Recuperación de materiales.',
        forbidd12: 'Comercio al por mayor de metales y productos metalíferos.',
        forbidd13:
          'Actividades de Apoyo para otras actividades de explotación de Minas y Canteras.',
        forbidd14:
          'Comercio al por mayor de desperdicios, desechos y chatarra.',
        forbidd15: 'Actividades de las casas de cambio.',
        forbidd16:
          'Actividades de los profesionales de compra y venta de divisas.',
        forbidd17: 'Actividades de juegos de azar y apuestas.',
        forbidd18: 'Actividades de uso medicinal o científico del cannabis.',
      },
      documentAlert:
        'Este número de documento debe ser el mismo con el que esté registrada la cuenta bancaria que asociarás para recibir tus pagos.',
      nitDocumentAlert: 'No es necesario agregar -1 en el campo NIT',
    },
    deliveryOrderError: {
      title: {
        first: '¡Lo sentimos! No pudimos',
        last: 'procesar tu orden.',
      },
      message: {
        first: 'Por favor, contacta a soporte para brindarte',
        last: 'más información',
      },
    },
    depositData: {
      title: 'Datos depósito',
      goToPay: 'Finalizar',
      helpText:
        'Completa la información de la cuenta donde recibirás el dinero de tus ventas por datáfono.',
      alertText: {
        firstPart:
          'Verifica que los datos bancarios coincidan con tu documento de identidad',
        secondPart:
          'Si los datos no conciden, no podremos realizar la consignación.',
      },
      editID: 'Editar documento de identidad',
      bankInput: {
        label: 'Banco',
        placeholder: 'Selecciona tu banco',
      },
      accountNumberInput: {
        label: 'Cuenta',
        placeholder: 'Escribe el número de cuenta',
        error: 'Asegúrate de solo ingresar caracteres numéricos',
      },
      accountTypeLabel: 'Selecciona el tipo de cuenta',
      methodsPayment: 'Método de pago para tu compra',
      electionPayment: 'Elige la opción más cómoda para pagar tu Datáfono.',
      selectTypePayment: 'Selecciona el tipo de cuenta',
      cashPayment: 'Pago contra entrega en efectivo',
      onlinePayment: 'Pago online',
      immediatePayment: 'Pago en comercio del cliente',
      popoverInfo:
        'Cuando un Hunter vende un datáfono directamente al cliente en su comercio.',
      confirmModal: {
        title: 'Confirma tus datos de deposito',
        alert: {
          firstPart: 'Recuerda que',
          secondPart:
            'la cuenta que ingreses debe coincidir con el propietario del documento',
        },
      },
      dateModal: {
        altIcon: 'icono calendario',
        title: '¿Cuándo te gustaría recibir tu datáfono?',
        description: 'Por favor, escoge la fecha que prefieras a continuación.',
        label: 'Fecha de entrega',
        buttonSave: 'Confirmar datos',
        buttonSkip: 'Continuar sin programar',
      },
    },
    errorVerifying: {
      title: 'Hemos tenido un contratiempo verificando tu identidad',
      message:
        'Por favor contáctate con nosotros para darte solución lo más pronto posible.',
      manualVerifying: {
        title: 'Estamos revisando tus datos de manera manual',
        message:
          'Esto puede llevar unos minutos para poder verificar la información al 100%.',
      },
    },
    discarded: {
      title: 'No cumples con los requisitos para adquirir el Datáfono',
      message: {
        first: 'Si tienes dudas por favor contáctanos.',
        middle: 'porquenopuedoadquirirmidatafono@treinta.co',
        last: 'o por WhatsApp',
      },
    },
    home: {
      welcome: 'Bienvenido',
    },
    paymentConfirmation: {
      mposValue: 'Valor datáfono',
      purchaseMessage:
        'Tu datáfono llegará dentro de 1 a 7 días hábiles en la dirección que registraste. A tu celular llegarán los datos de activación que usarás para activarlo.',
      pendingPurchaseMessage:
        'Hemos enviado a tu correo la información de tu compra y los pasos para completar la compra de tu datáfono Treinta.',
      shippingCost: 'Costo de envío',
      shippingTime: 'Tiempo de entrega',
      oneDayShipping: '1 día',
      multipleDayShipping: '1 a {{days}} días',
      successfulPurchase: '¡Compra exitosa!',
      pendingPurchase: '¡Compra en proceso!',
      tax: 'IVA',
      title: 'Confirmación de pago',
      totalValue: 'Valor total',
      titlePaymentCash: '¡Tu datáfono está en camino!',
      subtitlePaymentCash:
        'Recuerda que debes tener listo tu dinero en efectivo al momento de recibir el datáfono para que podamos finalizar la entrega.',
      textHunter: 'Código de tu vendedor (Opcional)',
      inputHunter: 'Escribe el código de tu vendedor',
      localBusinessDays: 'Si estás en Bogotá: recibes 1 a 5 días hábiles.',
      businessDays: 'Si estás en otra ciudad: recibes de 2 a 7 días hábiles.',
      buttonFinish: 'Finalizar',
      buttonSignIn: 'Iniciar sesión',
      buttonRegister: 'Regístrate aquí',
      error: {
        title: 'No hemos podido procesar tu pago',
        message: {
          first:
            'Si tienes dudas o quieres consultar sobre tu caso en específico, contáctanos al correo',
          middle: 'nopuedoadquirirmidatafono@treinta.co',
          last: 'o por WhatsApp',
        },
        retry: 'Volver a intentar',
      },
      registerWithDeviceLabel:
        'Ingresa con tu {{device}} para ver todas las transacciones de tu datáfono.',
    },
    shipmentInformation: {
      title: 'Información de envío',
      description:
        'Estos datos nos ayudarán en el proceso de envío de tu datáfono.',
      alertText: {
        init: 'Tiempo estimado de entrega: ',
        end: '1 a 7 días hábiles',
      },
      state: {
        label: '¿En qué departamento estás ubicado?',
        placeholder: 'Selecciona el departamento',
        default: 'Selecciona el departamento',
      },
      city: {
        label: '¿En qué ciudad estás ubicado?',
        placeholder: 'Selecciona la ciudad',
        default: 'Selecciona la ciudad',
        loadingPlaceholder: 'Cargando ciudades...',
      },
      addressPrefix: {
        placeholder: 'Seleccionar',
      },
      address: {
        label: '¿Cuál es tu dirección?',
        placeholder: 'Ej: 146 # 16-54 sur',
        errorLengthChar: 'Mínimo 5 caracteres, máximo 30 caracteres',
      },
      detailAddress: {
        label: 'Detalles de la dirección (Opcional)',
        placeholder: 'Ej: Casa, torre, apto...',
        errorText: 'Máximo 30 caracteres',
      },
      neighborhood: {
        label: 'Barrio (Opcional)',
        placeholder: 'Ej: Chapinero, Poblado...',
        errorText:
          'Máximo 30 caracteres, no puedes agregar números o caracteres especiales.',
      },
      anotherPerson: {
        label: 'Otra persona recibirá el datáfono',
      },
      anotherName: {
        label: 'Nombre de quien recibe',
        placeholder: 'Ingresa el nombre de la persona',
      },
      anotherPhone: {
        label: 'Número de contacto',
        placeholder: 'Ingresa su número de contacto',
      },
    },
    storeSelection: {
      title: '¿A cuál negocio te gustaría entrar?',
      inputLabel: 'Tienda en Treinta',
      inputHelp: 'Con esta cuenta activarémos tu datáfono',
      placeholder: 'Selecciona una tienda',
    },
    vouchers: {
      dowloadPdf: 'Descargar PDF',
      authorizationCode: 'Código autorización',
      transactionDate: 'Fecha de transacción',
      paymentMethod: 'Método de pago',
      cardType: 'Tipo de tarjeta',
      successfulCollection: 'Cobro exitoso',
      modalNotTransaction: {
        confirmData: 'Volver',
        message: 'No se encontró ninguna transacción',
      },
    },
    header: {
      signIn: 'Ingresar',
      uniqueDataphone: '¿Qué hace único nuestro datáfono?',
      calcaulateFirstSale: 'Calcula tu primer venta',
      anyProblem: '¿Algún problema?',
      activation: 'Activa tu datáfono',
    },
    anchorTags: {
      aboutAnchor: 'datafono',
      calculatorAnchor: 'calculadora',
      supportAnchor: 'soporte',
      activation: 'activation',
    },
    posLandingPage: {
      buyButton: 'Comprar ahora',
      buyNowCurrentPrice: '¡Compra el tuyo hoy por',
      newPrice: '$85.000',
      oldPrice: '$120.000',
      faqSection: 'Comprar con un asesor',
      details: {
        title: '¿Por qué nuestro datáfono es único en Colombia?',
        noPhone: 'Tu datáfono',
        noPhoneBold: 'funciona',
        noPhoneBold2: 'sin celular.',
        supportBold: 'Soporte inmediato',
        support: 'a',
        support2: 'cualquier problema',
        support3: 'que tengas',
        payments: 'Recibe pagos sin',
        payments2: 'contacto.',
        instantMoney: 'Recibe',
        instantMoneyBold: 'el dinero',
        instantMoney2: 'de tus',
        instantMoney3: 'ventas en',
        instantMoneyBold2: '24h hábiles.',
        bankTransferBold: 'Transfiere',
        bankTransfer: 'tu dinero a',
        bankTransfer2: 'cualquier cuenta',
        bankTransferBold2: '100% gratis.',
        freeDeliveryBold: 'Envío gratis',
        freeDelivery: 'a toda',
        freeDelivery2: 'Colombia.',
        recieveMoney: 'Recibe el dinero de tus ventas en:',
        recieveMoneyIn30min:
          'Con Davivienda o Daviplata recibe tu dinero en solo 30 mins.',
      },
      benefits: {
        title: '¿Qué hace único a nuestro datáfono?',
        subtitle: 'Tienes la ventaja con transacciones rápidas y seguras',
        description:
          'Agiliza tus cobros y no te preocupes más por entregar vueltas o porque tus clientes con tarjeta se los lleve la competencia.',
        details: {
          noPhone: 'Tu datáfono',
          noPhoneBold: 'funciona',
          noPhoneBold2: 'sin celular.',
          supportBold: 'Soporte 24/7',
          support: 'para',
          support2: 'ayudarte en todo lo',
          support3: 'que necesites.',
          payments: 'Recibe pagos sin',
          payments2: 'contacto.',
          instantMoney: 'Recibe',
          instantMoneyBold: 'tu dinero',
          instantMoney2: 'en',
          instantMoney3: '',
          instantMoneyBold2: '24 hrs. hábiles.',
          bankTransferBold: 'Transfiere',
          bankTransfer: 'tu dinero a',
          bankTransfer2: 'cualquier cuenta',
          bankTransferBold2: '100% gratis.',
          freeDeliveryBold: 'Envío gratis',
          freeDelivery: 'a toda',
          freeDelivery2: 'Colombia.',
        },
      },
      saleCalculator: {
        title: 'Tus cuentas las llevamos nosotros',
        calculateFirstSale: 'Calcula tu primera venta con datáfono',
        saleValue: 'Valor de la venta',
        stateAndCity: 'Departamento y ciudad',
        infoReteICA: 'El ReteICA se calcula dependiendo de donde te encuentras',
        calculateMySale: 'Calcular mi venta',
        treintasCommission: 'La comisión de treinta será de solo',
        saleBeforeTaxes: 'Venta antes de impuestos',
        taxByLaw: 'Impuestos por ley',
        reteICAWillBe: 'El ReteICA será de',
        reteIVAWillBe: 'El ReteIVA será de',
        reteFuenteWillBe: 'La retención de fuente será de',
        lawsTaxes: 'Impuestos de ley',
        recieve: 'Esto es lo que recibes en tu cuenta',
        recalculate: 'Hacer otro cálculo',
        order: 'Quiero mi datáfono',
        IVAOf: 'IVA del',
      },
      aboutApp: {
        title: 'Tu negocio en tu bolsillo',
        descBold: 'Desde la aplicación de treinta',
        desc: 'verás todas las ventas',
        desc2: 'reflejadas al instante, reportes diarios, semanales y',
        desc3: 'mucho más.',
        link: 'Descubrir el mundo de Treinta',
        button: '¡Quiero mi datáfono!',
      },
      support: {
        title: 'Accede a soporte personalizado cuando quieras',
      },
      footer: {
        manageYourStore: 'Administra tu negocio',
        treintaPC: 'Treinta para PC',
        virtualCatalogue: 'Catálogo virtual',
        provisioning: 'Surte tu negocio',
        extraIncome: 'Ingresos Extra',
        termsAndConditions: 'Términos y condiciones',
        dataPrivacy: 'Políticas de privacidad',
      },
      videoLanding: {
        steps: {
          buy: 'Compra tu datáfono.',
          recieve:
            'Después de tu compra recibirás un SMS con los datos de activación de tu nuevo datáfono.',
          insert:
            'Cuando recibas tu datáfono, ingresa los datos que recibiste.',
          ready:
            '¡Listo! Ya puedes recibir pagos en tu negocio con tu datáfono Treinta.',
        },
        activationSection: {
          title: 'Activa tu datáfono',
          subtitle: 'Podrás empezar a usarlo en 4 simples pasos:',
          download: 'Descargar manual de uso',
        },
      },
    },
    deliveryOrder: {
      neighborhoodName: 'Barrio',
      anotherPersonName: 'Recibe',
    },
    hunters: {
      welcome: '¡Hunter, te damos la bienvenida!',
      login: {
        button: 'Iniciar sesión',
        input: {
          label: 'Ingresa tu número de documento',
          placeholder: 'Ej: 3403230404',
          error: 'El número de documento ingresado no está registrado',
        },
      },
    },
  },
};
