"use client"

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import { AlignLeft, LayoutGrid } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

function WorkspaceList() {
    const { user} = useUser();

    const [workspaceList, setWorkspaceList] = useState([]);
  return (
    <div className='my-10 p-10 md:px-24 lg:px-36 xl:px-52'>
      <div className='flex justify-between '>
        <h2 className='font-bold text-2xl'>Hello, {user?.username.toUpperCase() } </h2>
        <Link href= {'/createworkspace'}>
             <Button>+</Button>
        </Link>
      </div>
      <div className='mt-10 flex justify-between'>
        <div>
            <h2 className='font-medium text-purple-600'> Workspaces</h2>
        </div>
        <div className='flex gap-2 '>
            <LayoutGrid/>
            <AlignLeft/>
        </div>
      </div>
        
      { workspaceList?.length == 0 ? 
            <div className='flex flex-col justify-center items-center my-12'> 
               <Image src={'/workspace.png'}width={300} height={300} alt = 'worksapce'/>
               <h2>Create a new workspace</h2>
                <Link href= {'/createworkspace'}>
                <Button variant= 'outline' className= "my-4  shadow-black"> +  New Worksapce</Button>
                </Link>
            </div>
            : 
            <div> 
              <div>Workspace List</div>
            </div>
        }
      
    </div>
  )
}

export default WorkspaceList
