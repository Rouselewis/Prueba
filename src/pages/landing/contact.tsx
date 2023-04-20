/** @format */
import { LegacyRef, createRef, useRef, useState, useCallback } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CustomError, CustomLabel, CustomSubmit } from '@/components/forms';
// Layout
import MainLayout from '@/components/layout/main';
import Header from '@/components/headers/landing/header';
import Section from '@/components/headers/landing/section';
// Helpers
import { CurrentColor, FormStyles } from '@/helpers/index';
// Interface
import { Contact } from '@/interfaces/contact';
//Icons
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
//Images
import image from 'public/images/assets/landing/contact/slide.jpg';
import { useContact } from '@/hooks/use_contact';
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const validationSchema = yup.object().shape({
  firstname: yup.string().min(2).max(32).required(),
  surname: yup.string().min(2).max(32).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(10).max(10).required(),
  subject: yup.string().min(5).max(32).required(),
  message: yup.string().min(2).max(32).required(),
});

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedError, setSubmittedError] = useState(false);
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const currentColor = CurrentColor();
  const t = useTranslations('Contact');
  const tc = useTranslations('Common_Forms');
  const tb = useTranslations('btn');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Contact>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate, isError } = useContact();
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha();
    setToken(token);
    // Do whatever you want with the token
  }, [executeRecaptcha]);
  console.log(token);
  const onSubmitHandler = async (data: Contact) => {
    await handleReCaptchaVerify();
    if (token) {
      mutate({
        ...data,
        g_captcha: token,
      });
    }

    if (isError || !token) {
      setSubmittedError(true);
      setSubmitted(false);
    } else {
      setSubmitted(true);
      setSubmittedError(false);
      reset();
    }
  };

  return (
    <>
      <Header image={image} />
      <Section title={t('page')} color={currentColor} />
      <div className="relative bg-white isolate">
        <div className="grid grid-cols-1 mx-auto max-w-7xl lg:grid-cols-2">
          <div className="relative px-6 pt-20 pb-20 sm:pt-32 lg:static lg:py-20 lg:px-8">
            <div className="max-w-xl mx-auto lg:mx-0 lg:max-w-lg">
              <div
                className={`absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-${currentColor} lg:w-1/2`}
              >
                <svg
                  className={`absolute inset-0 h-full w-full stroke-${currentColor} [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]`}
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                      width={200}
                      height={200}
                      x="100%"
                      y={-1}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="white"
                  />
                  <svg
                    x="100%"
                    y={-1}
                    className="overflow-visible fill-gray-50"
                  >
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                  </svg>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                {t('title')}
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {t('subtitle')}
              </p>
              <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                <div
                  className={`flex gap-x-4 rounded-xl bg-gray-100 p-6 ring-1 ring-inset ring-${currentColor}`}
                >
                  <BuildingOffice2Icon
                    className={`h-7 w-5 flex-none text-${currentColor}`}
                    aria-hidden="true"
                  />
                  <div className="text-base leading-7">
                    <h3 className="font-semibold">{t('address')}</h3>
                    <p className="mt-2">
                      José Sergio Báez 101, Villas del Sol
                      <br />
                      Guadalupe, Zacatecas 98067
                    </p>
                  </div>
                </div>

                <div
                  className={`flex gap-x-4 rounded-xl bg-gray-100 p-6 ring-1 ring-inset ring-${currentColor}`}
                >
                  <PhoneIcon
                    className={`h-7 w-5 flex-none text-${currentColor}`}
                    aria-hidden="true"
                  />
                  <div className="text-base leading-7">
                    <h3 className="font-semibold">{t('phone')}</h3>
                    <p className="mt-2">
                      <a
                        className={`hover:text-${currentColor}`}
                        href="tel:+524922504460"
                      >
                        +52 (492) 250-4460
                      </a>
                    </p>
                  </div>
                </div>

                <div
                  className={`flex gap-x-4 rounded-xl bg-gray-100 p-6 ring-1 ring-inset ring-${currentColor}`}
                >
                  <EnvelopeIcon
                    className="h-7 w-5 flex-none text-${currentColor}"
                    aria-hidden="true"
                  />
                  <div className="text-base leading-7">
                    <h3 className="font-semibold">{t('email')}</h3>
                    <p className="mt-2">
                      Contact:&nbsp;
                      <a
                        className={`hover:text-${currentColor}" href="mailto:sales@example.com`}
                      >
                        contact@ctickets.app
                      </a>
                      <br />
                      Sales:&nbsp;
                      <a
                        className={`hover:text-${currentColor}" href="mailto:sales@example.com`}
                      >
                        sales@ctickets.app
                      </a>
                      <br />
                    </p>
                  </div>
                </div>
              </dl>
            </div>
          </div>
          {submitted ? (
            <div className="flex flex-col px-6 pt-20 pb-24 sm:pb-32 lg:py-20 lg:px-8">
              <h2 className="mt-5 text-3xl font-bold tracking-wider text-customGreenVan">
                {t('success_title')}
              </h2>
              <p className="mt-5">{t('success_subtitle')}</p>
            </div>
          ) : submittedError ? (
            <div className="flex flex-col flex-1 px-6 pt-20 pb-24 sm:pb-32 lg:py-20 lg:px-8">
              <p className="mt-5 text-xl font-bold text-customRed">
                {t('error_title')}
              </p>
              <p className="mt-5">{t('error_subtitle')}</p>
              <div className="flex justify-start mt-5">
                <button
                  className={`rounded-md bg-${currentColor} w-[55%] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700`}
                  onClick={() => setSubmittedError(false)}
                >
                  {tb('form_back')}
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              method="POST"
              className="px-6 pt-20 pb-24 sm:pb-32 lg:py-20 lg:px-8"
            >
              <div className="max-w-xl mx-auto lg:mr-0 lg:max-w-lg">
                <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                  <div>
                    <CustomLabel
                      field="firstname"
                      name={tc('field_firstname')}
                      required
                    />
                    <div className="mt-2.5">
                      <input
                        id="firstname"
                        type="text"
                        autoComplete={tc('auto_firstname')}
                        placeholder={tc('field_firstname')}
                        className={FormStyles('input')}
                        {...register('firstname')}
                      />
                      <CustomError error={errors.firstname?.message} />
                    </div>
                  </div>
                  <div>
                    <CustomLabel
                      field="surname"
                      name={tc('field_surname')}
                      required
                    />
                    <div className="mt-2.5">
                      <input
                        id="surname"
                        type="text"
                        autoComplete={tc('auto_surname')}
                        placeholder={tc('field_surname')}
                        className={FormStyles('input')}
                        {...register('surname')}
                      />
                      <CustomError error={errors.surname?.message} />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <CustomLabel
                      field="email"
                      name={tc('field_email')}
                      required
                    />
                    <div className="mt-2.5">
                      <input
                        id="email"
                        type="email"
                        autoComplete={tc('auto_email')}
                        placeholder={tc('field_email')}
                        className={FormStyles('input')}
                        {...register('email')}
                      />
                      <CustomError error={errors.email?.message} />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <CustomLabel
                      field="phone"
                      name={tc('field_phone')}
                      required
                    />
                    <div className="mt-2.5">
                      <input
                        id="phone"
                        type="tel"
                        autoComplete={tc('auto_phone')}
                        placeholder={tc('field_phone')}
                        className={FormStyles('input')}
                        {...register('phone')}
                      />
                      <CustomError error={errors.phone?.message} />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <CustomLabel
                      field="subject"
                      name={tc('field_subject')}
                      required
                    />
                    <div className="mt-2.5">
                      <input
                        id="subject"
                        type="text"
                        autoComplete={tc('auto_subject')}
                        placeholder={tc('field_subject')}
                        className={FormStyles('input')}
                        {...register('subject')}
                      />
                      <CustomError error={errors.subject?.message} />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <CustomLabel
                      field="message"
                      name={tc('field_message')}
                      required
                    />
                    <div className="mt-2.5">
                      <textarea
                        id="message"
                        rows={4}
                        className={FormStyles('area')}
                        defaultValue={''}
                        {...register('message')}
                      />
                      <CustomError error={errors.message?.message} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <CustomSubmit typeText="send" />
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="relative py-10 bg-white isolate">
        <div className="flex justify-center w-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d919.7347204632892!2d-102.54627301188026!3d22.767649335671468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86824eb8de657407%3A0x1036f7d9db767840!2sJos%C3%A9%20Sergio%20B%C3%A1ez%20101%2C%20Villas%20del%20Sol%2C%2098067%20Guadalupe%2C%20Zac.!5e0!3m2!1ses-419!2smx!4v1678590382873!5m2!1ses-419!2smx"
            width="1200"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};
//@ts-ignore
Contact.Layout = MainLayout;
export default Contact;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
