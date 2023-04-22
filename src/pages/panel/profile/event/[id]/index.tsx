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
import CardEventInfo from '@/components/main/event/CardEventInfo';
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
    <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-8">
        <CardEventDetails
          className="lg:col-span-4 lg:row-end-1"
          id={eventSchedule?.schedule_id?.event_id?._id}
          // image={eventSchedule?.schedule_id?.event_id?.images?.picture?.web}
          image="https://loremflickr.com/640/480/cats"
        />
        <SidebarEvent
          className="w-full mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none shadow-xl"
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
        <CardEventInfo
          className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none"
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
        />
      </div>
      {/*
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
        />*/}
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
