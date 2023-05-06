/** @format */
import { useEffect, useState } from 'react';
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { HeadingSelect } from '@/components/headers/admin/headingSelect';
// Forms
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomCancel, CustomSubmit } from '@/components/forms';
import { InputLang } from '@/components/forms/lang';
import {  interfaceEventVenueCategory } from '@/interfaces/event';
import { useCreateEventVenueCategory} from '@/hooks/event/event_venue_category';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

const EventCreateVenueCategory = () => {
    const t = useTranslations("Panel_SideBar");

    const breadcrumb = [
        { page: t('admin.admin'), href: '/panel/admin' },
        { page: t('admin.event.event'), href: '/panel/admin/event/venue' },
        { page: t('admin.event.venue'), href: '/panel/admin/event/venue' },
        { page: t('admin.event.category'), href: '/panel/admin/event/venue/category' },
        { page: t('actions.create'), href: '' }
    ]
    const {mutate,isLoading,isError,isSuccess}=useCreateEventVenueCategory()
    const{push,locale}=useRouter()
    useEffect(()=>{
        if (isSuccess){
            toast.success('Event venue category updated :)',{
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

    const { register, handleSubmit,setValue, formState: { errors }, reset, getValues } = useForm< interfaceEventVenueCategory>();
    
   


    const onSubmit:SubmitHandler< interfaceEventVenueCategory>= (data: interfaceEventVenueCategory)=>{
      const DataForm = new FormData  
      DataForm.append('category',JSON.stringify(data))
    
      mutate(DataForm )
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
        setValue('category', category)
        
    }else{
        setCategory([...category, {lang:id,name:Name}])
        setValue('category', category)
    }
    
   
    
   
} 
console.log(getValues())
    return (
        <>
            {/* Breadcrumb section */}
            <div>
                <HeadingSelect breadcrumb={breadcrumb} langBread onChange={LangSelect} onAppend={onAppend}/>
            </div>
            <div className="flex flex-1 pt-6">
                <div className="w-screen min-h-0 overflow-hidden">
                    <form className="divide-y divide-gray-200 lg:col-span-9"  onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div className="py-6 grid grid-cols-12 gap-6">
                            {
                            lang.map((e, index)=>{
                                return (<InputLang key={index} index={index} lang={e} onChange={handleName} onClick={()=>onDelete(e,index)}/>)
                            })
                            }

                        </div>
                        <ToastContainer/>
                        <div className="divide-y divide-gray-200">
                            <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                                <CustomCancel onClick={()=>push(`/${locale}/panel/admin/event`)} />
                                <CustomSubmit />
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}
