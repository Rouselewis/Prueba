/** @format */
import { useEffect, useState } from 'react';
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
// Session
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
// Toast
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/interfaces/user';
import { useMutationUpdateUser } from '@/hooks/user/user';

const validationSchema = yup.object().shape({
  'front_id-upload': yup
    .mixed()
    .required('Front ID is required')
    .test(
      'front_id-upload',
      'File format should be jpeg, jpg, png, and size should not exceed 10MB',
      (value) => {
        if (!value) {
          return false;
        } else {
          const fileSizeValid = value[0]?.size <= 10000000; // 10MB in bytes
          const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
          const fileFormatValid = supportedFormats.includes(value[0].type);
          return fileSizeValid && fileFormatValid;
        }
      }
    ),
  'back_id-upload': yup
    .mixed()
    .required('Back ID is required')
    .test(
      'back_id-upload',
      'File format should be jpeg, jpg, png, and size should not exceed 10MB',
      (value) => {
        if (!value) {
          return false;
        } else {
          const fileSizeValid = value[0]?.size <= 10000000; // 10MB in bytes
          const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
          const fileFormatValid = supportedFormats.includes(value[0].type);
          return fileSizeValid && fileFormatValid;
        }
      }
    ),
  'selfie-upload': yup
    .mixed()
    .required('Selfie is required')
    .test(
      'selfie-upload',
      'File format should be jpeg, jpg, png, and size should not exceed 10MB',
      (value) => {
        if (!value) {
          return false;
        } else {
          const fileSizeValid = value[0]?.size <= 10000000; // 10MB in bytes
          const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
          const fileFormatValid = supportedFormats.includes(value[0].type);
          return fileSizeValid && fileFormatValid;
        }
      }
    ),
});

const ProfileRequest = () => {
  const [selectedFrontId, setSelectedFrontId] = useState(null);
  const [selectedBackId, setSelectedBackId] = useState(null);
  const [selectedSelfie, setSelectedSelfie] = useState(null);

  const t = useTranslations('Panel_Profile_Request');
  const tc = useTranslations('Common_Forms');
  const ts = useTranslations('Panel_SideBar');

  const breadcrumb = [
    { page: ts('user'), href: '/panel/profile' },
    { page: ts('profile.request'), href: '' },
  ];

  const { data: session, status } = useSession();
  const route = useRouter();
  if (status !== 'authenticated') {
    route.push('/');
  }

  const handleFrontIdChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedFrontId(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleBackIdChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedBackId(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSelfieChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedSelfie(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(['user']);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    queryClient.invalidateQueries(['user']);
    if (user) {
      setValue('firstname', user?.firstname);
      setValue('surname', user?.surname);
      setValue('username', user?.username);
      setValue('email', user?.email);
      setValue('sex', user?.sex);
      if (user?.birthday) {
        const date = new Date(user?.birthday);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        setValue('birthday', formattedDate as any);
      }
      if (user?.phones && user?.phones.length > 0) {
        user?.phones.map((phone, index) => {
          setValue(`phones[${index}].phone` as any, phone.phone);
          setValue(`phones[${index}].type` as any, phone.type);
        });
      }
    }
  }, [user, setValue]);

  const { mutate: updateUser, isError, error } = useMutationUpdateUser();
  if (isError) console.log('useUpdateUser ERROR', (error as Error)?.message);

  const onSubmitHandler = async (data: any) => {
    console.log(JSON.stringify(data, null, 2));
    const formattedBirthday = data.birthday ? new Date(data.birthday) : null;

    const updatedData = {
      ...data,
      birthday: formattedBirthday,
      _id: user?._id,
      verified: true,
      status: true,
    };

    updateUser(
      updatedData,
      // selectedFrontId, selectedBackId, selectedSelfie

      {
        onSuccess: () => {
          toast.success('success');
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      }
    );
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
              <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
                <CustomLabel
                  field="front_id-upload"
                  name={tc('field_front_id')}
                  required
                />
                <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="front_id-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>{tc('field_upload_file')}</span>
                        <img
                          className="h-fit w-full max-h-40 object-cover mb-4 rounded-md"
                          src={
                            selectedFrontId
                              ? selectedFrontId
                              : '/images/assets/profile/front_card_id.jpg'
                          }
                          alt="Back ID Preview"
                        />
                        <input
                          id="front_id-upload"
                          name="front_id-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFrontIdChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF {t('text_up_to')} 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
                <CustomLabel
                  field="back_id-upload"
                  name={tc('field_back_id')}
                  required
                />
                <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="back_id-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>{tc('field_upload_file')}</span>
                        <img
                          className="h-fit w-full max-h-40 object-cover mb-4 rounded-md"
                          src={
                            selectedBackId
                              ? selectedBackId
                              : '/images/assets/profile/back_card_id.jpg'
                          }
                          alt="Back ID Preview"
                        />
                        <input
                          id="back_id-upload"
                          name="back_id-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleBackIdChange}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF {t('text_up_to')} 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
                <CustomLabel
                  field="selfie-upload"
                  name={tc('field_selfie')}
                  required
                />
                <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    {/* <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg> */}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="selfie-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>{tc('field_upload_file')}</span>
                        <img
                          className="h-fit w-full max-h-40 object-cover mb-4 text-center rounded-md"
                          src={
                            selectedSelfie
                              ? selectedSelfie
                              : '/images/assets/profile/empty_avatar.jpg'
                          }
                          alt="Back ID Preview"
                        />
                        <input
                          id="selfie-upload"
                          name="selfie-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleSelfieChange}
                        />
                      </label>
                      {/* <p className="pl-1">{t('text_drag_n_drop')}</p> */}
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF {t('text_up_to')} 10MB
                    </p>
                  </div>
                </div>
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

ProfileRequest.Layout = AdminLayout;
export default ProfileRequest;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
