import axios from '@/lib/axios';
import { Event, EventNew } from '@/interfaces/event';

export const getEvents = async (pagination) => {
  const { data } = await axios.get(`/events/`, {
    params: pagination,
  });
  return data;
};

export const createEvent = async (event: Event) => {
  const { data } = await axios.post(`/events/`, event);

  return data;
};

export const createNewEvent = async (Event: EventNew) => {
  const { data } = await axios.post('/events/newevent', event);
};

export const readEvent = async (id: number) => {
  const { data } = await axios.get(`/events/${id}`);

  return data;
};

export const updateEvent = async (id: number, event: Event) => {
  const { data } = await axios.put(`/events/${id}`, event);

  return data;
};

export const deleteEvent = async (id: number) => {
  const { data } = await axios.delete(`/events/${id}`);

  return data;
};
