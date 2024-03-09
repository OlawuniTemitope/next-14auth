'use client'
import * as z from "zod"
import { CardWrapper } from './card-wrapper'
import {  useForm } from 'react-hook-form'
import { ResetSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { reset } from "../../actions/reset"
import { useState, useTransition } from "react"

export const ResetForm = () => {
  const [error,setError]=useState<String | undefined>()
  const [success, setSuccess] = useState<String | undefined>()
  const [isPending, startTransition] =useTransition()
  const onSubmit = (values:z.infer<typeof ResetSchema>)=>{
    setError("")
    setSuccess("")
    reset(values).then((data)=>{
      setError(data.error)
      setSuccess(data.success)
    })
    }
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver:zodResolver(ResetSchema),
    defaultValues:{
      email: ""
    }
  })
  return (
    <CardWrapper
    headerLabel='Forgot your password?'
    backButtonLabel="Back to kogin"
    backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-6">
          <div className=" space-y-4">
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
           
          </div>
          <FormError message={error }/>
          <FormSuccess message={success} />
          <Button
          type="submit"
          className="w-full"
          disabled={isPending}>
            Send resend email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
