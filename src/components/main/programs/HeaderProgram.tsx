import React from 'react';
import { classNames } from '@/helpers';
import Image from 'next/image';
import { Title } from '@/components/commons';

export type props = {
  className?: string;
  image: string;
  name: string;
  color: string;
};

const HeaderProgram: React.FC<props> = ({ className, name, image, color }) => {
  return (
    <div className={classNames('', className)}>
      <div className="relative w-full h-96 rounded-xs overflow-hidden">
        <Image className="object-cover" src={image} fill alt={name} />
        <div
          style={{ backgroundColor: color }}
          className="h-12 text-center px-3 text-white font-bold flex items-center"
        >
          <Title className="text-center sm:text-left" level="h3">
            {name}
          </Title>
        </div>
      </div>
    </div>
  );
};

export default HeaderProgram;
