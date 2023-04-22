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
};
const CardEventDetails: React.FC<props> = ({ className, image, id }) => {
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
      <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg flex justify-center">
        <img src={image} alt={image} className="object-cover object-center" />
      </div>
      <div className="pt-2 border-gray-200 flex justify-end">
        <span className={`px-4 pt-2 text-${currentColor}`}>
          {t('shared_event')}
        </span>
        <div className="flex items-center space-x-3">
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
  );
};

export default CardEventDetails;
