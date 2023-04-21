import React from 'react';
import { classNames } from '@/helpers';
import { Title } from '@/components/commons';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useLocale, useTranslations } from 'next-intl';
import parseDate from '@/helpers/parseDate';

export type props = {
  className?: string;
  image: string;
  name: string;
  startDate: Date | string;
  endDate: Date | string;
  location: string;
  description: string;
};

const CardProgramDetails: React.FC<props> = ({
  className,
  name,
  startDate,
  endDate,
  location,
  description,
}) => {
  const t = useTranslations('Card_Program_Details');
  const locale = useLocale();
  return (
    <div className={classNames('', className)}>
      <div className="max-w-3xl mx-auto text-center sm:text-left">
        <p className=" text-2xl"> {name}</p>
        <div className="flex flex-col sm:flex-row justify-between gap-3 text-lg font-bold">
          <p>
            {t('date')}:{' '}
            {format(parseDate(startDate), 'dd MMM', {
              locale: locale == 'en' ? enUS : es,
            })}{' '}
            -{' '}
            {format(parseDate(endDate), 'dd MMM', {
              locale: locale == 'en' ? enUS : es,
            })}
          </p>
          <p>
            {t('location')}: {location}
          </p>
        </div>
      </div>
      <div className="card py-8 px-5 sm:px-12 mt-5">
        <p className="font-bold text-lg">{t('description')}</p>
        <p className="mt-2">{description}</p>
      </div>
    </div>
  );
};

export default CardProgramDetails;
