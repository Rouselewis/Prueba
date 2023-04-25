import {
  getEventsCategories,
  readEventCategory,
} from '@/api/event/event_category';
import { Title } from '@/components/commons';
import MainLayout from '@/components/layout/main';
import CardAdvertisment from '@/components/main/commons/CardAdvertisment';
import Hero from '@/components/main/commons/Hero';
import ListCardEvent from '@/components/main/commons/ListCardEvent';
import SidebarSearch from '@/components/main/commons/SidebarSearch';
import HeaderCategory from '@/components/main/search/HeaderCategory';
import HeaderSearch from '@/components/main/search/HeaderSearch';
import { useInfinteEvents } from '@/hooks/event/event';
import {
  useEventScheduleTimetables,
  useInfinteEventSchedulesTimetables,
} from '@/hooks/event/event_schedules_timetables';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Search = ({ categories }) => {
  const useFormReturn = useForm<any>({
    defaultValues: {
      initial_date: 'dd/mm/aaaa',
      finish_date: 'dd/mm/aaaa',
    },
  });
  const { watch } = useFormReturn;
  const locale = useLocale();
  const { replace, push, query: queryObj } = useRouter();
  const t = useTranslations('Public');
  const query = watch('query');
  const [pagination, setPagination] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfinteEventSchedulesTimetables({
    address: queryObj?.address,
    category: queryObj?.category,
    sub_category: queryObj?.sub_category,
    sub_subcategory: queryObj?.sub_sub_category,
    init_date: queryObj?.initial_date
      ? new Date(queryObj?.initial_date as string)
      : undefined,
    end_date: queryObj?.finish_date
      ? new Date(queryObj?.finish_date as string)
      : undefined,
    page: pagination?.page,
    size: pagination?.size,
  });
  const { data: eventSchedules } = useEventScheduleTimetables();
  const category = categories?.find((item) => item._id == queryObj?.category);
  console.log(data?.pages?.map((page) => page.items));
  useEffect(() => {
    setPagination({ ...queryObj, page: 1, size: 50 });
    refetch();
  }, [
    query,
    queryObj?.category,
    queryObj?.sub_category,
    queryObj?.sub_sub_category,
    queryObj?.initial_date,
    queryObj?.finish_date,
    queryObj?.page,
    queryObj?.size,
    queryObj?.address,
  ]);

  return (
    <div className="-mt-8 mb-44">
      <Hero
        items={[
          {
            image: '/images/slides/search-slide.png',
            url: '/images/slides/search-slide.png',
          },
        ]}
      />

      <div className="mt-16 space-y-16 section-container">
        <HeaderSearch
          className="max-w-5xl mx-auto"
          items={categories?.map((item) => ({
            name: item.category.find((obj) => obj.lang == locale)?.name,
            color: item.color,
            image: item.picture,
            id: item._id,
          }))}
          layout="swiper"
          size="small"
          setCurrentPage={() => {}}
          setPageSize={() => {}}
          totalDocs={0}
          {...useFormReturn}
        />

        {typeof queryObj?.category == 'string' && queryObj?.category !== '' && (
          <HeaderCategory
            id={category?.category?.find((obj) => obj.lang == locale)?._id}
            color={category?.color}
            image={category?.picture}
            name={category?.category?.find((obj) => obj.lang == locale)?.name}
            size="large"
          />
        )}
        <div className="grid grid-cols-6 gap-5 md:gap-10">
          <SidebarSearch
            categories={categories}
            className="sticky top-0 hidden col-span-2 md:block"
            {...useFormReturn}
          />
          {/* {data?.pages?.length == 0 && isLoading == false && query != '' ? ( */}
          <div className="col-span-6 space-y-10 md:col-span-4">
            {data?.pages?.length == 0 && !isLoading && query != '' && (
              <div className="flex flex-col gap-2">
                <Title level="h5">
                  {t('commons.search_no_results', {
                    query,
                  })}
                </Title>
                <p>{t('commons.check_words')}</p>
                <hr className="border-gray-400" />
              </div>
            )}

            <ListCardEvent
              categories={categories}
              className="col-span-6 md:col-span-4"
              loading={isLoading}
              layout="grid"
              setCurrentPage={setCurrentPage}
              setPageSize={setPageSize}
              totalDocs={data?.pages?.[0]?.total}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              title={
                data?.pages?.length == 0 && queryObj?.query != ''
                  ? t('commons.recommended_events')
                  : t('commons.results', {
                      query: queryObj?.query as string,
                      length: data?.pages?.[0]?.total,
                    })
              }
              items={
                data?.pages?.length == 0
                  ? data?.pages?.flatMap((page) =>
                      page.items.map((item) => ({
                        // image: item.schedule_id.event_id.images.picture,
                        image: 'https://loremflickr.com/640/480/cats',
                        name:
                          item?.schedule_id?.event_id?.content?.find(
                            (obj) => obj.lang == locale
                          )?.name ||
                          item?.schedule_id?.event_id?.content?.find(
                            (obj) => obj.lang == 'es'
                          )?.name,
                        startDate: item?.start_at,
                        endDate: item?.end_at,
                        location: `${item?.schedule_id?.venue_id?.address.country?.long_name}, ${item?.schedule_id?.venue_id?.address?.city} ${item?.schedule_id?.venue_id?.address?.address}`,
                        color: item.schedule_id.event_id.category_id.color,
                        id: item?.schedule_id?.event_id?._id,
                      }))
                    )
                  : eventSchedules?.items?.map((item) => ({
                      // image: item.schedule_id.event_id.images.picture,
                      image: 'https://loremflickr.com/640/480/cats',
                      name:
                        item?.schedule_id?.event_id?.content?.find(
                          (obj) => obj.lang == locale
                        )?.name ||
                        item?.schedule_id?.event_id?.content?.find(
                          (obj) => obj.lang == 'es'
                        )?.name,
                      startDate: item?.start_at,
                      endDate: item?.end_at,
                      location: `${item?.schedule_id?.venue_id?.address.country?.long_name}, ${item?.schedule_id?.venue_id?.address?.city} ${item?.schedule_id?.venue_id?.address?.address}`,
                      color: item.schedule_id.event_id.category_id.color,
                      id: item?.schedule_id?.event_id?._id,
                    }))
              }
              {...useFormReturn}
            />
          </div>
        </div>

        <CardAdvertisment
          size="large"
          image="/images/advertisements/anunciate-1320x250.png"
        />
      </div>
    </div>
  );
};

Search.Layout = MainLayout;

export async function getStaticProps({ locale }) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/events/categories/`
  );
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
      categories: data,
    },
  };
}

export default Search;
