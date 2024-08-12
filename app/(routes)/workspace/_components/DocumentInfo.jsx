'use client';

import CoverPicker from '@/app/_components/CoverPicker';
import Emojipickercomponent from '@/app/_components/Emojipickercomponent';
import { db } from '@/config/firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { SmilePlus, CheckCircle, XCircle } from 'lucide-react';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function DocumentInfo({ params }) {
  const [emoji, setEmoji] = useState();
  const [coverImage, setCoverImage] = useState("/coverImg.jpg");
  const [documentInfo, setDocumentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params) { 
      GetDocumentInfo();
    }
  }, [params]);

  const GetDocumentInfo = async () => {
    setLoading(true); // Start loading
    try {
      const docRef = doc(db, 'workspaceDocuments', params?.documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDocumentInfo(docSnap.data());
        setCoverImage(docSnap.data().coverImage || "/coverImg.jpg");
        setEmoji(docSnap.data().emoji || null);
      } else {
        console.log('No such document exists!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      showToast('Error fetching document', 'error');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const updateDocumentInfo = async (key, val) => {
    try {
      const docRef = doc(db, 'workspaceDocuments', params?.documentId);
      await updateDoc(docRef, { [key]: val });
      showToast(`Document ${key} updated successfully!`, 'success');
    } catch (error) {
      showToast('Failed to update document', 'error');
    }
  };

  const showToast = (message, type) => {
    toast(
      <div className={`flex items-center ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
        {type === 'success' ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
        <span>{message}</span>
      </div>,
      {
        duration: 4000,
        style: {
          borderRadius: '8px',
          background: type === 'success' ? '#e6fffa' : '#ffe6e6',
          padding: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      }
    );
  };

  if (loading) {
    return <div>Loading...</div>; // Placeholder or skeleton UI
  }

  return (
    <div>
      {/* Cover */}
      <CoverPicker setNewCover={(v) => {
            setCoverImage(v);
            updateDocumentInfo('coverImage', v);
        }}>
        <div className="relative group cursor-pointer">
          <h2 className="absolute p-4 w-full h-full items-center flex justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl">
            Change Cover
          </h2>
          <Image
            src={coverImage}
            width={400}
            height={400}
            className="w-full h-[200px] object-cover rounded-t-xl"
            alt="Workspace Cover"
          />
        </div>
      </CoverPicker>

      {/* Emoji Picker */}
      <div className='absolute ml-10 mt-[-50px] cursor-pointer'>
        <Emojipickercomponent setEmojiIcon={(v) => {
            setEmoji(v);
            updateDocumentInfo('emoji', v);
        }}>
          <div className="bg-[#ffffff77] p-4 rounded-md">
            {emoji ? <span className='text-5xl'>{emoji}</span> : <SmilePlus className='h-10 w-10 text-gray-700' />}
          </div>
        </Emojipickercomponent>
      </div>

      {/* File Name */}
      <div className='mt-5 ml-10 p-5'>
        <input 
          type="text" 
          placeholder='Untitled Document' 
          defaultValue={documentInfo?.documentName || 'Untitled Document'} 
          className='font-bold text-3xl outline-none' 
          onBlur={(e)=>updateDocumentInfo('documentName',e.target.value)}
        />
      </div>
    </div>
  );
}

export default DocumentInfo;
