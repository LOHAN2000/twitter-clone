import React, { useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import { MdEmojiEmotions } from "react-icons/md";

export const CreatePost = () => {

  const [imageForm, setImageForm] = useState('')

  const isPending = false
  return (
    <div className='flex flex-row w-full pt-7 sm:pt-6 px-4 gap-x-3 border-b border-[rgb(47,51,54)]'>
      <img src='/Twitter_default_profile_400x400.png' className='object-container w-[40px] h-[40px] sm:w-[12%] sm:h-[12%] md:w-[7%] md:h-[7%] rounded-full'/>
      <div className='w-full flex flex-col items-center justify-center'>
        <form className='flex w-full flex-col gap-y-3'>
          <textarea type="text" style={{"fieldSizing": 'content'}} placeholder="¡¿Que está pasando ahora?!" className=" max-w-xl py-2 max-h-40 resize-none border-none focus:outline-none bg-inherit text-md" />
          {/* imagen */}
          <div className='flex flex-row justify-between items-center border-t border-[rgb(47,51,54)] py-3'>
            <div className='flex flex-row h-full gap-x-2'>
              <CiImageOn style={{color: 'rgb(29, 155, 240)'}} className='h-[1.4rem] w-[1.4rem]' />
              <MdEmojiEmotions style={{color: 'rgb(29, 155, 240)'}} className='h-[1.4rem] w-[1.4rem]'/>
            </div>
            <button className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-0 sm:py-1 sm:px-3'>{isPending ? 'Cargando...' : 'Postear'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
