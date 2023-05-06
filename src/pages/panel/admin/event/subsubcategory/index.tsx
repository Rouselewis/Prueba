/** @format */
import { useEffect, useMemo, useState } from 'react';
import { GetStaticPropsContext } from "next";
import { useTranslations, useLocale  } from "next-intl";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { BasicTable } from '@/components/admin/tables';
import { columnsCategory} from '@/components/admin/tables/columns/columnsSubSubCategory';
// Components
import { Heading } from '@/components/headers/admin/heading';
// Import Interface
import {useSubsubCategories,useDeleteEventSubSubCategory} from '@/hooks/event/event_sub_subcategory';
import { EventSubsubcategory as EventSubsubcategoryInterface } from '@/interfaces/event';
import { ImageURL } from '@/helpers/imageURL';


const EventSubsubcategory = () => {
    const locale = useLocale();

    const ts = useTranslations("Panel_SideBar");
    const tb = useTranslations("btn");

    const breadcrumb = [
        { page: ts('admin.admin'), href: '/panel/admin' },
        { page: ts('admin.event.event'), href: '' },
        { page: ts('admin.event.subsubcategory'), href: '' }
    ]
    const buttonBread =  { text: tb('add_event_subsubcategory'), href: '/panel/admin/event/subsubcategory/create' }

    const {isError,isLoading,data}=useSubsubCategories()
    
    let dataTableE = [];
    data?.map((item) => {
        let dataIn = {
            id:item._id,
            category_id: item.category_id,
            subcategory_id: item.subcategory_id,
            category: item.sub_subcategory,
            icon: ImageURL(item.picture),
            status:item.status
            }
        dataTableE.push(dataIn)
    })
    const columns = columnsCategory( ts('admin.event.subsubcategory'));
   
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

EventSubsubcategory.Layout = AdminLayout;
export default EventSubsubcategory;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}