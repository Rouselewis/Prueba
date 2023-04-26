import React, { Fragment, useState } from 'react';
import { classNames, useAnimation } from '@/helpers';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import {
  Button,
  Checkbox,
  Icon,
  Select,
  TextField,
  Title,
} from '@/components/commons';
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import Google from '@mui/icons-material/Google';
import { Apple } from '@mui/icons-material';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useSignUp } from '@/hooks/auth';

export type props = {
  className?: string;
  currentColor: any;
};

type formData = {
  firstname: string;
  surname: string;
  email: string;
  password: string;
  repeat: string;
  remember: boolean;
  birthday: Date;
  sex: string;
};

const PanelAuth: React.FC<props> = ({ className, currentColor }) => {
  const [step, setStep] = useState<'signIn' | 'signUp' | 'forgot'>('signIn');
  const t = useTranslations('Access');
  const te = useTranslations('Ferrors');
  const ts = useTranslations('Fsuccess');
  const animation = useAnimation('menu');
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<formData>();
  const { mutate, error: signUpError } = useSignUp();
  const onSubmit = async (data: any) => {
    try {
      switch (step) {
        case 'signIn':
          const { error } = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
          });
          if (error) throw new Error(error);
          toast.success(ts('signin_succesfully'));
          reset();
          break;
        case 'signUp':
          mutate({
            email: data.email,
            password: data.password,
            avatar: '/images/user/avatar.png',
            birthday: data.birthday,
            sex: data.sex,
            firstname: data.firstname,
            surname: 'Doe',
          });
          if (signUpError) throw new Error(signUpError as string);
          toast.success(ts('signin_succesfully'));
          reset();
          break;
        case 'forgot':
          // handle send link
          break;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Menu
      onSubmit={handleSubmit(onSubmit)}
      as="form"
      className={classNames('relative z-50 inline-block text-left', className)}
    >
      <Menu.Button
        className={`relative flex w-[28vw] md:w-40 h-full items-center justify-center space-x-2 bg-${currentColor} pr-[7.5px]`}
      >
        <div className="absolute -left-[7px] flex h-full flex-col justify-center">
          <div className="absolute -top-[10px] my-[1.5px] h-[13px] w-[13px] rounded-full bg-black"></div>
          <div className="my-[1.5px] h-[12px] w-[12px] rounded-full bg-black"></div>
          <div className="my-[1.5px] h-[12px] w-[12px] rounded-full bg-black"></div>
          <div className="my-[1.5px] h-[12px] w-[12px] rounded-full bg-black"></div>
        </div>
        <p className="text-sm text-white font-bold uppercase tracking-tighter">
          {t('title')}
        </p>
        <ChevronDownIcon className="w-5 h-5 text-white" aria-hidden="true" />
      </Menu.Button>
      <Transition as={Fragment} {...animation}>
        <Menu.Items className="absolute right-0 px-14 max-h-[510px] overflow-y-auto py-8 w-[20rem] md:w-[30rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {step == 'signIn' ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Title className="mx-auto" level="h3">
                  {t('signin')}
                </Title>

                <span className="text-gray-500 mx-auto flex items-center text-sm gap-1">
                  {t('subtitle_new')}{' '}
                  <span
                    onClick={() => setStep('signUp')}
                    className={`cursor-pointer text-${currentColor}`}
                  >
                    {t('subtitle_new_link')}
                  </span>
                </span>
              </div>

              <TextField
                error={errors?.email?.message}
                className="mx-auto"
                type="email"
                label={t('email')}
                {...register('email', { required: te('required') })}
              />

              <TextField
                error={errors?.password?.message}
                type="password"
                className="mx-auto"
                label={t('password')}
                {...register('password', { required: te('required') })}
              />

              <div className="flex items-center gap-2 justify-between">
                <Checkbox label={t('remember')} {...register('remember')} />
                <span
                  onClick={() => setStep('forgot')}
                  className={`text-sm cursor-pointer text-${currentColor}`}
                >
                  {t('forgot')}
                </span>
              </div>

              <Button type="submit" fullWidth>
                {t('signin')}
              </Button>

              <ContinueWithSection />
            </div>
          ) : step == 'signUp' ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Title className="mx-auto" level="h3">
                  {t('signup')}
                </Title>
                <span className="text-gray-500 mx-auto flex items-center text-sm gap-1">
                  {t('subtitle_have')}{' '}
                  <span
                    onClick={() => setStep('signIn')}
                    className={`cursor-pointer text-${currentColor}`}
                  >
                    {t('signin')}
                  </span>
                </span>
              </div>

              <TextField
                error={errors?.firstname?.message}
                className="mx-auto"
                label={t('firstname')}
                {...register('firstname', { required: te('required') })}
              />

              <TextField
                error={errors?.surname?.message}
                className="mx-auto"
                label={t('surname')}
                {...register('surname', { required: te('required') })}
              />

              <TextField
                error={errors?.birthday?.message}
                type="date"
                className="mx-auto"
                label={t('birthday')}
                {...register('birthday', {
                  required: te('required'),
                  valueAsDate: true,
                })}
              />

              <Select
                label={t('sex')}
                options={[
                  {
                    name: t('male'),
                    value: t('male'),
                  },
                  {
                    name: t('female'),
                    value: t('female'),
                  },
                  {
                    name: t('other'),
                    value: t('other'),
                  },
                ]}
                {...register('sex', { required: te('requried') })}
              />

              <TextField
                error={errors?.email?.message}
                type="email"
                className="mx-auto"
                label={t('email')}
                {...register('email', { required: te('required') })}
              />

              <TextField
                error={errors?.password?.message}
                type="password"
                className="mx-auto"
                label={t('password')}
                {...register('password', { required: te('required') })}
              />

              <TextField
                error={errors?.repeat?.message}
                type="password"
                className="mx-auto"
                label={t('repeat')}
                {...register('repeat', {
                  required: te('required'),
                  validate: (val) =>
                    val !== watch('password')
                      ? te('passwords_not_match')
                      : true,
                })}
              />

              <Button type="submit" fullWidth>
                {t('signup')}
              </Button>

              <ContinueWithSection />
            </div>
          ) : (
            step == 'forgot' && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <Title className="mx-auto text-center" level="h3">
                    {t('forgot')}
                  </Title>
                  <span
                    onClick={() => setStep('signIn')}
                    className={`text-${currentColor} mx-auto cursor-pointer flex items-center text-sm gap-1`}
                  >
                    {t('back')}
                  </span>
                </div>

                <TextField
                  className="mx-auto"
                  label={t('email')}
                  {...register('email', { required: te('required') })}
                />

                <Button type="submit" fullWidth>
                  {t('send_link')}
                </Button>
              </div>
            )
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const ContinueWithSection = () => {
  const t = useTranslations('Access');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="bg-gray-300 w-full h-[1px]"></div>
        <span className="text-sm mx-3 text-gray-500 whitespace-nowrap">
          {t('continue')}
        </span>
        <div className="bg-gray-300 w-full h-[1px]"></div>
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={() => signIn('facebook')}
          className="w-full border border-gray-300 rounded-md py-1.5 px-3 flex items-center justify-center"
        >
          <FacebookOutlined className="w-5 h-5 text-gray-500" />
        </button>
        <button
          onClick={() => signIn('google')}
          className="w-full border border-gray-300 rounded-md py-1.5 px-3 flex items-center justify-center"
        >
          <Google className="w-5 h-5 text-gray-500" />
        </button>
        <button
          onClick={() => signIn('apple')}
          className="w-full border border-gray-300 rounded-md py-1.5 px-3 flex items-center justify-center"
        >
          <Apple className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default PanelAuth;
