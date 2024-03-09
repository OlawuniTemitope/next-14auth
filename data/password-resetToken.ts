import { db } from '@/lib/db'
import React from 'react'

export const getPasswordResetToken = async (token:string) => {
 try {
    const passwordResetToken = await db.verificationToken.findUnique({
        where:{token}
    })
return passwordResetToken
 } catch (error) {
    return null
 }
}
export const getPasswordResetEmail= async (email:string) => {
 try {
    const passwordResetToken = await db.verificationToken.findFirst({
        where:{email}
    })
return passwordResetToken
 } catch (error) {
    return null
 }
}
