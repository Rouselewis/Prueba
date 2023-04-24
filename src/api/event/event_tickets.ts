import axios from '@/lib/axios';

export const getTickets = async (pagination) => {
  const { data } = await axios.get(`/events/ticketed-events/`, {
    params: pagination,
  });
  return data;
};
