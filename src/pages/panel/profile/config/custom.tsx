/** @format */
import { useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
import { Heading } from '@/components/headers/admin/heading';

import { CustomError, CustomCancel, CustomSubmit } from '@/components/forms';
// Components
import { CustomCategory } from '@/components/admin/profile/customCategory';
import { useCategories } from '@/hooks/admin/event/category';
import { useMe, useUsers } from '@/hooks/user/user';

const ProfileCustom = () => {
  const t = useTranslations('Panel_Profile_Category');
  const ts = useTranslations('Panel_SideBar');

  const breadcrumb = [
    { page: ts('user'), href: '/panel/profile' },
    { page: ts('profile.config.config'), href: '/panel/profile/config' },
    { page: ts('profile.config.custom'), href: '' },
  ];
  const { isLoading, data: categories } = useCategories();
  if (isLoading) return <div>Loading...</div>;
  if (!categories) return <div>No categories found</div>;

  // const { data: meData } = useMe();
  // console.log('meData:', JSON.stringify(meData, null, 2));

  // const { data: userData } = useUsers();
  // console.log('userData:', JSON.stringify(userData, null, 2));

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
            action="#"
            method="POST"
          >
            <div className="lg:col-span-9">
              <div>
                <div className="grid text-stone-500 text-20 ">
                  {t('message')}
                </div>
              </div>
              <div className="py-6">
                <div className="md:flex md:items-center md:justify-between">
                  <div className="mt-2 grid grid-cols-2 gap-5 sm:grid-cols-5 lg:grid-cols-7">
                    {categories.map((category) => (
                      <div key={category?._id}>
                        <CustomCategory
                          _id={category?._id}
                          category={category?.category}
                          picture={category?.picture}
                          color={category?.color}
                          status={category?.status}
                        />
                      </div>
                    ))}
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

ProfileCustom.Layout = AdminLayout;
export default ProfileCustom;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
