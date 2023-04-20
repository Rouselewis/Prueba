import { getEvents } from '@/api/event/event';
import { getEventsCategories } from '@/api/event/event_category';
import MainLayout from '@/components/layout/main';
import CardAdvertisment from '@/components/main/commons/CardAdvertisment';
import Hero from '@/components/main/commons/Hero';
import ListCardEvent from '@/components/main/commons/ListCardEvent';
import SidebarSearch from '@/components/main/commons/SidebarSearch';
import HeaderCategory from '@/components/main/search/HeaderCategory';
import HeaderSearch from '@/components/main/search/HeaderSearch';
import { useEvents } from '@/hooks/event/event';
import { useEventScheduleTimetables } from '@/hooks/event/event_schedules_timetables';
import { useEventsSpecialsCategories } from '@/hooks/event/event_special_category';
import { faker } from '@faker-js/faker';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Program = ({ categories }) => {
  const useFormReturn = useForm<any>({
    defaultValues: {
      initial_date: 'dd/mm/aaaa',
      finish_date: 'dd/mm/aaaa',
    },
  });
  const { query: queryObj, push } = useRouter();
  const { watch } = useFormReturn;
  const query = watch('query');
  const t = useTranslations('Public');
  const locale = useLocale();

  const specialCategories = useEventsSpecialsCategories();

  const events = useEventScheduleTimetables();

  console.log(specialCategories?.data?.items);
  const category = categories?.find((item) => item._id == queryObj?.category);

  return (
    <div className="mb-44 -mt-8">
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
          totalDocs={12}
          {...useFormReturn}
        />
        {typeof queryObj?.category == 'string' && queryObj?.category !== '' && (
          <HeaderCategory
            color={category?.color}
            image={category?.picture}
            name={category?.category?.find((obj) => obj.lang == locale)?.name}
            id={category?._id}
            size="large"
          />
        )}
        <div className="grid grid-cols-6 gap-5 md:gap-10">
          <SidebarSearch
            categories={categories}
            className="col-span-2 hidden md:block"
            {...useFormReturn}
          />
          <ListCardEvent
            categories={categories}
            className="col-span-6 md:col-span-4"
            controls
            loading={specialCategories?.isLoading}
            layout="swiper"
            setCurrentPage={() => {}}
            setPageSize={() => {}}
            totalDocs={10}
            title={t('home.new_events')}
            items={specialCategories.data?.items?.map((item) => ({
              image: item.event_img,
              name:
                item.category.find((obj) => obj.lang == locale)?.name ||
                item.category.find((obj) => obj.lang == 'es')?.name,
              startDate: item.initial_date,
              endDate: item.final_date,
              location: `${item.location.city}, ${item.location.state.long_name} ${item.location.country.long_name}`,
              color: item.color,
              id: item._id,
            }))}
            {...useFormReturn}
          />
        </div>

        <hr className="bg-gray-700 border-[1.3px]" />

        <ListCardEvent
          categories={categories}
          loading={specialCategories?.isLoading}
          layout="swiper"
          setCurrentPage={() => {}}
          setPageSize={() => {}}
          totalDocs={10}
          title={
            query
              ? t('commons.results', {
                  length: specialCategories?.data?.total,
                  query,
                })
              : t('commons.recommended_events')
          }
          items={events?.data?.items?.map((item) => ({
            // image: item.schedule_id.event_id.images.picture,
            image: 'https://loremflickr.com/640/480/cats',
            name:
              item.schedule_id.event_id.content.find(
                (obj) => obj.lang == locale
              )?.name ||
              item.schedule_id.event_id.content.find((obj) => obj.lang == 'es')
                ?.name,
            startDate: item.start_at,
            endDate: item.end_at,
            location: `${item.schedule_id.venue_id.address.country.long_name}, ${item.schedule_id.venue_id.address.city} ${item.schedule_id.venue_id.address.address}`,
            color: item.schedule_id.event_id.category_id.color,
            id: item._id,
          }))}
          {...useFormReturn}
        />

        <CardAdvertisment
          image="/images/advertisements/anunciate_aqui.png"
          size="large"
        />
      </div>
    </div>
  );
};

Program.Layout = MainLayout;

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

export default Program;
