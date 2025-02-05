import React, { useEffect, useState } from 'react'
import { SlOptions } from "react-icons/sl";
import { LuRepeat2 } from "react-icons/lu";
import { Comment } from './Comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LoadSpinner } from './LoadSpinner';
import { formatPostDate } from '../../utils/date';
import { Link } from 'react-router-dom';


export const Post = ({ post }) => {

  const { text, img, user, createdAt, comments, likes} = post
  const [isOwner, setIsOwner] = useState(false);

  const { data:authUser, isLoading } = useQuery({ queryKey: ['authUser']})
  const queryClient = useQueryClient()

  const [response, setResponse] = useState({
    text: ''
  })

  const date = formatPostDate(createdAt)

  const isLiked = post.likes.includes(authUser.User._id)

  const { mutate: deletePost, isPending: isPendingDelete } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`/api/post/${post._id}`, {
          method: 'DELETE'
        }) 

        if (!response.ok) {
          const errorData = await response.json()
          const errorMessage = errorData.message || 'Error interno del servidor'
          throw new Error(errorMessage)
        }

        const data = response.json()

        if (data.Error) {
          throw new Error(data.error)
        }

        return data

      } catch (error) {
        toast.error(error.message)
        throw new Error(error)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['posts']})
    }
  })

  const { mutate: like, isPending: isPendingLike } = useMutation({
    mutationFn: async (postId) => {
      try {
        const response = await fetch(`/api/post/like/${postId}`, {
          method: 'POST'
        })

        if (!response.ok) {
          const errorData = await response.json()
          const errorMessage = errorData.message
          throw new Error(errorMessage)
        }

        const data = await response.json()

        if (data.Error) {
          throw new Error(data.Error)
        }

        return data

      } catch (error) {
        toast.error(error.message)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['posts']})
    }
  })

  const { mutate: comment, isPending: isPendingComment} = useMutation({
    mutationFn: async (comment) => {
      try {
        const response = await fetch(`/api/post/comment/${post._id}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(comment)
        })

        if (!response.ok) {
          const dataError = await response.json()
          throw new Error(dataError.message)
        }

        const data = await response.json()

        if (data.Error) {
          throw new Error(data.error)
        }
        console.log(data)
        return data

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      console.log(data.data)
      setResponse({ text: ''})
      queryClient.setQueryData(['posts'], (oldData) => {
        if (!oldData) {
          return []
        }
        return oldData.map((p) => {
          if (p._id === post._id) {
            console.log(p)
            return {...p, comments: data.data}
          }
          return p
        })
      })
    }
  })


  const onSubmit = (e) => {
    e.preventDefault()
    comment(response)
  }

  useEffect(() => {
    setIsOwner(authUser.User._id === user._id)
  }, [])


  return (
    <div className="flex flex-row px-4 py-3.5 gap-x-3.5 w-full border-b border-[rgb(47,51,54)]">
      <Link to={`/profile/${user.username}`} className="flex items-top">
        <div className="w-[40px] h-[40px]"> 
          <img 
            src={user.profileImg || "/Twitter_default_profile_400x400.png"} 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </Link>
      <div className="flex flex-col w-full ">
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row gap-2 items-center'>
            <Link to={`/profile/${user.username}`}>
              <h1 className='text-sm md:text-md font-semibold max-w-40 sm:max-w-28 md:max-w-44 lg:max-w-[18rem] xl:max-w-[24rem] truncate capitalize'>{user.fullname}</h1>
            </Link>
            <h1 className='text-sm md:text-md font-extralight text-[rgb(47,51,54)] max-w-24 sm:max-w-24 md:max-w-28 lg:max-w-24 xl:max-w-36 truncate'>@{user.username}</h1>
            <h1 className='text-md font-extralight text-[rgb(47,51,54)] truncate'>{date}</h1>
          </div>
          <div className='dropdown dropdown-end'>
            <SlOptions tabIndex={0} role='button' className='text-[rgb(47,51,54)]'/>
            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-lg z-[1] w-44 sm:w-36 md:w-52 p-2 shadow'>
              <li onClick={() => document.getElementById(`modal_delete_${post._id}`).showModal()} className='text-md font-semibold text-red-600'><a>Eliminar</a></li>
            </ul>
          </div>
        </div>
        <h1>{text}</h1>
        <div className='mt-2'>
          <img src={img} className='object-contain rounded-2xl'/>
        </div>
        <div className='mt-2 w-3/4 px-2'>
          <div className='flex flex-row justify-between items-center'>
            <button onClick={() => document.getElementById(`modal_comment_${post._id}`).showModal()} className='flex flex-row text-[rgb(47,51,54)] item-center gap-x-1.5'><i className="fa-regular fa-comment pt-0.5"></i><h1 className='text-sm'>{comments.length}</h1></button>
            <LuRepeat2 className='text-[rgb(47,51,54)] w-5 h-5'/>
            <a onClick={() => like(post._id)} className={`flex flex-row ${isLiked ? 'text-red-500' : 'text-[rgb(47,51,54)]'} items-center gap-x-1.5 cursor-pointer`}><i className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart`}></i><h1 className='text-sm'>{likes.length}</h1></a>
          </div>
        </div>
      </div>
      {/* MODAL COMMENTS*/}
      <dialog id={`modal_comment_${post._id}`} className="modal">
        <div className="modal-box p-4 pt-12 flex flex-col rounded-xl max-w-md  md:max-w-screen-sm">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute left-1 top-1">✕</button>
          </form>
          <div className='flex flex-col gap-y-4'>
            <div className='flex flex-row gap-x-3'>
              <Link to={`/profile/${user.username}`}>
                <div className='w-8 h-8 sm:w-7 sm:h-7 md:w-10 md:h-10 aspect-square'>
                  <img src={post.user.profileImg || "/Twitter_default_profile_400x400.png"} className="object-cover rounded-full w-full h-full"/>
                </div>
              </Link>
              <div className='flex flex-col w-full'>
                <div className='flex flex-row items-center gap-x-2'>
                  {/* TODO: Corregir el renderizado de la imagen de perfil en el modal de comentarios */}
                  <Link to={`/profile/${user.username}`}>
                    <h1 className='text-sm md:text-md font-semibold max-w-60 sm:max-w-52 lg:max-w-[12rem] xl:max-w-[14rem] truncate capitalize'>{user.fullname}</h1>
                  </Link>
                    <h1 className='text-sm md:text-md font-extralight text-[rgb(47,51,54)] max-w-24 sm:max-w-24 md:max-w-28 lg:max-w-24 xl:max-w-36 truncate'>@{user.username}</h1>
                    <h1 className='text-sm font-extralight text-[rgb(47,51,54)] truncate'>{date}</h1>
                </div>
                <h1 className='text-sm md:text-base'>{text}</h1>
              </div>
            </div>
            <div className='flex flew-row gap-x-3 w-full'>
              <Link to={`/profile/${user.username}`}>
                <div className='w-8 h-8 sm:w-7 sm:h-7 md:w-10 md:h-10 aspect-square'>
                  <img src={authUser.User.profileImg ||'/Twitter_default_profile_400x400.png'} className='object-cover rounded-full w-full h-full'/>
                </div>
              </Link>
              <form onSubmit={onSubmit} className='flex overflow-x-hidden w-full'>
                <textarea onChange={(e) => setResponse({...response, [e.target.name]: e.target.value})} name="text" type="text"  value={response.text} placeholder="Postea tu respuesta ahora" className="py-2 max-h-48 w-full h-20 resize-none overflow-y-auto border-none focus:outline-none bg-inherit text-md"/> 
              </form>
            </div>
            <div className='flex flex-col max-h-96 gap-y-6 overflow-y-auto'>
              {comments.map((comment) => (
                <Comment comment={comment} key={comment._id}/>
              ))}
            </div>
            <div className='flex justify-end overflow-hidden'>
              <button onClick={onSubmit} className={`bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-3 ${response.text?.length === 0 ? 'btn btn-disabled' : ''}`}>{isPendingComment ? <LoadSpinner size={'md'}/> : 'Responder'}</button>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className=''>close</button>
        </form>
      </dialog>
      {/* MODAL DELETE */}
      <dialog id={`modal_delete_${post._id}`} className='modal'>
        <div className='modal-box px-6 py-5 flex flex-col rounded-xl max-w-72 sm:max-w-64  md:max-w-80'>
          <div className='flex flex-col justify-center gap-y-2'>
            <h1 className='text-center font-extrabold text-xl'>¿Deseas eliminar post?</h1>
            <p className='font-extralight text-md text-gray-500'>Esta acción no se pude revertir, y se eliminará de tu perfil, de la cronología de las cuentas que te sigan y de los resultados de búsqueda.</p>
            <button onClick={() => deletePost()} className={`my-1 btn btn-error rounded-full text-white ${isOwner ? '' : 'btn-disabled'}`}>{isPendingDelete ? <LoadSpinner size={'sm'}/> : (isOwner ? 'Eliminar' : 'No hay permisos')}</button>
            <form method="dialog" className='flex flex-row'> 
              <button className='btn btn-secondary rounded-full text-white w-full'>Cancelar</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
