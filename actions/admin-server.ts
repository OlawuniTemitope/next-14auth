"use server"

import { CurrentRole } from "@/lib/auth"
import { UserRole } from "@prisma/client"

export const adminServer =async () => {
    const role = await CurrentRole()
    if(role === UserRole.ADMIN){
  return {error : "Allowed" }
}
return {success : "Forbidden"}
}
