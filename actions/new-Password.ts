"use server"
import * as z from "zod"
import bcrypt from "bcryptjs"

import { NewPasswordSchema } from "@/schema"
import { getPasswordResetToken } from "@/data/password-resetToken"
import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"


export const newPasswword = async (values: z.infer<typeof NewPasswordSchema>,
    token?:string | null)=> {
        if(!token) return {error:"Missing token!"}

    const validateFields = NewPasswordSchema.safeParse(values)
    if(!validateFields.success){ return {errror : "Invalid fields input"}}    
    const {password} = validateFields.data
    const existingToken =await getPasswordResetToken(token)
    if(!existingToken) {return{error:"invalid Token!"}}
    const hasExpired = new Date(existingToken.expires) < new Date()
    if(hasExpired) return {
        Error:"Token has expired!"
    }
    const existingUser = await getUserByEmail(existingToken.email)
    if(!existingUser){
        return {error:"Email does not exist"}
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
        where:{id:existingUser.id},
        data:{password:hashedPassword}
    })

    await db.passwordResetToken.delete({
        where:{id:existingToken.id}
    })
    return {success:"password successfully updated!"}
}