import {Container, ItemOne, ItemThree, ItemTwo} from './styles';
import {Typography} from '@30sas/web-ui-kit-core';

export const TermsConditions = () => {
  return (
    <Container>
      <Typography className="title">Contrato de Afiliación</Typography>
      <p>
        Treinta 30 S.A.S., (en adelante “Treinta”), es un proveedor de diversas
        soluciones para la gestión de negocios a través de un aplicativo móvil y
        plataforma web. Entre los productos que ofrece Treinta, se incluye un
        datáfono o POS, y un sistema operativo para el procesamiento de pagos y
        el traspaso de los recursos económicos entre el usuario (en adelante
        “Usuario”) y sus clientes (en adelante “Clientes del Usuario” o
        “Clientes”), atendiendo a las respectivas órdenes de pago a favor del
        Usuario.{' '}
      </p>
      <p>
        A continuación se exponen los términos y condiciones generales (en
        adelante “Términos y Condiciones”) que regulan la relación entre Treinta
        y el Usuario (conjuntamente las “Partes”) y bajo los cuales las Partes
        celebran un mandato de aceptación, cobro, recaudo y dispersión de pagos.
        Así las cosas, aceptados los presentes Términos y Condiciones, se
        entenderá como celebrado un contrato de mandato entre Treinta y el
        Usuario (en adelante “Contrato” o “Acuerdo”) mediante el cual el primero
        le ofrece al segundo los productos y los servicios incluidos en el
        presente documento. Para el uso de tales productos y servicios, se
        requiere que el Usuario haga uso de los medios tecnológicos y operativos
        descritos más adelante, cumpliendo con las condiciones establecidas por
        el adquirente seleccionado por Treinta, las Franquicias de Tarjetas,
        según se define más adelante, y demás actores involucrados en la
        operación del procesamiento y dispersión de pagos, condiciones que se
        encuentran incluidas a lo largo del presente Acuerdo.{' '}
      </p>

      <ol>
        <ItemOne>
          <strong>Definiciones</strong>
        </ItemOne>
        <p>
          <strong>Treinta:</strong> 30 S.A.S., sociedad comercial debidamente
          constituida conforme a las leyes de la República de Colombia,
          identificada con NIT 901.409.657–4, domiciliada en la ciudad de Bogotá
          D.C., Colombia, la cual ha celebrado previamente, en calidad de
          agregador, un contrato de adquirencia con una entidad financiera
          autorizada por la Superintendencia Financiera de Colombia para llevar
          a cabo las operaciones descritas en el presente documento.
        </p>
        <p>
          <strong>Datáfono o POS:</strong> Dispositivo físico móvil, el cual
          será vendido al Usuario, a través del que se podrán procesar y aceptar
          Pagos mediante tarjeta de crédito o débito (en adelante “Tarjetas
          Bancarias”) en los puntos de venta del Usuario.{' '}
        </p>
        <p>
          <strong>Usuario:</strong>Persona natural o jurídica que compra el
          producto y los servicios ofrecidos por Treinta para el procesamiento
          de operaciones de pagos con Tarjetas Bancarias por medio de Datáfonos
          conectados a los Sistemas de Pago de Bajo Valor. Así las cosas, el
          Usuario es quién inicia la solicitud de autorización de un Pago a
          través de Treinta y recibe su aceptación o rechazo. El Usuario debe
          ser una persona con plena capacidad para celebrar contratos y, en caso
          de ser una persona jurídica, debe ser una entidad debidamente
          constituida de acuerdo con las leyes de la República de Colombia que
          tenga capacidad legal suficiente para desarrollar el objeto del
          presente documento, atendiendo a los lineamientos incluidos en su
          objeto social.{' '}
        </p>
        <p>
          <strong>Cliente del Usuario:</strong> Persona natural o jurídica la
          cual, por virtud de su relación comercial con el Usuario, realiza
          Pagos mediante Tarjetas Bancarias haciendo uso del POS vendido por
          Treinta.{' '}
        </p>
        <p>
          <strong>Cuenta Treinta:</strong> Se entenderá como una billetera
          digital la cual consiste en un programa de software que almacena de
          forma segura la información transaccional y las contraseñas de los
          Usuarios.{' '}
        </p>
        <p>
          <strong>Franquicias de Tarjetas:</strong> Término que se refiere a las
          marcas VISA, MasterCard y/o cualquier otra marca registrada por los
          sistemas de marcas como redes globales de tecnología, encargadas de
          permitir a sus titulares realizar operaciones monetarias a través de
          Tarjetas Bancarias.{' '}
        </p>
        <p>
          <strong>Pago:</strong> Proceso por virtud del cual un Cliente del
          Usuario, como titular de una Tarjeta Bancaria, afecta sus recursos o
          un cupo autorizado mediante crédito por el valor correspondiente a la
          deuda adquirida o al pago realizado. Dicha afectación se realiza a
          través de recursos de hardware, software y/o comunicaciones del
          Sistema de Pagos de Bajo Valor. Para los efectos de los pagos de
          servicios dentro del Sistema de Pago, se entiende perfeccionado el
          Pago desde el momento en que los recursos son afectados.
        </p>
        <p>
          {' '}
          <strong>Adquirente:</strong>
          Persona jurídica autorizada por la Superintendencia Financiera de
          Colombia para proveer servicios de aceptación de pagos a Treinta. En
          ese sentido, (i) Treinta recibe el pago a través de tarjeta débito o
          crédito del Cliente del Usuario por medio del Datáfono; (ii) el Emisor
          de la tarjeta autoriza y aprueba la transacción a través de la red
          procesadora de pagos; y (iii) [el Adquirente] confirma la autorización
          para que el Usuario pueda emitir la factura correspondiente a su
          Cliente.{' '}
        </p>
        <p>
          <strong>Emisor:</strong> Entidad que expide Tarjetas Bancarias, entre
          otros productos financieros, y que, a través de la Cámara de
          Compensación, recibe las solicitudes de autorización de pago que le
          dirige Treinta y genera las respectivas autorizaciones, rechazos,
          devoluciones y/o ajustes del Pago con el objeto de que las mismas sean
          comunicadas a Treinta y al Usuario.{' '}
        </p>
        <p>
          <strong>Sistema de Pagos de Bajo Valor:</strong> Sistema que se
          utiliza para realizar transacciones financieras mediante la
          transferencia de un valor monetario.
        </p>
        <p>
          {' '}
          <strong>Transacción:</strong> Operación realizada en ambiente
          presente, efectuada a favor del Usuario, la cual se perfecciona
          mediante el uso de Tarjetas Bancarias como medio de pago.
        </p>
        <p>
          <strong>Transacción Fraudulenta:</strong> Transacción (i) no realizada
          o no autorizada y desconocida por el Usuario del Cliente, frente a la
          cual el Usuario no puede comprobar la identificación del titular de la
          Tarjeta Bancaria, o (ii) producto del uso indebido, falsificación y/o
          adulteración de la Tarjeta Bancaria.
        </p>
        <p>
          <strong>Ventas presenciales o en ambientes presentes:</strong> Venta
          de bienes o servicios realizadas por el Usuario, en las cuales el
          titular de la Tarjeta Bancaria está presente y entrega dicho bien o
          servicios para perfeccionar el Pago de lo adquirido.
        </p>
        <p>
          <strong>Contracargo:</strong>
          Corresponde al débito producto del desconocimiento por parte del
          Cliente del Usuario de un Pago realizado con su Tarjeta Bancaria. El
          desconocimiento de la Transacción ante el Emisor puede ser
          consecuencia de su naturaleza fraudulenta y la insatisfacción con el
          producto recibido, entre otros. Es responsabilidad exclusiva del
          Usuario reembolsar el dinero de la Transacción controvertida siempre y
          cuando exista un resultado favorable al Cliente del Usuario. Treinta
          es ajeno a este procedimiento, pues éste se realiza entre el Emisor y
          el Adquirente. Lo anterior sin perjuicio de que Treinta pueda hacer
          una mediación entre el Usuario y el Adquirente, según sea el caso. El
          Pago puede ser además controvertido o anulado por expresa voluntad de
          la Franquicia de Tarjetas o cualquier otra institución financiera con
          capacidad para el efecto.
        </p>
        <p>
          <strong>Reversión:</strong> De conformidad con el artículo 51 de la
          Ley 1481 de 2011 y el Decreto 587 de 2016, la reversión es el proceso
          de devolución de los recursos entregados por un Cliente del Usuario a
          un Usuario por la compra realizada a través del Datáfono con Tarjetas
          Bancarias en operaciones de comercio (i) cuando haya presencia de
          fraude; (ii) cuando la compra no sea autorizada; (iii) cuando el
          artículo no sea entregado o, entregado, no corresponda al comprado por
          el Cliente; y (iv) cuando el artículo sea defectuoso o la calidad del
          mismo no corresponda con la descrita por el Usuario. Las reversiones
          no son aplicables a Transacciones realizadas con aerolíneas,
          impuestos, comparendos y/o pagos del Sistema de Seguridad Social.
        </p>
        <p>
          <strong>MCC:</strong> Es una abreviatura que se refiere a las reglas
          del Merchant Category Code o Código de Grupo de Vendedores. El
          mencionado código consiste en cuatro dígitos destinados a categorizar
          un Usuario en una industria específica. Los códigos MCC que trata este
          Contrato, son aquellos establecidos por las Franquicias de Tarjetas.
        </p>
        <ItemOne>
          <strong>Partes</strong>
        </ItemOne>
        <p>
          Por un lado, en calidad de mandatario, Treinta y, por otro, en calidad
          de mandante, el Usuario que adquiere el POS y el acceso al sistema
          operativo correspondiente para el procesamiento de Pagos ofrecidos por
          Treinta.
        </p>
        <ItemOne>
          <strong>Objeto</strong>
        </ItemOne>
        <p>
          El presente Contrato de Afiliación tiene como objeto regular los
          Términos y Condiciones bajo los cuales Treinta ofrece el servicio de
          facilitador de Pagos. Tal servicio se concreta mediante (i) la venta
          de un Datáfono al Usuario y (ii) el acceso por parte del Usuario al
          sistema operativo que procesa dichos Pagos y traspasa los recursos
          económicos del Cliente al producto financiero del Usuario. Así mismo,
          tiene por objeto clarificar las particularidades del mandato
          encomendado a Treinta, quien recauda y procesa los Pagos en
          representación y por cuenta del Usuario y, posteriormente, transfiere
          el dinero de los Pagos al producto financiero del Usuario.
        </p>
        <p>
          {' '}
          El Usuario no requiere ningún convenio financiero para el uso de los
          productos y servicios ofrecidos mediante el presente Contrato, excepto
          un producto bancario receptor de los fondos pagados por sus Clientes.
        </p>
        <ol type="a">
          <ItemTwo>
            {' '}
            <p>
              Para hacer uso de los servicios ofrecidos por Treinta, el Usuario
              debe abrir y mantener una Cuenta Treinta en la aplicación de
              Treinta, la cual se encuentra ligada a una cuenta de ahorros o
              depósito electrónico de una entidad financiera autorizada para tal
              fin. El Usuario autoriza expresamente a Treinta para recibir,
              transferir, retener y/o, de cualquier forma, disponer de los
              recursos ligados a su Cuenta Treinta, con el propósito de liquidar
              el importe de los Pagos realizados a favor del Usuario.
            </p>
          </ItemTwo>
          <ItemTwo>
            <p>
              Treinta administrará las sumas recaudadas en favor del Usuario a
              título de mandato y, por tanto, no está autorizado ni tiene por
              objeto captar recursos del público. Dichos recursos no constituyen
              depósitos ni se reconoce remuneración por las sumas recaudadas por
              cuenta del Usuario. Los recursos recaudados en virtud del
              mencionado mandato no se encuentran garantizados por ninguna
              entidad gubernamental.
            </p>
            <p>
              El Usuario reconoce que Treinta no hace parte de los contratos
              comerciales que celebra con sus Clientes, ni tiene injerencia
              alguna en la fabricación, importación, explotación, distribución o
              comercialización de los bienes y/o servicios que ofrece.
            </p>
          </ItemTwo>
          <ItemTwo>
            Treinta no tiene injerencia ni obligación alguna frente al
            cumplimiento de las obligaciones de naturaleza tributaria y/o
            cambiaria del Usuario. Éste reconoce ser el único responsable de
            conocer y cumplir con la legislación que le sea aplicable.
          </ItemTwo>
          <ItemTwo>
            Treinta no garantiza la autenticidad o legalidad de las
            Transacciones que se procesan a través de las Tarjetas Bancarias de
            los Clientes del Usuario.
          </ItemTwo>
          <ItemTwo>
            Treinta se reserva la posibilidad de suspender el uso de los
            servicios enunciados en el presente documento por causas derivadas
            de mantenimiento y/o actualizaciones de la aplicación móvil que no
            permitan su correcto funcionamiento. Así mismo, Treinta no se hace
            responsable por las fallas que se puedan presentar en los
            procesadores, autorizadores, entidades bancarias y/o demás entidades
            que participen en el procesamiento de Pagos.
          </ItemTwo>
        </ol>
        <ItemOne>
          <strong>Afiliación</strong>
        </ItemOne>
        <p>
          Cualquier Usuario, ya sea una personas natural o jurídica, podrá
          afiliarse a Treinta siempre que tengan plena capacidad para celebrar
          contratos por sí misma y, en el evento en que sea una persona
          jurídica, esté legalmente constituida de conformidad con las leyes de
          la República de Colombia y el objeto del presente documento se
          encuentre en los límites dispuestos en su objeto social.
        </p>
        <p>
          {' '}
          Para completar el proceso de afiliación, el Usuario deberá diligenciar
          el formulario de registro, adjuntar la documentación requerida,
          aceptar los Términos y Condiciones que se encuentran en el presente
          documento y en general cumplir con los requisitos establecidos por
          Treinta.
        </p>{' '}
        <ol type="a">
          <ItemTwo>
            Treinta podrá requerir información o documentación adicional para la
            validación de la Cuenta Treinta y, en caso de que no sea
            proporcionada dentro de las veinticuatro (24) horas siguientes al
            envío de la solicitud, la Cuenta Treinta podrá ser suspendida.
            Treinta se reserva el derecho de consultar al Usuario, su
            representante legal y demás relacionados con éste, en bases de datos
            nacionales e internacionales, con el fin de procurar el cabal
            cumplimiento de las Políticas sobre Lavado de Activos y
            Financiamiento del Terrorismo y las Políticas de Protección de Datos
            Personales, entre otras.
          </ItemTwo>
          <ItemTwo>
            Treinta se reserva el derecho de, a su entera discreción y en
            cualquier momento, cancelar, rechazar o suspender de manera temporal
            o definitiva la afiliación del Usuario y/o su Cuenta Treinta,
            especialmente cuando detecte inconsistencias en la información
            recibida y recaudada y/o se evidencien acciones sospechosas que
            contraríen las políticas de Treinta.
          </ItemTwo>
          <ItemTwo>
            Si bien Treinta se reserva el derecho a abstenerse de habilitar
            discrecionalmente la Cuenta Treinta del Usuario por cualquier
            motivo, esté procurará habilitar tal Cuenta posterior al suministro
            de la totalidad de la información requerida.
          </ItemTwo>
          <ItemTwo>
            Los servicios ofrecidos por Treinta deben ser utilizados a nombre
            propio o, en caso de ser una persona jurídica, en representación del
            Usuario. Lo anterior implica una prohibición expresa de ceder o
            conceder autorizaciones de uso a terceros, salvo que medie
            autorización previa y expresa de Treinta.
          </ItemTwo>
        </ol>
        <ItemOne>
          <strong>Duración</strong>
        </ItemOne>
        <p>
          El presente Contrato tendrá una duración indefinida y cualquiera de
          las Partes podrá terminar unilateralmente, sin motivación alguna,
          mediante aviso escrito con una anticipación mínima de diez (10) días
          calendario. La terminación unilateral por cualquiera de las Partes no
          causará indemnización o penalidad alguna.
        </p>
        <ItemOne>
          <strong>Política de tarifas y Pagos</strong>
        </ItemOne>
        <ol type="a">
          <ItemTwo>
            Tarifas
            <p>
              La venta del POS al Usuario tendrá un costo de [PENDIENTE]. Por lo
              demás, por cada Transacción que se realice a través del sistema
              operativo habilitado por Treinta, se generará un cobro automático
              al Comercio de [PENDIENTE] del valor de tal Pago. Las tarifas
              cobradas serán aquellas vigentes al momento de la aceptación de
              los Términos y Condiciones, cuyo valor estará publicado en la
              página [URL].
            </p>
            <p>
              Las mencionadas tarifas incrementarán anualmente conforme al
              ajuste del IPC correspondiente sin necesidad de notificación
              alguna al Usuario. Por lo demás, Treinta se reserva el derecho
              unilateral a aumentar sus tarifas en los siguientes eventos: (i)
              cuando concurran circunstancias macroeconómicas que así lo
              justifiquen; (ii) cuando existan cambios normativos que lo
              soporten; (iii) cuando el modelo de negocio de Treinta sufra
              cambios considerables; y (iv) cuando haya un incremento en los
              costos y condiciones impuestas por proveedores o terceros de los
              cuales dependa el funcionamiento del sistema operativo habilitado
              por Treinta, entre otros. En el evento en el que se configure un
              incremento, Treinta notificará al Usuario con una antelación
              mínima de quince (15) días calendario antes de que se causé el
              ajuste. El Usuario podrá terminar el presente Contrato por la
              modificación de tarifas con la antelación señalada en la sección 5
              del presente documento. Por lo demás, las nuevas condiciones
              comunicadas se entenderán aceptadas tácitamente para la
              realización de las Transacciones con posterioridad al vencimiento
              del término de antelación de la notificación respectiva.
            </p>
            <p>
              Las Partes acuerdan que las tarifas causadas con ocasión del
              presente Contrato corresponden a (i) un porcentaje de la venta del
              bien y/o servicio ofrecido al Cliente del Usuario y (ii) se causan
              exclusivamente por el uso de Tarjetas Bancarias por parte de los
              Clientes del Usuario.
            </p>
          </ItemTwo>

          <ItemTwo>
            Pagos
            <p>
              Los Pagos realizados por el Cliente del Usuario será comunicado a
              las Partes de dicha Transacción y los dineros serán depositados al
              producto financiero convenido por las Partes. Lo anterior con
              excepción de (i) el pago de la prestación del servicio objeto del
              presente Contrato; (ii) la suma que el Usuario adeude a Treinta
              por cualquier concepto derivado del Contrato; y (iii) cualquier
              Contracargo, devolución, ajuste, cuota, tributo, tasa y/o
              penalización que haya lugar.
            </p>
            <p>
              Considerando la naturaleza de la relación de mandato entre Treinta
              y el Usuario, éste último asumirá cualquier pago que se cause por
              concepto de impuesto, tasa, contribución o cualquier tributo
              producto de la Transacción. Para el efecto, y en caso de
              requerirlo, Treinta expedirá a favor del Usuario los certificados
              que haya lugar.
            </p>
            <p>
              En el evento en que el Usuario reciba un pago a través del
              servicio ofrecido por Treinta que no le corresponda, por virtud de
              las operaciones celebradas con sus Clientes, el primero deberá
              notificarlo a Treinta y se obliga expresamente a devolver el monto
              del pago realizado de forma indebida. En caso de no hacerlo,
              Treinta se reserva el derecho de retener el dinero del Usuario al
              que tenga acceso en la Cuenta Treinta, hasta tanto no pague la
              suma entregada indebidamente. Ahora bien, en caso tal de que el
              Usuario inserte erradamente la información asociada a la cuenta
              destino de la Transacción, Treinta queda indemne de cualquier
              responsabilidad en relación con las transferencias de dinero
              erróneas y el Usuario deberá responder directamente por tales
              hechos ante su Cliente. Los pagos y tarifas que se llegaran a
              adeudar por virtud del presente Contrato, no podrán ser cedidos a
              ningún tercero.
            </p>
          </ItemTwo>
        </ol>
        <ItemOne>
          <strong>Obligaciones</strong>
        </ItemOne>
        <ol type="a">
          <ItemTwo>
            Obligaciones de Treinta
            <p>
              Por virtud del presente Contrato, Treinta se obliga a hacer el
              envío del Datáfono solicitado por el Usuario y a prestar los
              servicios de procesamiento y transferencia de Pagos a los Usuarios
              de forma diligente y competente, garantizando al máximo la
              seguridad y el éxito de las Transacciones. Sin perjuicio de lo
              anterior, Treinta no ofrece garantía alguna sobre la
              disponibilidad, oportunidad, calidad, seguridad, continuidad o
              idoneidad de los Pagos realizados. El Usuario entiende y acepta
              que Treinta no es responsable frente a él o sus Clientes respecto
              de la continuidad de los servicios enunciados en el presente
              documento y/o los riesgos a los que se encuentra expuesta la
              infraestructura tecnológica del sistema de pagos de Treinta y sus
              proveedores. Sin embargo, Treinta se compromete a emplear su mejor
              esfuerzo para implementar las medidas preventivas y correctivas
              que razonablemente deban emplearse para la prestación efectiva del
              servicio al Usuario.
            </p>
          </ItemTwo>

          <ol type="i">
            <ItemThree>
              Las obligaciones adquiridas por Treinta con ocasión del presente
              Acuerdo, excluyendo aquella relacionada con el envío del Datáfono
              al Usuario, son de medio y no de resultado.
            </ItemThree>
            <ItemThree>
              <p>
                Treinta empleará esfuerzos razonables para mantener su
                plataforma disponible y procesar las Transacciones ágilmente.
                Sin embargo, se exime del retardo en el procesamiento de
                Transacciones en razón a horarios, procesos bancarios, o fallas
                en el servicio de los demás agentes que intervienen o inciden en
                el procesamiento de Pagos. En general, Treinta no será
                responsable de los eventos que excedan su control en el
                procesamiento de los mencionados Pagos. Por otro lado, Treinta
                no asume el riesgo de fraude por suplantación de identidad de
                los Clientes del Usuario.
              </p>
              <p>
                La responsabilidad de Treinta se limitará a la puesta a
                disposición del Usuario del procesamiento de prevención de
                fraude realizado por Treinta. El Usuario asume de manera
                exclusiva y en su totalidad el fraude realizado. Treinta no
                garantiza la funcionalidad de las herramientas que emplee para
                mitigar los riesgos a los que se encuentre expuesta la
                tecnología utilizada para el procesamiento de Pagos.
              </p>
            </ItemThree>
            <ItemThree>
              Treinta transferirá el Pago del Cliente del Usuario al Usuario en
              el término de [PENDIENTE]. Sin embargo, Treinta no se exenta de la
              ocurrencia ocasional de retrasos en la transferencia, a pesar de
              emplear sus esfuerzos razonables a fin de lograrlo.
            </ItemThree>
            <ItemThree>
              <p>
                Treinta proporcionará recibos electrónicos de las Transacciones
                de pago mediante correo electrónico y proporcionará copia
                digital al Cliente del Usuario mediante correo electrónico o
                mensaje SMS.
              </p>
              <p>
                El Usuario consiente de manera libre y expresa que en los
                recibos electrónicos generados, o en cualquier otro tipo de
                constancia física o electrónica de la Transacción, se precisen
                datos suyos incluyendo pero sin limitarse a, nombre completo o
                razón social, tipo y número de identificación, correo
                electrónico, domicilio y teléfono de contacto.
              </p>
            </ItemThree>
            <ItemThree>
              Treinta le otorga al Usuario una licencia no exclusiva y no
              transmisible de uso del sistema operativo para el procesamiento de
              Pagos y el traspaso de los recursos económicos entre el Usuario y
              sus Clientes.
            </ItemThree>
            <ItemThree>
              La responsabilidad contractual de Treinta frente al Usuario se
              limitará a los daños materiales directos, cuantificables,
              comprobables y previsibles que se atribuyan a las acciones u
              omisiones de Treinta. En ese sentido, se exime de responder por
              daños catalogados como lucro cesante, pérdida de oportunidad de
              negocio, pérdida de reputación, daños indirectos, incidentales,
              consecuenciales, morales u otros de naturaleza análoga.
            </ItemThree>
            <ItemThree>
              El grado de diligencia que debe emplear Treinta en el desarrollo
              de las obligaciones precisadas en el Contrato es el de un
              comerciante en el giro ordinario de sus negocios y estará exento
              ante cualquier falla ocurrida por eventos de fuerza mayor o caso
              fortuito que impida el funcionamiento normal del servicio prestado
              al Usuario.
            </ItemThree>
            <ItemThree>
              Treinta no tiene responsabilidad alguna por las fallas del
              servicio prestado por terceros, incluyendo aquellas relacionadas
              con la cobertura de red inalámbrica integrada en los POS. Sin
              embargo, empleará sus esfuerzos razonables para procurar que,
              siempre que sea posible, el tercero correspondiente aplique las
              medidas correctivas que haya lugar para garantizar una prestación
              del servicio efectiva.
            </ItemThree>
            <ItemThree>
              Treinta no es responsable por los costos, tributos y gastos en que
              incurra el Usuario derivados del presente Contrato de mandato. No
              obstante, Treinta hará las retenciones tributarias que se le
              exijan de conformidad con la legislación que le sea aplicable a la
              actividad que desarrolla por virtud de lo aquí descrito. Así
              mismo, se hará responsable ante la DIAN de hacer los reportes que
              surjan a partir del presente Contrato de información exógena de la
              que trata el artículo 631 del Estatuto Tributario.
            </ItemThree>
            <ItemThree>
              Treinta se compromete a brindar asesoría y soporte de los
              servicios prestados a través de su aplicación, siempre que ésta
              sea debidamente instalada en los dispositivos móviles de los
              Usuarios. Sin embargo, se hace la salvedad de que la aplicación
              podrá no estar disponible debido a fallas o a mantenimiento
              requerido para su correcto funcionamiento.
            </ItemThree>
            <ItemThree>
              En todo caso, Treinta podrá ceder el presente Contrato previa
              notificación al Usuario.
            </ItemThree>
          </ol>
        </ol>
        <ItemOne>
          <strong>Obligaciones del Usuario</strong>
        </ItemOne>
        <p>
          El Usuario será responsable del correcto uso del Datáfono y del
          sistema operativo puesto a disposición de éste por Treinta.
        </p>
        <p>
          Treinta no se hace responsable ni garantiza el cumplimiento de las
          obligaciones contraídas entre el Usuario y sus Clientes toda vez que
          actúa exclusivamente como mandatario para la aceptación,
          procesamiento, gestión de cobro, recaudo y dispersión de los Pagos.
          Por lo tanto, Treinta se encuentra exento de cualquier perjuicio que
          pueda sufrir el Usuario o sus Clientes con ocasión de las
          Transacciones que lleven a cabo.
        </p>
        <ol type="i">
          <ItemTwo>
            El Usuario deberá acatar todas las recomendaciones de seguridad al
            procesar Pagos en su negocio utilizando el Datáfono vendido por
            Treinta, los cuales se encuentran descritas en los Manuales de
            Seguridad y condiciones de uso de los Datáfonos dispuestos por
            Treinta como anexo [x], los cuales hacen parte integral del presente
            documento y se encuentran disponibles en [URL].
          </ItemTwo>
          <ItemTwo>
            El Usuario se obliga a tomar las medidas idóneas de seguridad para
            el correcto almacenamiento de la información relativa a sus Clientes
            y las Transacciones respectivas y/o la Cuenta Treinta. Entre las
            medidas se incluye, sin limitarse a: (i) acatar e implementar las
            directrices y recomendaciones que Treinta determine; (ii) contar con
            los procedimientos o sistemas de prevención, control y seguridad que
            cubran los riesgos de fraude; (iii) designar personal de confianza y
            manejo para la operación del POS y prevenir el acceso no autorizado
            de terceros a tal dispositivo; (iv) abstenerse de facilitar a
            terceros los dispositivos conectados a la plataforma de Treinta para
            la realización de ventas ajenas a las celebradas directamente por el
            Usuario; y (v) realizar las instalaciones y actualizaciones
            necesarias para la operación adecuada del POS y el sistema de pagos
            habilitado cada vez que Treinta así lo solicite.
          </ItemTwo>
          <ItemTwo>
            El Usuario se obliga a utilizar el POS vendido por Treinta
            exclusivamente para el procesamiento de las operaciones habilitadas
            dentro de la red de aceptación de Pagos. El Usuario se compromete a
            mantener control sobre el acceso y la utilización del POS y a
            abstenerse de permitir su manipulación por personal ajeno a las
            Partes del presente Contrato. Éste asumirá la responsabilidad por
            irregularidades que puedan cometer sus empleados o asociados por la
            operación irregular del POS.
          </ItemTwo>
          <ItemTwo>
            En general, el Usuario estará obligado a:
            <ol type="a">
              <ItemThree>
                Alertar a Treinta sobre Transacciones Fraudulentas o aquellas
                que se salgan de los parámetros habituales que puedan
                potencialmente implicar un riesgo;
              </ItemThree>
              <ItemThree>
                Cumplir con los deberes tributarios, cambiarios y aduaneros
                derivados del desarrollo de su negocio cuyos Pagos sean a través
                del POS y el sistema de pagos habilitado por Treinta;
              </ItemThree>
              <ItemThree>
                Suministrar información cierta, fidedigna, clara, suficiente y
                actualizada del Usuario, de los bienes y/o servicios que provee,
                del precio a pagar y de la entrega de los mismos, en el evento
                en el que Treinta así lo requiera y mientras se mantenga activa
                la Cuenta Treinta. La falta de actualización de la información
                disponible en la aplicación de Treinta la exonera de cualquier
                reclamación sobre la falta de notificación correspondiente.
                Adicionalmente autoriza a Treinta a solicitar información
                relacionada con su situación patrimonial, financiera, crediticia
                y transaccional, así como la facultad de compartir dicha
                información, bajo las condiciones de confidencialidad
                necesarias, con el objeto de optimizar el servicio prestado por
                Treinta. Finalmente, autoriza a Treinta a verificar su
                comportamiento crediticio en las centrales de riesgo;
              </ItemThree>
              <ItemThree>
                Aceptar las Tarjetas Bancarias que se pueden procesar a través
                del POS y vender los bienes y/o servicios en los mismos precios
                y condiciones que se ofrecen bajo otro método de pago, sin
                perjuicio de los eventos promocionales que se hagan de
                conformidad con la legislación vigente aplicable;
              </ItemThree>
              <ItemThree>
                Suministrar oportunamente la información requerida por Treinta
                en el evento en el que el Usuario requiera cambiar el producto
                financiero asociado a la Cuenta Treinta. Una vez obtenida la
                documentación solicitada, Treinta realizará la modificación
                correspondiente;
              </ItemThree>
              <ItemThree>
                Asumir con diligencia los reclamos que presenten sus Clientes
                respecto de la cantidad, calidad, idoneidad, seguridad y entrega
                de los bienes y/o servicios vendidos. Así las cosas, Treinta
                estará exento de toda responsabilidad por este concepto.
                Cualquier reclamación que sea dirigida a Treinta será notificada
                al Usuario, y, en todo caso, éste dispondrá de un término de
                máximo dos (2) días hábiles para enviarle a su Cliente respuesta
                sobre el requerimiento remitido, del cual deberán enviar una
                copia al correo electrónico hola@treinta.co. El incumplimiento
                de tal término puede conllevar a una suspensión de la Cuenta
                Treinta hasta tanto no se compruebe que el Usuario haya
                respondido tal solicitud;
              </ItemThree>
              <ItemThree>
                Expedir y archivar, durante por lo menos diez y ocho (18) meses
                posteriores a la Transacción, copia de la factura derivada del
                contrato celebrado con sus Clientes y copia del documento que dé
                cuenta de la entrega del producto y/o prestación del servicio
                correspondiente. El Usuario deberá suministrar tales soportes en
                el plazo máximo de un (1) día hábil en caso de que así lo
                requiera Treinta;
              </ItemThree>
              <ItemThree>
                Indemnizar a Treinta por cualquier demanda o reclamo que
                realicen Clientes o terceros con ocasión de (i) el uso indebido
                o fraudulento del POS y/o el sistema de pagos habilitado por
                Treinta el cual sea atribuible al Usuario; (ii) el
                incumplimiento de las obligaciones contenidas en este Contrato;
                y (iii) en general, cualquier otra causa que le sea atribuible y
                que tenga como consecuencia un daño o perjuicio para Treinta;
              </ItemThree>
              <ItemThree>
                No utilizar el POS ni el sistema habilitado por Treinta para
                facilitar, ocultar, manejar, invertir o aprovechar de cualquier
                forma activos provenientes de actividades ilícitas, o para dar
                apariencia de legalidad a actividades ilícitas y/o a activos
                vinculados con las mismas. Los Usuarios podrán,
                excepcionalmente, desarrollar actividades económicas de alto
                riesgo, siempre y cuando se cuente con la aprobación previa y
                escrita por parte de Treinta.
              </ItemThree>
              <ItemThree>
                Permitir la exhibición de calcomanías y demás material
                publicitario que identifique su afiliación con Treinta y de las
                Franquicias de Tarjetas. El Usuario se abstendrá de utilizar la
                mencionada publicidad en establecimientos de terceros ajenos al
                presente Contrato.
              </ItemThree>
              <ItemThree>
                Autorizar a Treinta a que sus funcionarios, ya sean propios o
                terceros autorizados, realicen visitas de seguridad
                periódicamente a sus puntos de venta y, en casos de extrema
                necesidad, auditorías de su negocio de manera directa o a través
                de terceros.
              </ItemThree>
              <ItemThree>
                Autorizar a Treinta para que registre al Usuario bajo la
                categoría MCC.
              </ItemThree>
              <ItemThree>
                Cumplir con la normativa aplicable con ocasión de su actividad
                comercial.
              </ItemThree>
              <ItemThree>
                Asumir los costos y gastos en que incurra con ocasión de la
                ejecución del presente Contrato de mandato.
              </ItemThree>
            </ol>
          </ItemTwo>
          <ItemTwo>
            Con respecto a las ventas realizadas a través del POS, el Usuario se
            obliga a:
            <ol type="a">
              <ItemThree>
                Realizar una verificación visual minuciosa sobre la identidad
                del titular inscrito en las Tarjetas Bancarias y el Cliente que
                las utiliza. Se deberá identificar: (i) que la Tarjeta Bancaria
                no esté vencida; (ii) que el número de cuenta grabado en la
                Tarjeta Bancaria coincida con los últimos cuatro dígitos que
                aparece en el reverso de la misma; (iii) que la Tarjeta Bancaria
                cuente con la firma del titular y que dicha firma coincida con
                aquella realizada por el Cliente, en caso de que se requiera;
                (iv) que la Tarjeta Bancaria no tenga ningún indicio de haber
                sido alterada; y (v) que, cuando se deba presentar un documento
                de identificación, el nombre y la firma grabados en la Tarjeta
                Bancaria coincidan con el nombre y la firma grabados en el
                mencionado documento de identificación. En el evento en el que
                el Usuario evidencie discrepancias que puedan potencialmente
                implicar un riesgo de fraude, éste deberá retener el documento
                de identidad presentado y/o la Tarjeta Bancaria respectiva y
                tendrá la obligación de notificar oportunamente a Treinta.
              </ItemThree>
              <ItemThree>
                Abstenerse de realizar adaptaciones, reparaciones o cualquier
                tipo de manipulación del POS, directamente o a través de
                terceros.
              </ItemThree>
              <ItemThree>
                Utilizar el POS en lugares distintos a la ubicación señalada en
                el trámite de vinculación, excepto cuando se cuente con el
                consentimiento previo de Treinta.
              </ItemThree>
              <ItemThree>
                Permitir la inspección, programación, reconfiguración,
                mantenimiento y revisión de los POS vendidos por Treinta.
              </ItemThree>
            </ol>
          </ItemTwo>
          <ItemTwo>
            Treinta empleará esfuerzos razonables para mantener su plataforma
            disponible y procesar las Transacciones ágilmente. Sin embargo, se
            exime del retardo en el procesamiento en razón a horarios o procesos
            bancarios, o de fallas en el servicio de los demás agentes que
            intervienen o inciden en el procesamiento de Pagos. En general,
            Treinta no será responsable de los eventos que excedan su control en
            el procesamiento de los mencionados Pagos. Por otro lado, Treinta no
            asume el riesgo de fraude por suplantación de identidad de los
            Clientes del Usuario ni garantiza la funcionalidad de los sistemas
            que ponga a disposición del Usuario.
          </ItemTwo>
          <ItemTwo>
            El Usuario reconoce la naturaleza y las consecuencias de los
            Contracargos, incluyendo, sin limitarse a, la responsabilidad de
            reembolsar el dinero de la Transacción cuando dicho Contracargo
            resulte favorable para su Cliente. En el evento en el que el Emisor
            haya debitado de la cuenta de Treinta el saldo de la Transacción, el
            Usuario deberá reembolsar a Treinta dicha suma de dinero en el
            término de cinco (5) días hábiles, sin perjuicio de los intereses de
            mora que se haya podido causar por la demora del pago del Usuario.
            Lo anterior sin excluir las medidas legales que Treinta pueda
            emplear para resarcir el daño y/o perjuicio causado.
          </ItemTwo>
          <ItemTwo>
            Treinta tiene el derecho de modificar o cambiar la relación con sus
            aliados tecnológicos, incluyendo el Adquirente, sin previo aviso ni
            autorización por parte de los Usuarios o cualquier tercero.
          </ItemTwo>
        </ol>
        <ItemOne>
          <strong>
            Responsabilidad del Usuario por fraude, retención o débito de saldos
          </strong>
        </ItemOne>
        <p>
          El Usuario es responsable y asume el riesgo de fraude cuando en
          visitas y/o investigaciones ordenadas por Treinta, el Adquirente o las
          Franquicias de Tarjetas se verifique (i) su posible falta de
          diligencia frente a las obligaciones a su cargo relacionada con fuga
          de información, error en la identificación del Cliente del Usuario o
          de la Tarjeta Bancaria, seguridad en el almacenamiento y uso de
          información, perfeccionamiento de Transacciones en el comercio del
          Usuario; y/o (ii) su injerencia en la comisión de fraude, ya sea
          directamente, en el caso de que el Usuario sea una persona natural, o
          a través de alguno de sus directores, funcionarios o terceros
          autorizados, en el caso de que sea una persona jurídica. Así las
          cosas, el Usuario deberá cumplir cabalmente con las obligaciones y
          procedimientos impuestos por Treinta, el Adquirente y las Franquicias
          de Tarjetas para proteger la seguridad de los consumidores
          financieros. Para los Pagos a través del POS, el Usuario deberá
          cumplir con las verificaciones manuales de los datos respectivos,
          atendiendo a lo precisado en la sección 8 del presente documento.
        </p>
        <ItemOne>
          <strong>Modificaciones</strong>
        </ItemOne>
        <p>
          Treinta podrá modificar el presente Contrato unilateralmente,
          notificando al Usuario con una antelación mínima de quince (15) días
          sobre los cambios en cuestión. El Usuario, por su parte, tendrá la
          carga de revisar periódicamente su correo electrónico y su Cuenta
          Treinta con el objetivo de validar si el presente Contrato será
          modificado. Vencido el término anteriormente señalado sin que se
          reciban objeciones por parte del Usuario, se entenderán aceptadas las
          citadas modificaciones. En el evento en el que el Usuario rechace las
          modificaciones, se entenderá terminado unilateralmente el presente
          Acuerdo, en los términos establecidos en la sección 5 del presente
          Contrato, y se procederá a deshabilitar la Cuenta Treinta del Usuario.
        </p>
        <ItemOne>
          <strong>Prohibiciones</strong>
        </ItemOne>
        <p>
          En el caso en que Treinta considere que se ha utilizado su servicio
          para el desarrollo de actividades ilícitas o de alto riesgo, sin
          previa autorización, podrá rechazar, cancelar, suspender o reversar
          una solicitud de Pago, limitar el acceso del Usuario y su uso de la
          Cuenta Treinta y/o su cancelación definitiva sin que medie
          responsabilidad alguna. Lo anterior sin perjuicio de las acciones
          legales pertinentes que se puedan iniciar en contra del Usuario
          infractor.
        </p>
        <p>
          El Usuario será responsable de cualquier daño y/o perjuicio que se
          pudiera ocasionar a los operadores de Treinta, sus agentes, filiales o
          subsidiarias, funcionarios, empleados, directores, partes relacionadas
          o cualquier otra persona que tenga acceso al sistema de Treinta.
        </p>
        <p>
          Por otro lado, el Usuario se compromete a no incurrir en las
          siguientes prácticas:
        </p>
        <ol type="a">
          <ItemTwo>
            Exigir límites mínimos de pago para la aceptación de Tarjetas
            Bancarias;
          </ItemTwo>
          <ItemTwo>
            Aplicar precios superiores o comisiones adicionales por el uso de
            Tarjetas Bancarias;
          </ItemTwo>
          <ItemTwo>
            Llevar a cabo Transacciones por fuera del territorio colombiano a
            través del sistema operativo habilitado por Treinta;
          </ItemTwo>
          <ItemTwo>
            Discriminar entre Tarjetas Bancarias según su Franquicia, Emisor o
            cualquier otro motivo;{' '}
          </ItemTwo>
          <ItemTwo>
            Presentar para su procesamiento cualquier Transacción no originada
            de un pago directo entre el Usuario y su Cliente o presentar
            cualquier Transacción Fraudulenta o no autorizada por su Cliente;
          </ItemTwo>
          <ItemTwo>
            Presentar para su procesamiento Transacciones que representen la
            refinanciación de una obligación existente del Cliente con el
            Usuario o con terceros;
          </ItemTwo>
          <ItemTwo>
            Realizar Transacciones que requieran que el Cliente del Usuario
            renuncie a su derecho a controvertir el Pago como fraudulento;
          </ItemTwo>
          <ItemTwo>
            Negociar el canje de los fondos de las Tarjetas Bancarias por dinero
            en efectivo, títulos de crédito, títulos valores o similares;
          </ItemTwo>
          <ItemTwo>
            Usar o almacenar la información del Cliente del Usuario para fines
            distintos al de perfeccionar el Pago por los bienes y/o servicios
            ofrecidos;
          </ItemTwo>
          <ItemTwo>
            Intercambiar, suministrar o divulgar a cualquier título o por
            cualquier medio, datos relacionados con la Transacción, las Tarjetas
            Bancarias y el POS, salvo por requerimiento expreso de Treinta, las
            Franquicias de Tarjetas, el Adquirente o alguna autoridad judicial o
            administrativa.
          </ItemTwo>
          <ItemTwo>
            Alquilar o suministrar a terceros el POS para realizar Transacciones
            indebidas.{' '}
          </ItemTwo>
          <ItemTwo>
            Ceder el presente Contrato, o cualquiera de las obligaciones
            resultantes del mismo, parcial o totalmente, a terceros, así como
            sublicenciar, copiar, publicar o distribuir el servicio de pagos
            habilitado por Treinta.{' '}
          </ItemTwo>
        </ol>
        <ItemOne>
          <strong>Seguridad de la información</strong>
        </ItemOne>
        <p>
          El Usuario deberá seguir los procedimientos e instrucciones de
          seguridad impartidas por Treinta, de conformidad con lo señalado en el
          Manual de Seguridad de uso del Datáfono, el cual hace parte integral
          del presente Contrato como anexo [X]. Los procedimientos e
          instrucciones de seguridad, los cuales podrán ser modificados y
          actualizados por Treinta, conforme lo estime conveniente, se
          encuentran actualizados en [URL].
        </p>
        <p>
          El Usuario es responsable de garantizar que sus datos de registro y
          contraseña de su Cuenta Treinta, así como otra información de acceso a
          los bienes y servicios ofrecidos, se conserven en un lugar seguro. Así
          mismo, el Usuario es responsable de que dicha información sensible no
          sea divulgada a terceros, de forma tal que el servicio permanezca
          inaccesible a personas no autorizadas.
        </p>
        <p>
          El Usuario acepta expresamente que Treinta puede revelar información
          financiera de los participantes del Sistema de Pagos de Bajo Valor, de
          conformidad con las reglas establecidas por las Franquicias de
          Tarjetas y siguiendo los parámetros de tratamiento de datos personales
          establecidos en la Ley 1266 de 2008 y la demás legislación vigente
          aplicable.{' '}
        </p>
        <ItemOne>
          <strong>Protección al consumidor financiero</strong>
        </ItemOne>
        <p>
          El Usuario deberá velar por el debido cumplimiento de las
          disposiciones legales que regulen su actividad y/o que apliquen a los
          diferentes tipos de venta, lo cual incluye las disposiciones que
          versan sobre publicidad engañosa, garantía mínima presunta, derecho de
          retracto, y demás provisiones dirigidas a la protección del consumidor
          financiero, atendiendo a la reglamentación incluida en la Ley 1328 de
          2009, entre otras aplicables.
        </p>
        <ItemOne>
          <strong>Servicio de PQRs</strong>
        </ItemOne>
        <p>
          Cualquier inquietud, queja o reclamo acerca de los productos y/o
          servicios de los que trata este Contrato, deberá ser informado por los
          diferentes métodos de contacto que se encuentran habilitados y
          disponibles en [URL]. Treinta no se hace responsable por las
          respuestas no oportunas a inquietudes, quejas o reclamos realizados
          por canales diferentes a aquellos dispuestos para el efecto.
        </p>
        <ItemOne>
          <strong>Gestión de Contracargos</strong>
        </ItemOne>
        <p>
          El Cliente del Usuario podrá presentar un Contracargo en los
          siguientes eventos, así como cualquier otro contemplado en la
          legislación aplicable y en las políticas y reglamentos internos de las
          Franquicias de Tarjetas: (i) el desconocimiento expreso de la compra;
          (ii) la presencia de un fraude por suplantación de identidad; y (iii)
          la disputa con el Usuario acerca de la calidad del producto y/o
          servicio adquirido.
        </p>
        <p>
          Una vez notificados los Contracargos a Treinta por parte del Emisor,
          Treinta notificará al Usuario sobre el particular, sugiriendo la
          documentación que deberá enviar para probar la licitud de la relación
          con su Cliente. Tal documentación deberá ser enviada en los plazos
          indicados por Treinta, atendiendo a la información dada por el Emisor.
          En el evento en el que se incumpla el plazo precisado, Treinta podrá
          suspender la Cuenta Treinta y retener el saldo correspondiente a la
          Transacción controvertida hasta que se esclarezcan los motivos del
          Contracargo. En el evento en el que se realice cualquier débito de la
          cuenta de Treinta producto del Contracargo, tal suma será a su vez
          debitada de la Cuenta Treinta del Usuario o del saldo de futuras
          ventas que realice el Usuario. Adicionalmente, la suma adeudada podrá
          ser debitada o compensada de los demás productos que maneje el Usuario
          mediante la plataforma de Treinta (por ejemplo, ventas mediante el
          link de pagos PSE habilitado).
        </p>
        <p>
          El procedimiento de Contracargos es llevado por el Emisor conforme a
          lo establecido en las políticas particulares de cada una de las
          Franquicias de Tarjetas y, por tanto, tal procedimiento es ajeno a
          Treinta. En ese sentido, Treinta estará exenta de cualquier
          responsabilidad que pueda sobrevenir con ocasión del procedimiento ni
          de la veracidad, validez o idoneidad de la información aportada por el
          Usuario. Lo anterior sin perjuicio de las acciones legales que pueda
          entablar Treinta, el Emisor o cualquier tercero legitimado, en contra
          del Usuario por la entrega de información falsa o adulterada. Las
          políticas de las Franquicias de Tarjeta que regulan el asunto, pueden
          ser consultadas por el Usuario y sus Clientes en el siguiente enlace:
          [URL].
        </p>
        <ItemOne>
          <strong>Política sobre Reversiones</strong>
        </ItemOne>
        <p>
          Atendiendo a la legislación vigente, particularmente la Ley 1480 de
          2011, el Cliente del Usuario podrá presentar la Reversión de un Pago
          realizado directamente al Usuario utilizando el POS dispuesto por
          Treinta, en los siguientes eventos: (i) ante la presencia de fraude;
          (ii) cuando la compra no sea autorizada; y (iii) cuando el artículo no
          se haya entregado, no corresponda al adquirido, esté defectuoso o su
          calidad no corresponda a la descrita por el Usuario, entre otros. Ante
          la ocurrencia de tales circunstancias, el Cliente del Usuario
          dispondrá de cinco (5) días hábiles a partir de la fecha que tuvo
          noticia de tal ocurrencia, para solicitar la Reversión ante el Usuario
          o ante Treinta y para notificar al Emisor, quien procederá a reversar
          la Transacción al Cliente del Usuario.{' '}
        </p>
        <p>
          Treinta notificará al Usuario respecto de la solicitud de Reversión
          sugiriendo la documentación que deberá enviar para probar la licitud
          de la relación con su Cliente. Tal documentación deberá ser enviada en
          los plazos indicados por Treinta, atendiendo a la información dada por
          el Emisor. En el evento en el que se incumpla con el plazo señalado,
          Treinta podrá suspender la Cuenta Treinta y retener el saldo
          correspondiente a la Transacción controvertida hasta que se
          esclarezcan los motivos de la Reversión. En el evento en el que el
          Emisor realice cualquier débito de la cuenta de Treinta, producto de
          la Reversión, tal suma será a su vez debitada de la Cuenta Treinta del
          Usuario.
        </p>
        <p>
          El Usuario también podrá solicitar la Reversión del Pago por cualquier
          motivo que indique la cancelación de la compra la cual deberá elevarse
          dentro de los cinco (5) días siguientes a la fecha de tal Transacción.
          Treinta no será responsable de los reclamos e incumplimientos que lo
          anterior pueda ocasionar.
        </p>
        <ItemOne>
          <strong>Retenciones y débitos</strong>
        </ItemOne>
        <p>
          El Usuario autoriza expresamente a Treinta para que retenga o debite
          saldos de su Cuenta Treinta cuando un Pago presente riesgo de fraude.
          Treinta podrá retener los saldos correspondientes a la Transacción en
          la Cuenta Treinta del Usuario hasta por veinte (20) días posteriores a
          la fecha de la Transacción. Así mismo, podrá retener los saldos del
          Usuario si (i) el Cliente del Usuario presenta un Contracargo o una
          Reversión, caso en el cual podrá retener el saldo correspondiente al
          valor de la Transacción; (ii) los índices de fraude presentados en las
          Transacciones superan el dos coma cinco por ciento (2.5%) del nivel de
          fraudes basados en los filtros de seguridad de Treinta o sus
          proveedores; y/o (iii) el Usuario realice una actividad o cobro a
          través del servicio de Treinta y que éste sea susceptible de fraude.
        </p>
        <p>
          Conforme a lo anterior, el Usuario autoriza a Treinta para que los
          montos acreditados de la Cuenta Treinta estén sujetos a débitos
          automáticos producto de Contracargos, Reversiones y/o reembolsos,
          incluso después de que se haya entregado los bienes y/o o servicios
          vendidos al Cliente del Usuario. Adicionalmente, Treinta podrá debitar
          de los mencionados montos de la Cuenta Treinta toda suma pagada por
          Treinta con motivo de sanciones, condenas o acuerdos de transacción
          con terceros, incluyendo como parte integral de tal suma las costas
          procesales y los honorarios legales en los que se incurra. En este
          caso, Treinta hará efectivo el débito de los recursos dentro de los
          tres (3) días hábiles siguientes a la notificación del Usuario. En el
          evento en que Treinta no pueda realizar el citado débito por falta de
          fondos en la Cuenta Treinta del Usuario, este último se obliga a
          reintegrar los dineros pagados por Treinta dentro de los dos (2) días
          hábiles siguientes a la solicitud realizada por Treinta.
        </p>
        <p>
          En cualquier caso, la mora en el pago de los dineros que el Usuario le
          adeude a Treinta por los conceptos anteriormente mencionados podrá
          causar intereses de mora a la tasa más alta permitida por la
          legislación vigente para el momento de la notificación respectiva.
          Adicionalmente, Treinta podrá suspender el acceso a la aplicación y
          terminar unilateralmente el Contrato. En el evento en el que se pacten
          garantías con el Usuario, Treinta podrá hacerlas efectivas.
          Finalmente, podrá reportar al Usuario ante los operadores de
          información financiera y podrá iniciar las acciones legales que
          correspondan.
        </p>
        <ItemOne>
          <strong>Tratamiento de datos personales </strong>
        </ItemOne>
        <p>
          El Usuario autoriza a Treinta a recolectar, almacenar, usar y, en
          general, tratar sus datos personales conforme lo señalado en la Ley
          1581 de 2012 y demás normas aplicables. La política de tratamiento de
          datos personales de Treinta se encuentra en [URL] y se considera como
          parte integral del presente Acuerdo.{' '}
        </p>
        <p>
          Las Partes darán un adecuado tratamiento a los datos personales
          suministrados por los Clientes del Usuario, cumpliendo cabalmente la
          legislación que regula la materia. El Usuario autoriza a Treinta, y
          manifiesta haber obtenido por su parte los permisos adecuados, para el
          tratamiento de datos personales de sus Clientes.
        </p>
        <p>
          Ahora bien, si por virtud del presente Acuerdo Treinta recolecta datos
          personales directamente de los Clientes del Usuario, Treinta se hará
          responsable por el tratamiento de tal información. Si, por el otro
          lado, Treinta tiene acceso a tal información por conducto del Usuario,
          éste último será el responsable del tratamiento de dicha información.
          Lo anterior bajo el entendido de que Treinta actuará como encargado
          del tratamiento respectivo. Cuando la información provenga de un
          tercero, éste será el único responsable del manejo y tratamiento de la
          información, asumiendo que dicho tercero obtuvo un consentimiento
          previo, expreso e informado por parte de los Clientes para el
          tratamiento de sus respectivos datos.
        </p>
        <p>
          El Usuario transmitirá a Treinta, bajo su control y responsabilidad,
          los datos personales que recolecte de sus Clientes, siempre y cuando
          medie el permiso requerido por ley para el efecto. Adicionalmente, el
          Usuario se compromete a informar inmediatamente a Treinta cuando
          conozca de una comunicación no autorizada de tal información. El
          Usuario será responsable de los perjuicios originados por la fuga de
          información y/o el mal uso de la misma y asumirá los fraudes que se
          produzcan como consecuencia de sus acciones u omisiones.
        </p>
        <ItemOne>
          <strong>Confidencialidad</strong>
        </ItemOne>
        <p>
          Las Partes guardarán absoluta reserva sobre la información
          confidencial intercambiada entre estas, la cual haya sido
          caracterizada de tal forma por mutuo acuerdo o bien que por la
          naturaleza de tal información ésta sea esencialmente confidencial. Lo
          anterior presupone, por ejemplo, la información que no sea de dominio
          público, incluyendo pero sin limitarse a, información técnica,
          financiera, procedimientos o métodos internos. Las Partes se
          abstendrán de revelar tal información a terceros no autorizados y de
          utilizarla para fines distintos a aquellos relacionados con la
          ejecución de éste Contrato. Así las cosas, el suministro entre las
          Partes de la información considerada como confidencial no implicará,
          bajo ninguna circunstancia, su transferencia a la otra Parte. Dicha
          información sólo podrá ser revelada por mandato legal u orden
          judicial, previo aviso a la parte afectada por la revelación.
        </p>
        <ItemOne>
          <strong>Propiedad Intelectual</strong>
        </ItemOne>
        <p>
          Las Partes acuerdan que el sistema de software, diseño de la
          plataforma y demás aspectos afines a derechos de propiedad intelectual
          le pertenecerán a su titular (sea Treinta, el Adquirente o demás
          terceros). Así las cosas, el Usuario se compromete a no impugnar
          ninguno de los derechos de propiedad intelectual de titularidad de
          Treinta. Sin perjuicio de lo anterior, el Usuario le otorga a Treinta
          autorización gratuíta e irrevocable, durante la vigencia del presente
          Contrato, para utilizar, exhibir y/o publicar sus marcas, nombres o
          logos, dominios y demás designaciones de su propiedad con el propósito
          de, entre otros, incrementar el número de Usuarios vinculados a los
          servicios y bienes ofrecidos por Treinta. Esto considerando que el
          Usuario garantiza mediante el presente Contrato que los nombres y
          signos distintivos que lo identifican son de su titularidad y/o tiene
          la autorización correspondiente para su uso. Conforme a esto, el
          Usuario mantendrá indemne a Treinta por reclamos realizados por
          terceros respecto de la responsabilidad ligada al uso indebido de
          nombres, marcas y demás signos distintivos.
        </p>
        <p>
          Treinta, por su parte, le permitirá al Usuario descargar y utilizar la
          plataforma ofrecida, así como el servicio de procesamiento de Pagos.
          Sin embargo, dicho derecho se otorga de manera revocable y sin que
          medie exclusividad. El Usuario se abstendrá de reproducir, modificar o
          comercializar, entre otros, los servicios ofrecidos por Treinta
          mediante el presente documento, sin consentimiento previo y escrito
          del último. El mencionado derecho incluye cualquier tipo de
          actualización y/o modificación posterior que se lleve a cabo sobre el
          software ofrecido.
        </p>
        <p>
          El Usuario se compromete a exhibir en un lugar visible de su
          establecimiento los logotipos de las Franquicias de Tarjetas
          distribuidos por Treinta según las indicaciones que se den para el
          efecto. En todo caso, el Usuario reconoce que las Franquicias de
          Tarjetas son las titulares únicas de sus marcas y demás signos
          distintivos y, por tanto, estas podrán prohibir el uso del servicio
          prestado y de sus marcas discrecionalmente.
        </p>
        <ItemOne>
          <strong>Indemnidad</strong>
        </ItemOne>
        <p>
          El Usuario mantendrá indemne a Treinta, sus agentes, filiales o
          subsidiarias, funcionaros, empleados, directores, accionistas y partes
          relacionadas de cualquier pérdida, reclamación, daño, perjuicio,
          multa, interés y/o gasto (incluyendo honorarios legales en los que se
          deba incurrir) en los que incurra por las acciones u omisiones del
          Usuario incluyendo, pero sin limitarse a: (i) la violación de las
          declaraciones u obligaciones que se precisan en el presente documento;
          (ii) la violación de las políticas de Treinta y/o las reglas de las
          administradoras del Sistema de Pagos de Bajo Valor, el Adquirente, las
          Franquicias de Tarjetas y/o las autoridades; (iii) la regulación
          vigente aplicable al Usuario; (iv) el fraude producto de la
          sustitución de identidad de los Clientes; (v) cualquier Contracargo
          y/o Reversión; y (vi) responsabilidad extracontractual en la que
          incurra Treinta como consecuencia de las acciones u omisiones del
          Usuario, entre otros.
        </p>
        <p>
          Por su parte, Treinta mantendrá indemne al Usuario de cualquier
          pérdida y/o daño sufrido por reclamos de terceros producto de las
          acciones u omisiones de Treinta respecto de las obligaciones que se le
          endilgan por virtud del presente documento. La mencionada indemnidad
          será hasta por un tope máximo del veinte por ciento (20%) del valor
          total de las tarifas pagadas por el Usuario a Treinta por la
          prestación de tales servicios durante los doce (12) meses
          inmediatamente anteriores al acaecimiento del perjuicio y/o daño. En
          todo caso, el Usuario deberá notificar inmediatamente a Treinta sobre
          cualquier tipo de proceso judicial, relacionado con el servicio
          prestado por virtud del presente Contrato, de los cuales haga parte.
        </p>
        <ItemOne>
          <strong>Causales de terminación</strong>
        </ItemOne>
        <p>
          Si bien cualquiera de las Partes puede terminar unilateralmente el
          Contrato, en los términos previstos en la sección 5, se resalta la
          ocurrencia de los siguientes eventos como causales de terminación:
        </p>
        <ol type="a">
          <ItemTwo>
            Para el Usuario,
            <ol type="i">
              <ItemThree>
                Por el rechazo de las modificaciones del Contrato;{' '}
              </ItemThree>
              <ItemThree>
                Por el rechazo del incremento de las tarifas señaladas por
                Treinta;
              </ItemThree>
              <ItemThree>
                Por el incumplimiento grave del Contrato atribuible directamente
                a las acciones u omisiones incurras por Treinta.{' '}
              </ItemThree>
            </ol>
          </ItemTwo>
          <ItemTwo>
            Para Treinta,
            <ol type="i">
              <ItemThree>
                Por el incumplimiento de las obligaciones en cabeza del Usuario;
              </ItemThree>
              <ItemThree>
                Por la presencia de inconsistencias y/o incumplimientos en las
                declaraciones del Usuario incluidas en el presente Contrato o
                por la ocurrencia de falsificación en el trámite de apertura de
                una cuenta Treinta;
              </ItemThree>
              <ItemThree>
                Cuando se concluya que el Usuario y/o sus Clientes representan
                un riesgo legal, reputacional o de cualquier índole que le
                impida a Treinta continuar con la ejecución del presente
                Acuerdo;
              </ItemThree>
              <ItemThree>
                Por el desacato del Usuario a las recomendaciones de adecuada
                implementación, seguridad y óptimo funcionamiento del POS y del
                sistema habilitado por Treinta para el procesamiento de Pagos;
              </ItemThree>
              <ItemThree>
                Por la ejecución por parte del Usuario en actividades ilícitas
                y/o actividades que transgredan las seguridades del sistema de
                Treinta;
              </ItemThree>
              <ItemThree>Por el uso indebido del POS;</ItemThree>
              <ItemThree>
                Por la inclusión del Usuario, sus accionistas y/o directores,
                como sospechosos o responsables del desarrollo de actividades de
                lavado de activos en los listados de la OFAC, DEA, FBI, ONU o
                bien en los reportes de autoridades locales, extranjeras o
                internacionales.{' '}
              </ItemThree>
              <ItemThree>
                Por el inicio de procesos judiciales o administrativos en contra
                del Usuario, sus accionistas y/o directores por concepto de
                lavado de activos o delitos conexos, o por la violación de
                normas anticorrupción.
              </ItemThree>
              Adicionalmente, Treinta podrá suspender o terminar el Acuerdo
              discrecionalmente cuando el Usuario:
              <ItemThree>
                Fraccione una misma venta o intente obtener autorizaciones
                consecutivas por montos menores sobre Tarjetas Bancarias que
                hayan sido rechazadas;{' '}
              </ItemThree>
              <ItemThree>
                Acepte de Tarjetas Bancarias robadas, extraviadas, alteradas,
                falsificadas, vencidas y/o adulteradas;
              </ItemThree>
              <ItemThree>
                Discrimine o haga un recargo a los precios de venta de sus
                bienes y/o servicios por el uso de Tarjetas de Bancarias como
                medios de Pago;
              </ItemThree>
              <ItemThree>
                Permita el uso indebido del POS y/o del sistema de Pagos a un
                tercero;
              </ItemThree>
              <ItemThree>
                Proporcione dinero en efectivo por concepto de operaciones que
                se efectúe mediante el POS o cuando realice cualquier avance en
                efectivo;
              </ItemThree>
              <ItemThree>
                Cambie el domicilio o cierre los establecimientos registrados
                sin notificar previamente a Treinta;{' '}
              </ItemThree>
              <ItemThree>
                Aporte información irregular o falsa sobre la actividad
                económica que desarrolla;
              </ItemThree>
              <ItemThree>
                Exceda los índices de fraude y/o reiteradamente incurra en
                consumos no reconocidos por sus Clientes y/o los titulares de
                las Tarjetas Bancarias;
              </ItemThree>
              <ItemThree>
                Presente fallas en sus sistemas de protección de la información;
              </ItemThree>
              <ItemThree>
                No conteste oportunamente, atendiendo a la legislación
                aplicable, las quejas de sus Clientes sobre la calidad de los
                productos y/o servicios comercializados;
              </ItemThree>
              <ItemThree>
                Presente fallas reiteradas en los niveles de servicio prestado a
                sus Clientes;
              </ItemThree>
              <ItemThree>
                Por solicitud expresa del Adquirente, las Franquicias de
                Tarjetas, el Emisor, o autoridades nacionales, entre otros.
              </ItemThree>
            </ol>
          </ItemTwo>
        </ol>
        <p>
          En todo caso, la terminación del Contrato dará lugar a la cancelación
          de la Cuenta Treinta, sin perjuicio de las garantías que puedan
          exigirse al Usuario con el fin de garantizar el cumplimiento de
          obligaciones en las que se pueda incurra con posterioridad a la
          cancelación respectiva. En efecto, tal terminación no liberará al
          Usuario de ninguna obligación de pago a favor de Treinta asociada a
          Contracargos, Reversiones, reembolsos o cualquier otro cargo devengado
          que no haya sido saldado por el Usuario. Treinta tendrá la potestad de
          retener cualquier reserva, incluso posterior a la terminación del
          Acuerdo.
        </p>
        <p>
          Sin perjuicio de lo anterior, ante una terminación del Acuerdo, en
          caso de que exista un saldo retenido a título de fondo de reserva
          según lo establecido en la sección 17 del presente documento, Treinta
          mantendrá el saldo retenido por un periodo máximo de ciento ochenta
          (180) días calendario contados a partir de la última Transacción. En
          el evento en el que durante tal periodo un Cliente del Usuario inicie
          algún tipo de reclamación, los fondos se retendrán hasta su resolución
          efectiva. Por lo demás, los recursos serán liberados a favor del
          Usuario una vez se transcurra el término anteriormente señalado. El
          Usuario reconoce que la retención no causará ningún tipo de rédito a
          su favor.
        </p>
        <ItemOne>
          <strong>Cláusula compromisoria</strong>
        </ItemOne>
        <p>
          Las diferencias, reclamaciones o disputas que surjan entre las Partes,
          por razón o con ocasión de la celebración, interpretación, desarrollo,
          cumplimiento, o terminación del presente Contrato, serán sometidas a
          la decisión de un Tribunal de Arbitramento que funcionará de acuerdo
          con las reglas establecidas en el reglamento de arbitraje adoptado por
          el Centro de Arbitraje y Conciliación de la Cámara de Comercio de
          Bogotá.
        </p>
        <p>
          El tribunal estará integrado por tres (3) árbitros, si es de mayor
          cuantía, o por un (1) árbitro, si es de menor cuantía. Los árbitros
          deberán ser abogados con experiencia reconocida en derecho financiero,
          escogidos de común acuerdo entre las Partes, de los cuales la mayoría,
          o el árbitro único en el caso de menor cuantía, deberán estar
          registrados en las listas de árbitros del Centro de Arbitraje y
          Conciliación de la Cámara de Comercio de Bogotá. Si transcurridos
          quince (15) días comunes, contados a partir del día siguiente a aquel
          en que el Director del Centro de Arbitraje haya convocado y surtido
          una primera reunión o intento de designación del árbitro, las Partes
          no se hubiesen puesto de acuerdo en torno a un nombre, el árbitro será
          designado por el mencionado centro de arbitraje mediante sorteo
          público, tomando como base la lista de árbitros expertos en derecho
          comercial inscritos ante esa institución, de los cuales la mayoría
          deberán estar también registrada en las listas de árbitros del Centro
          de Arbitraje y Conciliación de la Cámara de Comercio de Bogotá.
        </p>
        <p>
          El Tribunal decidirá en derecho con sujeción a las disposiciones del
          derecho sustantivo y procesal de la República de Colombia. Los
          honorarios del árbitro y del secretario, así como los demás gastos del
          tribunal, serán fijados de conformidad con las tarifas establecidas
          por el Centro de Arbitraje y Conciliación de la Cámara de Comercio de
          Bogotá.
        </p>
        <ItemOne>
          <strong>Integridad</strong>
        </ItemOne>
        <p>
          Cualquier término o disposición del presente Contrato que sea
          declarado nulo o de imposible cumplimiento, no afecta la validez y el
          cumplimiento obligatorio de las demás disposiciones del mismo, siempre
          que no se trate de una disposición de la esencia del mismo.
        </p>
        <ItemOne>
          <strong>Acuerdo total</strong>
        </ItemOne>
        <p>
          Acuerdan las Partes que este documento es el único que consigna el
          acuerdo total convenido por ellas y, por tanto, deja sin efectos
          cualquier otro acuerdo o entendimiento previo, verbal o escrito, sobre
          los bienes y servicios ofrecidos por Treinta.
        </p>
        <ItemOne>
          <strong>Notificaciones</strong>
        </ItemOne>
        <p>
          Treinta realizará las notificaciones que haya lugar con ocasión de su
          relación comercial con el Usuario a la dirección de correo electrónico
          indicada por éste en el formulario de registro. Así mismo, el Usuario
          se entenderá notificado de cambios principales, sujetos a aviso previo
          por virtud del presente Contrato, mediante los avisos generales
          realizados a través de la aplicación de Treinta.{' '}
        </p>
        <p>
          Por lo demás, cualquier notificación que el Usuario desee realizar
          deberá ser dirigida al correo electrónico [CORREO ELECTRÓNICO].{' '}
        </p>
        <p>
          En el evento en el que el Usuario requiera de soporte técnico con
          temas relacionados con el uso, funcionamiento u otros del POS, el
          sistema operativo habilitado por Treinta o cualquier asunto
          relacionado, deberá comunicarse al correo electrónico [CORREO
          ELECTRÓNICO].
        </p>
        <p>
          Cualquier notificación realizada por las Partes se entenderá efectuada
          el día de su envío efectivo.
        </p>
      </ol>
    </Container>
  );
};
