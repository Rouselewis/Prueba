import { useQuery,useQueryClient,useMutation } from '@tanstack/react-query';
import {
  createEventSupplier,
  getEventsSuppliers,
  readEventSupplier,
  updateEventSupplier,
  deleteEventSupplier
  
} from '@/api/event/event_supplier';
import { EventSupplier } from '@/interfaces/event';
import { WithDocs } from '@/interfaces/serializers/commons';

const key = 'event_supplier';

export function useEventSuppliers() {
  
  return useQuery<EventSupplier[]>([key], getEventsSuppliers);
}

export function useEventSupplier(event_supplier_id: string) {
  return useQuery<EventSupplier>([key, event_supplier_id], () =>
    readEventSupplier(event_supplier_id)
  );
}


/*Create supplier*/

export function useCreateEventSupplier() {
  
  const queryClient=useQueryClient();

  const {mutate, isLoading, isError, isSuccess}= useMutation(
     createEventSupplier, {onSuccess: (data, event_supplier) => {
      return queryClient.setQueryData([key], (prevEventSupplier:any) =>{
        return prevEventSupplier?.push(event_supplier)}
      );
    },
  }); 
  return {mutate, isLoading, isError, isSuccess}
}


/*Read supplier*/
export function useReadEventSupplier(category_id: string) {
  return useQuery([key, category_id], () => readEventSupplier(category_id));
}

/*update supplier*/
export  function useUpdateEventSupplier( ) {

  const queryClient=useQueryClient();

  const {mutate, isLoading, isError, isSuccess}= useMutation((values:{id:string,supplier:FormData})=>{
        
         
    return  updateEventSupplier(values.id, values.supplier )},{onSuccess: (data,value)=>{
        return queryClient.setQueryData([key], (prev:any)=>prev?.map((item)=>{
           return item._id===value.id? value.supplier:item
        }))
    }}
)
return {mutate, isLoading, isError, isSuccess};
}


/*delete supplier*/
export function useDeleteEventSupplier( ) {

  const queryClient=useQueryClient();
  

  const {mutate, isLoading, isError, isSuccess}= useMutation(
    deleteEventSupplier,{onSuccess: (data,supplierDel)=>{
    return queryClient.setQueryData([key], (prev:any)=>{
      return prev?.map((dat)=>{
        if(dat._id===supplierDel){
          dat.status = !dat.status
         return dat
        }else{
          return dat
        }
      })
     })
}}
)
return {mutate, isLoading, isError, isSuccess};
  
  
}

