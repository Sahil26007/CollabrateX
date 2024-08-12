'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import DocumentOptions from './DocumentOptions';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/config/firebase.config';
import { toast } from 'sonner';


function DocumentList({ documentList ,params}) {
  const router = useRouter();

  const DeleteDocument = async(docId)=>{
    await deleteDoc(doc(db,"workspaceDocuments",docId));
    toast('Document Deleted!')
  }
  return (
    <div>
      {documentList.map((doc, index) => (
        <div key={index} 
        onClick={()=> router.push('/workspace/'+ params?.workspaceId+"/"+doc?.id)}
        className={`flex items-center justify-between mt-3 p-2 px-3 hover:bg-gray-200 rounded-lg cursor-pointer ${doc.id==params?.documentId&&'bg-white'}`}>
          <div className="flex gap-2 items-center">
            <Image src={"/doc.svg"} width={20} height={20} alt="Document Icon" />
            <h2 className="ml-2">{doc.documentName}</h2>
          </div>
          <DocumentOptions doc={doc} deleteDocument={(docId)=>DeleteDocument(docId)}/> 
        </div>
      ))}
    </div>
  );
}

export default DocumentList;
