/** @format */
import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { SketchPicker } from 'react-color';
import axios from '@/lib/axios';
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomCancel, CustomLabel, CustomSubmit } from '@/components/forms';
import { FormStyles } from '@/helpers';
import { LinkIcon } from '@heroicons/react/24/solid';
import { EventSupplier } from '@/interfaces/event';
import { useUpdateEventSupplier,useReadEventSupplier } from '@/hooks/event/event_supplier';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

const EventCreateSuplier = ({dataInit}) => {
    const t = useTranslations("Panel_SideBar");
    const tc = useTranslations("Common_Forms");

    const breadcrumb = [
        { page: t('admin.admin'), href: '/panel/admin' },
        { page: t('admin.event.event'), href: '/panel/admin/event/supplier' },
        { page: t('admin.event.supplier'), href: '/panel/admin/event/supplier' },
        { page: t('actions.update'), href: '' }
    ]
    const {query,push,locale }=useRouter()

    const{mutate,
        isError,
        isSuccess}=useUpdateEventSupplier()
    useEffect(()=>{
        if (isSuccess){
            toast.success('Event supplier updated :)',{
                    position:toast.POSITION.TOP_RIGHT,
                    data:{
                        tittle:'success Updated',
                        text:'This is a success message '
                    }
                
            } )
            push(`/${locale}/panel/admin/event/category`)   
        }else if(isError){
            toast.error(' Error, No updated :(',{
                    position:toast.POSITION.TOP_RIGHT,
                    data:{
                        tittle:'error Updated',
                        text:'This is a error message' 
                    }
                } )
        }
    },[isSuccess,isError])
    const { 
        register,
        handleSubmit,
        setValue, 
        formState: { errors },
        reset,
        getValues } = useForm({defaultValues:dataInit});

    const [initColor, setInitColor]=useState<string>('#ffffff');
    const  onChangeColor=(color:any)=>{ 
        setInitColor(color.hex)
        setValue('color', initColor )
    }
    const onSubmit:SubmitHandler<EventSupplier>= (data:EventSupplier )=>{
        const formData=new FormData
        formData.append('event_supliers',JSON.stringify(data))
        mutate({id:`${query.id}`,supplier:formData})
    };

    return (
        <>
            {/* Breadcrumb section */}
            <div>
                <Heading breadcrumb={breadcrumb} />
            </div>
            <div className="flex flex-1 pt-6">
                <div className="w-screen min-h-0 overflow-hidden">
                    <form className="lg:col-span-9" onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div className="py-6 grid grid-cols-12 gap-6">
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <CustomLabel field="name" name={tc('field_name')} />
                                <input
                                    type="text"
                                    {...register('name')}
                                    id="name"
                                    autoComplete={tc('field_name')}
                                    placeholder={tc('field_name')}
                                    className={FormStyles('input')}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <CustomLabel field="url" name={tc('field_url')} />
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        {...register('url')}
                                        id="url"
                                        autoComplete={tc('field_url')}
                                        placeholder={tc('field_url')}
                                        className={FormStyles('input')}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <CustomLabel field="front_id" name={tc('field_color')} required />
                                <SketchPicker
                                color={initColor}
                                onChange={onChangeColor}/>
                            </div>

                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <CustomLabel field="name" name={tc('field_type')} />
                                <input
                                    type="text"
                                    {...register('data.type')}
                                    id="type"
                                    autoComplete={tc('field_name')}
                                    placeholder={tc('field_name')}
                                    className={FormStyles('input')}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <CustomLabel field="data_url" name={tc('field_data_url')} />
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        {...register('data.url')}
                                        id="data_url"
                                        autoComplete={tc('field_data_url')}
                                        placeholder={tc('field_data_url')}
                                        className={FormStyles('input')}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <LinkIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <CustomLabel field="key" name={tc('field_key')} />
                                <input
                                    type="text"
                                    {...register('data.key')}
                                    id="key"
                                    autoComplete={tc('field_key')}
                                    placeholder={tc('field_key')}
                                    className={FormStyles('input')}
                                />
                            </div>
                        </div>
                        
                        <ToastContainer/>

                        {/* Buttons section */}
                        <div className="divide-y divide-gray-200">
                            <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                                <CustomCancel onClick={()=>push(`/${locale}/panel/admin/event/supplier`)}/>
                                <CustomSubmit />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

EventCreateSuplier.Layout = AdminLayout;
export default EventCreateSuplier;
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps({ locale, params }: GetStaticPropsContext) {
    const { data } = await axios.get(`/events/suppliers/${params.id}`);
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
            dataInit:data
        },
    };
}
