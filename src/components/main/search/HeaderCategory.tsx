import React from 'react';
import { classNames } from '@/helpers';
import Image from 'next/image';

export type props = {
  className?: string;
  image: string;
  name: string;
  size: 'small' | 'large';
  color: string;
  id: string;
};

const HeaderCategory: React.FC<props> = ({
  className,
  image,
  name,
  size = 'small',
  color,
  id,
}) => {
  return (
    <div className={classNames('relative', className)}>
      <div
        className={classNames(
          'relative aspect-square z-10',
          size == 'small' ? 'w-20' : 'w-32'
        )}
      >
        <Image src={image} alt="" fill className="object-cover" />
      </div>
      <div
        className={classNames(
          'absolute rounded-xl inset-x-0 bottom-0 flex items-center justify-center',
          size == 'small' ? 'top-9' : 'top-16'
        )}
        style={{
          backgroundColor: color,
        }}
      >
        <span
          className={classNames(
            'font-bold text-white',
            size == 'small' ? 'text-xl' : 'text-2xl'
          )}
        >
          {name}
        </span>
      </div>
    </div>
  );
};

export default HeaderCategory;
