import React, { useRef, useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import { MdEmojiEmotions } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data'

export const CreatePost = () => {

  const queryClient = useQueryClient()
  const { data:authUser } = useQuery({ queryKey: ['authUser']})
  const [formData, setFormData] = useState({
    text: ''
  })
  const [img, setImg] = useState(null)
  const imgRef = useRef(null)

  const { mutate: sendForm, isPending } = useMutation({
    mutationFn: async ({text, img}) => {
      try {
        const response = await fetch(`/api/post/create`, {
          method: 'POST',
          headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ text, img }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          const errorMessage = errorData.message || 'Error interno del servidor'
          throw new Error(errorMessage)
        }

        const data = await response.json()

        if (data.Error) {
          throw new Error(data.error) 
        }

        return data

      } catch (error) {
        toast.error(error.message)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      setFormData({text: ''})
      setImg('')
      queryClient.invalidateQueries({ queryKey: ['posts']})
    }
  })

  const handleImageRef = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader() 
      reader.readAsDataURL(file)
      reader.onload = () => {setImg( reader.result )}
    }
  }

  const handleForm = (e) => {
    e.preventDefault()
    const text = formData.text
    sendForm({text, img})
  }

  const [showPicker, setShowPicker] = useState(false);
  const handleEmojiSelect = (emoji) => {
    setFormData((prev) => ({
      ...prev,
      text: prev.text + emoji.native
    }));
    setShowPicker(false);
  };

  return (
    <div className='flex flex-row w-full pt-7 sm:pt-6 px-4 gap-x-3 border-b border-[rgb(47,51,54)]'>
      <Link to={authUser.User.username}>
        <div className='w-10 h-10'>
         <img src={authUser.User.profileImg ||'/Twitter_default_profile_400x400.png'} className='object-cover rounded-full w-full h-full'/>
        </div>
      </Link>
      <div className='w-full flex flex-col items-center justify-center'>
        <form onSubmit={handleForm} className="flex w-full flex-col gap-y-3 overflow-hidden">
          <textarea onChange={(e) => setFormData({...formData, [e.target.name]:e.target.value})} name="text"  value={formData.text} type="text" placeholder="¡¿Qué está pasando ahora?!" className="max-w-[338px] lg:max-w-[500px] py-2 max-h-40 resize-none overflow-y-auto border-none focus:outline-none bg-inherit text-md"/> 
          {/* imagen */}
          {img && (
            <div className='flex flex-col relative'>
              <img src={img} className='rounded-xl object-cover'/>
              <IoClose onClick={() => setImg(null)} className='h-[19px] w-[19px] md:h-[20px] md:w-[20px] absolute top-2 right-2 hover:bg-[rgb(231,233,234,0.1)] rounded-full cursor-pointer'/>
            </div>
          )}
          <div className='flex flex-row justify-between w-full items-center border-t border-[rgb(47,51,54)] py-3'>
            <div className='flex flex-row h-full gap-x-2'>
              <CiImageOn onClick={() => imgRef.current.click()} style={{color: 'rgb(29, 155, 240)'}} className='h-[1.4rem] w-[1.4rem] cursor-pointer'/>
              <MdEmojiEmotions onClick={() => setShowPicker(!showPicker)} style={{color: 'rgb(29, 155, 240)'}} className='h-[1.4rem] w-[1.4rem] cursor-pointer'/>
              {showPicker && (
              <div className="emoji-picker absolute bg-[rgb(21,22,23)] rounded-xl py-5 px-1">
                <div className='relative'>
                  <button onClick={() => setShowPicker(false)} className='absolute -top-4 right-0 text-white z-20'><IoClose className='w-5 h-5'/></button>
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    theme="dark"
                    previewPosition="none"
                  />
                </div>
              </div>
              )}
            <input type='file' hidden ref={imgRef} onChange={handleImageRef}/>
            </div>
            <button className={`bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold ${!formData.text.length && !img ? 'btn btn-disabled' : ''} py-0 sm:py-1 sm:px-3`}>{isPending ? 'Cargando...' : 'Postear'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
