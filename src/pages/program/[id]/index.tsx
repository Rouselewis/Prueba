import { getEvents, readEvent } from '@/api/event/event';
import MainLayout from '@/components/layout/main';
import ListCardEvent from '@/components/main/commons/ListCardEvent';
import ListCardEventRecommendation from '@/components/main/commons/ListCardEventRecommendation';
import CardProgramDetails from '@/components/main/programs/CardProgramDetails';
import HeaderProgram from '@/components/main/programs/HeaderProgram';
import ListProgramDays from '@/components/main/search/ListProgramDays';
import { useEvent, useEvents } from '@/hooks/event/event';
import {
  useEventScheduleTimetable,
  useEventScheduleTimetables,
} from '@/hooks/event/event_schedules_timetables';
import {
  useEventSpecialCategory,
  useEventSpecialCategoryDateRange,
} from '@/hooks/event/event_special_category';
import { faker } from '@faker-js/faker';
import { useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ProgramDetailed = () => {
  const useFormReturn = useForm();
  const { control } = useFormReturn;
  const t = useTranslations('Public');
  const locale = useLocale();
  const { query } = useRouter();
  const [listProgramDays, setListProgramDays] = useState([]);

  const { data: specialCategory } = useEventSpecialCategory(
    query?._id as string
  );

  const { data: eventsSchedules, isLoading } = useEventScheduleTimetables();

  const eventRange = useEventSpecialCategoryDateRange(query?._id as string);

  const categoryName =
    specialCategory?.category.find((item) => item.lang == locale).name ||
    specialCategory?.category.find((item) => item.lang == 'es').name;

  useEffect(() => {
    setListProgramDays(
      Array.from({ length: 10 }, () => faker.datatype.datetime())
    );
  }, []);
  return (
    <div>
      <HeaderProgram
        color={specialCategory?.color}
        image={specialCategory?.header_img.replace('http', 'https')}
        name={categoryName}
      />

      <div className="mt-16 mb-44 section-container space-y-16">
        <CardProgramDetails
          className="mt-16"
          description={specialCategory?.description}
          endDate={specialCategory?.final_date || new Date()}
          startDate={specialCategory?.initial_date || new Date()}
          image={specialCategory?.header_img}
          location={`${specialCategory?.location.city}, ${specialCategory?.location.state.long_name}, ${specialCategory?.location.country.long_name}`}
          name={categoryName}
        />
        <ListProgramDays
          items={listProgramDays}
          name="field"
          control={control}
        />
        <ListCardEvent
          loading={isLoading}
          layout="swiper"
          setCurrentPage={() => {}}
          setPageSize={() => {}}
          totalDocs={10}
          title={t('home.new_events')}
          items={eventsSchedules?.items.map((item) => ({
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
            category_id: item.schedule_id.event_id.category_id._id,
          }))}
          {...useFormReturn}
        />

        <ListCardEventRecommendation
          items={eventsSchedules?.items.map((item) => ({
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
            category_id: item.schedule_id.event_id.category_id._id,
          }))}
          setCurrentPage={() => {}}
          setPageSize={() => {}}
          totalDocs={10}
        />
      </div>
    </div>
  );
};

ProgramDetailed.Layout = MainLayout;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}

export default ProgramDetailed;
