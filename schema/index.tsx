import { UserRole } from "@prisma/client"
import * as z from "zod"
export const NewPasswordSchema = z.object({
    password : z.string().min(6,{message:'Minimum values of six(6) character is required'})
    })

export const SettingsSchema = z.object({
    name : z.optional(z.string()),
    isTwoFactorEnabled : z.optional(z.boolean()),
    role:z.enum([UserRole.ADMIN,UserRole.USER]),
    email:z.optional(z.string().email()),
    password:z.optional(z.string().min(6)),
    newPassword:z.optional(z.string().min(6)),
})
.refine((data)=>{
    if(data.password && !data.newPassword){
        return false
    }
    return true
},
{ 
    message: "Newpassword  is required",
    path:["newPassword"]
}
)
.refine((data)=>{
    if(!data.password && data.newPassword){
        return false
    }
    return true
},
{ 
    message: "password  is required",
    path:["password"]
}
)

export const ResetSchema = z.object({
email : z.string().email({message:"email is requireed"})
})
export const LoginSchema = z.object({
email : z.string().email({message:"email is requireed"}),
password: z.string().min(1,{message:'password is required'}),
code:z.optional(z.string())
})
export const RegisterSchema = z.object({
email : z.string().email({message:"email is requireed"}),
password: z.string().min(6,{message:'Minimum values of six(6) character is required'}),
name:z.string().min(3,{message:"Name is required"})
})