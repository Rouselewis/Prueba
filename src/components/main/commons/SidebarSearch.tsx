import React, { useEffect, useState } from 'react';
import { classNames } from '@/helpers';
import { Button, Icon, Select, TextField, Title } from '@/components/commons';
import { useLocale, useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getEventsCategories } from '@/api/event/event_category';
import DateRangePicker from '@/components/commons/DateRangePicker';
import { format } from 'date-fns';
import { EventCategory } from '@/interfaces/event';
import { useRouter } from 'next/router';
import { CalendarIcon } from '@heroicons/react/20/solid';

export type props = {
  className?: string;
  categories: EventCategory[];
  close?: () => void;
} & UseFormReturn;

const SidebarSearch: React.FC<props> = ({
  className,
  close,
  categories,
  ...useFormReturn
}) => {
  const { register, control, watch, setValue } = useFormReturn;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { push, query, pathname } = useRouter();
  const t = useTranslations('Drawer_Search_Filters');
  const locale = useLocale();
  const category = watch('category');
  const sub_category = watch('sub_category');
  const sub_sub_category = watch('sub_sub_category');
  const dateRange = watch('date-range');
  const categoriesArray = categories
    ? categories?.map((item) => ({
        name: item?.category?.find((obj) => obj.lang == locale)?.name,
        value: item._id,
      }))
    : [];
  const categoriesOptions = [
    {
      name: t('select_categories_placeholder'),
      value: '',
    },
  ].concat(categoriesArray);
  const subCategoriesOptions = [
    {
      name: t('select_sub_categories_placeholder'),
      value: '',
    },
  ].concat(categoriesArray);
  const subsubCategoriesOptions = [
    {
      name: t('select_sub_subcategories_placeholder'),
      value: '',
    },
  ].concat(categoriesArray);
  useEffect(() => {
    if (dateRange?.[0]) {
      setValue('initial_date', format(new Date(dateRange?.[0]), 'dd/mm/yyyy'));
    }
    if (dateRange?.[1]) {
      setValue('finish_date', format(new Date(dateRange?.[1]), 'dd/mm/yyyy'));
    }
  }, [dateRange?.[0], dateRange?.[1]]);
  useEffect(() => {
    if (formSubmitted) {
      let updatedQuery = { ...query };
      if (category && category !== '') {
        updatedQuery = {
          ...updatedQuery,
          category,
        };
      } else {
        delete query?.category;
      }
      if (sub_sub_category) {
        updatedQuery = {
          ...updatedQuery,
          sub_sub_category,
        };
      } else {
        delete query?.sub_sub_category;
      }
      if (sub_category) {
        updatedQuery = {
          ...updatedQuery,
          sub_category,
        };
      } else {
        delete query?.sub_category;
      }

      if (dateRange?.[0]) {
        updatedQuery = {
          ...updatedQuery,
          initial_date: new Date(dateRange?.[0])?.toISOString(),
        };
      } else {
        delete query?.initial_date;
      }

      if (dateRange?.[1]) {
        updatedQuery = {
          ...updatedQuery,
          finish_date: new Date(dateRange?.[1])?.toISOString(),
        };
      } else {
        delete query?.finish_date;
      }

      push(
        {
          pathname: pathname == '/search' ? '/search' : '/program',
          query: updatedQuery,
        },
        undefined,
        {
          shallow: true,
        }
      );
      setFormSubmitted(false);
    }
  }, [
    category,
    sub_category,
    sub_sub_category,
    formSubmitted,
    dateRange?.[0],
    dateRange?.[1],
  ]);
  return (
    <div className={classNames('relative h-max', className)}>
      <div
        className={classNames(
          'flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl',
          !close && 'rounded-xl'
        )}
      >
        <div className="relative flex flex-col gap-5 mt-6 flex-1 px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Title level="h4">{t('title')}</Title>
            {close && (
              <Button
                onClick={close}
                weight="inline"
                color="neutral"
                iconLeft={<Icon name="close-outline" />}
              />
            )}
          </div>
          <div className="mt-5 space-y-2">
            <Title level="h5">{t('category')}</Title>
            <hr className="border-gray-200" />
          </div>

          <Select options={categoriesOptions} {...register('category')} />

          <Select
            label={t('sub_category')}
            options={subCategoriesOptions}
            {...register('sub_category')}
          />

          <Select
            label={t('sub_sub_category')}
            options={subsubCategoriesOptions}
            {...register('sub_sub_category')}
          />

          <div className="mt-5 space-y-2">
            <Title level="h5">{t('dates')}</Title>
            <hr className="border-gray-200" />
          </div>

          <div className="flex flex-col gap-5">
            <DateRangePicker control={control}>
              <TextField
                type="text"
                readOnly
                icon={<CalendarIcon className="w-5 h-5" />}
                iconPosition="right"
                label={t('initial_date')}
                {...register('initial_date')}
              />
            </DateRangePicker>
            <TextField
              type="text"
              readOnly
              icon={<CalendarIcon className="w-5 h-5" />}
              iconPosition="right"
              label={t('finish_date')}
              {...register('finish_date')}
            />
          </div>

          <Title level="h5" className="mt-5 mb-3">
            {t('location.label')}
          </Title>

          <TextField
            iconPosition="right"
            placeholder={t('location.placeholder')}
            icon={<Icon name="search-icon" />}
            {...register('location')}
          />

          <div className="w-[80%] mt-7 mx-auto">
            <Button
              onClick={() => setFormSubmitted(true)}
              size="large"
              fullWidth
            >
              {t('button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarSearch;
