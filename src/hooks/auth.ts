import { signUp } from '@/api/auth';
import { SignUp } from '@/interfaces/auth';
import { useMutation } from '@tanstack/react-query';

export function useSignUp() {
  return useMutation(signUp);
}
