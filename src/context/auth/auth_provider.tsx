import { useQueryClient } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';
import { useMutationLogin } from '@/hooks/auth';

type Status = 'authenticated' | 'no-authenticated' | 'checking';

export const AuthContext = createContext(
  {} as {
    change_status: (status: Status) => void;
    statusAuth: Status;
    login: (id_token: string, uid: string, providerId: string) => Promise<void>;
  }
);

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [statusAuth, setStatusAuth] = useState<Status>('checking');

  const queryClient = useQueryClient();

  const { mutateAsync, data } = useMutationLogin();

  const change_status = (status: Status) => setStatusAuth(status);

  const logout = () => {
    queryClient.setQueryData(['user'], () => null);
    localStorage.clear();
    setStatusAuth('no-authenticated');
  };

  const login = async (id_token: string, uid: string, providerId: string) => {
    setStatusAuth('checking');
    try {
      await mutateAsync(
        { id_token, uid },
        {
          onSuccess: (login) => {
            localStorage.setItem('token', login.autorization.token);
            queryClient.setQueryData(['user'], () => {
              return [{ ...login, providerId }];
            });
            setStatusAuth('authenticated');
          },
          onError: () => logout(),
        }
      );
    } catch (error) {
      logout();
      console.log((error as Error).message);
    }
  };

  useEffect(() => {
    if (!data?.user) {
      //
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        change_status,
        statusAuth,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
