import { useTranslations } from 'next-intl';
// Components
import { CustomLabel } from '@/components/forms';
// Helpers
import { FormStyles } from '@/helpers';
// ICons
import { XMarkIcon} from '@heroicons/react/24/solid';
import { EventCategory } from '@/interfaces/event';

import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import { useState } from 'react';

export const EventInputLang = ({
  lang,
  onChange,
  onClick,
  index,
  category,
  onlyChange,
  arrayLang,
  selectBoolean
}: {
  lang?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?:React.MouseEventHandler;
  index?:number;
  category?:any;
  onlyChange?:React.ChangeEventHandler<HTMLSelectElement>;
  arrayLang?:any;
  selectBoolean?:boolean
}) => {
  const t = useTranslations('Common_Forms');
  const[Lang,setLang]=useState('')
  const setValue=(e)=>{
  if(Lang!==lang){
  e.target.value=''}
  setLang(lang)
  }

  return (
    <div  className="col-span-12 sm:col-span-6 lg:col-span-3">
      <div className="h-fit gap-x-16 gap-y-10 border-2">
        <div className="inputCoverAd relative space-y-1 px-5 pt-10 pb-10">
          <CustomLabel field="name" name={t('field_name')} />
          <input
            onChange={onChange}
            onClick={setValue}
            type="text"
            defaultValue={category?.find((e)=>e.lang===lang)?.name}
            id={lang}
            autoComplete={t('field_name')}
            placeholder={t('field_name')}
            className={FormStyles('input')}
          />
          <div className="absolute -top-5 w-fit bg-white px-2 py-1 text-xl font-black uppercase text-customShadow">
            {lang}
          </div>
          {selectBoolean?
          <select id={lang} onChange={onlyChange} defaultValue={lang} className="absolute right-[25%] -top-5 text-gray-500 rounded-md">
           { arrayLang?.map((e,l)=><option key={l}>{e}</option>)}
          </select>
          :null}
          {index > 0? < XMarkIcon
            onClick={onClick}
            name="delete"
            width='1.5rem'
            height='1.5rem'
            className="absolute right-[5%] top-[8%] text-gray-500 hover:text-red-400"
          />:null}
          
        </div>
      </div>
    </div>
  );
};
