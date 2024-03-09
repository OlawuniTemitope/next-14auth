"use client"

import { useCurrentRole } from "@/Hooks/use-current-role";
import { UserRole } from "@prisma/client";
import React from "react"
import { FormError } from "../form-error";

interface RoleGateProps{
    children:React.ReactNode;
    allowRole:UserRole
}

export const RoleGate = ({children,allowRole}:RoleGateProps) => {
    const role = useCurrentRole()
    if(role !== allowRole){
  return (
        <FormError message="You do not have permition to view this content!" />
  )}
}
