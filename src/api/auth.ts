import axios from '@/lib/axios';
import { User, Role } from '@/interfaces/user';
import { SignIn, AuthResponse } from '@/interfaces/auth';

type UserLogin = { uid: string; id_token: string };

export const userLogin = async (login: UserLogin) => {
  const { data } = await axios.post<AuthResponse>(`/auths/login/`, login);

  return data;
};

export const userRegister = async (user: User) => {
  const { data } = await axios.post<AuthResponse>(`/auths/register`, user);

  return data;
};

export const signIn = async (args: SignIn): Promise<AuthResponse> => {
  const { data } = await axios.post<AuthResponse>('/auths/signin', args);
  return data;
};
