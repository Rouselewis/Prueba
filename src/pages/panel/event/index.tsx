/** @format */
import { useMemo } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import AdminLayout from '@/components/layout/admin';
import { BasicTable } from '@/components/admin/tables';
import { columnsEvent } from '@/components/admin/tables/columns/columnsEvent';
import { Heading } from '@/components/headers/admin/heading';
import { useEvents } from '@/hooks/event/event';
import { format } from 'date-fns';

const Event = () => {
  const ts = useTranslations('Panel_SideBar');
  const tb = useTranslations('btn');
  const locale = useLocale();
  const events = useEvents();
  const breadcrumb = [{ page: ts('event.event'), href: '' }];
  const buttonBread = { text: tb('add_event'), href: '/panel/event/create' };
  const formatedEvents = events?.data?.items.map((event, idx) => ({
    ...event,
    content:
      event?.content?.find((e) => e.lang == locale) ||
      event?.content?.find((e) => e.lang == 'es'),
  }));

  const data = useMemo(
    () =>
      formatedEvents?.map((event) => ({
        id: event._id,
        event: event?.content?.name,
        date: format(new Date(), 'yyyy-mm-dd'),
        visit: 100,
        like: 100,
        assited: 100,
        shared: 100,
        status: true,
      })),
    [formatedEvents]
  );
  const columns = columnsEvent();

  return (
    <>
      {/* Breadcrumb section */}
      <div>
        <Heading breadcrumb={breadcrumb} buttonBread={buttonBread} />
      </div>
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <div className="min-w-full divide-y divide-gray-300">
                    <BasicTable columns={columns} defaultData={data} />
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

Event.Layout = AdminLayout;
export default Event;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
