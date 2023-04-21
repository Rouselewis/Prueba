/** @format */
import { Fragment, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, Transition } from '@headlessui/react';
// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CustomError, CustomLabel } from '@/components/forms';
import { FormStyles } from '@/helpers';
// Icons
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { Button } from '@/components/commons';

type Props = {
  currentColor: string;
};

const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
type FormData = {
  email: string;
  password: string;
};
export const Login = ({ currentColor }: Props) => {
  const t = useTranslations('Access');
  const tc = useTranslations('Common_Forms');
  const ts = useTranslations('Fsuccess');
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      const { error } = await signIn('credentials', {
        ...formData,
        redirect: false,
      });
      console.log(error);
      if (error) throw new Error(error);
      toast.success(ts('signin_succesfully'));
      reset();
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <Menu as="div" className="relative z-50 inline-block text-left">
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
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-[20rem] md:w-[30rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8 relative z-[9999999999]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                {t('title')}
              </h2>
              <p className="mt-2 text-center text-sm text-[#8D8D8D]">
                {t('subtitle_new')}&nbsp;
                <a
                  href="#"
                  className="font-medium text-customGreen hover:loginHover"
                >
                  {t('subtitle_new_link')}
                </a>
              </p>
            </div>

            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <CustomLabel field="email" name={tc('field_email')} />
                    <div className="mt-2">
                      <input
                        type="email"
                        id="email"
                        autoComplete={tc('auto_email')}
                        placeholder={tc('field_email')}
                        className={FormStyles('input')}
                        {...register('email')}
                      />
                    </div>
                    <CustomError error={errors?.email?.message} />
                  </div>

                  <div>
                    <CustomLabel field="email" name={tc('field_pass')} />
                    <div className="mt-2">
                      <input
                        type="password"
                        id="password"
                        autoComplete={tc('auto_pass')}
                        placeholder={tc('field_pass')}
                        className={FormStyles('input')}
                        {...register('password')}
                      />
                    </div>
                    <CustomError error={errors?.password?.message} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded text-customGreen focus:loginHover"
                      />
                      <label
                        htmlFor="remember-me"
                        className="block ml-2 text-sm text-gray-900"
                      >
                        {tc('field_remember')}
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-customGreen hover:loginHover"
                      >
                        {t('forgot')}
                      </a>
                    </div>
                  </div>

                  <div>
                    <Button type="submit" loading={loading} fullWidth>
                      {t('signin')}
                    </Button>
                  </div>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 text-gray-500 bg-white">
                        {t('continue')}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div>
                      <button
                        onClick={() => signIn('facebook')}
                        className="inline-flex justify-center w-full px-4 py-2 text-gray-500 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                      >
                        <span className="sr-only">Log in with Facebook</span>
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => signIn('google')}
                        className="inline-flex justify-center w-full px-4 py-2 text-gray-500 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                      >
                        <span className="sr-only">Log in with Google</span>
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                        </svg>
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => signIn('apple')}
                        className="inline-flex justify-center w-full px-4 py-2 text-gray-500 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                      >
                        <span className="sr-only">Log in with Apple</span>
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
