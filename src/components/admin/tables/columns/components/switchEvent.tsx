import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
// Helpers
import { classNames } from '@/helpers';
import { ToastContainer, toast } from 'react-toastify';

type Props = {
  color: string;
  id: string;
  category?: string;
  status?: boolean;
  changeStatus:any;
  isSuccess?:boolean;
  isError?:boolean;
};

export const SwitchEvent= ({ color, id, category, status, changeStatus, isSuccess,isError}: Props) => {
  const toastMsj=()=>{
    if( isError ){
          toast.error(' Error, there was no change :(',{
            position:toast.POSITION.TOP_RIGHT,
            data:{
                tittle:'error update',
                text:'This is a error message  ' 
            }
        } ) 
       
    }else{
         toast.success('successfull change :)',{
            position:toast.POSITION.TOP_RIGHT,
            data:{
                tittle:'success update',
                text:'This is a success message '
            }
        } ) 
    
    }
    }

  const changeHandler = () => {
    changeStatus(id)
    toastMsj()
   
  };

  return (
    <>
    <Switch
      checked={status}
      onChange={changeHandler}
      className={`group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:${color} focus:ring-offset-2`}
    >
      <span className="sr-only">Status</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute h-full w-full rounded-md bg-white"
      />
      <span
        aria-hidden="true"
        className={classNames(
          status ? `bg-${color}` : 'bg-gray-300',
          'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
        )}
      />
      <span
        aria-hidden="true"
        className={classNames(
          status ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-300 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
        )}
      />
    </Switch>
    
    <ToastContainer/>
    </>
  );
};
