/** @format */
import { useState } from 'react';
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
// Session
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProfileSecurity = () => {
  const tc = useTranslations('Common_Forms');
  const ts = useTranslations('Panel_SideBar');

  const breadcrumb = [
    { page: ts('user'), href: '/panel/profile' },
    { page: ts('profile.security'), href: '' },
  ];

    const { data: session, status } = useSession();
    const route = useRouter();
    if (status !== 'authenticated') {
      route.push('/');
    }

  return (
    <>
      {/* Breadcrumb section */}
      <div>
        <Heading breadcrumb={breadcrumb} />
      </div>
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <form className="lg:col-span-9" action="#" method="POST">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
                <CustomLabel field="pass" name={tc('field_pass')} required />
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  autoComplete={tc('auto_pass')}
                  placeholder={tc('field_pass')}
                  className={FormStyles('input')}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
                <CustomLabel
                  field="newpass"
                  name={tc('field_newpass')}
                  required
                />
                <input
                  type="password"
                  name="newpass"
                  id="newpass"
                  autoComplete={tc('auto_newpass')}
                  placeholder={tc('field_newpass')}
                  className={FormStyles('input')}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
                <CustomLabel field="renewpass" name={tc('field_repass')} />
                <input
                  type="password"
                  name="renewpass"
                  id="renewpass"
                  autoComplete={tc('field_repass')}
                  placeholder={tc('field_repass')}
                  className={FormStyles('input')}
                />
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

ProfileSecurity.Layout = AdminLayout;
export default ProfileSecurity;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
