/** @format */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from "next";
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

import { useCreateEventSubcategory} from '@/hooks/event/event_subcategory';
import { HeadingSelect } from '@/components/headers/admin/headingSelect';
import { ToastContainer, toast } from 'react-toastify';




const EventCreateSubcategory = () => {
    const {data}=useCategories();
    const{ mutate,isLoading,isError,isSuccess}=useCreateEventSubcategory()
    const { locales,push } = useRouter();
    const dataColor= CurrentColor();
    const t = useTranslations("Panel_SideBar");
    const tc = useTranslations("Common_Forms");
    const locale = useLocale();
    const { register, handleSubmit,setValue, formState: { errors }, reset, getValues } = useForm<EventSubcategory>();
    useEffect(()=>{
        if (isSuccess){
            toast.success('Event sub category created :)',{
                    position:toast.POSITION.TOP_RIGHT,
                    data:{
                        tittle:'success Updated',
                        text:'This is a success message '
                    }
                
            } )
            push(`/${locale}/panel/admin/event/category`)   
        }else if(isError){
            toast.error(' Error, No created:(',{
            position:toast.POSITION.TOP_RIGHT,
            data:{
                tittle:'error Updated',
                text:'This is a error message  ' 
            }
        } )
    }},[isSuccess, isError])
    

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
          setValue('category_id', id )
    }

    const breadcrumb = [
        { page: t('admin.admin'), href: '/panel/admin' },
        { page: t('admin.event.event'), href: '/panel/admin/event/subcategory' },
        { page: t('admin.event.subcategory'), href: '/panel/admin/event/subcategory' },
        { page: t('actions.create'), href: '' }
        
    ]
    
    const onSubmit:SubmitHandler<EventSubcategory >= (data:EventSubcategory)=>{
       mutate(data)
    };
 
  
    const[category,setCategory]=useState( [{lang:'en', name:''}])

/*Lang*/
    const[lang ,setlang]=useState(['en'])
    const[SelectValue ,setSelectValue]=useState('en')

    const LangSelect:React.ChangeEventHandler<HTMLSelectElement> = (e:any)=>{
    const Lang=e.target.value;
    setSelectValue(Lang)
    }
    const onAppend=()=>{
        if(!(lang.includes(SelectValue))){
        setlang([...lang, SelectValue])
        setCategory([...category,{lang:SelectValue, name:''}])
        }
    }
    const onDelete=(exp, index)=>{
        if(index > 0 ){
        setlang((e)=>e.filter((f)=>f !== exp))
        setCategory(category.filter((e)=>e.lang!==exp))
        }
    }
/*Name*/
    const handleName:React.ChangeEventHandler<HTMLInputElement> = (e:any)=>{
    const Name=e.target.value;
    const id=e.target.id;
    if(category.find((e)=>e.lang===id)){

        category.find((e)=>e.lang===id).name=Name
        setValue('subcategory', category)
        
    }else{
        setCategory([...category, {lang:id,name:Name}])
        setValue('subcategory', category)
    }
    
   
    
   console.log(getValues())
} 
   

    return (
        <>
            {/* Breadcrumb section */}
            <div>
                <HeadingSelect breadcrumb={breadcrumb} langBread onChange={LangSelect} onAppend={onAppend}/>
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
                             {
                            lang.map((e, index)=>{
                                return (<InputLang key={index} index={index} lang={e} onChange={handleName} onClick={()=>onDelete(e,index)}/>)
                            })
                            }

                        </div>
                        <ToastContainer/>
                        {/* Buttons section */}
                        <div className="divide-y divide-gray-200">
                            <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                                <CustomCancel onClick={()=>push(`/${locale}/panel/admin/event/subcategory`)} />
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}
