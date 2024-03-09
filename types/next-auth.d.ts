import { UserRole } from "@prisma/client"
import NextAuth, { DefaultSession } from "next-auth"

export type ExtendedUser =  DefaultSession["user"] & 
{
  role:UserRole, 
  isTwoFactorEnabled:boolean,
  id:string,
  email:string,
  isOAuth:boolean,
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: 
      /** The user's postal address. */
      ExtendedUser
     }
}