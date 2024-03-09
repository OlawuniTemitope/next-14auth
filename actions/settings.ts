"use server"

import bcrypt from 'bcryptjs'
import { getUserByEmail, getUserById } from "@/data/user"
import { CurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { SendVerificationEail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/token"
import { SettingsSchema } from "@/schema"

import * as z  from "zod"

export const settings = async  (
    values:z.infer<typeof SettingsSchema>
) => {
    const user = await CurrentUser()
   
    
    if(!user) return {error : "Unauthorized!"}
    

    if(user.isOAuth){
        values.email =undefined,
        values.password=undefined,
        values.name=undefined,
        values.isTwoFactorEnabled=undefined
    }

    const dbUser = await getUserById(user.id)
    if(!dbUser)
     return {error:"Unauthorized"}
 
    if(values.email && values.email !== user.email){
        const existingUser = await getUserByEmail(values.email)
        if(existingUser && existingUser.id !== user.id) 
        return {error:"Email allready in use"}
    
    const verificationToken = await generateVerificationToken(values.email!)

    await SendVerificationEail(verificationToken.email,verificationToken.token)

    return {success:"verification token was sent"}
    }

    if(values.password && values.newPassword && dbUser.password){
        const passwordMatch = await bcrypt.compare(
            values.password,
            dbUser.password
        )
        if(!passwordMatch) return{error: "Incorrect password"}
        const hashedPassword = await bcrypt.hash(values.newPassword,10)
        values.password=hashedPassword
        values.newPassword = undefined
    }
    

await db.user.update({
    where:{id:dbUser.id},
    data:{...values,}
})
return {success : "Settings updated"}
}
