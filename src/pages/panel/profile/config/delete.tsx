/** @format */
import { useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { Switch } from '@headlessui/react';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
import { Heading } from '@/components/headers/admin/heading';

import { CustomDelete } from '@/components/forms';
import { FormStyles } from '@/helpers';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteUser } from '@/hooks/user/user';
// Session
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const ProfileDelete = () => {
  const t = useTranslations('Panel_Profile_Delete');
  const ts = useTranslations('Panel_SideBar');
  const tb = useTranslations('btn');

  const breadcrumb = [
    { page: ts('user'), href: '/panel/profile' },
    { page: ts('profile.config.config'), href: '/panel/profile/config' },
    { page: ts('profile.config.delete'), href: '' },
  ];

  const { data: session, status } = useSession();
  const route = useRouter();
  if (status !== 'authenticated') {
    route.push('/');
  }

  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['user']);
  const user = userData?.[0]?.user;

  const { data: deleteUser, isError, error } = useDeleteUser(user?.uid);
  if (isError) console.log('useDeleteUser ERROR:', (error as Error)?.message);

  const handleSubmit = (data) => {
    const updatedData = { uid: user?.uid };
    // setSubmitted(false);
    // setSubmittedError(true);
    deleteUser(updatedData);
  };

  return (
    <>
      {/* Breadcrumb section */}
      <div>
        <Heading breadcrumb={breadcrumb} />
      </div>
      {/* Admin section */}
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <form className="lg:col-span-9" onSubmit={handleSubmit} method="POST">
            <div>
              <div className="grid text-stone-500 text-20 ">{t('message')}</div>
            </div>
            <div className="py-6">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <select
                    id="lang"
                    name="lang"
                    className={FormStyles('select')}
                    defaultValue={''}
                  >
                    <option value="" className="text-customRed">
                      {t('why')}
                    </option>
                    {/*}
                                    {sexOptions.map((item) => {
                                        return (
                                            <option value={item.value}>{item.name}</option>
                                        )
                                    })}*/}
                  </select>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                  <p className="text-customRed">{t('confirm_email')}</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-200 pt-6">
              <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                <CustomDelete text={tb('form_delete_account')} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

ProfileDelete.Layout = AdminLayout;
export default ProfileDelete;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
