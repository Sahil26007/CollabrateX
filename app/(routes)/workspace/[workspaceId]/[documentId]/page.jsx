'use client'
import React, { useEffect } from 'react'
import SideNav from '../../_components/SideNav'

function WorkspaceDocument({params}) {


  return (
    <div>

      {/* Side Nav */}
      <div >
          <SideNav params={params}/>
      </div>

      {/* Document */}
      <div className='md:ml-72'>
        Document
      </div>

    </div>
  )
}

export default WorkspaceDocument
