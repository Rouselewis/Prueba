import Image from 'next/image';
// Icons
import { CheckIcon } from '@heroicons/react/20/solid';
// Interfaces
import { EventCategory } from '@/interfaces/event';

export const CustomCategory = ({
  _id,
  category,
  picture,
  color,
  status,
}: EventCategory) => {
  return (
    <label>
      <div className="relative ">
        <input
          //   id={_id}
          type="checkbox"
          className="customCheckboxes peer absolute opacity-0 "
        />
        <Image
          width={120}
          height={120}
          src={picture}
          className={`object-contain ${
            status ? '' : 'grayscale peer-checked:grayscale-0'
          }`}
          alt={category?.[0].name}
        />
        <div
          className={`tick absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-customGreen peer-checked:opacity-100 ${
            status ? '' : 'opacity-0'
          }`}
        >
          <CheckIcon
            name="check"
            className="iconshow absolute text-sm text-white"
          />
        </div>
      </div>
      <p className="text-sm text-customGray text-center py-5">
        {category?.[0].name}
      </p>
    </label>
  );
};
