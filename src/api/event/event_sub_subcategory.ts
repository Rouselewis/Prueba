import axios from '@/lib/axios';
import { CreateEventSubsubcategory } from '@/interfaces/event';

export const useSubSubcategories = async () => {
  const { data } = await axios.get(`/events/subsubcategories/`);
  return data;
};

export const createSubSubcategory = async (sub_subcategory: FormData) => {
  const { data } = await axios.post(
    '/events/subsubcategories/',
    sub_subcategory,
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
};

export const readSubSubcategory = async (id: string) => {
  const { data } = await axios.get(`/events/subsubcategories/${id}`);

  return data;
};

export const updateSubSubcategory = async (
  id: string,
  sub_subcategory: FormData
) => {
  const { data } = await axios.put(
    `/events/subsubcategories/${id}`,
    sub_subcategory
  );

  return data;
};

export const deleteSubSubcategory = async (id: string) => {
  const { data } = await axios.delete(`/events/subsubcategories/${id}`);

  return data;
};
