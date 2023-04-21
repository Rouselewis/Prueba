/** @format */
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
// Layout and Header
import MainLayout from '@/components/layout/main';
import Section from '@/components/headers/landing/section';
// Helpers
import { CurrentColor } from '@/helpers/currentColor';

const Term = () => {
  const t = useTranslations('Term');
  const currentColor = CurrentColor();

  return (
    <div>
      <Section title={t('page')} color={currentColor} />

      <div className="bg-white py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-xl leading-8 text-customGray space-y-4">
          <div>
            <div className="text-4xl font-extrabold py-5">
              Aceptación de los términos
            </div>
            <div className="px-5 space-y-2">
              <p>
                Al visitar y utilizar esta página web, usted se compromete a
                cumplir con los términos y condiciones establecidos entre
                "CTickets", representado por Arturo Villalpando Sánchez, y usted
                como usuario. Con el uso de la página, reconoce haber leído y
                entendido dichos términos y condiciones y aceptarlos plenamente.
              </p>

              <div className="text-2xl font-extrabold py-5">
                Propiedad intelectual
              </div>
              <p>
                Reconozco que la información y los contenidos presentados en
                esta página son propiedad de “CTickets” y están protegidos por
                las leyes de propiedad intelectual.
              </p>
              <p>
                “CTickets” podrá utilizar cualquier observación, comentario o
                sugerencia o mensaje que un usuario envíe al correo del
                servicio, quien acepta que por dicha observación no recibirá
                contraprestación económica a su favor.
              </p>

              <div className="text-2xl font-extrabold py-5">
                Uso lícito de la información y contenidos
              </div>
              <p>
                Me comprometo a utilizar la página y su contenido solo para
                fines lícitos y a no infringir los derechos de “CTickets” o de
                terceros.
              </p>

              <div className="text-2xl font-extrabold py-5">
                Exactitud e integridad de la información
              </div>
              <p>
                Entiendo que “CTickets” no garantiza la exactitud o integridad
                de la información y contenidos disponibles en esta página, y que
                la empresa no será responsable por cualquier pérdida o daño que
                resulte de mi uso de la página.
              </p>

              <div className="text-2xl font-extrabold py-5">
                Modificación de los términos y condiciones
              </div>
              <p>
                Acepto que “CTickets” puede, a su sola discreción, modificar
                estos términos y condiciones de uso en cualquier momento y sin
                previo aviso.
              </p>

              <div className="text-2xl font-extrabold py-5">
                Responsabilidad por problemas técnicos
              </div>
              <p>
                Conozco y acepto que “CTickets” no será responsable por
                cualquier problema técnico o interrupción en el funcionamiento
                de la página.
              </p>

              <div className="text-2xl font-extrabold py-5">
                Aviso de Privacidad
              </div>
              <p>
                Acepto que, al utilizar la página, se entenderá que he leído
                nuestro Aviso de Privacidad y autoriza el uso de tus datos
                personales de conformidad con los términos que en el mismo se
                señalan.
              </p>
            </div>
          </div>

          <div>
            <div className="text-4xl font-extrabold py-5">Condiciones uso</div>
            <div className="px-5 space-y-2">
              <div className="text-2xl font-extrabold py-5">
                De los servicios ofrecidos
              </div>
              <p>
                Los servicios de CTickets comprende el manejo de la información
                para brindar a los usuarios un sistema que integra el control de
                la información de eventos culturales, publicidad, venta,
                apartado y transferencia ética de boletos.
              </p>

              <div className="text-2xl font-extrabold py-5">Precios</div>
              <p>
                La aplicación es gratuita en su totalidad para los usuarios que
                consulten eventos, a su vez también para los que den de alta
                eventos en la aplicación o sitio web. El costo es para los
                usuarios que dan de alta eventos y deciden adicionalmente
                contratar algunos de los productos adicionales como lo son
                publicidad, venta, apartado y transferencia de boletos dentro de
                la aplicación. Estos pagos se contratan mes con mes y en ningún
                momento son reembolsables una vez hecho el pago.
              </p>

              <div className="text-2xl font-extrabold py-5">Forma de pago</div>
              <p>
                Los precios por concepto de publicidad son suscripciones
                mensuales con precios que varían conforme al modelo elegido, en
                el entendido de que la prestación del servicio será durante
                treinta (30) días calendario.
              </p>
              <p>
                Para disfrutar de los beneficios y/u obtener más información de
                cómo activar o cancelar servicios el usuario se deberá contactar
                mediante el correo electrónico sales@ctickets.app desde
                cualquier parte del mundo.
              </p>
              <p>
                Los precios que cobramos por usar nuestros servicios a través de
                la plataforma se enumeran en la página web. Nos reservamos el
                derecho de cambiar en cualquier momento nuestros precios para
                los productos que se muestran y de corregir los errores de
                precios que pueden ocurrir inadvertidamente.
              </p>

              <div className="text-2xl font-extrabold py-5">
                Requisitos mínimos del sistema
              </div>
              <p>
                Para un uso óptimo de la plataforma CTickets, es indispensable
                que el usuario cuente con una computadora o dispositivo móvil
                con navegador web actualizado a la última versión y/o en su
                defecto un dispositivo con una versión actual para la
                instalación de la aplicación móvil. A su vez es indispensable
                que el usuario cuente con conexión a internet con al menos 5
                Megabits por segundo de velocidad (5 Mbps).
              </p>

              <div className="text-2xl font-extrabold py-5">
                Consumo de datos
              </div>
              <p>
                El estar conectado a la red de datos móviles de su operador
                puede representarle cargos elevados por el consumo de datos. Se
                recomienda utilizar la aplicación cuando el dispositivo esté
                conectado a una red fija (no de celular).
              </p>
              <p>
                El tamaño máximo de un archivo para subir es de 2 MB, siempre y
                cuando se cuente con espacio de almacenamiento disponible en la
                cuenta y se suba a través de las aplicaciones para sistemas
                operativos Windows o Mac OS.
              </p>
              <p>
                Los dispositivos móviles también cuentan con limitaciones en
                cuanto al tamaño de los archivos para subir a la nube de
                CTickets, estos pueden depender de la conexión a la cual estén
                conectados (una red Wifi o una red 3G), o si el dispositivo
                cuenta con batería suficiente para subir los archivos.
              </p>

              <div className="text-2xl font-extrabold py-5">
                Otras disposiciones
              </div>
              <p>
                Los servicios ofrecidos son intransferibles. En ningún caso los
                beneficios aquí ofrecidos podrán convertirse en valor monetario,
                ni transferirse para otro usuario sin autorización por escrito
                de “CTickets”.
              </p>

              <div className="text-2xl font-extrabold py-5">
                Responsabilidades del usuario frente al uso del Servicio
              </div>
              <p>
                El usuario es responsable de mantener en secreto los datos de su
                cuenta, su usuario y contraseña de acceso al servicio.
              </p>
              <p>
                Para que el servicio funcione con correctamente, el usuario debe
                mantener su información de actualizada, precisa y detallada. En
                caso de no hacerlo, el usuario acepta y reconoce que el servicio
                podrá ser afectado.
              </p>
              <p>
                El usuario se compromete a notificar a CTickets, cualquier uso
                no autorizado de sl cuenta.
              </p>
              <p>
                El usuario será el único y totalmente responsable por lo que
                copie, comparta, cargue, descargue o utilice durante el uso del
                servicio. El usuario reconoce que los archivos, materiales y
                otros contenidos en el servicio pueden estar protegidos por
                derechos de propiedad intelectual de terceros y que están
                prohibidos de copiar, cargar, descargar o compartir archivos sin
                la autorización del responsable y/o propietario.
              </p>
              <p>
                Se prohíbe al usuario las siguientes prácticas, incluyendo de
                forma enunciativa y sin limitación a:
              </p>
              <ul className="pl-14 list-disc">
                <li>
                  Manipular el precio de nuestros productos y/o servicios.
                </li>
                <li>
                  Eludir o manipular nuestra estructura de tarifas, el proceso
                  de facturación, o los honorarios debidos a CTickets.
                </li>
                <li>
                  Distribuir o publicar datos falsos, inexactos, engañosos,
                  difamatorios o calumniosos.
                </li>
                <li>
                  Tomar cualquier acción que pueda socavar la retroalimentación
                  o sistemas de clasificación (como mostrar, importar o exportar
                  la información de retroalimentación fuera de los sitios o de
                  utilizarlo para fines no relacionados con CTickets).
                </li>
                <li>
                  Eludir cualquier política de CTickets o determinaciones sobre
                  su estado de cuenta, tales como suspensiones temporales o
                  indefinidos o cuenta de otro titular, limitaciones o
                  restricciones.
                </li>
                <li>
                  Usar robots o enlaces ocultos o cualquier otro recurso,
                  herramienta, programa algoritmo o método colector o extractor
                  de datos automatizados existente o futuro para acceder,
                  adquirir, copiar o monitorear los servicios de CTickets, sin
                  permiso expreso por escrito de CTickets.
                </li>
                <li>
                  Usar o intentar usar cualquiera mecanismo, software o
                  programa, herramienta, agente u otro dispositivo o mecanismo
                  existente o futuro para navegar o buscar dentro de CTickets,
                  que no sean los buscadores disponibles dentro del plan o
                  mecanismos de búsqueda disponibles comúnmente, como Internet
                  Explorer de Microsoft.
                </li>
                <li>
                  Enviar o transmitir cualquier archivo con virus, caballos de
                  Troya o cualquier otro recurso que contamine, destruya o
                  interfiera de cualquiera forma con el uso apropiado de los
                  servicios CTickets.
                </li>
                <li>
                  Intentar descifrar, descomponer o realizar ingeniería a la
                  inversa de cualquier software que consista o haga parte de los
                  servicios CTickets.
                </li>
                <li>
                  Sondear, escanear o probar la vulnerabilidad de cualquier
                  sistema o red.
                </li>
                <li>
                  Violar o burlar de otra manera las medidas de seguridad o
                  autenticación, invadir la privacidad de otros usuarios y
                  buscar contraseñas de acceso y los datos privados, así como
                  modificar los archivos de otros usuarios, sin la autorización
                  previa.
                </li>
                <li>
                  Interferir o interrumpir cualquier usuario, anfitrión o red,
                  por ejemplo, mediante el envío de un virus, el de sobrecargar
                  el sistema, enviar spams, o bombardeando correo a cualquier
                  parte de los Servicios.
                </li>
                <li>
                  Plantar un programa maligno o utilizar de otra manera los
                  servicios para distribuir programas malignos.
                </li>
                <li>Cargar spyware u otro software malicioso al servicio.</li>
                <li>
                  Acceder o buscar los servicios por cualquier otro medio que no
                  sea por medio de las interfaces públicas.
                </li>
                <li>
                  Enviar información no solicitada, promociones, anuncios, o
                  spam.
                </li>
                <li>
                  Enviar información de fuente de identificación alterada, falsa
                  o engañosa, incluyendo el "spoofing" o "phishing".
                </li>
                <li>
                  Publicar cualquier contenido fraudulento, engañoso o que
                  infrinja los derechos de terceros, así como contenidos con el
                  fin de fomentar la práctica de ilícitos o contrarios al orden
                  público, la moral y las buenas costumbres y los derechos de
                  los menores de edad.
                </li>
                <li>
                  Promover o anunciar productos o servicios que no sean suyos
                  sin la debida autorización.
                </li>
                <li>
                  Suplantar o falsificar su afiliación con cualquier persona o
                  entidad.
                </li>
                <li>
                  Almacenar, publicar o compartir materiales ilegalmente, con
                  contenidos relacionados a pornografía, pornografía infantil,
                  pedofilia, que apoyan la intolerancia religiosa, racial o el
                  odio étnico, o de otra forma ofensivo o contrarios a las
                  leyes, la moral y las buenas costumbres.
                </li>
                <li>
                  Violar la ley de cualquier manera, o que viole la privacidad
                  de los demás usuarios o los difame.
                </li>
                <li>
                  Abusar de los términos y condiciones establecidos por
                  CTickets.
                </li>
              </ul>
              <p>
                El usuario acepta que a criterio único y exclusivo de
                “CTickets”, la cuenta del usuario podrá ser cancelada por uso
                indebido, no autorizado o prohibido, según corresponda, sin
                ninguna obligación de mantener el plan contratado o reembolso de
                lo pagado.
              </p>

              <div className="text-2xl font-extrabold py-5">
                Limitación de responsabilidad
              </div>
              <p>
                CTickets se exime de cualquier responsabilidad por los daños y
                perjuicios derivados de la falta de veracidad y/o autenticidad
                de la información que los usuarios proporcionan a terceros.
              </p>
              <p>
                Si cualquier parte de estos Términos y Condiciones de Uso es
                considerada ilegítima, nula o inaplicable por la jurisdicción
                competente, estos Términos y Condiciones de Uso como un todo no
                deberán considerarse ilegítimos, nulos o impracticables;
                solamente aquella parte que sea ilegítima, nula o impracticable
                deberá ser inaplicada.
              </p>
              <p>
                La responsabilidad se limita hasta por el monto pagado por el
                usuario menos los costos incurridos por “CTickets” para ofrecer
                el servicio otorgado.
              </p>

              <div className="text-2xl font-extrabold py-5">
                Suspensión, modificación o eliminación de los Servicios
              </div>
              <p>
                El acceso y uso del servicio CTickets puede ser interrumpido en
                cualquier momento por diversas razones, incluso por falla de
                funcionamiento, actualizaciones periódicas o mantenimiento, o
                cualquier otra acción que CTickets puedan juzgar como necesaria.
              </p>
              <p>
                El servicio CTickets no tiene un periodo determinado de
                vigencia, pudiendo ser modificado o eliminado por CTickets
                independientemente de cualquier aviso previo y sin ninguna
                responsabilidad para estas.
              </p>
            </div>
          </div>
          <div className="py-5 text-right">
            Última actualización: Abril de 2023.
          </div>
        </div>
      </div>
    </div>
  );
};

Term.Layout = MainLayout;
export default Term;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
