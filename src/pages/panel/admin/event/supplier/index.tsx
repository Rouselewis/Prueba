/** @format */
import { useEffect, useMemo, useState } from 'react';
import { GetStaticPropsContext } from "next";
import { useTranslations,useLocale  } from "next-intl";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { BasicTable } from '@/components/admin/tables';
import { columnsEventSupplier } from '@/components/admin/tables/columns/columnsEventSupplier';
//hooks
import {useEventSuppliers,
    useEventSupplier,
    useUpdateEventSupplier,
    useDeleteEventSupplier} from '@/hooks/event/event_supplier';
// Components
import { Heading } from '@/components/headers/admin/heading';

// Import Interface
import { EventSupplier as EventSupplierInterface } from '@/interfaces/event';

const EventSupplier = () => {
    const locale = useLocale();
    
    const ts = useTranslations("Panel_SideBar");
    const tb = useTranslations("btn");

    const breadcrumb = [
        { page: ts('admin.admin'), href: '/panel/admin' },
        { page: ts('admin.event.event'), href: '' },
        { page: ts('admin.event.supplier'), href: '' }
    ]
    const buttonBread =  { text: tb('add_event_supplier'), href: '/panel/admin/event/supplier/create' }

    const {isError,isLoading,data}=useEventSuppliers()
    console.log('EventSupplier',data)
    let dataTableE = [];
    data?.map((item) => {
        let dataIn = {
            id:item._id,
            name: item.name,
            url: item.url,
            data: item.data,
            status:item.status
        }
        dataTableE.push(dataIn)
    })
    
    const columns = columnsEventSupplier();
   
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

EventSupplier.Layout = AdminLayout;
export default EventSupplier;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}