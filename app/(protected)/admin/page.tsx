"use client"
import { useCurrentRole } from '@/Hooks/use-current-role'
import { adminServer } from '@/actions/admin-server'
import { RoleGate } from '@/components/auth/role-gate'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UserRole } from '@prisma/client'
import React from 'react'
import { toast } from 'sonner'

const AdminPage = () => {
  const onServerActionClick = ()=>{
    adminServer().then(data=>{
      if(data.error){
        return toast.error(data.error)
      }
      if(data.success){
        return toast.success(data.success)
      }
    })
  }
  const onApiRoutClick=()=>{
    fetch("/api/admin").then((respose)=>{
      if(respose.ok) {
        toast.success("AAllowes API route")
      }
      else {
        toast.error("Forbidden API route")
      }
    }
    )
  }
  return (
    <Card className=' w-[600px]'>
    <CardHeader className='t text-2xl font-semibold text-center'>
      🔑 Admin
    </CardHeader>
    <CardContent className=' space-y-4'>
      <RoleGate allowRole={UserRole.ADMIN}>
        <FormSuccess message="you are permited to view this"/>
      </RoleGate>
      <div className='flex flex-row items-center rounded-l
       justify-between border shadow-md p-3'>
        <p className='text-sm font-medium'>
          Admin-only API route
        </p>
        <Button onClick={onApiRoutClick}>
          Click to test
        </Button>
      </div>
      <div className='flex flex-row items-center rounded-l
       justify-between border shadow-md p-3'>
        <p className='text-sm font-medium'>
          Admin-only API route
        </p>
        <Button onClick={onServerActionClick}>
          Click to test
        </Button>
      </div>
    </CardContent>
    </Card>
  )
}

export default AdminPage