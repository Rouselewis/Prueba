/** @format */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useLocale, useTranslations } from "next-intl";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { useForm, SubmitHandler} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomCancel, CustomLabel, CustomSubmit } from '@/components/forms';
import { CurrentColor, FormStyles } from '@/helpers';
import { InputLang } from '@/components/forms/lang';
import { EventSubcategory } from '@/interfaces/event';
import { useCategories} from '@/hooks/event/event_category';
import {useReadEventSubcategory, useUpdateEventSubCategory} from '@/hooks/event/event_subcategory'




const EventCreateSubcategory = () => {
    const {data}=useCategories()
    const { locales, query } = useRouter();
    const dataColor= CurrentColor();
    const t = useTranslations("Panel_SideBar");
    const tc = useTranslations("Common_Forms");
    const locale = useLocale();
    
    const dataQuery=useReadEventSubcategory(`${query.id}`)
    console.log(dataQuery?.data)

    const{mutate, isLoading, isError, isSuccess}=useUpdateEventSubCategory()
    const { register, handleSubmit,setValue, formState: { errors }, reset } = useForm<EventSubcategory>();

    let dataTableE=[]
    data?.map((item) => {
        let dataIn = {
            id:item._id,
            category: item.category.find((obj) => obj.lang == locale)?.name,
            
        }
        dataTableE.push(dataIn)  
    })

    const handleSelected=(e)=>{
         const id= dataTableE.find((pre)=> pre.category===e.target.value)?.id
          setValue('category_id.id', id )
          setValue('category_id.collection', "events_categories" )
    }

    const breadcrumb = [
        { page: t('admin.admin'), href: '/panel/admin' },
        { page: t('admin.event.event'), href: '/panel/admin/event/subcategory' },
        { page: t('admin.event.subcategory'), href: '/panel/admin/event/subcategory' },
        { page: t('actions.edit')  , href: '' }
        
    ]
/*submit*/  
    const onSubmit:SubmitHandler<EventSubcategory >= (data:EventSubcategory)=>{
      const updateData={updateSubCategory_id:`${query.id}`,eventSubCategory:data}
      
        mutate(updateData)
    };


    const[category,setCategory]=useState( [{lang:'es', name:''},{lang:'en', name:''}])

/*Lang*/
    const[lang ,setlang]=useState(locale)

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
    setValue('subcategory', category)
}
   

    return (
        <>
            {/* Breadcrumb section */}
            <div>
                <Heading breadcrumb={breadcrumb} langBread onChange={LangSelect} />
            </div>
            <div className="flex flex-1 pt-6">
                <div className="w-screen min-h-0 overflow-hidden">
                    <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div className="py-6 grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-3 md:col-span-3 lg:col-span-3">
                                <CustomLabel field="category" name={tc('field_category')} required />
                                <select
                                    id="category"
                                    className={FormStyles('select')}
                                    defaultValue={''}
                                    onChange={handleSelected}
                                >
                                    <option value=''>{tc('field_select_category')}</option>
                                    {dataTableE.map((e)=>{
                                    return(<option>{e.category}</option>)})}
                                </select>
                            </div>
                            <InputLang lang={lang} onChange={handleName} />
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

EventCreateSubcategory.Layout = AdminLayout;
export default EventCreateSubcategory;
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
