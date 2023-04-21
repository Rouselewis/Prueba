import React, { FC } from 'react';
import { classNames } from '@/helpers';

export type props = {
  className?: string;
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  align?: 'right' | 'center' | 'left';
  children: React.ReactNode;
};
const Title: FC<props> = ({
  className,
  level = 'h1',
  children,
  align = ' left',
}) => {
  const style = 'font-bold ';
  const alignStyle = classNames(
    align == 'right' ? 'text-right' : align == 'center' && 'text-center'
  );
  switch (level) {
    case 'h1':
      return (
        <h1 className={classNames('text-5xl ', style, alignStyle, className)}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={classNames('text-4xl ', style, alignStyle, className)}>
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 className={classNames('text-3xl ', style, alignStyle, className)}>
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4 className={classNames('text-2xl ', style, alignStyle, className)}>
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5 className={classNames('text-xl ', style, alignStyle, className)}>
          {children}
        </h5>
      );
    case 'h6':
      return (
        <h6 className={classNames('text-lg ', style, alignStyle, className)}>
          {children}
        </h6>
      );
  }
};

export default Title;
