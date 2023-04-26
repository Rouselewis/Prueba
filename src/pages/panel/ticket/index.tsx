/** @format */
import { useEffect, useMemo, useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { useLocale, useTranslations } from 'next-intl';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
import { BasicTable } from '@/components/admin/tables';
import { columnsTicketList } from '@/components/admin/tables/columns/columnsTicketList';
// Components
import { Heading } from '@/components/headers/admin/heading';
// Import Interface
import { Event as EventInterface } from '@/interfaces/event';
import { useEventsTickets } from '@/hooks/event/event_tickets';

const TicketList = () => {
  const ts = useTranslations('Panel_SideBar');
  const tb = useTranslations('btn');

  const breadcrumb = [
    { page: ts('ticket.ticket'), href: '/panel/ticket' },
    { page: ts('ticket.list'), href: '' },
  ];
  const buttonBread = { text: tb('add_ticket'), href: '/panel/ticket/create' };
  const locale = useLocale();
  const data = useMemo(
    () => [
      {
        id: '1',
        event: 'Alicia en el país de las maravillas',
        date: '2024-01-01 14:00',
        available: 100,
        sold: 100,
        income: 100,
        status: 'sold out',
      },
      {
        id: '2',
        event: 'Hell & Heaven - Preferente',
        date: '2025-02-03 14:00 - 18:00',
        available: 100,
        sold: 100,
        income: 100,
        status: 'active',
      },
    ],
    []
  );
  const columns = columnsTicketList();
  const tickets = useEventsTickets();
  console.log(tickets.data);
  return (
    <>
      {/* Breadcrumb section */}
      <div>
        <Heading breadcrumb={breadcrumb} buttonBread={buttonBread} />
      </div>
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <div className="flow-root">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <div className="min-w-full divide-y divide-gray-300">
                    <BasicTable
                      columns={columns}
                      defaultData={
                        data
                        //     tickets.data?.items?.map((item) => ({
                        //     id: item?._id,
                        //     event:
                        //       item?.content?.find((obj) => obj.lang == locale)
                        //         ?.name ||
                        //       item?.content?.find((obj) => obj.lang == 'es')?.name,
                        //     status: item?.status,
                        //     sold: item?.stats?.purchase,
                        //     income: item?.stats?.attend,
                        //     date: item?.settings?.tickets?.sell_start_at,
                        //   }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TicketList.Layout = AdminLayout;
export default TicketList;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
