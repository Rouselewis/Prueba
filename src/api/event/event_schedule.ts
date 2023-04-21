import axios from '@/lib/axios';
import { EventSchedule } from '@/interfaces/event';

export const getEventsSchedules = async (pagination) => {
    const { data } = await axios.get(`/events/schedules/`, {
        params: pagination
    });
    return data;
};

export const createEventSchedule = async (schedule: EventSchedule) => {
    const { data } = await axios.post(`/events/schedules/`, schedule);

    return data;
}

export const readEventSchedule = async (id: string) => {
    const { data } = await axios.get(`/events/schedules/${id}`);

    return data;
}

export const updateEventSchedule = async (id: string, schedule: EventSchedule) => {
    const { data } = await axios.put(`/events/schedules/${id}`, schedule);

    return data;
}

export const deleteEventSchedule = async (id: string) => {
    const { data } = await axios.delete(`/events/schedules/${id}`);

    return data;
}