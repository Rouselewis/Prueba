
import React from 'react';
import { classNames } from "@/helpers";

export type props = {
  className?: string;
};

const CardProgramDetails: React.FC<props> = ({ className }) => {
  return <div className={classNames('', className)}>CardProgramDetails</div>;
};

export default CardProgramDetails;