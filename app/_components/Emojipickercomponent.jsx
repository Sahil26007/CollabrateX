'use client'

import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'

function Emojipickercomponent({children,setEmojiIcon}) {
    const [openEmojipicker, setOpenEmojipicker] = useState(false)
    return (
    <div >
        <div onClick={()=>setOpenEmojipicker(true)}>
            {children}
        </div>
        { openEmojipicker && 
            <div className='absolute z-10'>
            <EmojiPicker 
                emojiStyle='snapchat'
            onEmojiClick={(e)=>{
                setEmojiIcon(e.emoji)
                setOpenEmojipicker(false)
            }}/>
        </div>
        }
    </div>
  )
}

export default Emojipickercomponent
