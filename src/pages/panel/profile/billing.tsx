/** @format */
import { useState, useEffect } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  CustomError,
  CustomLabel,
  CustomCancel,
  CustomSubmit,
} from '@/components/forms';
import { FormStyles } from '@/helpers';
import { Tax } from '@/interfaces/serializers/commons';
import { updateUser } from '@/api/user/user';
import { useMutationUpdateUser } from '@/hooks/user/user';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/interfaces/user';

const validationSchema = yup.object().shape({
  business_name: yup.string().required('Business name is required'),
  rfc: yup.string().min(13).max(13).required().notRequired(),
  cfdi: yup.string().min(1).max(40).required('CFDI is required'),
  zipcode: yup.string().min(5).max(5).required('Postal code is required'),
});

const ProfileBilling = () => {
  const t = useTranslations('Panel_SideBar');
  const tc = useTranslations('Common_Forms');

  const breadcrumb = [
    { page: t('user'), href: '/panel/profile' },
    { page: t('profile.billing'), href: '' },
  ];

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['user']);
  const user: User = userData?.[0]?.user;

  const { mutate: updateUser, isError, error } = useMutationUpdateUser();
  if (isError)
    console.log('useMutationUpdateUser ERROR', (error as Error)?.message);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (user?.tax_data) {
      setValue('business_name', user?.tax_data?.business_name);
      setValue('rfc', user?.tax_data?.rfc);
      setValue('cfdi', user?.tax_data?.cfdi);
      setValue('zipcode', user?.tax_data?.zipcode);
    }
  }, [user]);

  const onSubmitHandler = (data: Tax) => {
    console.log('DATA BILLING:', JSON.stringify(data, null, 2));
    const tax_data = {
      business_name: data.business_name,
      rfc: data.rfc,
      zipcode: data.zipcode,
      cfdi: data.cfdi,
    };
    const updatedData = { tax_data: tax_data, uid: user?.uid };
    // setSubmitted(false);
    // setSubmittedError(true);
    //@ts-ignore
    updateUser(updatedData);
  };

  return (
    <>
      {/* Breadcrumb section */}
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
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6">
                <CustomLabel
                  field="business_name"
                  name={tc('field_businessname')}
                  required
                />
                <input
                  {...register('business_name')}
                  type="text"
                  name="business_name"
                  id="business_name"
                  autoComplete={tc('auto_businessname')}
                  placeholder={tc('field_businessname')}
                  className={FormStyles('input')}
                />
                <CustomError error={errors.business_name?.message as string} />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <CustomLabel field="rfc" name={tc('field_rfc')} />
                <input
                  {...register('rfc')}
                  type="text"
                  name="rfc"
                  id="rfc"
                  autoComplete={tc('auto_rfc')}
                  placeholder={tc('field_rfc')}
                  className={FormStyles('input')}
                />
                <CustomError error={errors.rfc?.message as string} />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <CustomLabel field="cfdi" name={tc('field_cfdi')} required />
                <input
                  {...register('cfdi')}
                  type="text"
                  name="cfdi"
                  id="cfdi"
                  autoComplete={tc('auto_cfdi')}
                  placeholder={tc('field_cfdi')}
                  className={FormStyles('input')}
                />
                <CustomError error={errors.cfdi?.message as string} />
              </div>
              <div className="col-span-12 sm:col-span-6">
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
                <CustomError error={errors.zipcode?.message as string} />
              </div>
            </div>
            {/* Buttons section */}
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

ProfileBilling.Layout = AdminLayout;
export default ProfileBilling;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
