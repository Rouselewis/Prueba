import axios from '@/lib/axios';
import { EventTag } from '@/interfaces/event';

export const getEventsTags = async () => {
    const { data } = await axios.get(`/events/tags/`);
    return data;
};

export const createEventTag = async (tag: EventTag) => {
    const { data } = await axios.post(`/events/tags/`, tag);

    return data;
}

export const readEventTag = async (id: string) => {
    const { data } = await axios.get(`/events/tags/${id}`);

    return data;
}

export const updateEventTag = async (tag: EventTag) => {
    const { data } = await axios.put(`/events/tags/${tag._id}`, tag);

    return data;
}

export const deleteEventTag = async (id: string) => {
    const { data } = await axios.delete(`/events/tags/${id}`);

    return data;
}