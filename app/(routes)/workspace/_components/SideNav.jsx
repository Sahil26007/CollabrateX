"use client"

import Logo from '@/app/_components/logo'
import { Button } from '@/components/ui/button'
import { db } from '@/config/firebase.config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { Bell } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function SideNav({params}) {


    const [documentList, setDocumentList] = useState([])
    useEffect(()=>{
        params&&GetDocumentList()
    },[params])

    /**
     * used to get document list
     */
    const GetDocumentList=()=>{
        const q = query(collection(db,'workspaceDocuments'),where('workspaceId','==',Number(params?.workspaceId )));

        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
             querySnapshot.forEach((doc)=>{
                querySnapshot.forEach((doc) =>{
                    setDocumentList(documentList=>[...documentList,doc.data])
                })
             })
        })
    }

  return (
    <div className='h-screen md:w-72 hidden md:block fixed bg-blue-50 p-5 shadow-md'>
      <div className='flex justify-between items-center'>
        <Logo/>
        <Bell className='h-5 w-5 text-gray-500 '/>
      </div>
      <hr className='my-2'/>
      <div className='flex justify-between items-center'>
        <h2 className='font-medium'>Workspace Name</h2>
        <Button size="sm">+</Button>
      </div>
    </div>
  )
}

export default SideNav
