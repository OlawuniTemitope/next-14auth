'use client'
import * as z from "zod"
import { CardWrapper } from './card-wrapper'
import {  useForm } from 'react-hook-form'
import { LoginSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { login } from "../../actions/login"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export const LoginForm = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
   ? "Email already in use  by deffirent provider" : ''
   const [showTwoFactor,setShowTwoFactor] = useState<boolean>(false)
  const [error,setError]=useState<String | undefined>()
  const [success, setSuccess] = useState<String | undefined>()
  const [isPending, startTransition] =useTransition()

  const onSubmit = (values:z.infer<typeof LoginSchema>)=>{
    setError("")
    setSuccess("")
    startTransition(()=>{login(values,callbackUrl!).then((data)=>{
      if(data?.error){
        form.reset()
        setError(data?.error)
      }
      if(data?.success){
        form.reset()
      setSuccess(data?.success)
 }     
 if(data?.twofactor){
  setShowTwoFactor(true)
 }
    }).catch(()=>setError("something went wrong"))}) 
  }
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver:zodResolver(LoginSchema),
    defaultValues:{
      email: "",
      password: ""
    }
  })
  return (
    <CardWrapper
    headerLabel='welcome back'
    backButtonLabel="Don't have an account?"
    backButtonHref='/auth/register'
    showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-6">
          <div className=" space-y-4">
          {
            showTwoFactor && (<FormField
              control={form.control}
              name="code"
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    Two factor code
                  </FormLabel>
                  <FormControl>
                    <Input
                    disabled={isPending}
                    {...field}
                    placeholder="123456"
                    />
                  </FormControl>
                    <FormMessage/>
                </FormItem>
              )}
              />
              )}{
            !showTwoFactor && (
         <>
            <FormField
            control={form.control}
            name="email"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                  disabled={isPending}
                  {...field}
                  placeholder="joneDoe@gmail.com"
                  type="email"/>
                </FormControl>
                  <FormMessage/>
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                  disabled={isPending}
                  {...field}
                  placeholder="*****"
                  type="password"/>
                </FormControl>
                <Button size="sm" 
                variant="link"
                asChild className="px-0 font-normal">
                  <Link href="/auth/reset">
                    Forgot password?
                  </Link>
                </Button>
                  <FormMessage/>
              </FormItem>
            )}
            />
            </>)}

          </div>
          <FormError message={error || urlError}/>
          <FormSuccess message={success} />
          <Button
          type="submit"
          className="w-full"
          disabled={isPending}>
          {showTwoFactor? "Confirm" :  "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
