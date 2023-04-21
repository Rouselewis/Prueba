import React, { useState, useEffect, useRef, useCallback } from 'react';
import { classNames } from '@/helpers';
import { Title, Icon, SwiperControls } from '@/components/commons';
import { useTranslations, useLocale } from 'next-intl';
import { UseControllerProps } from 'react-hook-form';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css/bundle';
import { useController } from 'react-hook-form';

export type props = {
  className?: string;
  items: Date[];
} & UseControllerProps<any>;

const ListProgramDays: React.FC<props> = ({ className, items, ...props }) => {
  const sliderRef = useRef(null);
  const [cols, setCols] = useState(7);
  const [currentSelect, setCurrentSelect] = useState(-1);
  const t = useTranslations('List_Program_Days');
  const locale = useLocale();
  const {
    field: { value, onChange },
  } = useController(props);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width > 992) {
        setCols(7);
      } else if (width > 640) {
        setCols(4);
      } else {
        setCols(2);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    // cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={classNames('', className)}>
      <Title className="border-b borde-white pb-5" level="h3">
        {t('program')}
      </Title>
      <div className="relative mt-8 max-w-5xl mx-auto ">
        <Swiper
          ref={sliderRef}
          className="h-36"
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={cols}
        >
          {items?.map((date, idx) => (
            <SwiperSlide
              key={idx}
              style={
                {
                  '--swiper-navigation-color': '#FFFFFF',
                } as any
              }
            >
              <div
                className={classNames(
                  'font-bold card flex flex-col items-center justify-center text-center p-8 h-32 w-32 cursor-pointer border ',
                  idx == currentSelect && 'border-primary-500'
                )}
                onClick={() => {
                  setCurrentSelect(idx);
                  onChange(date);
                }}
              >
                <p className="text-3xl">{format(date, 'd')}</p>
                <p>
                  {' '}
                  {format(date, 'dd', {
                    locale: locale == 'en' ? enUS : es,
                  })}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperControls swiperRef={sliderRef} />
      </div>
    </div>
  );
};

export default ListProgramDays;
