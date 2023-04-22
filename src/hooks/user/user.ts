import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getMe,
  getUsers,
  createUser,
  readUser,
  updateUser,
  deleteUser,
  updateUserWithAvatar,
} from '@/api/user/user';
import { User } from '@/interfaces/user';

const key = 'user';

export function useMe() {
  return useQuery([key], getMe);
}

export function useUsers() {
  return useQuery([key], getUsers);
}

export function useUser(user_id: string) {
  return useQuery([key, user_id], () => readUser(user_id));
}

export function useMutationUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: (data) => {
      console.log('Data returned by updateUser:', data);
      const updatedUser = data;
      queryClient.setQueryData([key], (prevUsers: any) => {
        return prevUsers.map((user: any) => {
          return { ...user, ...updatedUser };
        });
      });
      queryClient.invalidateQueries([key]);
    },
  });
}

export function useUpdateUserWithAvatar() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: { user: User; avatar: File | null }) => updateUserWithAvatar(data),
    {
      onSuccess: (data) => {
        console.log('Data returned by updateUser:', data);
        const updatedUser = data;
        queryClient.setQueryData([key], (prevUsers: any) => {
          return prevUsers.map((user: any) => {
            return { ...user, ...updatedUser };
          });
        });
        queryClient.invalidateQueries([key]);
      },
    }
  );
}

export function useDeleteUser(user_id: string) {
  return useQuery([key, user_id], () => deleteUser(user_id));
}
