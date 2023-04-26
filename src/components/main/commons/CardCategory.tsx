import React, { useEffect } from 'react';
import { classNames } from '@/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type props = {
  className?: string;
  size: 'small' | 'large';
  color: string;
  image: string;
  name: string;
  id: string;
};

const CardCategory: React.FC<props> = ({
  className,
  color,
  image,
  size = 'large',
  name,
  id,
}) => {
  const { query, pathname } = useRouter();
  return (
    <Link
      shallow
      href={{
        pathname: pathname == '/program' ? '/program' : '/search',
        query: {
          ...query,
          category: id,
        },
      }}
      className={classNames(
        'flex flex-col relative items-center justify-center p-5',
        className
      )}
    >
      <span
        className={classNames(
          'absolute inset-x-0 bottom-0 [box-shadow:_0px_4px_15px_rgba(0,0,0,0.15)] bg-white rounded-xl -z-10',
          size == 'small' ? 'top-20' : 'top-14'
        )}
      ></span>
      <span
        className={classNames(
          'relative block aspect-square',
          size == 'small' ? 'h-24' : 'h-36'
        )}
      >
        <Image
          className="object-cover"
          fill
          src={'https://loremflickr.com/640/480/cats'}
          alt=""
        />
      </span>
      <span
        className={classNames(
          'inline-block text-center mx-7 whitespace-nowrap mt-3 text-black font-semibold',
          size == 'small' ? 'text-base' : 'text-2xl'
        )}
      >
        {name}
      </span>
    </Link>
  );
};

export default CardCategory;
