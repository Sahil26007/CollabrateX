import {Link2Icon, MoreVerticalIcon, PenBoxIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
function DocumentOptions({doc,deleteDocument}) {
  return (
    <div>
     
      <DropdownMenu>
        <DropdownMenuTrigger> <MoreVerticalIcon className='h-4 w-4 cursor-pointer'/></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-2"> 
                    <Link2Icon className='h-4 w-4'/> Share link
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2"> 
                    <PenBoxIcon className='h-4 w-4'/>Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>deleteDocument(doc?.id)} className="flex gap-2 text-red-900"> 
                    <Trash2Icon className='h-4 w-4'/>Delete
                </DropdownMenuItem>
        </DropdownMenuContent>
</DropdownMenu>

    </div>
  )
}

export default DocumentOptions
