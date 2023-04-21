import React from 'react';
import { CurrentColor, classNames } from '@/helpers';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ButtonLink, Icon } from '@/components/commons';
import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/router';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import Instagram from '@mui/icons-material/Instagram';
import Telegram from '@mui/icons-material/Telegram';
import Twitter from '@mui/icons-material/Twitter';
import WhatsApp from '@mui/icons-material/WhatsApp';

export type props = {
  className?: string;
  id: string;
  image: string;
  details: string;
  restrictions: string;
  general: string;
  observations: string;
  services: string;
  access: string;
};
const CardEventDetails: React.FC<props> = ({
  className,
  access,
  details,
  general,
  image,
  observations,
  restrictions,
  services,
  id,
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
      <div className="relative w-auto overflow-hidden rounded-md h-72 md:h-96">
        <Image src={image} alt="" className="object-cover" fill />
      </div>

      <div className="flex flex-col my-5">
        <div className="flex gap-10 ml-auto text-gray-500">
          <span className={`text-${currentColor}`}>{t('shared_event')}</span>
          <div className="flex gap-2">
            <FacebookOutlined
              className={`text-gray-400 cursor-pointer hover:text-${currentColor}`}
              onClick={() => handleShare('Facebook')}
            />
            <Instagram
              className={`text-gray-400 cursor-pointer hover:text-${currentColor}`}
              onClick={() => handleShare('Instagram')}
            />
            <Twitter
              className={`text-gray-400 cursor-pointer hover:text-${currentColor}`}
              onClick={() => handleShare('Twitter')}
            />
            <WhatsApp
              className={`text-gray-400 cursor-pointer hover:text-${currentColor}`}
              onClick={() => handleShare('WhatsApp')}
            />
            <Icon
              name="telegram"
              className={`w-6 h-6 text-gray-400 cursor-pointer hover:text-${currentColor}`}
              onClick={() => handleShare('Telegram')}
            />
          </div>
        </div>
      </div>

      <Tab.Group>
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

export default CardEventDetails;
