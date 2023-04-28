import axios from '@/lib/axios';
import { EventCategory,formInterface } from '@/interfaces/event';
import  multer from 'multer'

export const getEventsCategories = async () => {
    const { data } = await axios.get(`/events/categories/`);
    return data;
};

export const createEventCategory = async (category:formInterface) => {
    
    const { data } = await axios.post(`/events/categories/`,category, {
       
        headers:{
            'Content-Type':'multipart/form-data',
            'accept': 'application/json'},
        
    } );

    return data;
}

export const readEventCategory = async (id: string) => {
    const { data } = await axios.get(`/events/categories/${id}`);

    return data;
}

export const updateEventCategory = async (id: string, category: formInterface) => {
    const { data } = await axios.put(`/events/categories/${id}`, category);

    return data;
}

export const deleteEventCategory = async (id: string) => {

    try {
        
    const { data } = await axios.delete(`/events/categories/${id}` );
    console.log(data)
    return data

    } catch (error) {
    return error;
    }
  
    
}