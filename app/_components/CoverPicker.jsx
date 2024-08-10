"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import CoverOption from "../_shared/CoverOption";
import { Button } from "@/components/ui/button";

function CoverPicker({ children,setNewCover }) {

    const [selectedCover, setselectedCover] = useState()
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='items-center'>Update Cover</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {CoverOption.map((cover, ind) => (
                <div onClick={()=>setselectedCover(cover?.imageUrl)} 
                key={ind} className={` ${selectedCover== cover?.imageUrl && 'border-primary border-2'} p-1 rounded-md cursor-pointer hover:opacity-75`}>
                  <Image 
                    src={cover.imageUrl} 
                    width={200} 
                    height={160} 
                    alt={`Cover ${ind + 1}`} 
                    className="h-[80px] w-full rounded-lg object-cover mt-2"
                  />
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={()=>setNewCover(selectedCover)}>
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CoverPicker;
