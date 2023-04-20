import { getEvents, readEvent } from '@/api/event/event';
import {
  getEventsCategories,
  readEventCategory,
} from '@/api/event/event_category';
import { getEventsSeatmaps } from '@/api/event/event_seatmap';
import { readEventSupplier } from '@/api/event/event_supplier';
import MainLayout from '@/components/layout/main';
import ListCardEvent from '@/components/main/commons/ListCardEvent';
import ListCardEventRecommendation from '@/components/main/commons/ListCardEventRecommendation';
import CardEventDetails from '@/components/main/event/CardEventDetails';
import CardEventLocation from '@/components/main/event/CardEventLocation';
import SidebarEvent from '@/components/main/event/SidebarEvent';
import { useEventCategory } from '@/hooks/event/event_category';
import { useEvent, useEvents } from '@/hooks/event/event';
import {
  useEventScheduleTimetable,
  useEventScheduleTimetables,
} from '@/hooks/event/event_schedules_timetables';
import { useEventSeatmap, useEventSeatmaps } from '@/hooks/event/event_seatmap';
import { useEventSupplier } from '@/hooks/event/event_supplier';
import { EventCategory, Event } from '@/interfaces/event';
import { faker } from '@faker-js/faker';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';

const EventDetailed = () => {
  const useFormReturn = useForm();
  const t = useTranslations('Public');
  const router = useRouter();
  const { _id } = router.query;
  const { data: eventsSchedules } = useEventScheduleTimetables();
  const { data: eventSchedule } = useEventScheduleTimetable(_id as string);
  console.log(eventSchedule);

  // const category = useEventCategory(event?.data?.category_id?._id);
  // const eventSupplier = useEventSupplier(event?.data?.supplier_id?.id);

  const locale = useLocale();
  // const info =
  //   event?.data?.info.content.find((obj) => obj.lang == locale) ||
  //   event?.data?.info.content.find((obj) => obj.lang == 'es');
  return (
    <div className="mt-16 space-y-16 section-container mb-44">
      {/* <div className="flex flex-col-reverse justify-between gap-10 md:flex-row">
        <CardEventDetails
          className="flex-1"
          details={
            event?.data?.content?.find((obj) => obj.lang == locale)
              ?.description ||
            event?.data?.content?.find((obj) => obj.lang == 'es')?.description
          }
          access={info?.access_limit}
          general={info?.general}
          observations={info?.observations}
          restrictions={info?.restrictions}
          services={info?.services}
          id={event?.data?._id}
          image="https://loremflickr.com/640/480/cats"
        />
        <SidebarEvent
          className="h-max"
          category={
            category?.data?.content?.find((obj) => obj.lang == locale)?.name ||
            category?.data?.content?.find((obj) => obj.lang == 'es')?.name
          }
          color={category?.data?.color}
          cost={300}
          startDate={new Date()}
          endDate={new Date()}
          startTime="1:00"
          endTime="12:00"
          id={event?.data?._id}
          location="Location"
          supplier={eventSupplier?.data?.name}
          name={
            event?.data?.content?.find((obj) => obj.lang == locale)?.name ||
            event?.data?.content?.find((obj) => obj.lang == 'es')?.name
          }
        />
      </div>
      <CardEventLocation
        location="Location"
        origin={{
          lat: -2.18331,
          lng: -79.8833,
        }}
        tags={event?.data?.tags?.map((obj) => obj.tag)}
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
          name: item.content.find((obj) => obj.lang == locale)?.name,
          startDate: new Date(),
          endDate: new Date(),
          location: 'Location',
          color: item.category_id?.color,
          id: item._id,
        }))}
        {...useFormReturn}
      /> */}
      {/* <ListCardEventRecommendation
        items={events?.data?.items?.map((item) => ({
          category_id: item.category_id._id,
          image: 'https://loremflickr.com/640/480/cats',
          location: 'Location',
          name: item.content.find((obj) => obj.lang == locale)?.name,
          id: item._id,
        }))}
        setCurrentPage={() => {}}
        setPageSize={() => {}}
        totalDocs={10}
      /> */}
    </div>
  );
};

EventDetailed.Layout = MainLayout;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}

export default EventDetailed;
