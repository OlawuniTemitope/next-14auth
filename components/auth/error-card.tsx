import React from 'react'
import { Header } from './header'
import { BackButton } from './back-button'
import { CardWrapper } from './card-wrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export const Errorcard = () => {
  return (
    <CardWrapper
    headerLabel="Oops! Something went wrong"
    backButtonHref="/auth/login"
    backButtonLabel="Back to login"
    >
        <div className='w-full flex items-center justify-center'>
            <ExclamationTriangleIcon className='text-destructive'/>
        </div>
    </CardWrapper>
    )
}

