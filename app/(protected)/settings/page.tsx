"use client"

import useCurrentUser from "@/Hooks/use-current-user"
import { settings } from "@/actions/settings"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRole } from '@prisma/client'
import { SelectValue } from "@radix-ui/react-select"
import { useSession } from "next-auth/react"
import { useState, useTransition } from "react"
import {  useForm } from "react-hook-form"
import * as z  from "zod"
import { SettingsSchema } from "@/schema"



const SettingsPage =  () => {
  const user = useCurrentUser()
  console.log(user)
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const {update} = useSession()
  const  [isPending, startTransition] = useTransition()
 
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver:zodResolver(SettingsSchema),
    defaultValues:{
      name: user?.name || undefined,
      email:user?.email || undefined,
      password:undefined,
      newPassword:undefined,
      role:user?.role || undefined,
      isTwoFactorEnabled : user?.isTwoFactorEnabled || undefined
  }})

 const onSubmit = (values : z.infer<typeof SettingsSchema>)=>{
  startTransition(()=>{
  settings(values).then((data)=>{
    if(data.error){
      setError(data.error)
    }
    if(data.success){
    update()
    setSuccess(data.success)
  }}).catch(error=>setError("something went wrong"))})
 }
 return(<Card className="w-[600px]">
  <CardHeader>
    <p className="text-2xl font-semibold text-center">
     Settings
    </p>
  </CardHeader>
  <CardContent>
    <Form {...form}>
      <form
      className=" space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" space-y-4">
        <FormField 
        control={form.control}
        name="name"
         render={({field})=>(
             <FormItem>
             <FormLabel>
               Name
             </FormLabel>
             <FormControl>
               <Input
                 {...field}
                 placeholder="John Doe" 
                 disabled={isPending}/>
             </FormControl>
             <FormMessage/>
           </FormItem>
          )
        }
        />
        {user?.isOAuth === false && (
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
                 {...field}
                 placeholder="Johndoe@gmail.com" 
                 type="email"
                 disabled={isPending}/>
             </FormControl>
             <FormMessage/>
           </FormItem>
          )
        }
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
                 {...field}
                 placeholder="*****" 
                 type="password"
                 disabled={isPending}/>
             </FormControl>
             <FormMessage/>
           </FormItem>
          )
        }
        />
        <FormField 
        control={form.control}
        name="newPassword"
         render={({field})=>(
             <FormItem>
             <FormLabel>
               Newpassword
             </FormLabel>
             <FormControl>
               <Input
                 {...field}
                 placeholder="*****" 
                 type="newPassword"
                 disabled={isPending}/>
             </FormControl>
             <FormMessage/>
           </FormItem>
          )
        }
        /></>)}
        <FormField 
        control={form.control}
        name="role"
         render={({field})=>(
             <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
              disabled={isPending}
              onValueChange={field.onChange}
              defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role"/>
                  </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>
                      Admin
                    </SelectItem>
                    <SelectItem value={UserRole.USER}>
                      User
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
          )
        }
        />
         <FormField 
        control={form.control}
        name="isTwoFactorEnabled"
         render={({field})=>(
             <FormItem className="flex flex-row items-center 
             justify-between rounded-lg border p-3 shadow-sm">
              <div className=" spacee-y-0.5">
                <FormLabel>Two factor autheetication</FormLabel>
                <FormDescription>
                  Enable two factor authentication for your account
                </FormDescription>
              </div>
              <FormControl>
                <Switch 
                disabled={isPending}
                checked={field.value}
                onCheckedChange={field.onChange}/>
              </FormControl>
             </FormItem>
          )
        }
        />
       
        </div>
        <FormError message={error}/>
        <FormSuccess message={success}/>
        <Button disabled={isPending} type="submit">
          save
        </Button>
      </form>
    </Form>
  </CardContent>
 </Card>)

}

export default SettingsPage