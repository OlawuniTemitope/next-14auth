import SendEnail from "@/data/email"
import {Resend} from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendTwoFactorTokenEmail = async (
  email:string, token:string
)=>{
  await SendEnail(
    email,
    "Reset your password",
    `<p> Your 2FA code: ${token}</p>`,

  )
  
  
  // resend.emails.send({
  //   from: 'Acme <onboarding@resend.dev>',
  //   to: email,
  //   subject: 'Reset your password',
  //   html:`<p> Your 2FA code: ${token}</p>`,
  // })

}

export const SendPasswordResetEail = async (
    email:string,
    token:string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await SendEnail(
    email,
    "Reset your password",
    `<p>Click <a href="${resetLink}">here</a> to confirm your email.</p>`,
  )
  
  // resend.emails.send({
  //   from: 'Acme <onboarding@resend.dev>',
  //   to: email,
  //   subject: 'Reset your password',
  //   html:`<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  // })

}
export const SendVerificationEail = async (
    email:string,
    token:string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await SendEnail(
    email,
    "Reset your password",
    `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  )
  
  // resend.emails.send({
  //   from: 'Acme <onboarding@resend.dev>',
  //   to: email,
  //   subject: 'Confirm your email',
  //   html:`<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  // })

}
