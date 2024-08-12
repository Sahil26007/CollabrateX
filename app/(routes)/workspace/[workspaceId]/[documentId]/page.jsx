'use client'
import React, { useEffect } from 'react'
import SideNav from '../../_components/SideNav'
import DocumentList from '../../_components/DocumentList'
import DocumentEditor from '../../_components/DocumentEditor'

function WorkspaceDocument({params}) {


  return (
    <div>

      {/* Side Nav */}
      <div >
          <SideNav params={params}/>
      </div>

      {/* Document */}
      <div className='md:ml-72'>
        <DocumentEditor params={params}/>
      </div>

    </div>
  )
}

export default WorkspaceDocument
