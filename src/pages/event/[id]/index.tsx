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
  const { query } = useRouter();
  const { data: eventsSchedules, isLoading } = useEventScheduleTimetables();
  const { data: eventSchedule } = useEventScheduleTimetable(
    query?._id as string
  );

  const locale = useLocale();
  const info =
    eventSchedule?.schedule_id?.event_id?.info.content?.find(
      (obj) => obj.lang == locale
    ) ||
    eventSchedule?.schedule_id?.event_id?.info.content?.find(
      (obj) => obj.lang == 'es'
    );
  return (
    <div className="mt-16 space-y-16 section-container mb-44">
      <div className="flex flex-col-reverse justify-between gap-10 md:flex-row">
        <CardEventDetails
          className="flex-1"
          details={
            eventSchedule?.schedule_id?.event_id?.content.find(
              (obj) => obj?.lang == locale
            )?.description ||
            eventSchedule?.schedule_id?.event_id?.content.find(
              (obj) => obj?.lang == 'es'
            )?.description
          }
          access={info?.access_limit}
          general={info?.general}
          observations={info?.observations}
          restrictions={info?.restrictions}
          services={info?.services}
          id={eventSchedule?.schedule_id?.event_id?._id}
          // image={eventSchedule?.schedule_id?.event_id?.images?.picture?.web}
          image="https://loremflickr.com/640/480/cats"
        />
        <SidebarEvent
          className="h-max"
          category={
            eventSchedule?.schedule_id?.event_id?.category_id?.category?.find(
              (obj) => obj.lang == locale
            )?.name ||
            eventSchedule?.schedule_id?.event_id?.category_id?.category?.find(
              (obj) => obj.lang == 'es'
            )?.name
          }
          color={eventSchedule?.schedule_id?.event_id?.category_id?.color}
          cost={[eventSchedule?.costs?.lower, eventSchedule?.costs?.high]}
          startDate={eventSchedule?.start_at || new Date()}
          endDate={eventSchedule?.end_at || new Date()}
          id={eventSchedule?.schedule_id?.event_id?._id}
          location={`${eventSchedule?.schedule_id?.venue_id?.address.country?.long_name}, ${eventSchedule?.schedule_id?.venue_id?.address?.city} ${eventSchedule?.schedule_id?.venue_id?.address?.address}`}
          supplier={eventSchedule?.schedule_id?.event_id?.supplier_id?.name}
          name={
            eventSchedule?.schedule_id?.event_id?.content?.find(
              (obj) => obj.lang == locale
            )?.name ||
            eventSchedule?.schedule_id?.event_id?.content?.find(
              (obj) => obj.lang == 'es'
            )?.name
          }
        />
      </div>
      <CardEventLocation
        location={`${eventSchedule?.schedule_id?.venue_id?.address?.address}, ${eventSchedule?.schedule_id?.venue_id?.address?.address2}`}
        origin={{
          lat: parseInt(
            eventSchedule?.schedule_id?.venue_id?.address?.latitude
          ),
          lng: parseInt(
            eventSchedule?.schedule_id?.venue_id?.address?.longitude
          ),
        }}
        tags={eventSchedule?.schedule_id?.event_id?.tags?.map(
          (tag) => tag?.tag
        )}
      />
      <ListCardEvent
        loading={isLoading}
        layout="swiper"
        setCurrentPage={() => {}}
        setPageSize={() => {}}
        totalDocs={eventsSchedules?.total}
        title={t('home.new_events')}
        items={eventsSchedules?.items?.map((item) => ({
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
          id: item?._id,
        }))}
        {...useFormReturn}
      />
      <ListCardEventRecommendation
        loading={isLoading}
        items={eventsSchedules?.items?.map((item) => ({
          // image: item.schedule_id.event_id.images.picture,
          image: 'https://loremflickr.com/640/480/cats',
          name:
            item.schedule_id.event_id.content.find((obj) => obj.lang == locale)
              ?.name ||
            item.schedule_id.event_id.content.find((obj) => obj.lang == 'es')
              ?.name,
          startDate: item.start_at,
          endDate: item.end_at,
          location: `${item.schedule_id.venue_id.address.country.long_name}, ${item.schedule_id.venue_id.address.city} ${item.schedule_id.venue_id.address.address}`,
          color: item.schedule_id.event_id.category_id.color,
          id: item._id,
          category_id: item.schedule_id.event_id.category_id._id,
        }))}
        setCurrentPage={() => {}}
        setPageSize={() => {}}
        totalDocs={eventsSchedules?.total}
      />
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
