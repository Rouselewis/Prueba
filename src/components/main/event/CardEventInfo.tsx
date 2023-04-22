import React from 'react';
import { CurrentColor, classNames } from '@/helpers';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ButtonLink, Icon } from '@/components/commons';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';

export type props = {
  className?: string;
  details: string;
  restrictions: string;
  general: string;
  observations: string;
  services: string;
  access: string;
};
const CardEventInfo: React.FC<props> = ({
  className,
  access,
  details,
  general,
  observations,
  restrictions,
  services,
}) => {
  const handleShare = (text: string) => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
        text,
      });
    }
  };

  const t = useTranslations('Card_Event_Details');
  const currentColor = CurrentColor();
  return (
    <div className={classNames('', className)}>
      <Tab.Group as="div">
        <Tab.List className="flex items-end">
          <Tab
            className={({ selected }) =>
              classNames(
                'px-5 py-3 border-b focus:ring-0 focus:outline-none',
                selected
                  ? 'border-customGreen text-customGreen'
                  : 'border-gray-200'
              )
            }
          >
            {t('description')}
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'px-5 py-3 border-b focus:ring-0 focus:outline-none',
                selected
                  ? 'border-customGreen text-customGreen'
                  : 'border-gray-200'
              )
            }
          >
            {t('information')}
          </Tab>
          <div className="flex-1 border-b border-gray-200"></div>
        </Tab.List>
        <Tab.Panels className="mt-5">
          <Tab.Panel>
            <p>{details} </p>
          </Tab.Panel>

          <Tab.Panel>
            <ul className="mt-10 space-y-4">
              <li className="flex gap-4 text-sm">
                <span className="font-semibold">{t('restrictions')}</span>{' '}
                <span>{restrictions}</span>
              </li>
              <li className="flex gap-4 text-sm">
                <span className="font-semibold">{t('general')}</span>{' '}
                <span>{general}</span>
              </li>
              <li className="flex gap-4 text-sm">
                <span className="font-semibold">{t('observations')}</span>{' '}
                <span>{observations}</span>
              </li>
              <li className="flex gap-4 text-sm">
                <span className="font-semibold">{t('services')}</span>{' '}
                <span>{services}</span>
              </li>
              <li className="flex gap-4 text-sm">
                <span className="font-semibold">{t('limited_access')}</span>{' '}
                <span>{access}</span>
              </li>
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CardEventInfo;
