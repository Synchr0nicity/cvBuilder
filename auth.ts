import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },

  providers: [
    Google,
    LinkedIn,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const email = String(credentials?.email ?? "")
          .toLowerCase()
          .trim();
        const password = String(credentials?.password ?? "");

        console.log("LOGIN EMAIL:", email);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        console.log("USER FOUND:", !!user);
        console.log("HAS HASH:", !!user?.passwordHash);

        if (!user?.passwordHash) return null;

        const validPassword = await bcrypt.compare(password, user.passwordHash);

        console.log("PASSWORD VALID:", validPassword);

        if (!validPassword) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },
});
