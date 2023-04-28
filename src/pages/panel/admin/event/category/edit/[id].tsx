/** @format */
import React, { useState,  useCallback} from 'react';
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { SketchPicker } from 'react-color'
// Helpers
import { FormStyles } from "@/helpers";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomCancel, CustomLabel, CustomSubmit } from '@/components/forms';
import {InputLang } from '@/components/forms/lang';
import { EventCategory } from '@/interfaces/event';
//icon
import {ArrowPathIcon} from '@heroicons/react/24/outline';
/*Hooks */
import {useUpdateEventCategory, useReadEventCategory} from '@/hooks/event/event_category';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useRouter } from 'next/router';

type formInterface={
event_category:EventCategory;
picture:File;
}

const EventCreateCategory = () => {
    const t = useTranslations("Panel_SideBar");
    const tf = useTranslations("Common_Forms");
    const tp = useTranslations('Panel_Profile_Request');
    const tc = useTranslations("Common_Forms");

    const{query,push}=useRouter()
    const{dataQuery}=useReadEventCategory(`${query.id}`)
    console.log(dataQuery)

    
    const { register, handleSubmit,setValue, formState: { errors }, reset,getValues } = useForm<formInterface >();

    //drop file
    const [upload, setUpload ]=useState('');
    const[url,setUrl]=useState('')
   

    const onDrop=useCallback((acceptedFile)=>{
    const file= acceptedFile[0]
        setUpload(file.name)
        setValue('picture', file)
        setValue('event_category.picture', file.name)
        const link= URL.createObjectURL(file)
        setUrl(link)
      
    },[]) 
    
    const {getRootProps,getInputProps,isDragActive, acceptedFiles}=useDropzone({onDrop})
   

//input file config
    
    const handleSelectFile=(e)=>{
            const file=e.target.files[0]
            setUpload(file.name)
            setValue('picture', file)
            setValue('event_category.picture', file.name)
            const link= URL.createObjectURL(file)
            setUrl(link)
    }
    


    const breadcrumb = [
        { page: t('admin.admin'), href: '/panel/admin' },
        { page: t('admin.event.event'), href: '/panel/admin/event/category' },
        { page: t('admin.event.category'), href: '/panel/admin/event/category' },
        { page: t('actions.edit'), href: '' }
    ];
    const {mutate, isLoading, isError, isSuccess}= useUpdateEventCategory()

    


/*input color config*/
    const [initColor, setInitColor]=useState<string>('#ffffff');
    const  onChangeColor=(color:any)=>{ 
        setInitColor(color.hex)
        setValue('event_category.color', initColor )
    }

/*submit form*/ 
    const onSubmit:SubmitHandler<formInterface >= (data:formInterface )=>{
    const dataUpdate={id:`${query.id}`,category: data }
    
      mutate(dataUpdate)
    };
   
    
    
    const[category,setCategory]=useState( [{lang:'es', name:''},{lang:'en', name:''}])

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
    setValue('event_category.category', category)
}


    return (
        <>
            {/* Breadcrumb section */}
            <div>
                <Heading breadcrumb={breadcrumb} langBread onChange={LangSelect}/>
            </div>
            <div className="flex flex-1 pt-6">
                <div className="w-screen min-h-0 overflow-hidden">
                    <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div className="py-6 grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6">
                                <CustomLabel field="icon-upload" name={tc('field_icon')} required />
                                <div {...getRootProps()} className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        {upload===''?<svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>:
                                        <Image src={url} alt='Event image' className="mx-auto" width={70} height={60}></Image>}
                                        <div className="flex text-sm text-gray-600 justify-center">
                                            <label
                                                htmlFor="picture"
                                                className="relative cursor-pointer relative z-10 rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                             { upload===''?  <span  >{tc('field_upload_file')}</span>:<span className='flex flex-row gap-2'>{ upload}<ArrowPathIcon width='1.5rem' height='1.5rem'/></span>}
                                             <input  {...getInputProps()}  id="picture" type="file" onChange={handleSelectFile} className='opacity-0 absolute' accept="image/jpeg, image/png, .gif" size={10000000}/>
                                            
                                            </label>
                                            
                                            { upload===''? <p className="pl-1">{tp('text_drag_n_drop')}</p>: null}
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF {tp('text_up_to')} 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6">
                                <CustomLabel field="front_id" name={tc('field_color')} required />
                                <SketchPicker 
                                onChange={onChangeColor}
                                color={initColor}
                                />
                            </div>
                            
                            
                            <InputLang lang={lang} onChange={handleName}/>
                        </div>

                        {/* Buttons section */}
                        <div className="divide-y divide-gray-200">
                            <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                                <CustomCancel />
                                <CustomSubmit onClick={()=>isSuccess?push('/en/panel/admin/event/subcategory'):console.log('no Actualizado')}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

EventCreateCategory.Layout = AdminLayout;
export default EventCreateCategory;
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
