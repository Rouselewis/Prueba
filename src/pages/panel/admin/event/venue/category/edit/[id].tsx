/** @format */
import { useState } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useLocale, useTranslations } from "next-intl";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomCancel, CustomSubmit } from '@/components/forms';
import { InputLang } from '@/components/forms/lang';
import {  interfaceEventVenueCategory } from '@/interfaces/event';
import { useUpdateEventVenueCategory,useReadEventVenueCategory} from '@/hooks/event/event_venue_category';
import { useRouter } from 'next/router';

const EventCreateVenueCategory = () => {
    const t = useTranslations("Panel_SideBar");
    const locale = useLocale();
    const{push,query}=useRouter()
    const name=useReadEventVenueCategory(`${query.id}`)?.data?.category?.find((obj) => obj.lang == locale)?.name
    
    const breadcrumb = [
        { page: t('admin.admin'), href: '/panel/admin' },
        { page: t('admin.event.event'), href: '/panel/admin/event/venue' },
        { page: t('admin.event.venue'), href: '/panel/admin/event/venue' },
        { page: t('admin.event.category'), href: '/panel/admin/event/venue/category' },
        { page: t('actions.edit')+` / ${name}`, href: '' }
    ]
    const {mutate,isLoading,isError,isSuccess}= useUpdateEventVenueCategory()
    
    const { register, handleSubmit,setValue, formState: { errors }, reset, getValues } = useForm< interfaceEventVenueCategory>();
    
    const[category,setCategory]=useState( [{lang:'es', name:''},{lang:'en', name:''}])


    const onSubmit:SubmitHandler< interfaceEventVenueCategory>= (data: interfaceEventVenueCategory)=>{
        
    
      mutate({ updateCategory_id: `${query.id}`, eventCategory: data })
    };

    /*Lang*/
        const[lang ,setlang]=useState('en')
    
        const LangSelect:React.ChangeEventHandler<HTMLSelectElement> = (e:any)=>{ 
        const Lang=e.target.value;
        setlang(Lang==='en'? 'en': 'es')
    }
    /*Name*/
        const handleName:React.ChangeEventHandler<HTMLInputElement> = (e:any)=>{
        const Name=e.target.value;
        const cate= [...category]
        
        if(lang==='en'){
            cate[1].name=Name
            setCategory(cate)
        }else if(lang==='es'){
            cate[0].name=Name
            setCategory(cate)
        }
        setValue("category", category)
    }
    console.log(getValues())
    return (
        <>
            {/* Breadcrumb section */}
            <div>
                <Heading breadcrumb={breadcrumb} langBread onChange={LangSelect}/>
            </div>
            <div className="flex flex-1 pt-6">
                <div className="w-screen min-h-0 overflow-hidden">
                    <form className="divide-y divide-gray-200 lg:col-span-9"  onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div className="py-6 grid grid-cols-12 gap-6">
                            <InputLang lang={lang} onChange={handleName}/>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                                <CustomCancel />
                                <CustomSubmit onClick={()=>isSuccess?push('/en/panel/admin/event/venue/category'):console.log('error')}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

EventCreateVenueCategory.Layout = AdminLayout;
export default EventCreateVenueCategory;
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}
