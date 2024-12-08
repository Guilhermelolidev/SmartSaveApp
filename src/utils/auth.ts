import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './db';

export const { handlers, signIn } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      authorize: async credentials => {
        const { email, password } = credentials;

        let user = null;

        user = await db.user.findUnique({
          where: {
            email: email as string,
          },
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
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.sub as string;
      return session;
    },
  },
});
