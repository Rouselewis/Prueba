import axios from 'axios';
import { getSession } from 'next-auth/react';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(async function (config) {
  const session = await getSession();
  const token = session?.user?.accessToken;
  (config.headers as any)['Authorization'] = `Bearer ${token}`;

  return config;
});

export default instance;
