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

const Home = () => {
  const t = useTranslations('Public');
  const locale = useLocale();
  const useFormReturn = useForm();
  const categories = useCategories();
  const events = useEvents();

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
          totalDocs={10}
          title={t('home.featured_events')}
          items={events?.data?.items?.map((item) => ({
            image: 'https://loremflickr.com/640/480/cats',
            name:
              item.content.find((obj) => obj.lang == locale)?.name ||
              item.content.find((obj) => obj.lang == 'es')?.name,
            startDate: item.created_at as unknown as Date,
            endDate: new Date(),
            location: 'Location',
            color: item.category_id?.color,
            id: item._id,
          }))}
          {...useFormReturn}
        />

        <ListCardEvent
          loading={events?.isLoading}
          layout="swiper"
          setCurrentPage={() => {}}
          setPageSize={() => {}}
          totalDocs={10}
          title={t('home.new_events')}
          items={events?.data?.items?.map((item) => ({
            image: 'https://loremflickr.com/640/480/cats',
            name:
              item.content.find((obj) => obj.lang == locale)?.name ||
              item.content.find((obj) => obj.lang == 'es')?.name,
            startDate: item.created_at as unknown as Date,
            endDate: new Date(),
            location: 'Location',
            color: item.category_id?.color,
            id: item._id,
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
