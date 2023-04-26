/** @format */
import { useState, useEffect } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
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
// Interface
import { User } from '@/interfaces/user';
// Helpers
import { FormStyles } from '@/helpers';
import { useUser, useUpdateUserWithAvatar } from '@/hooks/user/user';
// Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';

const validationSchema = yup.object().shape({
  firstname: yup.string().min(2).max(32).required('First name is required'),
  surname: yup.string().min(2).max(32).required('Surname is required'),
  username: yup.string().min(2).max(32).required('Username is required'),
  email: yup.string().email().required('Email is required'),
  sex: yup.string().required('Sex is required'),
  birthday: yup.date().required('Birthday is required'),
  avatar: yup
    .mixed()
    .notRequired()
    .test(
      'avatar',
      'File format should be jpeg, jpg, or png, and size should not exceed 10MB',
      (value) => {
        if (!value || !value[0]) {
          return true;
        } else {
          const fileSizeValid = value[0]?.size <= 10000000; // 10MB in bytes
          const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
          const fileFormatValid = supportedFormats.includes(value[0].type);
          return fileSizeValid && fileFormatValid;
        }
      }
    ),
  phones: yup.array().of(
    yup.object().shape({
      phone: yup.string().min(10).max(10).required('Phone is required'),
      type: yup.string().required('Phone type is required'),
    })
  ),
});

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: session, status } = useSession();
  const { data: user } = useUser(session?.user?.id as string);

  console.log('user:', user);

  const t = useTranslations('Panel_SideBar');
  const tc = useTranslations('Common_Forms');
  const tb = useTranslations('btn');

  const breadcrumb = [
    { page: t('user'), href: '/panel/profile' },
    { page: t('profile.info'), href: '' },
  ];

  const sexOptions = [
    { value: 'Male', name: 'Male' },
    { value: 'Female', name: 'Female' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<User>({
    resolver: yupResolver(validationSchema),
  });

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
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

  const { mutate: updateUser, isError, error } = useUpdateUserWithAvatar();
  if (isError) console.log('useUpdateUser ERROR', (error as Error)?.message);

  const onSubmitHandler = async (data: any) => {
    console.log(JSON.stringify(data, null, 2));
    console.log(selectedImage);
    console.log(session.user.id);
    const formattedBirthday = data.birthday ? new Date(data.birthday) : null;

    const updatedData = {
      ...data,
      birthday: formattedBirthday,
      id: session.user.id,
      verified: true,
      status: true,
    };

    updateUser(
      { user: updatedData, avatar: selectedImage },
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
            className="lg:col-span-9"
            onSubmit={handleSubmit(onSubmitHandler)}
            method="POST"
          >
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6">
                <CustomLabel field="firstname" name={tc('field_firstname')} />
                <input
                  {...register('firstname')}
                  type="text"
                  name="firstname"
                  id="firstname"
                  autoComplete={tc('auto_firstname')}
                  placeholder={tc('field_firstname')}
                  className={FormStyles('input')}
                />
                <CustomError error={errors.firstname?.message} />
              </div>

              <div className="col-span-12 sm:col-span-6">
                <CustomLabel field="surname" name={tc('field_surname')} />
                <input
                  {...register('surname')}
                  type="text"
                  name="surname"
                  id="surname"
                  autoComplete={tc('auto_surname')}
                  placeholder={tc('field_surname')}
                  className={FormStyles('input')}
                />
                <CustomError error={errors.surname?.message} />
              </div>
            </div>

            <div className="mt-6 flex flex-col lg:flex-row">
              <div className="flex-grow space-y-6">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 sm:col-span-6">
                    <CustomLabel field="username" name={tc('field_username')} />
                    <input
                      {...register('username')}
                      type="text"
                      name="username"
                      id="username"
                      autoComplete={tc('auto_username')}
                      placeholder={tc('field_username')}
                      className={FormStyles('input')}
                    />
                    <CustomError error={errors.username?.message} />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <CustomLabel field="email" name={tc('field_email')} />
                    <input
                      {...register('email')}
                      type="email"
                      name="email"
                      id="email"
                      autoComplete={tc('auto_email')}
                      placeholder={tc('field_email')}
                      className={FormStyles('input')}
                    />
                    <CustomError error={errors.email?.message} />
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <CustomLabel field="sex" name={tc('field_sex')} />
                    <select
                      {...register('sex')}
                      id="sex"
                      name="sex"
                      className={FormStyles('select')}
                      defaultValue={user?.sex === 'Male' ? 'Male' : 'Female'}
                    >
                      <option value="">{tc('place_sex')}</option>
                      {sexOptions.map((item) => {
                        return (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <CustomLabel field="birthday" name={tc('field_birthday')} />
                    <input
                      {...register('birthday')}
                      type="date"
                      name="birthday"
                      id="birthday"
                      autoComplete={tc('auto_birthday')}
                      placeholder={tc('field_birthday')}
                      className={FormStyles('input')}
                    />
                    <CustomError error={errors.birthday?.message} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0 hover:cursor-pointer hover:opacity-90">
                <CustomLabel field="avatar" name={tc('field_photo')} />
                <div className="relative hidden overflow-hidden rounded-full lg:block hover:cursor-pointer hover:opacity-90">
                  <img
                    className="relative h-40 w-40 rounded-full"
                    src={
                      selectedImage ||
                      '/images/assets/profile/empty_avatar1.jpg'
                    }
                    alt="avatar"
                  />
                  <label
                    htmlFor="avatar"
                    className="absolute inset-0 flex h-full w-full items-center justify-center"
                  >
                    <input
                      {...register('avatar')}
                      type="file"
                      accept="image/jpeg, image/png"
                      id="avatar"
                      name="avatar"
                      className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6">
              <CustomLabel field={`phones[0].phone`} name={tc('field_phone')} />
              <input
                {...register(`phones.0.phone`)}
                type="tel"
                name={`phones[0].phone`}
                id={`phones[0].phone`}
                autoComplete={tc('auto_phone')}
                placeholder={tc('field_phone')}
                className={FormStyles('input')}
              />
              <CustomError error={errors?.phones?.[0]?.phone?.message} />
              <CustomLabel
                field={`phones[0].type`}
                name={tc('field_phone_type')}
              />
              <input
                {...register(`phones.0.type`)}
                type="text"
                name={`phones[0].type`}
                id={`phones[0].type`}
                autoComplete={tc('auto_phone_type')}
                placeholder={tc('field_phone_type')}
                className={FormStyles('input')}
              />
              <CustomError error={errors?.phones?.[0]?.message} />

              {/* {fields.map((field, index) => (
                                <div key={field.id}>
                                    <CustomLabel field={`phones[${index}].phone`} name={tc('field_phone')} />
                                    <input
                                        {...register(`phones[${index}].phone`)}
                                        type="tel"
                                        name={`phones[${index}].phone`}
                                        id={`phones[${index}].phone`}
                                        autoComplete={tc('auto_phone')}
                                        placeholder={tc('field_phone')}
                                        className={FormStyles('input')}
                                    />
                                    <CustomError error={errors?.phones?.[index]?.phone?.message} />
                                    <CustomLabel field={`phones[${index}].type`} name={tc('field_phone_type')} />
                                    <input
                                        {...register(`phones[${index}].type`)}
                                        type="text"
                                        name={`phones[${index}].type`}
                                        id={`phones[${index}].type`}
                                        autoComplete={tc('auto_phone_type')}
                                        placeholder={tc('field_phone_type')}
                                        className={FormStyles('input')}
                                    />
                                    <CustomError error={errors?.phones?.[index]?.message} />
                                </div>
                            ))}
                            <button type="button" onClick={addPhone}>
                                Add
                            </button> */}
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

Profile.Layout = AdminLayout;
export default Profile;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
