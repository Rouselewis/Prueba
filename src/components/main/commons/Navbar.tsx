import React from 'react';
import { classNames, CurrentColor } from '@/helpers';
import PanelAuth from '@/components/main/commons/PanelAuth';

export type props = {
  className?: string;
};

const Navbar: React.FC<props> = ({ className }) => {
  const currentColor = CurrentColor();
  return (
    <div className={classNames('', className)}>
      <PanelAuth currentColor={currentColor} />
    </div>
  );
};

export default Navbar;
