"use client"
import useCurrentUser from '@/Hooks/use-current-user'
// import { auth } from '@/auth'
import { UserInfo } from '@/components/user-info'
// import React from 'react'
 const ClientPage =   () => {
  // const session= await auth()
  const user =  useCurrentUser()
  return (
    <UserInfo
    user={user}
    label= '💻 client Component'/>
  )
}
export default ClientPage