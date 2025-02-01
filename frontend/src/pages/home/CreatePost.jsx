import React, { useRef, useState } from 'react'
import { CiImageOn } from "react-icons/ci";
import { MdEmojiEmotions } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const CreatePost = () => {

  const queryClient = useQueryClient()
  const { data:authUser } = useQuery({ queryKey: ['authUser']})
  const [formData, setFormData] = useState({
    text: ''
  })
  const [img, setImg] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const imgRef = useRef(null)

  const { mutate: sendForm, isPending } = useMutation({
    mutationFn: async ({text, img}) => {
      console.log({text, img})
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

  return (
    <div className='flex flex-row w-full pt-7 sm:pt-6 px-4 gap-x-3 border-b border-[rgb(47,51,54)]'>
      <img src={authUser.User.coverImg ||'/Twitter_default_profile_400x400.png'} className='object-container w-[40px] h-[40px]  sm:w-[6%] sm:h-[6%] rounded-full'/>
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
              <CiImageOn onClick={() => imgRef.current.click()} style={{color: 'rgb(29, 155, 240)'}} className='h-[1.4rem] w-[1.4rem]' />
              <MdEmojiEmotions onClick={() => setShowEmojiPicker(!showEmojiPicker)} style={{color: 'rgb(29, 155, 240)'}} className='h-[1.4rem] w-[1.4rem]'/>
              <input type='file' hidden ref={imgRef} onChange={handleImageRef}/>
            </div>
            <button className={`bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold ${!formData.text.length && !img ? 'btn btn-disabled' : ''} py-0 sm:py-1 sm:px-3`}>{isPending ? 'Cargando...' : 'Postear'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
