import React from "react"
import Navbar from "./_components/navbar"

interface ProtectedLayoutProps {
    children : React.ReactNode
}

const ProtectedLayout = ({children}:ProtectedLayoutProps) => {
  return (
    <div className=" flex h-full items-center justify-centerz gap-y-10
    w-screen  flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
    from-sky-400 to-blue-800">
      <div className="space-y-11 h-screen mt-28">
        <Navbar/>
        {children}
        </div>
      </div>
  )
}

export default ProtectedLayout