import { User } from '@/models/User';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      authorize: async credentials => {
        const { email, password } = credentials;
        const user = await User.findOne({
          email: email as string,
        });

        if (!user) {
          throw new Error('Invalid credentials.');
        }

        const passwordsMatch = await compare(password as string, user.password);

        if (!passwordsMatch) {
          throw new Error('Invalid credentials.');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.sub as string;
      return session;
    },
  },
});
