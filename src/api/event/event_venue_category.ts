import axios from '@/lib/axios';
import { interfaceEventVenueCategory } from '@/interfaces/event';

export const getEventsVenuesCategories = async () => {
    const { data } = await axios.get(`/events/venues/categories/`);
    return data;
};

export const createEventVenueCategory = async (venue_category: FormData) => {
    const { data } = await axios.post(`/events/venues/categories/`, venue_category);

    return data;
}

export const readEventVenueCategory = async (id: string) => {
    const { data } = await axios.get(`/events/venues/categories/${id}`);

    return data;
}

export const updateEventVenueCategory = async (id: string, venue_category:FormData) => {
    const { data } = await axios.put(`/events/venues/categories/${id}`, venue_category);

    return data;
}

export const deleteEventVenueCategory = async (id: string) => {
    const { data } = await axios.delete(`/events/venues/categories/${id}`);

    return data;
}