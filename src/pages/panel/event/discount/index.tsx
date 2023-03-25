/** @format */
import { useEffect, useMemo, useState } from 'react';
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { BasicTable } from '@/components/admin/tables';
import { columnsDiscount } from '@/components/admin/tables/columns/columnsDiscount';
// Components
import { Heading } from '@/components/headers/admin/heading';
// Import Interface
import { EventDiscount } from '@/interfaces/event';

const EventSpecialCategory = () => {
    const ts = useTranslations("Panel_SideBar");
    const tb = useTranslations("btn");

    const breadcrumb = [
        { page: ts('event.event'), href: '/panel/event' },
        { page: ts('event.discount'), href: '' }
    ]
    const buttonBread =  { text: tb('add_discount'), href: '/panel/event/discount/create' }

    const data = useMemo(() => [
        { id: '1', event: "Iron Maiden", cuopon: "MJ2012K", discount: "10%", limit: 10, exchanges: 2, init_at: "2022-10-10", expires_at: "2022-10-15", status: true },
        { id: '2', event: "Teatro: Alicia en el país de las maravillas y sus amigos", cuopon: "MJ2I12K", discount: "20%", limit: 15, exchanges: 7, init_at: "2022-10-09", expires_at: "2022-10-28", status: true },
    ], []);
    const columns = columnsDiscount();
   
    return (
        <>
            {/* Breadcrumb section */}
            <div>
                <Heading breadcrumb={breadcrumb} buttonBread={buttonBread} />
            </div>
            {/* Admin section */}
            <div className="flex flex-1 pt-6">
                <div className="w-screen min-h-0 overflow-hidden">
                    <div className="flow-root">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <div className="min-w-full divide-y divide-gray-300">
                                        <BasicTable columns={columns} defaultData={data} />
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

EventSpecialCategory.Layout = AdminLayout;
export default EventSpecialCategory;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}