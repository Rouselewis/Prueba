/** @format */
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { AddressForm } from '@/components/forms/forms';

type Props = {};
const CreateEventStep2: React.FC<Props> = ({}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [searchAddress, setSearchAddress] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);

  const onPlaceSelected = (address, latLng) => {
    setSearchAddress(address);
    setMarkerPosition(latLng);
  };

  return (
    <>
      <div className="lg:col-span-9">
        <AddressForm
          register={register}
          setValue={setValue}
          errors={errors}
          searchAddress={searchAddress}
          onPlaceSelected={onPlaceSelected}
          markerPosition={markerPosition}
        />
      </div>
    </>
  );
};

export default CreateEventStep2;
