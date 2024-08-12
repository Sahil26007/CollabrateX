import React from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import RichDocument from './RichDocument'

function DocumentEditor({params}) {
  return (
    <div>
      {/* Header */}
        <DocumentHeader/>
     
      {/* Document Info */}
        <DocumentInfo params={params}/>
     
      {/* Rich Text Editor */}
        <RichDocument params={params}/>

    </div>
  )
}

export default DocumentEditor
