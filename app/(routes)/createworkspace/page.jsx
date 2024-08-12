"use client";
import CoverPicker from "@/app/_components/CoverPicker";
import Emojipickercomponent from "@/app/_components/Emojipickercomponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/config/firebase.config";
import { useAuth, useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { Loader2Icon, SmilePlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import React, { useState } from "react";
import uuid4 from "uuid4";

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState("/coverImg.jpg");
  const [workSpacename, setWorkSpaceName] = useState("");
  const [emoji, setEmoji] = useState();

  const {user} = useUser();
  const {orgId} = useAuth();
  const [loading,setLoading] = useState(false);

  const router = useRouter()

  const OnCreateWorkspace = async () => {
      setLoading(true); // Start loading
    
      const workspaceId = Date.now();
      const workspaceData = {
        workspaceName: workSpacename,
        emoji: emoji,
        coverImage: coverImage,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        id: workspaceId,
        orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress
      };
    
      // Insert the document into Firestore
     const result =  await setDoc(doc(db, 'Workspace', workspaceId.toString()), workspaceData);
      


     const docId = uuid4()
      await setDoc(doc(db,'workspaceDocuments',docId.toString()),{
        workspaceId:workspaceId,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        coverImage:null,
        emoji:null,
        id:docId,
        documentName:'Untitled Document',
        documentOutput:[]
      })

      setLoading(false); // Stop loading

      router.replace('/workspace/'+workspaceId+'/'+docId)
  
      console.log("Workspace created successfully");
  };
  return (
    <div className="p-10 md:px-36 lg:px-52 xl:px-80 py-20">
      <div className="bg-white p-4 shadow-2xl rounded-lg">
        {/* Cover Image */}
        <CoverPicker setNewCover= { (v)=>setCoverImage(v) }>
                <div className="relative group cursor-pointer">
                <h2 className="absolute p-4 w-full h-full items-center flex justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl">
                    Change Cover
                </h2>
                <Image
                    src={coverImage}
                    width={400}
                    height={400}
                    className="w-full h-[150px] object-cover rounded-t-xl"
                    alt="Workspace Cover"
                />
                </div>
        </CoverPicker>

        {/* Input Section */}
        <div className="p-12">
          <h2 className="font-medium text-xl">Create New Workspace</h2>
          <h2 className="text-gray-500 mb-4">
            This is a shared space where you can collaborate with your team. You can always rename it later.
          </h2>
          <div className="flex items-center space-x-4">
            <Emojipickercomponent setEmojiIcon={(v)=>setEmoji(v)}>
                <Button variant="outline" className="flex-shrink-0">
                  {emoji? emoji: <SmilePlus />}
                </Button>
            </Emojipickercomponent>
            <Input
              placeholder="Workspace Name"
              className="flex-grow"
              onChange={(e) => setWorkSpaceName(e.target.value)}
              value={workSpacename}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mb-1 mr-2 flex justify-end space-x-4">
          <Button disabled={!workSpacename.length || loading} onClick={OnCreateWorkspace}>
            Create {loading&& <Loader2Icon className="animate-spin ml-2"/>}
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;
