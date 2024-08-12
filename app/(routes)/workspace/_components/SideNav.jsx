"use client";

import Logo from '@/app/_components/logo';
import { Button } from '@/components/ui/button';
import { db } from '@/config/firebase.config';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { Bell, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DocumentList from './DocumentList';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';


function SideNav({ params }) {
  const [documentList, setDocumentList] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (params) {
      GetDocumentList();
    }
  }, [params]);

  /**
   * Used to get the document list from Firestore
   */
  const GetDocumentList = () => {
    const q = query(
      collection(db, 'workspaceDocuments'),
      where('workspaceId', '==', Number(params?.workspaceId))
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      setDocumentList(docs);
    });

    return unsubscribe; 
  };

  /**
   * Method to create a new document
   */
  const CreateNewDocument = async () => {
    if (documentList.length >= 5) {
      toast("Upgrade to new file plan", {
        description: "You reach max file please upgrade to unlimited file creation",
        action: {
          label: "Upgrade",
          onClick: () => console.log("Undo"),
        },
      })
      return;
    }

    setLoading(true);
    const docId = uuid4();

    try {
      await setDoc(doc(db, 'workspaceDocuments', docId.toString()), {
        workspaceId: Number(params?.workspaceId),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        coverImage: null,
        emoji: null,
        id: docId,
        documentName: 'Untitled Document',
        documentOutput: []
      });

      await setDoc(doc(db, 'documentOutput', docId.toString()), {
        docId: docId,
        output: []
      });

  
      router.replace('/workspace/' + params?.workspaceId + '/' + docId);
    } catch (error) {
      console.error('Error creating document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen md:w-72 hidden md:block fixed bg-blue-50 p-5 shadow-md">
      <div className="flex justify-between items-center">
        <Logo />
        <Bell className="h-5 w-5 text-gray-500" />
      </div>
      <hr className="my-2" />
      <div className="flex justify-between items-center">
        <h2 className="font-medium">Workspace Name</h2>
        <Button size="sm" onClick={CreateNewDocument}>
          {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "+"}
        </Button>
      </div>

      {/* Document List */}
      <DocumentList documentList={documentList} params={params} />

      {/* Progress Bar */}
      <div className="absolute bottom-10 w-[85%]">
        <Progress value={(documentList.length / 5) * 100} />
        <h2 className="text-sm font-light my-2">
          <strong>{documentList.length}</strong> out of <strong>5</strong> files used
        </h2>
        <h2 className="text-sm font-light text-purple-600">Upgrade your plan for unlimited access</h2>
      </div>
    </div>
  );
}

export default SideNav;
