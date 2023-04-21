/** @format */
import { useMemo, useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
import { Heading } from '@/components/headers/admin/heading';
import { BasicTable } from '@/components/admin/tables';
import { ColumnsEventCreate } from '@/components/admin/tables/columns/columnsEventCreate';
// Forms
import { useFormContext, useFieldArray } from 'react-hook-form';
import { CustomError, CustomLabel } from '@/components/forms';
import { FormStyles } from '@/helpers';
import { AddSchedule } from '@/components/forms/forms';
import { format } from 'date-fns';
import formatNumber from 'format-number';

type Schedule = {
  start_at: Date;
  end_at: Date;
  costs: {
    cost: number;
    lower: number;
    high: number;
  };
  urls: {
    ticket: string;
    streaming: string;
  };
};
const CreateEventStep3 = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const tc = useTranslations('Common_Forms');
  const [dialogSchedule, setDialogSchedule] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [date_type] = watch(['date_type']);
  const data = useMemo(
    () =>
      schedules.map(({ start_at, end_at, costs, urls }, idx) => ({
        id: idx,
        date: format(start_at, 'yyyy-mm-dd'),
        initial_hour: format(start_at, 'hh:mm'),
        final_hour: format(end_at, 'hh:mm'),
        low_cost: costs?.lower
          ? formatNumber({ prefix: '$' })(costs?.lower)
          : 0,
        regular_cost: costs?.cost
          ? formatNumber({ prefix: '$' })(costs?.cost)
          : 0,
        hight_cost: costs?.high
          ? formatNumber({ prefix: '$' })(costs?.high)
          : 0,
        url: urls?.ticket,
        streaming: urls?.streaming,
        status: true,
      })),
    [schedules]
  );
  const columns = ColumnsEventCreate();

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="flex items-center pl-2">
          <input
            type="radio"
            value="define"
            className={FormStyles('radio')}
            {...register('date_type')}
          />
          <span className="ml-3">
            <CustomLabel field="range" name={tc('field_defined')} />
          </span>
        </div>
        <div className="flex items-center pl-20 md:pl-10 lg:pl-2">
          <input
            type="radio"
            value="range"
            className={FormStyles('radio')}
            {...register('date_type')}
          />
          <span className="ml-3">
            <CustomLabel field="range" name={tc('field_range')} />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 sm:col-span-6">
          <CustomLabel
            field="initial_date"
            name={tc('field_initial_date')}
            required
          />
          <input
            type="date"
            name="initial_date"
            id="initial_date"
            autoComplete={tc('field_initial_date')}
            placeholder={tc('field_initial_date')}
            className={FormStyles('input')}
            {...register('event_dates.dates.range.start_at', {
              valueAsDate: true,
            })}
          />
          {errors?.['event_dates']?.['dates']?.['range']?.['start_at'] && (
            <CustomError
              error={
                errors?.['event_dates']?.['dates']?.['range']?.['start_at']
                  ?.message
              }
            />
          )}
        </div>
        {date_type == 'range' && (
          <div className="col-span-12 sm:col-span-6">
            <CustomLabel field="final_date" name={tc('field_final_date')} />
            <input
              type="date"
              name="final_date"
              id="final_date"
              autoComplete={tc('field_final_date')}
              placeholder={tc('field_final_date')}
              className={FormStyles('input')}
              {...register('event_dates.dates.range.end_at', {
                valueAsDate: true,
              })}
            />
            {errors?.['event_dates']?.['dates']?.['range']?.['end_at'] && (
              <CustomError
                error={
                  errors?.['event_dates']?.['dates']?.['range']?.['end_at']
                    ?.message
                }
              />
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 sm:col-span-12">
          <BasicTable
            columns={columns}
            defaultData={data}
            addSchedule
            setDialogSchedule={setDialogSchedule}
          />
        </div>
      </div>

      <AddSchedule
        open={dialogSchedule}
        setOpen={setDialogSchedule}
        setSchedules={setSchedules}
      />
    </div>
  );
};

export default CreateEventStep3;
