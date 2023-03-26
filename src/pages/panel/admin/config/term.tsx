/** @format */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomCancel, CustomSubmit } from '@/components/forms';
import { CurrentColor } from '@/helpers';
import { EditorLang } from '@/components/admin/lang';

const AdminTerm = () => {
    const { locales } = useRouter();
    const currentColor = CurrentColor();
    const t = useTranslations("Panel_SideBar");
    const tc = useTranslations("Common_Forms");

    const breadcrumb = [
        { page: t('admin.admin'), href: '/panel/admin' },
        { page: t('admin.config.config'), href: '/panel/admin' },
        { page: t('admin.config.term'), href: '' }
    ]

    return (
        <>
            {/* Breadcrumb section */}
            <div>
                <Heading breadcrumb={breadcrumb} langBread />
            </div>
            {/* Profile section */}
            <div className="flex flex-1 pt-6">
                <div className="w-screen min-h-0 overflow-hidden">
                    <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
                        {/* Profile section */}
                        <div className="py-6 grid grid-cols-12 gap-6">
                            <EditorLang />
                        </div>
                        
                        {/* Buttons section */}
                        <div className="divide-y divide-gray-200">
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

AdminTerm.Layout = AdminLayout;
export default AdminTerm;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}
