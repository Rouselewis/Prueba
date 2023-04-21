import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Organization } from '@ctypes/graphql';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
    roles: string[];
    role?: string;
    avatar?: string;
    accessToken?: string;
  }
}

declare module 'next-auth' {
  interface User {
    id: string;
    firstName: string;
    surname: string;
    email: string;
    avatar?: string;
    roles: string[];
    role: string;
    accessToken: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      roles: string[];
      role: string;
      accessToken: string;
    };
  }
}
interface Account {}
interface Profile {}
