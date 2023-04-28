/** @format */
import { useEffect, useMemo, useState } from 'react';
import { GetStaticPropsContext } from "next";
import { useLocale, useTranslations } from "next-intl";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { BasicTable } from '@/components/admin/tables';
import { columnsCategory } from '@/components/admin/tables/columns/columnsVenueCategory';
// Components
import { Heading } from '@/components/headers/admin/heading';
// Import Interface
import { EventVenueCategory as EventVenueCategoryInterface } from '@/interfaces/event';
import { useAllEventVenueCategory } from '@/hooks/event/event_venue_category';

const EventVenueCategory = () => {
    const t = useTranslations("table_columns");
    const ts = useTranslations("Panel_SideBar");
    const tb = useTranslations("btn");
    const {isError,isLoading,data}=useAllEventVenueCategory()

    const breadcrumb = [
        { page: ts('admin.admin'), href: '/panel/admin' },
        { page: ts('admin.event.event'), href: '/panel/admin/venue' },
        { page: ts('admin.event.venue'), href: '/panel/admin/venue' },
        { page: ts('admin.event.category'), href: '' }
    ]
    const locale = useLocale();
    const buttonBread =  { text: tb('add_event_venue_category'), href: '/panel/admin/event/venue/category/create' }
    let dataTableE = [];
    data?.map((item) => {
        let dataIn = {
            id:item._id,
            category: item.category?.find((obj) => obj.lang == locale)?.name,
            status:item.status
        }
        dataTableE.push(dataIn)
    })
   
    const columns =  columnsCategory(t('admin.event.venue.category'));
   
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
                                        <BasicTable columns={columns} defaultData={dataTableE} />
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

EventVenueCategory.Layout = AdminLayout;
export default EventVenueCategory;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}