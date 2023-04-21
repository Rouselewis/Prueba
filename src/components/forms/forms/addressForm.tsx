import { useTranslations } from 'next-intl';
// Components
import {
  CustomError,
  CustomLabel,
  CustomCancel,
  CustomSubmit,
} from '@/components/forms';
import { Autocomplete } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import Map from '@/components/forms/forms/map';
// Helpers
import { FormStyles } from '@/helpers';

export const AddressForm = ({
  register,
  setValue,
  errors,
  searchAddress,
  onPlaceSelected,
  markerPosition,
}) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const tc = useTranslations('Common_Forms');
  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        console.error(
          'No geometry/location data found for the selected address.'
        );
        return;
      }
      const address = place.formatted_address;
      const latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      onPlaceSelected(address, latLng);

      const components = place.address_components;
      const getAddressComponent = (type) =>
        components.find((component) => component.types.includes(type));

      setValue(
        'address',
        (getAddressComponent('street_number')?.long_name || '') +
          ' ' +
          (getAddressComponent('route')?.long_name || '')
      );
      setValue('address2', getAddressComponent('subpremise')?.long_name || '');
      setValue('city', getAddressComponent('locality')?.long_name || '');
      setValue(
        'state',
        getAddressComponent('administrative_area_level_1')?.long_name || ''
      );
      setValue('country', getAddressComponent('country')?.long_name || '');
      setValue('zipcode', getAddressComponent('postal_code')?.long_name || '');
      setValue('latitude', latLng.lat.toString());
      setValue('longitude', latLng.lng.toString());
      setValue(
        'short_country',
        getAddressComponent('country')?.short_name || ''
      );
      setValue(
        'short_state',
        getAddressComponent('administrative_area_level_1')?.short_name || ''
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <CustomLabel
            required
            field="searchaddress"
            name={tc('field_searchaddress')}
          />
          <Autocomplete
            onLoad={onAutocompleteLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              name="searchaddress"
              id="searchaddress"
              autoComplete={tc('auto_searchaddress')}
              placeholder={tc('field_searchaddress')}
              className={FormStyles('input')}
              {...register('field_searchaddress')}
            />
          </Autocomplete>
          <CustomError error={errors?.field_searchaddress?.message} />
        </div>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row">
        <div className="relative isolate bg-white py-10">
          <div className="flex justify-start w-screen">
            <Map
              searchAddress={searchAddress}
              center={{ lat: 22.767649, lng: -102.546273 }}
              markerPosition={markerPosition}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
          <CustomLabel field="address" name={tc('field_address')} required />
          <input
            {...register('address')}
            type="text"
            name="address"
            id="address"
            autoComplete={tc('auto_address')}
            placeholder={tc('field_address')}
            className={FormStyles('input')}
          />
          {errors?.address && <CustomError error={errors?.address?.message} />}
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
          <CustomLabel required field="address2" name={tc('field_address2')} />
          <input
            {...register('address2')}
            type="text"
            name="address2"
            id="address2"
            autoComplete={tc('auto_address2')}
            placeholder={tc('field_address2')}
            className={FormStyles('input')}
          />
          {errors?.address2 && (
            <CustomError error={errors?.address2?.message} />
          )}
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
          <CustomLabel field="zipcode" name={tc('field_pc')} required />
          <input
            {...register('zipcode')}
            type="text"
            name="zipcode"
            id="zipcode"
            autoComplete={tc('auto_pc')}
            placeholder={tc('field_pc')}
            className={FormStyles('input')}
          />
          {errors?.zipcode && <CustomError error={errors?.zipcode?.message} />}
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
          <CustomLabel field="country" name={tc('field_country')} required />
          <input
            {...register('country')}
            type="text"
            name="country"
            id="country"
            autoComplete={tc('auto_country')}
            placeholder={tc('field_country')}
            className={FormStyles('input')}
          />
          {errors?.country && <CustomError error={errors?.country?.message} />}
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
          <CustomLabel field="state" name={tc('field_state')} required />
          <input
            {...register('state')}
            type="text"
            name="state"
            id="state"
            autoComplete={tc('auto_state')}
            placeholder={tc('field_state')}
            className={FormStyles('input')}
          />
          {errors?.state && <CustomError error={errors?.state?.message} />}
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
          <CustomLabel field="city" name={tc('field_city')} required />
          <input
            {...register('city')}
            type="text"
            name="city"
            id="city"
            autoComplete={tc('auto_city')}
            placeholder={tc('field_city')}
            className={FormStyles('input')}
          />
          {errors?.city && <CustomError error={errors?.city?.message} />}
        </div>
      </div>
    </>
  );
};
