
// import { auth } from '@/auth'
import { UserInfo } from '@/components/user-info'
import { CurrentUser } from '@/lib/auth'
// import React from 'react'
const ServerPage = async  () => {
  // const session= await auth()
  const user =await  CurrentUser()
  return (
    <UserInfo
    user={user}
    label= '💻 Server Component'/>
  )
}

export default ServerPage