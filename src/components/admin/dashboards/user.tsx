import { Fragment, useMemo } from 'react';
import { Tab } from '@headlessui/react';
import { useLocale, useTranslations } from 'next-intl';
// Components
import { BasicTable } from '@/components/admin/tables';
import { columnsUserDashboard } from '@/components/admin/tables/columns/columnsUserDashboard';
import ListCardEvent from '@/components/main/commons/ListCardEvent';
// Forms
import { useForm } from 'react-hook-form';
// Hooks
import { useEvents } from '@/hooks/event/event';
// Helpers
import { CurrentColor, classNames } from '@/helpers';

export const UserDashboard = () => {
  const t = useTranslations('Panel_Dashboard');
  const locale = useLocale();
  const useFormReturn = useForm();
  const currentColor = CurrentColor();

  const events = useEvents();
  const data = useMemo(
    () => [
      {
        id: '1',
        event: 'test',
        event_date: '2023-02-02',
        limit_date: '2023-02-02',
        pending: '$1200',
        status: true,
      },
      {
        id: '2',
        event: 'test2',
        event_date: '2023-02-02',
        limit_date: '2023-02-02',
        pending: '$1200',
        status: false,
      },
    ],
    []
  );
  const columns = columnsUserDashboard();

  return (
    <>
      <div className="overflow-hidden shadow sm:rounded-lg mb-16 mt-16">
        <span className="text-3xl">{t('pending')}</span>
        <div className="min-w-full divide-y divide-gray-300">
          <BasicTable columns={columns} defaultData={data} />
        </div>
      </div>
      <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
        <Tab.Group as="div">
          <div className="border-b border-gray-200">
            <Tab.List className="-mb-px flex space-x-8">
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? `border-${currentColor} text-${currentColor}`
                      : `border-transparent text-gray-700 hover:border-${currentColor} hover:text-${currentColor}`,
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                {t('my_ticket')}
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? `border-${currentColor} text-${currentColor}`
                      : `border-transparent text-gray-700 hover:border-${currentColor} hover:text-${currentColor}`,
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                {t('favorite')}
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? `border-${currentColor} text-${currentColor}`
                      : `border-transparent text-gray-700 hover:border-${currentColor} hover:text-${currentColor}`,
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                {t('assist')}
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? `border-${currentColor} text-${currentColor}`
                      : `border-transparent text-gray-700 hover:border-${currentColor} hover:text-${currentColor}`,
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                {t('old_ticket')}
              </Tab>
            </Tab.List>
          </div>
          <div className="space-y-4 mx-auto max-w-[95%]">
            <Tab.Panels as={Fragment}>
              <Tab.Panel>
                <ListCardEvent
                  loading={events?.isLoading}
                  layout="swiper"
                  setCurrentPage={() => {}}
                  setPageSize={() => {}}
                  totalDocs={10}
                  title=""
                  items={events?.data?.items?.map((item) => ({
                    image: 'https://loremflickr.com/640/480/cats',
                    name: item.content.find((obj) => obj.lang == locale)?.name,
                    startDate: item.created_at as unknown as Date,
                    endDate: new Date(),
                    location: 'Location',
                    color: item.category_id?.color,
                    id: item._id,
                  }))}
                  {...useFormReturn}
                />
              </Tab.Panel>
              <Tab.Panel>
                <ListCardEvent
                  loading={events?.isLoading}
                  layout="swiper"
                  setCurrentPage={() => {}}
                  setPageSize={() => {}}
                  totalDocs={10}
                  title=""
                  items={events?.data?.items?.map((item) => ({
                    image: 'https://loremflickr.com/640/480/cats',
                    name: item.content.find((obj) => obj.lang == locale)?.name,
                    startDate: item.created_at as unknown as Date,
                    endDate: new Date(),
                    location: 'Location',
                    color: item.category_id?.color,
                    id: item._id,
                  }))}
                  {...useFormReturn}
                />
              </Tab.Panel>

              <Tab.Panel>
                <ListCardEvent
                  loading={events?.isLoading}
                  layout="swiper"
                  setCurrentPage={() => {}}
                  setPageSize={() => {}}
                  totalDocs={10}
                  title=""
                  items={events?.data?.items?.map((item) => ({
                    image: 'https://loremflickr.com/640/480/cats',
                    name: item.content.find((obj) => obj.lang == locale)?.name,
                    startDate: item.created_at as unknown as Date,
                    endDate: new Date(),
                    location: 'Location',
                    color: item.category_id?.color,
                    id: item._id,
                  }))}
                  {...useFormReturn}
                />
              </Tab.Panel>

              <Tab.Panel>
                <ListCardEvent
                  loading={events?.isLoading}
                  layout="swiper"
                  setCurrentPage={() => {}}
                  setPageSize={() => {}}
                  totalDocs={10}
                  title=""
                  items={events?.data?.items?.map((item) => ({
                    image: 'https://loremflickr.com/640/480/cats',
                    name: item.content.find((obj) => obj.lang == locale)?.name,
                    startDate: item.created_at as unknown as Date,
                    endDate: new Date(),
                    location: 'Location',
                    color: item.category_id?.color,
                    id: item._id,
                  }))}
                  {...useFormReturn}
                />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </>
  );
};
