/** @format */
import React, { useState, useRef,useEffect, useCallback} from 'react';
import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { SketchPicker } from 'react-color';
import axios from '@/lib/axios';
// Helpers
import { FormStyles } from "@/helpers";
// Layout and Header
import AdminLayout from "@/components/layout/admin";
import { HeadingSelect } from '@/components/headers/admin/headingSelect';
// Forms
import { useForm, SubmitHandler } from "react-hook-form";
import { TrashIcon } from "@heroicons/react/24/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CustomCancel, CustomLabel, CustomSubmit } from '@/components/forms';
import {EventInputLang} from '@/components/forms/lang';
import { EventCategory } from '@/interfaces/event';
//icon
import {ArrowPathIcon} from '@heroicons/react/24/outline';
/*Hooks */
import {useUpdateEventCategory, useReadEventCategory} from '@/hooks/event/event_category';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import { ImageURL } from '@/helpers/imageURL';
import { useRouter } from 'next/router';


const EventCreateCategory = ({dataInit}) => {
    const{query, push,locale, locales}=useRouter()
    console.log(dataInit)
    const t = useTranslations("Panel_SideBar");
    const tf = useTranslations("Common_Forms");
    const tp = useTranslations('Panel_Profile_Request');
    const tc = useTranslations("Common_Forms");
    

const { register, handleSubmit,setValue, formState: { errors }, reset,getValues } = useForm({defaultValues:dataInit});
const {mutate, isLoading, isError, isSuccess}= useUpdateEventCategory()
console.log('afuera',isSuccess)


    

    //drop file
    const [upload, setUpload ]=useState('');
    const[url,setUrl]=useState('')
    const [fileUpload,SetFileUpload]=useState()
   

    const onDrop=useCallback((acceptedFile)=>{
    const file= acceptedFile[0]
        setUpload(file.name)
        SetFileUpload(file)
        setValue('picture',file.name)
        const link= URL.createObjectURL(file)
        setUrl(link)
      
    },[]) 
    
    const {getRootProps,getInputProps,isDragActive, acceptedFiles}=useDropzone({onDrop})
   

//input file config
    
    const handleSelectFile=(e)=>{
            const file=e.target.files[0]
            setUpload(file.name)
            SetFileUpload(file)
            setValue('picture', file.name)
            const link= URL.createObjectURL(file)
            setUrl(link)
    }
    


    const breadcrumb = [
        { page: t('admin.admin'), href: '/panel/admin' },
        { page: t('admin.event.event'), href: '/panel/admin/event/category' },
        { page: t('admin.event.category'), href: '/panel/admin/event/category' },
        { page: t('actions.update'), href: '' }
    ];
    

    


/*input color config*/
    const [initColor, setInitColor]=useState<string>(dataInit.color);
    const  onChangeColor=(color:any)=>{ 
        setInitColor(color.hex)
        setValue('color', initColor )
    }
useEffect(()=>{
if (isSuccess){
    toast.success('Event category Updated:)',{
            position:toast.POSITION.TOP_RIGHT,
            data:{
                tittle:'success Updated',
                text:'This is a success message '
            }
         
    } )
    push(`/${locale}/panel/admin/event/category`)   
}else if(isError){
    toast.error(' Error, No updated:(',{
            position:toast.POSITION.TOP_RIGHT,
            data:{
                tittle:'error Updated',
                text:'This is a error message  ' 
            }
        } )
}

},[isSuccess,isError])

        
 
       
     
    

/*submit form*/ 
    const onSubmit:SubmitHandler<EventCategory>= (data:EventCategory)=>{
        const form=new FormData
        form.append("event_category",JSON.stringify(data))
        if(fileUpload){
            form.append("picture",fileUpload)
        }
        
        try {
            mutate({id:`${query.id}`,category:form})
        } catch (error) {
            console.log(error)
        }
      
    };
   
    
    
    const[category,setCategory]=useState( dataInit.category)

/*Lang*/
    const[lang ,setlang]=useState(dataInit.category.map((e)=>e.lang))
    const[langRest ,setlangRest]=useState(locales)
    const[SelectValue ,setSelectValue]=useState('en')

    const LangSelect:React.ChangeEventHandler<HTMLSelectElement> = (e:any)=>{
    const Lang=e.target.value;
    setSelectValue(Lang)
    }
    const onAppend=()=>{
        if(!(lang.includes(SelectValue))){
        setlang([...lang, SelectValue])
        setlangRest(langRest.filter((e)=>e!==SelectValue))
        setCategory([...category,{lang:SelectValue, name:''}])
        }
    }
    const onDelete=(exp, index)=>{
        if(index > 0 ){
        setlang((e)=>e.filter((f)=>f !== exp))
        setlangRest([...langRest,exp])
        setCategory(category.filter((e)=>e.lang!==exp))
        reset({category:category.filter((e)=>e.lang!==exp)})
        }
    }
    const changeIndSelect=(e,index:number)=>{
        const lastArray=lang.slice();
        lastArray[index]=e.target.value;
        setlang(lastArray)
        const arr= category.slice()
        arr[index].name=''
        setCategory(arr)
        reset({category:arr})
       
    }
/*Name*/
    const handleName = (e:any,index)=>{
    const Name=e.target.value;
    const id=e.target.id;
    if(lang.includes(id)){
        const lastCate=category.slice();
        lastCate[index].lang=id
        lastCate[index].name=Name
        setCategory(lastCate)
    }
   setValue('category', category)
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
                            <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-6">
                                <CustomLabel field="icon-upload" name={tc('field_icon')} required />
                                <div {...getRootProps()} className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        {upload===''?<Image src={ImageURL(dataInit.picture)} alt='Event image' className="mx-auto" width={70} height={60}></Image>
                                            :
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
                            
                            {
                            lang.map((e, index)=>{
                                return (<EventInputLang
                                    key={index}
                                    index={index} 
                                    lang={e} 
                                    onChange={(e)=>handleName(e,index)} 
                                    onClick={()=>onDelete(e,index)} 
                                    category={dataInit.category}
                                    arrayLang={langRest}
                                    selectBoolean={locales.length>lang.length}
                                    onlyChange={(e)=>changeIndSelect(e,index)}
                                    />)
                            })
                            }
                        </div>
                        <ToastContainer/>
                        {/* Buttons section */}
                        <div className="divide-y divide-gray-200">
                            <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                                <CustomCancel onClick={()=>push(`/${locale}/panel/admin/event/category`)}/>
                                <CustomSubmit />
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

export async function getStaticProps({ locale,params }: GetStaticPropsContext) {

    const { data } = await axios.get(`/events/categories/${params.id}`);
    delete data.created_at
    delete data.status
    delete data.updated_at
    delete data._id
    return {
        props: {
            messages: (await import(`@/messages/${locale}.json`)).default,
            dataInit:data,
        },
    };
}
