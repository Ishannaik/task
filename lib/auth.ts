import { NextAuthOptions, Session, User, getServerSession as getNextAuthServerSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"

import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!user) {
          return null
        }
        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          return null
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  callbacks: {
    session: ({ token, session }: { token: JWT; session: Session }) => {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
      }
      return session
    },
    jwt: ({ token, user }: { token: JWT; user?: User }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const getServerSession = () => getNextAuthServerSession(authOptions)

