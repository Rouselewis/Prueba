/** @format */
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useState } from 'react';
import { GetStaticPropsContext } from "next";
import { useTranslations, useLocale} from "next-intl";
import { SketchPicker } from 'react-color'
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomCancel, CustomLabel, CustomSubmit } from '@/components/forms';
import { FormStyles } from '@/helpers';
import { InputLang } from '@/components/forms/lang';
import {useSubCategories} from '@/hooks/event/event_subcategory';
import { useCategories} from '@/hooks/event/event_category';
import { useCreateEventSubSubcategory} from '@/hooks/event/event_sub_subcategory';
import { EventSubsubcategory} from '@/interfaces/event';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import {ImageURL} from '@/helpers/imageURL';
import {toast, ToastContainer}from 'react-toastify';


const EventCreateSubsubcategory = () => {
    const t = useTranslations("Panel_SideBar");
    const tp = useTranslations('Panel_Profile_Request');
    const tc = useTranslations("Common_Forms");

    const breadcrumb = [
        { page: t('admin.admin'), href: '/panel/admin' },
        { page: t('admin.event.event'), href: '/panel/admin/event/category' },
        { page: t('admin.event.subsubcategory'), href: '/panel/admin/event/subsubcategory' },
        { page: t('actions.create'), href: '' }
    ]
    const { register, handleSubmit,setValue, formState: { errors }, reset, getValues } = useForm<EventSubsubcategory>();
    const{ mutate,isSuccess}=useCreateEventSubSubcategory()

    const toastMsj=()=>{
    if(true){
           
        toast.success('Event sub-sub-Category updated :)',{
            position:toast.POSITION.TOP_RIGHT,
            data:{
                tittle:'success update',
                text:'This is a success message '
            }
        } ) 
    }else{
        toast.error(' Error, NO updated :(',{
            position:toast.POSITION.TOP_RIGHT,
            data:{
                tittle:'error update',
                text:'This is a error message  ' 
            }
        } )
    
    }
    }
    const locale = useLocale();
    
      //drop file
      const [upload, setUpload ]=useState('');
      
      const [imageUpload, setImageUpload ]=useState<File>();
      const[url,setUrl]=useState('');
     
  
      const onDrop=useCallback((acceptedFile)=>{
      const file= acceptedFile[0]
          setUpload(file.name)
          setImageUpload(file)
          setValue('picture', ImageURL(file.name))
          const link= URL.createObjectURL(file)
          setUrl(link)
        
      },[]) 
      
      const {getRootProps,getInputProps,isDragActive, acceptedFiles}=useDropzone({onDrop})
     
  
  //input file config
      
      const handleSelectFile=(e)=>{
              const file=e.target.files[0]
              setUpload(file.name)
             setImageUpload(file)
              setValue('picture', ImageURL(file.name))
              const link= URL.createObjectURL(file)
              setUrl(link)
      }
      

//data subcategory
    const { isError,isLoading, data}=useSubCategories();
    let dataSub=[]
    if(isLoading){
        null
    }else{
    data?.map((item) => {
        let dataIn = {
            id: item.category_id,
            category: item.subcategory?.find((obj) => obj.lang == locale)?.name,
            subId:item._id
        }
        dataSub.push(dataIn)  
    })
    }
//data category
    const category=useCategories();
    let dataTableE=[]
    if(category.isLoading){
        null
    }else{
    category.data?.map((item) => {
        
        let dataIn = {
            id: item._id,
            category: item.category?.find((obj) => obj.lang == locale)?.name,
            status: item.status
        }
        dataTableE.push(dataIn)  
    })
    }
//subCategory 
    const [dataSubcategory, setDataSubcategory]=useState([])
   
    
    const handleSelected=(e)=>{
          const id= dataTableE.find((pre)=> pre.category===e.target.value)?.id
          
        const subcategorySelect= dataSub.filter((item)=>{
            console.log(id)
          if(item.id.id===id){
            
            return item
            }
          
        })
        setDataSubcategory(subcategorySelect)
    }

    const SubCatSelect=(e)=>{
        const subcategorySelect= dataSubcategory.filter((item)=>{
            if(item.category===e.target.value){
              return item
            } 
        
        })
        const subcategorySelectId= dataSub.filter((item)=>{
            if(item.id===subcategorySelect[0]?.id){
              return item
            } 
            
        })
        setValue('category_id',subcategorySelectId[0]?.id)
        const subcategory_id={
            _id: subcategorySelect[0].subId,
            category_id: subcategorySelectId[0]?.id
        }
        setValue('subcategory_id',subcategory_id)
        

    }
    

    const onSubmit:SubmitHandler<EventSubsubcategory>= (data:EventSubsubcategory)=>{
        const dataForm= new FormData
        dataForm.append('event_sub_subcategory',JSON.stringify(data))
        
        dataForm.append('picture' , imageUpload )
      
      mutate(dataForm)
    };

    return (
        <>
            {/* Breadcrumb section */}
            <div>
                <Heading breadcrumb={breadcrumb} />
            </div>
            <div className="flex flex-1 pt-6">
                <div className="w-screen min-h-0 overflow-hidden">
                    <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={handleSubmit(onSubmit)} method="POST">
                        <div className="py-6 grid grid-cols-12 gap-6">
                            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                                <CustomLabel field="category" name={tc('field_category')} required />
                                <select
                                    id="category"
                                    name="category"
                                    onChange={handleSelected}
                                    className={FormStyles('select')}
                                    defaultValue={''}
                                >
                                    <option value=''>{tc('field_select_category')}</option>
                                    {dataTableE.map((item, i)=>{
                                      return (<option key={i}> {item.category}</option>) })}
                                </select>
                            </div>
                            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                                <CustomLabel field="subcategory" name={tc('field_subcategory')} required />
                                <select
                                    id="subcategory"
                                    name="subcategory"
                                    onChange={SubCatSelect}
                                    className={FormStyles('select')}
                                    defaultValue={''}
                                >
                                    <option value=''>{tc('field_select_subcategory')}</option>
                                    {dataSubcategory.length>=1?
                                    dataSubcategory.map((item,i)=> <option key={i}> {item.category}</option>)
                                    :<option> Sub-categoria no asignada</option> }
                                </select>
                            </div>
                            <div className="col-span-12 sm:col-span-6 lg:col-span-6">
                                <CustomLabel field="icon-upload" name={tc('field_icon')} required />
                                <div {...getRootProps() }className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                                        
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                               
                                                { upload===''?  <span  >{tc('field_upload_file')}</span>:<span className='flex flex-row gap-2'>{ upload}<ArrowPathIcon width='1.5rem' height='1.5rem'/></span>}
                                             
                                               </label> 
                                               <input  {...getInputProps()} onChange={handleSelectFile} id="icon-upload" name="icon-upload" type="file" className="sr-only" />
                                            
                                            <p className="pl-1">{tp('text_drag_n_drop')}</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF {tp('text_up_to')} 10MB</p>
                                    </div>
                                </div>
                            </div>
                            

                            <div className="col-span-12 sm:col-span-4">
                                <CustomLabel field='name' name={tc('field_name')} />
                                <input
                                    type="text"
                                    {...register('sub_subcategory')}
                                    id="name"
                                    autoComplete={tc('field_name')}
                                    placeholder={tc('field_name')}
                                    className={FormStyles('input')}
                                />
                            </div>
                        </div>
                        <ToastContainer/>
                        <div className="divide-y divide-gray-200">
                            <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                                <CustomCancel />
                                <CustomSubmit onClick={toastMsj}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

EventCreateSubsubcategory.Layout = AdminLayout;
export default EventCreateSubsubcategory;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
        },
    };
}
