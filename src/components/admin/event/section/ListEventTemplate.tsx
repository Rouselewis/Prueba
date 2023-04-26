import React, { useRef } from 'react';
import { classNames } from '@/helpers';
import { Title, SwiperControls } from '@/components/commons';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { useController, UseControllerProps } from 'react-hook-form';
export type props = {
  className?: string;
  items: { name: string; value: string }[];
} & UseControllerProps<any>;

const Base: React.FC<props> = ({ className, items, ...props }) => {
  const t = useTranslations('ListCardEventTemplate');
  const {
    field: { onChange, value },
  } = useController({ defaultValue: [], ...props });
  const swiperRef = useRef();
  return (
    <div className={classNames('card', className)}>
      <Title level="h4">{t('title')}</Title>
      <div className="relative">
        <Swiper ref={swiperRef} slidesPerView={1} spaceBetween={50}>
          {items?.map((item, idx) => (
            <SwiperSlide className="h-auto" key={idx}></SwiperSlide>
          ))}
        </Swiper>
        <SwiperControls swiperRef={swiperRef} />
      </div>
    </div>
  );
};

export default Base;
