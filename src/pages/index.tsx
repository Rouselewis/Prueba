import React from 'react';
import MainLayout from '@/components/layout/main';
import ListCardCategory from '@/components/main/commons/ListCardCategory';
import { useState } from 'react';
import { useEffect } from 'react';
import { faker } from '@faker-js/faker';
import { Title } from '@/components/commons';
import { useLocale, useTranslations } from 'next-intl';
import ListCardEvent from '@/components/main/commons/ListCardEvent';
import { useForm } from 'react-hook-form';
import { getEventsCategories } from '@/api/event/event_category';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '@/api/event/event';
import Hero from '@/components/main/commons/Hero';
import { getEventsVenues } from '@/api/event/event_venue';
import { useEvents } from '@/hooks/event/event';
import { useCategories } from '@/hooks/event/event_category';
import { useEventScheduleTimetables } from '@/hooks/event/event_schedules_timetables';

const Home = () => {
  const t = useTranslations('Public');
  const locale = useLocale();
  const useFormReturn = useForm();
  const events = useEventScheduleTimetables();
  const categories = useCategories();

  return (
    <div className="-mt-8 mb-44">
      <Hero
        items={[
          {
            image: '/images/slides/home-slide.png',
            url: '/images/slides/home-slide.png',
          },
        ]}
      />
      <div className="mt-16 space-y-16 section-container">
        <ListCardCategory
          className="max-w-5xl mx-auto"
          items={categories?.data?.map((item) => ({
            name: item.category.find((obj) => obj.lang == locale)?.name,
            color: item.color,
            image: item.picture,
            id: item._id,
          }))}
          layout="swiper"
          size="small"
          setCurrentPage={() => {}}
          setPageSize={() => {}}
          totalDocs={12}
        />

        <ListCardEvent
          loading={events?.isLoading}
          layout="swiper"
          setCurrentPage={() => {}}
          setPageSize={() => {}}
          totalDocs={events.data?.total}
          title={t('home.featured_events')}
          items={events?.data?.items?.map((item) => ({
            // image: item.schedule_id.event_id.images.picture.web,
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
          }))}
          {...useFormReturn}
        />

        <ListCardEvent
          loading={events?.isLoading}
          layout="swiper"
          setCurrentPage={() => {}}
          setPageSize={() => {}}
          totalDocs={events.data?.total}
          title={t('home.new_events')}
          items={events?.data?.items?.map((item) => ({
            // image: item.schedule_id.event_id.images.picture.web,
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
          }))}
          {...useFormReturn}
        />
      </div>
    </div>
  );
};

Home.Layout = MainLayout;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}

export default Home;
