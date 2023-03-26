import React from 'react';
import { classNames } from "@/helpers";

export type props = {
  className?: string;
};

const ListCardEvent: React.FC<props> = ({ className }) => {
  return <div className={classNames('', className)}>ListCardEvent</div>;
};

export default ListCardEvent;