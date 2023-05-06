import axios from '@/lib/axios';
import { EventSubcategory } from '@/interfaces/event';

export const getEventsSubcategories = async () => {
    const { data } = await axios.get(`/events/subcategories/`);
    return data;
};

export const createEventSubcategory = async (subcategory: EventSubcategory) => {
    const { data } = await axios.post(`/events/subcategories/`, subcategory);

    return data;
}

export const readEventSubcategory = async (id: string) => {
    const { data } = await axios.get(`/events/subcategories/${id} `);

    return data;
}

export const updateEventSubcategory = async (id: string, subcategory:string) => {
    const { data } = await axios.put(`/events/subcategories/${id}`, subcategory,
    {
       
        headers:{
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    );

    return data;
}

export const deleteEventSubcategory = async (id: string) => {
    const { data } = await axios.delete(`/events/subcategories/${id}`);

    return data;
}