/** @format */
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
// Components
import { Heading } from '@/components/headers/admin/heading';
import {
  PosDashboard,
  PromoterDashboard,
  TicketDashboard,
  UserDashboard,
} from '@/components/admin/dashboards';

const Panel = () => {
  const ts = useTranslations('Panel_SideBar');

  const breadcrumb = [{ page: ts('dashboard'), href: '/panel/pos' }];

  return (
    <>
      {/* Breadcrumb section */}
      <div className="">
        <Heading breadcrumb={breadcrumb} />
      </div>
      <div className="flex flex-1 pt-6 justify-center">
        <div className="max-w-[90%] overflow-hidden">
          <PosDashboard />
        </div>
      </div>
    </>
  );
};

Panel.Layout = AdminLayout;
export default Panel;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
