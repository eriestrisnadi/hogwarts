import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;

          if (!validator.isEmail(email as string))
            throw new Error("Email is not valid");

          if (!validator.isStrongPassword(password as string))
            throw new Error(
              "Password must contain at least lowercase, uppercase, number, special characters and minimal length is 8"
            );

          if (email && password) {
            return { status: "success", data: { email } };
          }
          return null;
        } catch (e) {
          // Redirecting to the login page with error messsage in the URL
          throw new Error(e + "&email=" + credentials?.email);
        }
      },
    }),
  ];

  return await NextAuth(req, res, {
    providers,
    pages: {
      signIn: "/",
      error: "/",
    },
  });
}
