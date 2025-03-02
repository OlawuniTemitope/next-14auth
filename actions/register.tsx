"use server"
import bcrypt from "bcryptjs"

import * as z from "zod"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/token"
import { SendVerificationEail } from "@/lib/mail"
import { RegisterSchema } from "@/schema"


export const register = async (values: z.infer<typeof RegisterSchema>) =>
 {
   // console.log(values)
  const validateField=RegisterSchema.safeParse(values)
  if(!validateField.success){
     return({error:"Invalid fields!"})
  }

  const {email, password, name} = validateField.data
  const hashPassword = await bcrypt.hash(password,10)

  const existingUser = await getUserByEmail(email)

  if(existingUser){return {error: "Email already in use"}}

  await db.user.create({
   data:{
      name,
      email,
      password:hashPassword,
   }
  })
  

  const verificationToken = await generateVerificationToken(email)

  await SendVerificationEail(
   verificationToken.email,
   verificationToken.token,)
  

  return({success:"Confirmation email has been sent!"})

  }
