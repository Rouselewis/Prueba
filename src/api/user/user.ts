import axios from '@/lib/axios';
import { User } from '@/interfaces/user';

export const getMe = async () => {
  const { data } = await axios.get(`/users/me`);

  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(`/users/`);

  return data;
};

export const createUser = async (user: User) => {
  const { data } = await axios.post(`/users/`, user);

  return data;
};

export const readUser = async (id: string) => {
  const { data } = await axios.get(`/users/${id}`);

  return data;
};

export const updateUser = async (user: User) => {
  console.log(
    'data enter updateUser from mutation:',
    JSON.stringify(user, null, 2)
  );
  const { data } = await axios.put(`/users/${user.id}`, user);

  return data;
};

export const updateUserWithAvatar = async (data: {
  user: User;
  avatar: File | null;
}) => {
  const formData = new FormData();
  formData.append('user_request', JSON.stringify(data.user));
  if (data.avatar) {
    formData.append('avatar', data.avatar);
  }
  const { data: response } = await axios.put(
    `/users/${data.user.id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response;
};

export const updateUserWithId = async (user: any, id: string) => {
  console.log('updateUser from mutation:', user);
  const { data } = await axios.put(`/users/${id}`, user);

  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await axios.delete(`/users/${id}`);

  return data;
};

export const getUserStripeCustomerId = async (userId: string) => {
  const user = await readUser(userId);

  return user.payment_data.stripe;
};
