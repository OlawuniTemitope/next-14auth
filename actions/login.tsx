"use server"

import * as z from "zod"
import {signIn} from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from "@/route"
import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"
import { generateTwoFactorsToken, generateVerificationToken } from "@/lib/token"
import { SendVerificationEail, sendTwoFactorTokenEmail } from "@/lib/mail"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { db } from "@/lib/db"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { LoginSchema } from "@/schema"


export const login = async (values: z.infer<typeof LoginSchema>,callbackUrl?:string) =>
 {
  const validateField=LoginSchema.safeParse(values)
  if(!validateField.success){
     return({error:"Invalid fields!"})
  }
  const {email, password,code} = validateField.data


  const existingUser = await getUserByEmail(email)

  if(!existingUser || !existingUser.email || !existingUser.password){
   return{error:"Email does not exis!t"}
  }

if(!existingUser.emailVerified){
   const  verificationToken = await generateVerificationToken(existingUser?.email!)
   
await SendVerificationEail(verificationToken.email,verificationToken.token)
   return {success:"confirmation email sent"}
}

if(existingUser.isTwoFactorEnabled && existingUser.email){
   if(code){
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
      if(!twoFactorToken) return{
         error:"Invalid token"
      }
      if(twoFactorToken.token !==  code) return{
         error:"Invarid code"
      }
      const hasExpired =new Date(twoFactorToken.expires) < new Date()
      if(hasExpired) return {error:"code has expired!"}
      await db.twoFactorToken.delete({
         where:{id:twoFactorToken.id}
      })
      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
      if(existingConfirmation){
         await db.twoFactorConfirmation.delete({
            where:{id:existingConfirmation.id}
         })
      }
      await db.twoFactorConfirmation.create({
         data:{userId:existingUser.id}
      })
   }
    else{
   const twoFactorToken = await generateTwoFactorsToken(existingUser.email)
   await sendTwoFactorTokenEmail(twoFactorToken.email,twoFactorToken.token)
   
   return{twofactor:true}


}  }

  try {
   await signIn("credentials",{
      email, 
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
   })
  } catch (error) {
   if(error instanceof AuthError){
      switch(error.type){
         case "CredentialsSignin":
          return{error:"Invalid credentials"}
          default: return {error: "something went wrong"}
   }}
   throw error
  }
  }