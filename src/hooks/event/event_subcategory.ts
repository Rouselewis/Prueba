import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { 
    getEventsSubcategories,
    createEventSubcategory,
    readEventSubcategory,
    updateEventSubcategory,
    deleteEventSubcategory} from '@/api/event/event_subcategory'
import { EventSubcategory } from '@/interfaces/event';
import { useState } from 'react';

const key = "event_subcategory";

export function useSubCategories() {
    const{data,isLoading,isError}=useQuery([key], getEventsSubcategories)

   
    return {isError,isLoading,data}
 
}
/*Create subcategory*/

export function useCreateEventSubcategory() {
  
  const queryClient=useQueryClient();
    
  
  const {mutate, isLoading, isError, isSuccess}= useMutation(
    createEventSubcategory, {onSuccess: (data, event_SubCategory) => {
     return queryClient.setQueryData([key], (prevEventSubCategory:any) =>{
       return prevEventSubCategory?.push(event_SubCategory)}
     );
   },
 }); 
 return {mutate, isLoading, isError, isSuccess}
}
/*Read subcategory*/
export function useReadEventSubcategory(category_id: string) {
  return useQuery([key, category_id], () => readEventSubcategory(category_id));
}

/*update subcategory*/
export function useUpdateEventSubCategory(  ) {

  const queryClient=useQueryClient();
  

  const {mutate, isLoading, isError, isSuccess}= useMutation((values:{updateSubCategory_id: string, eventSubCategory:FormData})=>{
        
         
      return updateEventSubcategory(values.updateSubCategory_id,values.eventSubCategory )},{onSuccess: (data,value)=>{
          return queryClient.setQueryData([key], (prev:any)=>{ const newArray = prev?.map((item)=>{
             if( item._id===value.updateSubCategory_id){
                 return  data
             }else{
                  return item
              }
          })
          return newArray
          })
      }}
  )
return {mutate, isLoading, isError, isSuccess};

}

export function useDeleteEventSubCategory( ) {

  const queryClient=useQueryClient();
  

  const {mutate, isLoading, isError, isSuccess}= useMutation((id:string)=>{
        return deleteEventSubcategory(id)},{onSuccess: (data,categoryDel)=>{
        return queryClient.setQueryData([key], (prev:any)=>{
            prev?.map((dat)=>{
              if(dat._id===categoryDel){
               return dat.status=!dat.status
              }else{
                return dat
              }
            })
          return prev})
      }}
  )
return {mutate, isLoading, isError, isSuccess};
}


/*
//delete subcategory(no cambio de estado)
export function useDeleteEventSubCategory( ) {
  const queryClient=useQueryClient();
  const {mutate, isLoading, isError, isSuccess}= useMutation(
    deleteEventSubcategory,{onSuccess: (data,supplierDel)=>{
    queryClient.setQueryData([key], (prev:any)=>prev.filter((dat:any)=>dat._id !== supplierDel))
}}
)
return {mutate, isLoading, isError, isSuccess};
}
*/