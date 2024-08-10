"use client"
import Logo from '@/app/_components/logo'
import { OrganizationSwitcher, useAuth, UserButton } from '@clerk/nextjs'
import React from 'react'

function Header() {
  const {orgId} = useAuth();
  return (
    <div className='flex justify-between items-end p-3 shadow-sm'>
      <Logo/>
      <OrganizationSwitcher
        afterLeaveOrganizationUrl={'/Dashboard' }
        afterCreateOrganizationUrl={'/Dashboard'}
      />
      <UserButton/>
    </div>
  )
}

export default Header
