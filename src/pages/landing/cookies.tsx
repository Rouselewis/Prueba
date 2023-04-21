/** @format */
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
// Layout and Header
import MainLayout from '@/components/layout/main';
import Section from '@/components/headers/landing/section';
// Helpers
import { CurrentColor } from '@/helpers/currentColor';

const Cookies = () => {
  const t = useTranslations('Cookie');
  const currentColor = CurrentColor();

  return (
    <div>
      <Section title={t('page')} color={currentColor} />

      <div className="bg-white py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-xl leading-8 text-customGray space-y-4">
          <div className="space-y-2">
            <div className="text-4xl font-extrabold py-5">
              El uso de tecnologías de rastreo en nuestro portal de internet
            </div>
            <p>
              Le informamos que en nuestra página de internet utilizamos
              cookies, web beacons u otras tecnologías, a través de las cuales
              es posible monitorear su comportamiento como usuario de internet,
              así como brindarle un mejor servicio y experiencia al navegar en
              nuestra página. Los datos personales que recabamos a través de
              estas tecnologías, los utilizaremos para ofrecerte nuevos
              productos y servicios basados en sus preferencias.
            </p>
            <p>
              Los datos personales que obtenemos de estas tecnologías de rastreo
              son los siguientes:
            </p>
            <ul className="pl-14 list-disc">
              <li>
                Identificadores, nombre de usuario y contraseñas de una sesión,
              </li>
              <li>Idioma preferido por el usuario</li>
              <li>Región en la que se encuentra el usuario</li>
              <li>Tipo de navegador del usuario</li>
              <li>Tipo de sistema operativo del usuario</li>
              <li>
                Fecha y hora del inicio y final de una sesión de un usuario
              </li>
              <li>Páginas web visitadas por un usuario</li>
              <li>Búsquedas realizadas por un usuario</li>
              <li>Publicidad revisada por un usuario</li>
              <li>Listas y hábitos de consumo en páginas de compras</li>
            </ul>
            <p>
              Para cumplir con lo anterior hacemos uso de cookies que son
              esenciales para permitirle un uso adecuado de nuestros servicios y
              utilizar sus características por lo que las mismas no pueden ser
              deshabilitadas.
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

Cookies.Layout = MainLayout;
export default Cookies;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
