/** @format */
import { useState, useEffect } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import AdminLayout from '@/components/layout/admin';
import { Heading } from '@/components/headers/admin/heading';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AddressForm } from '@/components/forms/forms';
import {
  CustomError,
  CustomLabel,
  CustomCancel,
  CustomSubmit,
} from '@/components/forms';
// Interface
import { Address } from '@/interfaces/serializers/commons';
import { useMutationUpdateUser } from '@/hooks/user/user';
import { useQueryClient } from '@tanstack/react-query';
// Session
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { User } from '@/interfaces/user';
import { toast } from 'react-toastify';

const validationSchema = yup.object().shape({
  // addressname: yup.string().required("Address name is required"),
  searchaddress: yup.string(),
  address: yup.string().required('Address line 1 is required'),
  address2: yup.string(),
  zipcode: yup.string().required('Postal code is required'),
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
});

const ProfileAddress = () => {
  // const [uid, setUid] = useState("")
  const [searchAddress, setSearchAddress] = useState('');
  const [markerPosition, setMarkerPosition] = useState(null);

  const t = useTranslations('Panel_SideBar');
  const tc = useTranslations('Common_Forms');

  const breadcrumb = [
    { page: t('user'), href: '/panel/profile' },
    { page: t('profile.address'), href: '' },
  ];

  const { data: session, status } = useSession();
  const route = useRouter();
  if (status !== 'authenticated') {
    route.push('/');
  }

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(['user']);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Address>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (user?.address) {
      setValue('address', user?.address?.address);
      setValue('address2', user?.address?.address2);
      setValue('zipcode', user?.address?.zipcode);
      setValue('country', {
        long_name: user?.address?.country?.long_name,
        short_name: user?.address?.country?.short_name,
      });
      setValue('state', {
        long_name: user?.address?.state?.long_name,
        short_name: user?.address?.state?.short_name,
      });
      setValue('city', user?.address?.city);
    }
  }, [user]);

  const { mutate: updateUser, isError, error } = useMutationUpdateUser();
  if (isError)
    console.log('useMutationUpdateUser ERROR', (error as Error)?.message);

  const onSubmitHandler = (data: Address) => {
    data?.address2;
    const address: Address = {
      latitude: data?.latitude,
      longitude: data?.longitude,
      address: data?.address,
      address2: data?.address2 === '' ? null : data?.address2,
      city: data?.city,
      state: {
        long_name: `${data?.state}`,
        short_name: `${data?.short_state}`,
      },
      country: {
        long_name: `${data?.country}`,
        short_name: `${data?.short_country}`,
      },
      zipcode: data.zipcode,
    };
    const updatedUser = { address: address, _id: user?._id };

    console.log('UPDATED ADDRESS:', updatedUser);
    updateUser(updatedUser, {
      onSuccess: () => {
        toast.success('success');
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  };

  const onPlaceSelected = (address, latLng) => {
    setSearchAddress(address);
    setMarkerPosition(latLng);
  };

  return (
    <>
      <div>
        <Heading breadcrumb={breadcrumb} />
      </div>
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <form
            className="divide-y divide-gray-200 lg:col-span-9"
            onSubmit={handleSubmit(onSubmitHandler)}
            method="POST"
          >
            <AddressForm
              register={register}
              setValue={setValue}
              errors={errors}
              searchAddress={searchAddress}
              onPlaceSelected={onPlaceSelected}
              markerPosition={markerPosition}
            />
            <div className="divide-y divide-gray-200 pt-6">
              <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                <CustomCancel />
                <CustomSubmit />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

ProfileAddress.Layout = AdminLayout;
export default ProfileAddress;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
