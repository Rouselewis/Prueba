/** @format */
import { useEffect, useMemo, useState } from 'react';
import { GetStaticPropsContext } from "next";
import { useLocale, useTranslations } from 'next-intl';
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { BasicTable } from '@/components/admin/tables';
import { columnsEventCategory } from '@/components/admin/tables/columns/columnsEventCategory';
// Components
import { Heading } from '@/components/headers/admin/heading';
// Import Interface
import { EventCategory as EventCategoryInterface } from '@/interfaces/event';
import { useAllEventCategories, useDeleteEventCategory,useUpdateEventCategory} from '@/hooks/event/event_category';
import { ImageURL } from '@/helpers/imageURL';


export interface dataTable {
    id: string, 
    icon: string, 
    category: string, 
    status: boolean
}

const  EventCategory = () => {
    const locale = useLocale();
    const {data, isLoading}= useAllEventCategories();
    
    let dataTableE=[]
    if(isLoading){
        null
    }else{
    data?.map((item) => {
        let dataIn = {
            id: item._id,
            icon: ImageURL(item.picture),
            category: item.category?.find((obj) => obj.lang == locale)?.name,
            status: item.status
        }
        dataTableE.push(dataIn)  
    })
    
    }
    
    

    const ts = useTranslations("Panel_SideBar");
    const tb = useTranslations("btn");

    const breadcrumb = [
        { page: ts('admin.admin'), href: '/panel/admin' },
        { page: ts('admin.event.event'), href: '' },
        { page: ts('admin.event.category'), href: '' }
    ]
    const buttonBread =  { text: tb('add_event_category'), href: '/panel/admin/event/category/create' }
    
   
    const columns = columnsEventCategory();
   
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
                                       {isLoading? 
                                       'loading'
                                       : 
                                       <BasicTable 
                                        columns={columns} 
                                        deleteOption={useDeleteEventCategory} 
                                        defaultData={dataTableE} />}
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

EventCategory.Layout = AdminLayout;
export default EventCategory;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}