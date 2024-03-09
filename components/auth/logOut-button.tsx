import { LogOut } from '@/actions/logout'
import React from 'react'
interface LogoutProps{
    children:React.ReactNode

}

export const LogOutButton = ({children}:LogoutProps) => {
  const onClick=()=>{
    LogOut()
  }
  return (<span onClick={onClick} className='cursor-pointer'>
    {children}
  </span>)
}
