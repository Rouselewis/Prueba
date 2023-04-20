import { User, Role } from '@/interfaces/user';

export interface SignIn {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignUp {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  autorization: {
    token: string;
    token_type: string;
  };
  providerId: string;
  role: Role;
}
