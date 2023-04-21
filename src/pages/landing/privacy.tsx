/** @format */
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
// Layout and Header
import MainLayout from '@/components/layout/main';
import Section from '@/components/headers/landing/section';
// Helpers
import { CurrentColor } from '@/helpers/currentColor';

const Privacy = () => {
  const t = useTranslations('Privacy');
  const currentColor = CurrentColor();

  return (
    <div>
      <Section title={t('page')} color={currentColor} />

      <div className="bg-white py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-xl leading-8 text-customGray space-y-4">
          <div>
            Los datos de "CTickets" serán tratados por Arturo Villalpando
            Sánchez, con domicilio en calle José Sergio Báez, Fracc. Villas del
            Sol en la ciudad de Zacatecas, Zacatecas, México con Código Postal
            98067, quién en adelante será el responsable del uso y protección de
            sus datos personales, y al respecto le informamos lo siguiente:
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-extrabold py-5">
              ¿Para qué fines utilizaremos sus datos personales?
            </div>
            <p>
              Los datos personales que recabamos de usted, los utilizaremos para
              las siguientes finalidades dependiendo del servicio que se
              solicite:
            </p>
            <ul className="pl-14 list-disc">
              <li>Registro en nuestra página web,</li>
              <li>Publicar los eventos,</li>
              <li>Localizar los eventos cercanos,</li>
              <li>Entrega de entradas a los eventos,</li>
              <li>Apartado de boletos,</li>
              <li>Transferencia de boletos,</li>
              <li>Reembolso de boletos.</li>
              <li>Realizar cobros,</li>
              <li>Elaboración de la factura, </li>
              <li>Atender solicitudes de información,</li>
              <li>Dar cumplimiento a relaciones jurídicas contraídas,</li>
              <li>Permitir la interacción con aplicaciones de terceros,</li>
              <li>Detectar posibles fraudes o usos no autorizados,</li>
              <li>Dar respuesta a requerimientos de autoridades.</li>
            </ul>
            <p>
              De manera adicional, utilizaremos su información personal para las
              siguientes finalidades secundarias que no son necesarias para el
              servicio solicitado, pero que nos permiten y facilitan brindarle
              una mejor atención:
            </p>
            <ul className="pl-14 list-disc">
              <li>Recomendaciones para el usuario,</li>
              <li>Mercadotecnia o publicitaria,</li>
              <li>Prospección comercial,</li>
              <li>Mejorar el funcionamiento de nuestros servicios.</li>
            </ul>
            <p>
              En caso de que no desee que sus datos personales sean tratados
              para estos fines secundarios, desde este momento usted nos puede
              comunicar lo anterior mediante un mensaje al correo electrónico
              privacity@ctickets.app manifestando la negativa para el
              tratamiento de sus datos personales para finalidades secundarias.
            </p>
            <p>
              La negativa para el uso de sus datos personales para estas
              finalidades no podrá ser un motivo para que le neguemos los
              servicios y productos que solicita o contrata con nosotros.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-4xl font-extrabold py-5">
              ¿Qué datos personales utilizaremos para estos fines?
            </div>
            <p>
              Para llevar a cabo las finalidades descritas en el presente aviso
              de privacidad, utilizaremos los siguientes datos personales:
            </p>
            <ul className="pl-14 list-disc">
              <li>Datos de identificación,</li>
              <li>Datos de contacto.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-4xl font-extrabold py-5">
              ¿Cómo puede acceder, rectificar o cancelar sus datos personales, u
              oponerse a su uso?
            </div>
            <p>
              Usted tiene derecho a conocer qué datos personales tenemos de
              usted, para qué los utilizamos y las condiciones del uso que les
              damos (Acceso). Asimismo, es su derecho solicitar la corrección de
              su información personal en caso de que esté desactualizada, sea
              inexacta o incompleta (Rectificación); que la eliminemos de
              nuestros registros o bases de datos cuando considere que la misma
              no está siendo utilizada adecuadamente (Cancelación); así como
              oponerse al uso de sus datos personales para fines específicos
              (Oposición). Estos derechos se conocen como derechos ARCO.
            </p>
            <p>
              Para el ejercicio de cualquiera de los derechos ARCO, usted deberá
              presentar la solicitud respectiva mediante un mensaje al correo
              electrónico privacity@ctickets.app manifestando su deseo para
              ejercer los derechos de acceso, rectificación, cancelación y/u
              oposición (ARCO).
            </p>
            <p>
              Los datos de contacto de la persona que está a cargo de dar
              trámite a las solicitudes de derechos ARCO, son los siguientes:
            </p>
            <ul className="pl-14 list-disc">
              <li>Correo electrónico: privacity@ctickets.app</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-4xl font-extrabold py-5">
              Usted puede revocar su consentimiento para el uso de sus datos
              personales
            </div>
            <p>
              Usted puede revocar el consentimiento que, en su caso, nos haya
              otorgado para el tratamiento de sus datos personales. Sin embargo,
              es importante que tenga en cuenta que no en todos los casos
              podremos atender su solicitud o concluir el uso de forma
              inmediata, ya que es posible que por alguna obligación legal
              requiramos seguir tratando sus datos personales. Asimismo, usted
              deberá considerar que, para ciertos fines, la revocación de su
              consentimiento implicará que no le podamos seguir prestando el
              servicio que nos solicitó, o la conclusión de su relación con
              nosotros.
            </p>
            <p>
              Para revocar su consentimiento deberá presentar su solicitud
              mediante un mensaje al correo electrónico privacity@ctickets.app
              manifestando su deseo para la revocación de su consentimiento.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-4xl font-extrabold py-5">
              ¿Cómo puede limitar el uso o divulgación de su información
              personal?
            </div>
            <p>
              Con objeto de que usted pueda limitar el uso y divulgación de su
              información personal, puede enviar un correo electrónico a
              privacity@ctickets.app solicitando limitar el uso y divulgación de
              los datos personales.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-4xl font-extrabold py-5">
              ¿Cómo puede conocer los cambios en este aviso de privacidad?
            </div>
            <p>
              El presente aviso de privacidad puede sufrir modificaciones,
              cambios o actualizaciones derivadas de nuevos requerimientos
              legales; de nuestras propias necesidades por los productos o
              servicios que ofrecemos; de nuestras prácticas de privacidad; de
              cambios en nuestro modelo de negocio, o por otras causas.
            </p>
            <p>
              Nos comprometemos a mantenerlo informado sobre los cambios que
              pueda sufrir el presente aviso de privacidad, a través de la
              página de internet: https://ctickets.app/es/landing/privacy.
            </p>
          </div>

          <div className="py-5 text-right">
            Última actualización: Abril de 2023.
          </div>
        </div>
      </div>
    </div>
  );
};

Privacy.Layout = MainLayout;
export default Privacy;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
