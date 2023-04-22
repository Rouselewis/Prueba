/** @format */
import { useEffect, useMemo, useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
import { BasicTable } from '@/components/admin/tables';
// Components
import { Heading } from '@/components/headers/admin/heading';

const EventPanel = () => {
  const ts = useTranslations('Panel_SideBar');
  const tb = useTranslations('btn');

  const breadcrumb = [
    { page: ts('event.event'), href: '/panel/event' },
    { page: ts('event.Panel'), href: '' },
  ];
  const buttonBread = {
    text: tb('add_Panel'),
    href: '/panel/event/Panel/create',
  };

  return (
    <>
      {/* Breadcrumb section */}
      <div>
        <Heading breadcrumb={breadcrumb} buttonBread={buttonBread} />
      </div>
      <div className="flex flex-1 pt-6"></div>
    </>
  );
};

EventPanel.Layout = AdminLayout;
export default EventPanel;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
