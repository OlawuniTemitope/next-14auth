'use client'
import * as z from "zod"
import { CardWrapper } from './card-wrapper'
import {  useForm } from 'react-hook-form'
import { NewPasswordSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { newPasswword } from "@/actions/new-Password"

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [error,setError]=useState<String | undefined>()
  const [success, setSuccess] = useState<String | undefined>()
  const [isPending, startTransition] =useTransition()
  const onSubmit = (values:z.infer<typeof NewPasswordSchema>)=>{
    setError("")
    setSuccess("")
    newPasswword(values,token).then((data)=>{
      setError(data?.error)
      setSuccess(data?.success)
    })
    }
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver:zodResolver(NewPasswordSchema),
    defaultValues:{
      password: ""
    }
  })
  return (
    <CardWrapper
    headerLabel='Enter new pasword'
    backButtonLabel="Back to kogin"
    backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-6">
          <div className=" space-y-4">
            <FormField
            control={form.control}
            name="password"
            render={({field})=>(
              <FormItem>
                <FormLabel>
                 New password
                </FormLabel>
                <FormControl>
                  <Input
                  disabled={isPending}
                  {...field}
                  placeholder="******"
                  type="password"/>
                </FormControl>
                  <FormMessage/>
              </FormItem>
            )}
            />
           
          </div>
          <FormError message={error }/>
          <FormSuccess message={success} />
          <Button
          type="submit"
          className="w-full"
          disabled={isPending}>
            Resend password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
