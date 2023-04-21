/** @format */
import { useEffect, useMemo, useState } from 'react';
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { BasicTable } from '@/components/admin/tables';
import { columnsTag } from '@/components/admin/tables/columns/columnsTag';
// Components
import { Heading } from '@/components/headers/admin/heading';
// Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Hooks and interfaces
import { useTags, useUpdateEventTag, useDeleteEventTag } from '@/hooks/event/event_tags';
import { EventTag as EventTagInterface } from '@/interfaces/event';

const EventTag = () => {
    const t = useTranslations("table_columns");
    const ts = useTranslations("Panel_SideBar");
    const tb = useTranslations("btn");
    const tt = useTranslations("Toast");

    const breadcrumb = [
        { page: ts('admin.admin'), href: '/panel/admin' },
        { page: ts('admin.event.event'), href: '' },
        { page: ts('admin.event.tag'), href: '' }
    ]
    const buttonBread =  { text: tb('add_event_tag'), href: '/panel/admin/event/tag/create' }

    const tags = useTags();
    let dataTable = [];
    tags.data?.map((item) => {
        dataTable.push({
            id: item._id,
            category: item.tag,
            status: item.status
        })
    })
    const columns = columnsTag(t('admin.event.tag'));
   
    return (
        <>
            {/* Breadcrumb section */}
            <div>
                <Heading breadcrumb={breadcrumb} buttonBread={buttonBread} />
            </div>
            <div className="flex flex-1 pt-6">
                <div className="w-screen min-h-0 overflow-hidden">
                    <div className="flow-root">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <div className="min-w-full divide-y divide-gray-300">
                                        {tags.isLoading? 
                                            'loading'
                                        : 
                                            <BasicTable columns={columns} defaultData={dataTable} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

EventTag.Layout = AdminLayout;
export default EventTag;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}