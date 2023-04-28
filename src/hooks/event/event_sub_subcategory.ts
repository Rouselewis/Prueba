
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSubSubcategories,
  createSubSubcategory,
  readSubSubcategory,
  updateSubSubcategory,
  deleteSubSubcategory } from '@/api/event/event_sub_subcategory';
import { useState } from 'react';

const key = "event_sub_subcategory";

export function useSubsubCategories() {
  const{data,isLoading,isError}=useQuery([key], useSubSubcategories)
  return{isError,isLoading,data}
}
//Create sub_subcategory

export function useCreateEventSubSubcategory() {
  
  const queryClient=useQueryClient();
    
  
  const {mutate, isLoading, isError, isSuccess}= useMutation(
    async (data:any)=> await createSubSubcategory(data),{onSuccess:(data, event_category) => {
      
      return queryClient.setQueryData([key], (prevEvent:any) =>{
        console.log('prev', prevEvent)
        return prevEvent.push(data)}
      );
    },
  })
  return {mutate, isLoading, isError, isSuccess};
}


//Read sub_subcategory
export function useReadEventSubSubcategory(category_id: string) {
  return useQuery([key, category_id], () => readSubSubcategory(category_id));
}

//update sub_subcategory
export  function useUpdateEventCategory(  ) {

  const queryClient=useQueryClient();
  

  const {mutate, isLoading, isError, isSuccess}= useMutation((value:{updateCategory_id: string, eventSubSubCategory:FormData})=>{
    return updateSubSubcategory(value.updateCategory_id, value.eventSubSubCategory)},{onSuccess: (data)=>{
          queryClient.setQueryData([key], (prevEvent:any) =>{
            console.log('prev', prevEvent)
            return prevEvent.push(data)}
            )}}
  )
return {mutate, isLoading, isError, isSuccess};
}
//delete sub_subcategory
export  function useDeleteEventSubSubCategory( ) {
  const queryClient=useQueryClient();
  

  const {mutate, isLoading, isError, isSuccess}= useMutation((id:string)=>{
        return deleteSubSubcategory(id)},{onSuccess: (data,categoryDel)=>{
          queryClient.setQueryData([key], (prev:any)=>{
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

