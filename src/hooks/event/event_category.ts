import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getEventsCategories,
  createEventCategory,
  readEventCategory,
  updateEventCategory,
  deleteEventCategory,
} from '@/api/event/event_category';
import { WithDocs } from '@/interfaces/serializers/commons';
import { EventCategory ,formInterface} from '@/interfaces/event';

const key = 'event_category';
type form={
    event_category:string;
    picture: File;
}



export function  useCategories() {
  const {data, isLoading}=useQuery([key], ()=>getEventsCategories());
  return {data, isLoading}
}

export function useMutationCreateEventCategory() {
  const queryClient = useQueryClient();

 const {mutate, isLoading, isError, isSuccess}= useMutation((category:FormData)=> createEventCategory(category), {
    onSuccess: (data, event_category) => {
      console.log('dataCreate', data)
      return queryClient.setQueryData([key], (prevEvent:any) =>{
        console.log('prev', prevEvent)
        return prevEvent?.push(data)}
      );
    },
  }); 
  return {mutate, isLoading, isError, isSuccess}
}

      

/*Read category*/
export  function useReadEventCategory(category_id: string) {
  const {data,isLoading,isError}=useQuery([key], ()=> readEventCategory(category_id));
 
  return data
}

/*update category*/
export function useUpdateEventCategory(  ) {

  const queryClient=useQueryClient();
  

  const {mutate, isLoading, isError, isSuccess}= useMutation(async (values:{id:string,category:FormData})=>{
        
         
      return await updateEventCategory(values.id, values.category )},{onSuccess: (data,value)=>{
          queryClient.setQueryData([key], (prev:any)=>prev.map((item)=>{
             return item._id===value.id? value.category:item
          }))
      }}
  )
return {mutate, isLoading, isError, isSuccess};
}
/*delete category*/
export function useDeleteEventCategory( ) {

  const queryClient=useQueryClient();
  

  const {mutate, isLoading, isError, isSuccess}= useMutation((id:string)=>{
        return deleteEventCategory(id)},{onSuccess: (data,categoryDel)=>{
         return queryClient.setQueryData([key], (prev:any)=>{
             prev.map((dat)=>{
              if(dat._id===categoryDel){
               return dat.status=!dat.status
              }else{
                return dat
              }
            })
         return prev
        })
      }}
  )
return {mutate, isLoading, isError, isSuccess};
}


