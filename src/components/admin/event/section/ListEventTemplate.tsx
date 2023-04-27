import React, { useRef } from 'react';
import { classNames, CurrentColor } from '@/helpers';
import { Title, SwiperControls } from '@/components/commons';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { useController, UseControllerProps } from 'react-hook-form';
import Image from 'next/image';

export type props = {
  className?: string;
  items: { name: string; value: string; image: string }[];
} & UseControllerProps<any>;

const Base: React.FC<props> = ({ className, items, ...props }) => {
  const t = useTranslations('ListCardEventTemplate');
  const {
    field: { onChange, value },
  } = useController(props);
  const swiperRef = useRef();
  const currentColor = CurrentColor();
  return (
    <div className={classNames('card py-8 px-12', className)}>
      <Title level="h5">{t('title')}</Title>
      <div className="relative mt-8">
        <Swiper
          ref={swiperRef}
          slidesPerView={3}
          spaceBetween={50}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {items?.map(({ name, image, ...props }, idx) => (
            <SwiperSlide className="h-auto" key={idx}>
              <div
                className={classNames(
                  'cursor-pointer max-w-fit',
                  props.value == value && `border border-${currentColor}`
                )}
                onClick={() => onChange(props.value)}
              >
                <Image src={image} alt={name} width={300} height={300}></Image>
                <p className="mt-5 text-center font-bold">{name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperControls swiperRef={swiperRef} />
      </div>
    </div>
  );
};

export default Base;
