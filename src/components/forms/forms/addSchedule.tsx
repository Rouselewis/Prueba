import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ClockIcon, LinkIcon } from '@heroicons/react/24/outline';
import { CustomLabel, CustomError } from '../labels';
import { useTranslations } from 'next-intl';
import { FormStyles } from '@/helpers';
import { CustomCancel, CustomSubmit } from '../buttons';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { removeProperties } from '@/helpers';

type Props = {
  open: boolean;
  setOpen: any;
  setSchedules: any;
};

type FormData = {
  start_at: string;
  end_at: string;
  costs: {
    cost: number;
    lower: number;
    high: number;
  };
  urls: {
    ticket: string;
    streaming: string;
  };
  repeat_days: string[];
};
export const AddSchedule: React.FC<Props> = ({
  open,
  setOpen,
  setSchedules,
}) => {
  const te = useTranslations('Ferrors');
  const t = useTranslations('Panel_Event_Add_Schedule');
  const tc = useTranslations('Common_Forms');
  const ts = useTranslations('Fsuccess');
  const { watch: watchGeneral } = useFormContext();
  const [start_date, end_date, date_type] = watchGeneral([
    'event_dates.dates.range.start_at',
    'event_dates.dates.range.end_at',
    'date_type',
  ]);

  const validationSchema = yup.object().shape({
    start_at: yup.string().required(te('required')),
    end_at: yup.string().required(te('required')),
    costs: yup.object({
      cost: yup
        .number()
        .transform((value) => (isNaN(value) ? null : value))
        .required(te('required')),
      lower: yup
        .number()
        .nullable()
        .transform((value) => (isNaN(value) ? null : value)),
      high: yup
        .number()
        .nullable()
        .transform((value) => (isNaN(value) ? null : value)),
    }),
    urls: yup.object({
      ticket: yup.string().required(te('required')),
      streaming: yup.string().required(te('required')),
    }),
    repeat_days:
      date_type == 'range'
        ? yup
            .array(yup.string())
            .nullable()
            .transform((v) => (v == false ? null : v))
            .test(
              'Required',
              te('select_one_day_at_least'),
              (v) => v?.length > 0
            )
        : undefined,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const [start_hour, end_hour, repeat_days] = watch([
    'start_at',
    'end_at',
    'repeat_days',
  ]);
  const cancelButtonRef = useRef(null);

  const generateSchedules = ({
    start_date,
    end_date,
    start_hour,
    end_hour,
    repeat_days,
  }: {
    start_date: Date;
    end_date?: Date;
    start_hour: string;
    end_hour: string;
    repeat_days?: string[];
  }): { start_at: Date; end_at?: Date }[] => {
    const schedules: { start_at: Date; end_at?: Date }[] = [];

    // If end_date is not provided, generate schedules only for the start_date
    if (!end_date) {
      const startDateTime = new Date(start_date);
      // @ts-ignore
      startDateTime.setHours(...start_hour.split(':'));
      const endDateTime = new Date(start_date);
      // @ts-ignore
      endDateTime.setHours(...end_hour.split(':'));
      schedules.push({ start_at: startDateTime, end_at: endDateTime });
      return schedules;
    }

    const startTime = start_hour.split(':');
    const endTime = end_hour.split(':');
    const startDay = start_date.getDay();
    const endDay = end_date.getDay();

    // Calculate the number of days between the start and end datges
    const timeDiff = Math.abs(end_date.getTime() - start_date.getTime());

    // Generate schedules for each repeat day
    repeat_days?.forEach((day) => {
      const dayOfWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ].indexOf(day.toLowerCase());

      if (dayOfWeek >= 0) {
        // Calculate the next occurrence of the repeat day after the start date
        let nextDate = new Date(start_date);
        let nextDay = nextDate.getDay();
        while (nextDay != dayOfWeek) {
          nextDate.setDate(nextDate.getDate() + 1);
          nextDay = nextDate.getDay();
        }

        // Generate schedules for the repeat day until the end date
        while (nextDate <= end_date) {
          const startDateTime = new Date(nextDate);
          // @ts-ignore
          startDateTime.setHours(...startTime);
          const endDateTime = new Date(nextDate);
          // @ts-ignore
          endDateTime.setHours(...endTime);
          schedules.push({ start_at: startDateTime, end_at: endDateTime });

          // Move to the next occurrence of the repeat day
          nextDate.setDate(nextDate.getDate() + 7);
        }
      }
    });

    // If the start and end dates are in the same week, remove schedules outside of the date range
    // if (startDay <= endDay && endDay - startDay < 7) {
    //   schedules.forEach((schedule) => {
    //     if (
    //       schedule.start_at.getDay() < startDay ||
    //       (schedule.end_at?.getDay() ?? 0) > endDay // set default value of 0 for end_at.getDay() if it's not set
    //     ) {
    //       schedule.end_at = new Date(schedule.start_at.getTime());
    //       schedule.end_at.setDate(schedule.start_at.getDate() + 7);
    //     }
    //   });
    // }

    return schedules;
  };
  const onClose = () => {
    setOpen(false);
    reset();
  };
  const onSubmit = (formData: FormData) => {
    try {
      if (!start_date || !end_date)
        throw new Error('Please select an intial and final date');
      const schedules = generateSchedules({
        start_date,
        end_date,
        start_hour,
        end_hour,
        repeat_days,
      });

      schedules.forEach((schedule) => {
        setSchedules((prv) => [
          ...prv,
          { ...removeProperties(['repeat_days'], formData), ...schedule },
        ]);
      });
      onClose();
      toast.success(
        schedules.length > 1 ? ts('schedule_added') : ts('schedules_added')
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="lg:col-span-9">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="flex justify-between col-span-12 border-b-2">
                      <div>
                        <span className="text-2xl">{t('title')}</span>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="inline-flex justify-end px-3 py-2 mt-3 text-sm font-semibold bg-white hover:bg-gray-50 sm:mt-0"
                          onClick={onClose}
                          ref={cancelButtonRef}
                        >
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                      <CustomLabel
                        field="initial_hour"
                        name={tc('field_initial_hour')}
                        required
                      />
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="time"
                          name="initial_hour"
                          id="initial_hour"
                          autoComplete={tc('field_initial_hour')}
                          placeholder={tc('field_initial_hour')}
                          className={FormStyles('input')}
                          {...register('start_at')}
                        />
                      </div>
                      {errors?.start_at && (
                        <CustomError error={errors?.start_at?.message} />
                      )}
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                      <CustomLabel
                        field="final_hour"
                        name={tc('field_final_hour')}
                        required
                      />
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="time"
                          name="final_hour"
                          id="final_hour"
                          autoComplete={tc('field_final_hour')}
                          placeholder={tc('field_final_hour')}
                          className={FormStyles('input')}
                          {...register('end_at')}
                        />
                      </div>
                      {errors?.end_at && (
                        <CustomError error={errors?.end_at?.message} />
                      )}
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <CustomLabel
                        field="low_cost"
                        name={tc('field_low_cost')}
                      />
                      <input
                        type="number"
                        name="low_cost"
                        id="low_cost"
                        placeholder={tc('field_low_cost')}
                        className={FormStyles('input')}
                        {...register('costs.lower', { valueAsNumber: true })}
                      />
                      {errors?.['costs']?.['lower'] && (
                        <CustomError
                          error={errors?.['costs']?.['lower']?.message}
                        />
                      )}
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <CustomLabel
                        field="regular_cost"
                        name={tc('field_regular_cost')}
                        required
                      />
                      <input
                        type="number"
                        name="regular_cost"
                        id="regular_cost"
                        autoComplete={tc('field_regular_cost')}
                        placeholder={tc('field_regular_cost')}
                        className={FormStyles('input')}
                        {...register('costs.cost', { valueAsNumber: true })}
                      />
                      {errors?.['costs']?.['cost'] && (
                        <CustomError
                          error={errors?.['costs']?.['cost']?.message}
                        />
                      )}
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                      <CustomLabel
                        field="high_cost"
                        name={tc('field_high_cost')}
                      />
                      <input
                        type="number"
                        name="high_cost"
                        id="high_cost"
                        placeholder={tc('field_high_cost')}
                        className={FormStyles('input')}
                        {...register('costs.high', { valueAsNumber: true })}
                      />
                      {errors?.['costs']?.['high'] && (
                        <CustomError
                          error={errors?.['costs']?.['high']?.message}
                        />
                      )}
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                      <CustomLabel
                        field="url"
                        name={tc('field_url')}
                        required
                      />
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="url"
                          name="url"
                          id="url"
                          autoComplete={tc('field_url')}
                          placeholder={tc('field_url')}
                          className={FormStyles('input')}
                          {...register('urls.ticket')}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <LinkIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      {errors?.['urls']?.['ticket'] && (
                        <CustomError
                          error={errors?.['urls']?.['ticket']?.message}
                        />
                      )}
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                      <CustomLabel
                        field="streaming"
                        name={tc('field_streaming')}
                        required
                      />
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="url"
                          name="streaming"
                          id="streaming"
                          autoComplete={tc('field_streaming')}
                          placeholder={tc('field_streaming')}
                          className={FormStyles('input')}
                          {...register('urls.streaming')}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <LinkIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      {errors?.['urls']?.['streaming'] && (
                        <CustomError
                          error={errors?.['urls']?.['streaming']?.message}
                        />
                      )}
                    </div>
                    {date_type == 'range' && (
                      <>
                        <div className="col-span-12">
                          <span className="text-lg">{t('reply')}</span>
                        </div>
                        <div className="col-span-4 text-center sm:col-span-3">
                          <CustomLabel
                            field="monday"
                            name={tc('field_monday')}
                          />
                          <input
                            type="checkbox"
                            value="monday"
                            id="monday"
                            aria-describedby={tc('field_monday')}
                            className={FormStyles('checkbox')}
                            {...register('repeat_days')}
                          />
                        </div>
                        <div className="col-span-4 text-center sm:col-span-3">
                          <CustomLabel
                            field="tuesday"
                            name={tc('field_tuesday')}
                          />
                          <input
                            type="checkbox"
                            value="tuesday"
                            id="tuesday"
                            aria-describedby={tc('field_tuesday')}
                            className={FormStyles('checkbox')}
                            {...register('repeat_days')}
                          />
                        </div>
                        <div className="col-span-4 text-center sm:col-span-3">
                          <CustomLabel
                            field="wednesday"
                            name={tc('field_wednesday')}
                          />
                          <input
                            type="checkbox"
                            value="wednesday"
                            id="wednesday"
                            aria-describedby={tc('field_wednesday')}
                            className={FormStyles('checkbox')}
                            {...register('repeat_days')}
                          />
                        </div>
                        <div className="col-span-4 text-center sm:col-span-3">
                          <CustomLabel
                            field="thursday"
                            name={tc('field_thursday')}
                          />
                          <input
                            type="checkbox"
                            value="thursday"
                            id="thursday"
                            aria-describedby={tc('field_thursday')}
                            className={FormStyles('checkbox')}
                            {...register('repeat_days')}
                          />
                        </div>
                        <div className="col-span-4 text-center sm:col-span-3">
                          <CustomLabel
                            field="friday"
                            name={tc('field_friday')}
                          />
                          <input
                            type="checkbox"
                            value="friday"
                            id="friday"
                            aria-describedby={tc('field_friday')}
                            className={FormStyles('checkbox')}
                            {...register('repeat_days')}
                          />
                        </div>
                        <div className="col-span-4 text-center sm:col-span-3">
                          <CustomLabel
                            field="saturday"
                            name={tc('field_saturday')}
                          />
                          <input
                            type="checkbox"
                            value="saturday"
                            id="saturday"
                            aria-describedby={tc('field_saturday')}
                            className={FormStyles('checkbox')}
                            {...register('repeat_days')}
                          />
                        </div>
                        <div className="col-span-4 text-center sm:col-span-3">
                          <CustomLabel
                            field="sunday"
                            name={tc('field_sunday')}
                          />
                          <input
                            type="checkbox"
                            value="sunday"
                            id="sunday"
                            aria-describedby={tc('field_sunday')}
                            className={FormStyles('checkbox')}
                            {...register('repeat_days')}
                          />
                        </div>
                        {errors?.repeat_days && (
                          <CustomError
                            className="col-span-12"
                            error={errors?.repeat_days?.message}
                          />
                        )}
                      </>
                    )}
                  </div>

                  {/* Buttons section */}
                  <div className="pt-6 divide-y divide-gray-200">
                    <div className="flex justify-end px-4 py-4 mt-4 gap-x-3 sm:px-6">
                      <div onClick={onClose}>
                        <CustomCancel />
                      </div>

                      <CustomSubmit
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                      />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
