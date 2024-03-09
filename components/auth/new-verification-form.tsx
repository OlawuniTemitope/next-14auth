"use client"
import { useSearchParams } from 'next/navigation'
import { CardWrapper } from './card-wrapper'
import {BeatLoader} from "react-spinners"
import { useCallback, useEffect, useState } from 'react'
import { newVerificationToken } from '@/actions/new-verification'
import { FormSuccess } from '../form-success'
import { FormError } from '../form-error'

export const NewVerificationForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [error, setError]=useState<string | undefined>()
  const [success, setSuccess]=useState<string | undefined>()

const onSubmit = useCallback(()=>{
  if(success || error) return
console.log(token)
    if(!token){
      setError("Missing Token!")
      return;
    }   
 newVerificationToken(token).then((data)=>{
  setSuccess(data.success)
  setError(data.error)
 }).catch(()=>{setError("Something went wrong")})
   },
    [token,success,error])
    
  useEffect(()=>{
    onSubmit()},
    [onSubmit])
  return (
    <CardWrapper 
    headerLabel="Confirming your email"
    backButtonHref="/auth/login"
    backButtonLabel="back to login">
        <div className=' flex w-full justify-center items-center'>
       { !success && !error && (<BeatLoader/>) }      
       <FormSuccess message={success}/>
        <FormError message={error}/>
        </div>
    </CardWrapper>
  )
}
