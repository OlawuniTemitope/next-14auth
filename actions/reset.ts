"use server"
import { getUserByEmail } from "@/data/user"
import { SendPasswordResetEail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/token"
import { ResetSchema } from "@/schema"
import * as z from "zod"

export const reset= async (values:z.infer<typeof ResetSchema>)=>{
    const validateField = ResetSchema.safeParse(values)
    if(!validateField.success) return{error: "invalid email"};

    const {email} = validateField.data

    const existingUser = await getUserByEmail(email)
    
    if(!existingUser)  return {error:"Email not found"};

    const passwordResetToken = await generatePasswordResetToken(email)
    console.log(passwordResetToken)
    await SendPasswordResetEail(passwordResetToken.email,passwordResetToken.token)
    

    return{success:"Email successfully sent"}
}