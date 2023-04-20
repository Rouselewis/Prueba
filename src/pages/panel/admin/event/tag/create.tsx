/** @format */
import { useState } from 'react';
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomCancel, CustomLabel, CustomSubmit } from '@/components/forms';
import { FormStyles } from '@/helpers';
// Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Hooks and Interfaces
import { useCreateTag } from '@/hooks/event/event_tags';
import { EventTag } from '@/interfaces/event';

const validationSchema = yup.object().shape({
    tag: yup.string().min(1).required(),
});

const EventCreateTag = () => {
    const t = useTranslations("Panel_SideBar");
    const tc = useTranslations("Common_Forms");
    const tt = useTranslations("Toast");

    const breadcrumb = [
        { page: t('admin.admin'), href: '/panel/admin' },
        { page: t('admin.event.event'), href: '/panel/admin/event/tag' },
        { page: t('admin.event.tag'), href: '/panel/admin/event/tag' },
        { page: t('actions.create'), href: '' }
    ]

    const { register, handleSubmit, formState: { errors }, reset } = useForm<EventTag>({
        resolver: yupResolver(validationSchema),
    });

    const { mutate } = useCreateTag();
    const onSubmitHandler = (data: EventTag) => {
        mutate(data, {
            onError: () => {
                toast.error(tt('event_tag.create.error'), {
                    position: toast.POSITION.TOP_RIGHT
                });
            },
            onSuccess: () => {
                toast.success(tt('event_tag.create.success'), {
                    position: toast.POSITION.TOP_RIGHT
                });
                reset();
            },
            
        });
    };

    return (
        <>
            {/* Breadcrumb section */}
            <div>
                <Heading breadcrumb={breadcrumb} />
            </div>
            <div className="flex flex-1 pt-6">
                <div className="w-screen min-h-0 overflow-hidden">
                    <form onSubmit={handleSubmit(onSubmitHandler)} className="lg:col-span-9" method="POST">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-4">
                                <CustomLabel field='tag' name={tc('field_name')} />
                                <input
                                    type="text"
                                    id="tag"
                                    autoComplete={tc('field_name')}
                                    placeholder={tc('field_name')}
                                    className={FormStyles('input')}
                                    {...register('tag')}
                                />
                            </div>
                        </div>
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

EventCreateTag.Layout = AdminLayout;
export default EventCreateTag;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}
