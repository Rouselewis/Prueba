import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Organization } from '@ctypes/graphql';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
    role?: string;
    avatar?: string;
    accessToken?: string;
  }
}

declare module 'next-auth' {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    role: string;
    accessToken: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      role: string;
      accessToken: string;
    };
  }
}
interface Account {}
interface Profile {}
