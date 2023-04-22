/** @format */
import { useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { Switch } from '@headlessui/react';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  CustomLabel,
  CustomCancel,
  CustomSubmit,
  CustomAdd,
  CustomError,
} from '@/components/forms';
// Helpers
import { CurrentColor, FormStyles, classNames } from '@/helpers';
// Icons
import { LinkIcon } from '@heroicons/react/24/solid';
// Interface
import { Address, CreateTicket } from '@/interfaces/serializers/commons';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useEvents, useMutationUpdateEvent } from '@/hooks/event/event';
import { toast } from 'react-toastify';
import {
  CustomCreateTemplate,
  CustomLoadTemplate,
} from '@/components/forms/buttons';

const EventCreateAdditional = () => {
  const t = useTranslations('Panel_SideBar');
  const tc = useTranslations('Common_Forms');
  const te = useTranslations('Ferrors');
  const tt = useTranslations('Panel_Ticket');
  const transformDate = (originalValue) => {
    if (originalValue === null || originalValue === '') {
      return null;
    }
    const date = new Date(originalValue);
    return isNaN(date.getTime()) ? null : date;
  };
  const validationSchema = yup.object().shape({
    currency: yup.string().required(te('required')),
    event_id: yup.string().required(te('required')),
    date: yup.date().required(te('required')).transform(transformDate),
    schedule: yup.string().required(te('required')),
    resale: yup.boolean(),
    starting_date: yup
      .date()
      .transform(transformDate)
      .when('resale', {
        is: true,
        then: (schema) => schema.required(te('required')),
        otherwise: (schema) => schema.notRequired(),
      }),
    ending_date: yup
      .date()
      .transform(transformDate)
      .when('resale', {
        is: true,
        then: (schema) => schema.required(te('required')),
        otherwise: (schema) => schema.nullable(),
      }),
    reserve: yup.boolean(),
    cost_percentage: yup.number().when('reserve', {
      is: true,
      then: (schema) => schema.moreThan(0).required(te('required')),
      otherwise: (schema) => schema.nullable(),
    }),
    pay_limit: yup.number().when('reserve', {
      is: true,
      then: (schema) => schema.moreThan(0).required(te('required')),
      otherwise: (schema) => schema.nullable(),
    }),
    free_event: yup.boolean(),
    charity: yup.boolean(),
    sell_limit: yup.number().moreThan(0).required(te('required')),
    sale_start: yup.date().required(te('required')),
    pre_sale_start: yup.date(),
    three_months: yup.boolean(),
    six_months: yup.boolean(),
    nine_months: yup.boolean(),
  });
  const currentColor = CurrentColor();
  const { mutate: updateEvent, isLoading, error } = useMutationUpdateEvent();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CreateTicket>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      cost_percentage: 0,
      pay_limit: 0,
      sell_limit: 0,
    },
  });
  const onSubmit = (data: CreateTicket) => {
    updateEvent({
      _id: data.event_id,
      settings: {
        isFree: data.free_event,
        isCharity: data.charity,
        currency: data.currency,
        tickets: {
          resale: {
            enable: data.resale,
            start_at: data.starting_date,
            end_at: data.ending_date,
          },
          reserve: {
            enable: data.reserve,
            cost_percentage: data.cost_percentage,
            days_limit: data.pay_limit,
          },
          sell_limit: data.sell_limit,
          pre_sell_start_at: data.pre_sale_start,
          sell_start_at: data.sale_start,
        },
        msi: [
          {
            month: 3,
            status: data.three_months,
          },
          {
            month: 6,
            status: data.six_months,
          },
          {
            month: 9,
            status: data.nine_months,
          },
        ],
      },
    });
  };

  const locale = useLocale();
  const { data: events } = useEvents();
  const breadcrumb = [
    { page: t('ticket.ticket'), href: '/panel/ticket/create' },
    { page: t('actions.create'), href: '' },
  ];
  const handleClickDateInput = (element_id: string) => {
    const dateInput = document.querySelector(
      `#${element_id}`
    ) as HTMLInputElement;
    dateInput.showPicker();
  };
  return (
    <>
      {/* Breadcrumb section */}
      <div>
        <Heading breadcrumb={breadcrumb} />
      </div>
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-9 px-2"
            action="#"
            method="POST"
          >
            <div className="mt-6 grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-12">
                <CustomLabel required field="event" name={tc('field_event')} />
                <select
                  id="event"
                  name="event"
                  className={FormStyles('select')}
                  defaultValue={''}
                  {...register('event_id')}
                >
                  <option value="">{tc('field_event')}</option>
                  {events?.items?.map((event) => (
                    <option value={event._id}>
                      {event.content?.find((obj) => obj.lang == locale)?.name ||
                        event.content?.find((obj) => obj.lang == 'es')?.name}
                    </option>
                  ))}
                </select>
                <CustomError error={errors?.event_id?.message} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel
                  required
                  field="date"
                  name={tc('field_event_date')}
                />
                <select
                  id="date"
                  name="date"
                  className={FormStyles('select')}
                  defaultValue={''}
                  {...register('date')}
                >
                  <option value="all">{tc('field_date')}</option>
                </select>
                <CustomError error={errors?.date?.message} />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                <CustomLabel
                  required
                  field="schedule"
                  name={tc('field_schedule')}
                />
                <select
                  id="schedule"
                  name="schedule"
                  className={FormStyles('select')}
                  defaultValue={''}
                  {...register('schedule')}
                >
                  <option value="all">{tc('field_schedule')}</option>
                </select>
                <CustomError error={errors?.schedule?.message} />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12">{tt('ticket')}</div>
              <div className="col-span-12 sm:col-span-4">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="resale"
                      aria-describedby="resale-description"
                      name="resale"
                      type="checkbox"
                      {...register('resale')}
                      className={FormStyles('checkbox')}
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <CustomLabel field="resale" name={tc('field_resale')} />
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-4">
                <CustomLabel
                  required={watch('resale')}
                  field="starting_date"
                  name={tc('field_starting_date')}
                />
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    name="starting_date"
                    id="starting_date"
                    autoComplete={tc('field_starting_date')}
                    placeholder={tc('field_starting_date')}
                    className={classNames(
                      FormStyles('input'),
                      '[&::-webkit-calendar-picker-indicator]:hidden'
                    )}
                    {...register('starting_date', {
                      valueAsDate: true,
                    })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CalendarIcon
                      onClick={() => handleClickDateInput('starting_date')}
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <CustomError error={errors?.starting_date?.message} />
              </div>
              <div className="col-span-12 sm:col-span-4">
                <CustomLabel
                  required={watch('resale')}
                  field="ending_date"
                  name={tc('field_ending_date')}
                />
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    name="ending_date"
                    id="ending_date"
                    autoComplete={tc('field_ending_date')}
                    placeholder={tc('field_ending_date')}
                    className={classNames(
                      FormStyles('input'),
                      '[&::-webkit-calendar-picker-indicator]:hidden'
                    )}
                    {...register('ending_date', {
                      valueAsDate: true,
                    })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CalendarIcon
                      onClick={() => handleClickDateInput('ending_date')}
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <CustomError error={errors?.ending_date?.message} />
              </div>
              <div className="col-span-12 sm:col-span-4">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="reserve"
                      aria-describedby="reserve-description"
                      name="reserve"
                      type="checkbox"
                      className={FormStyles('checkbox')}
                      {...register('reserve')}
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <CustomLabel field="reserve" name={tc('field_reserve')} />
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-4">
                <CustomLabel
                  required={watch('reserve')}
                  field="cost_porcentage"
                  name={tc('field_cost_porcentage')}
                />
                <input
                  type="number"
                  name="cost_porcentage"
                  id="cost_porcentage"
                  autoComplete={tc('field_cost_porcentage')}
                  placeholder={tc('field_cost_porcentage')}
                  className={FormStyles('input')}
                  {...register('cost_percentage')}
                />
                <CustomError error={errors?.cost_percentage?.message} />
              </div>
              <div className="col-span-12 sm:col-span-4">
                <CustomLabel
                  required={watch('reserve')}
                  field="pay_limit"
                  name={tc('field_pay_limit')}
                />
                <input
                  type="number"
                  name="pay_limit"
                  id="pay_limit"
                  autoComplete={tc('field_pay_limit')}
                  placeholder={tc('field_pay_limit')}
                  className={FormStyles('input')}
                  {...register('pay_limit')}
                />
                <CustomError error={errors?.pay_limit?.message} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <CustomLabel field="free_event" name={tc('field_free_event')} />
                <Switch.Group as="div" className="flex items-center">
                  <Switch
                    checked={watch('free_event')}
                    onChange={(e) => setValue('free_event', e)}
                    className={classNames(
                      watch('free_event')
                        ? `bg-${currentColor}`
                        : `bg-gray-200`,
                      `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-${currentColor} focus:ring-offset-2`
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        watch('free_event') ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </Switch.Group>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <CustomLabel field="charity" name={tc('field_charity')} />
                <Switch.Group as="div" className="flex items-center">
                  <Switch
                    checked={watch('charity')}
                    onChange={(e) => setValue('charity', e)}
                    className={classNames(
                      watch('charity') ? `bg-${currentColor}` : `bg-gray-200`,
                      `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-${currentColor} focus:ring-offset-2`
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={classNames(
                        watch('charity') ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </Switch.Group>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-2 lg:col-span-3">
                <CustomLabel
                  required
                  field="sell_limit"
                  name={tc('field_sell_limit')}
                />
                <input
                  type="number"
                  name="sell_limit"
                  id="sell_limit"
                  autoComplete={tc('field_sell_limit')}
                  placeholder={tc('field_sell_limit')}
                  className={FormStyles('input')}
                  {...register('sell_limit')}
                />
                <CustomError error={errors?.sell_limit?.message} />
              </div>
              <div className="col-span-12 sm:col-span-2 lg:col-span-3">
                <CustomLabel
                  required
                  field="currency"
                  name={tc('field_currency')}
                />
                <select
                  name="currency"
                  id="currency"
                  autoComplete={tc('field_currency')}
                  placeholder={tc('field_currency')}
                  className={FormStyles('input')}
                  {...register('currency')}
                >
                  <option value="MXN">MXN</option>
                  <option value="USD">USD</option>
                </select>
                <CustomError error={errors?.currency?.message} />
              </div>
              <div className="col-span-12 sm:col-span-2 lg:col-span-3">
                <CustomLabel
                  required
                  field="sale_start"
                  name={tc('field_sale_start')}
                />
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    name="sale_start"
                    id="sale_start"
                    autoComplete={tc('field_sale_start')}
                    placeholder={tc('field_sale_start')}
                    className={classNames(
                      FormStyles('input'),
                      '[&::-webkit-calendar-picker-indicator]:hidden'
                    )}
                    {...register('sale_start')}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CalendarIcon
                      onClick={() => handleClickDateInput('sale_start')}
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <CustomError error={errors?.sale_start?.message} />
              </div>
              <div className="col-span-12 sm:col-span-2 lg:col-span-3">
                <CustomLabel
                  field="pre_sale_start"
                  name={tc('field_pre_sale_start')}
                />
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="date"
                    name="pre_sale_start"
                    id="pre_sale_start"
                    autoComplete={tc('field_pre_sale_start')}
                    placeholder={tc('field_pre_sale_start')}
                    className={classNames(
                      FormStyles('input'),
                      '[&::-webkit-calendar-picker-indicator]:hidden'
                    )}
                    {...register('pre_sale_start')}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <CalendarIcon
                      onClick={() => handleClickDateInput('pre_sale_start')}
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <CustomError error={errors?.pre_sale_start?.message} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <CustomLabel
                  field="enable_months"
                  name={tc('field_enable_months')}
                />
              </div>
              <div className="col-span-12 sm:col-span-2">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <Switch.Group as="div" className="flex items-center">
                      <Switch
                        checked={watch('three_months')}
                        onChange={(e) => setValue('three_months', e)}
                        className={classNames(
                          watch('three_months')
                            ? `bg-${currentColor}`
                            : `bg-gray-200`,
                          `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-${currentColor} focus:ring-offset-2`
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            watch('three_months')
                              ? 'translate-x-5'
                              : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <CustomLabel
                      field="three_months"
                      name={tc('field_three_months')}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-2">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <Switch.Group as="div" className="flex items-center">
                      <Switch
                        checked={watch('six_months')}
                        onChange={(e) => setValue('six_months', e)}
                        className={classNames(
                          watch('six_months')
                            ? `bg-${currentColor}`
                            : `bg-gray-200`,
                          `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-${currentColor} focus:ring-offset-2`
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            watch('six_months')
                              ? 'translate-x-5'
                              : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <CustomLabel
                      field="six_months"
                      name={tc('field_six_months')}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-2">
                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <Switch.Group as="div" className="flex items-center">
                      <Switch
                        checked={watch('nine_months')}
                        onChange={(e) => setValue('nine_months', e)}
                        className={classNames(
                          watch('nine_months')
                            ? `bg-${currentColor}`
                            : `bg-gray-200`,
                          `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-${currentColor} focus:ring-offset-2`
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            watch('nine_months')
                              ? 'translate-x-5'
                              : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                    </Switch.Group>
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <CustomLabel
                      field="nine_months"
                      name={tc('field_nine_months')}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6">
                <div className="relative flex items-start">
                  <div className="flex rounded-2xl shadow-xl p-2">
                    <div className="sm:shrink">
                      <p className="text-lg font-semibold tracking-tight text-gray-900">
                        {tt('commission')}
                      </p>
                      <div className="flex justify-between">
                        <p className="mt-2 text-base leading-7 text-gray-600">
                          5% {tt('for')} 3
                        </p>
                        <p className="mt-2 text-base leading-7 text-gray-600">
                          7.5% {tt('for')} 6
                        </p>
                        <p className="mt-2 text-base leading-7 text-gray-600">
                          10% {tt('for')} 9
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12">{tt('template')}</div>
              <div className="col-span-12 sm:col-span-2">
                <CustomLoadTemplate />
              </div>
              <div className="col-span-12 sm:col-span-2">
                <CustomCreateTemplate />
              </div>
              <div className="col-span-12">
                Show the template selected image and name
              </div>
            </div>

            {/* Buttons section */}
            <div className="divide-y divide-gray-200 pt-6">
              <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                <CustomCancel />
                <CustomSubmit />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

EventCreateAdditional.Layout = AdminLayout;
export default EventCreateAdditional;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
