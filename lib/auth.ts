import { PrismaAdapter } from '@auth/prisma-adapter';
import db from '@/lib/db';
import { Adapter } from 'next-auth/adapters';
import getServerSession from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
export const authOptions = {
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    error: '/sign-in',
    signIn: '/sign-in',
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID,
      clientSecret: process.env.APPLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text', placeholder: 'Username' },
        email: { label: 'email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error('Please enter email and password.');
        }
        const user = await db.user.findUnique({
          where: { email },
        });
        if (!user || !user?.hashedPassword) {
          throw new Error('User not found,please enter valid email');
        }
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          throw new Error('Incorrect Password');
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        console.log(token, '--------token------');

        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.picture,
          username: token.username,
        };
      }
      const user = await db.user.findUnique({
        where: {
          id: token.id,
        },
      });
      if (user) {
        session.user.image = user.image;
        session.user.name = user.name?.toLowerCase();
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (!dbUser) {
        token.id = user.id;
        return token;
      }
      return {
        id: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};

export const getAuthSession = async () => {
  return await getServerSession(authOptions);
};
