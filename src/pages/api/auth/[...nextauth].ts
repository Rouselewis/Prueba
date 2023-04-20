import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';
import { signIn } from '@/api/auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/helpers/mongoClient';
import jwt from 'jsonwebtoken';

const createUser = (profile) => ({
  id: profile.sub,
  roles: ['USER'],
  firstName: profile.given_name,
  surname: profile.family_name,
  email: profile.email,
  phones: [],
  sex: null,
  birthday: null,
  social_media: null,
  address: null,
  settings: null,
  payment_data: null,
  taxt_data: null,
  avatar: profile.picture,
  verified: 1,
  status: 1,
  created_at: new Date(),
  updated_at: new Date(),
});
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          console.log('credentials', credentials);
          const { email, password } = credentials;
          const authResponse = await signIn({ email, password });
          const user = authResponse.user;
          return {
            id: user._id,
            email: user.email,
            firstName: user.firstname,
            surname: user.surname,
            avatar: user.avatar,
            role: user.role,
            roles: user.roles,
            accessToken: authResponse?.autorization?.token,
          };
        } catch (error) {
          console.log('error', error?.response?.data);
          throw new Error(error?.response?.data?.detail);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      //@ts-ignore
      async profile(profile) {
        return createUser(profile);
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      //@ts-ignore
      async profile(profile) {
        return createUser(profile);
      },
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
      //@ts-ignore
      async profile(profile) {
        return createUser(profile);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) {
        token.id = user.id;
        token.name = `${user.firstName} ${user.surname}`;
        token.email = user.email;
        token.roles = user.roles;
        token.role = user.role || '';
        token.avatar = user.avatar;
      }
      if (profile) {
        token.accessToken = jwt.sign(
          { id: user.id },
          process.env.NEXTAUTH_SECRET as string,
          {
            expiresIn: 60 * 60 * 24 * 30,
          }
        );
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.roles = token.roles;
        session.user.role = token.role;
        session.user.image = token.avatar;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/', // Error code passed in query string as ?error=
  },
});
