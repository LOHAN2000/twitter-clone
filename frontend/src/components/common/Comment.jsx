import React from 'react'
import { formatPostDate } from '../../utils/date'
import { Link } from 'react-router-dom'
import { FaTrash } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const Comment = ({ comment, postId }) => {

  const { user, text, createdAt } = comment

  const date = formatPostDate(createdAt)

  const { data:authUser } = useQuery({ queryKey: ['authUser'] })
  const queryClient = useQueryClient()

  const isMyComment = authUser.User._id === user._id
  
  const { mutate: deleteComment, isPending: isPendingDeleteComment } = useMutation({
    mutationFn: async (idComment) => {
      try {
        const response = await fetch(`/api/post/comment/${idComment}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message)
        }

        const data = await response.json()

        if (data.Error) {
          throw new Error(data.Error)
        }

        return data

      } catch (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: async (data) => {
      toast.success(data.message)
      queryClient.setQueriesData({ queryKey: ['posts']}, (oldData) => {
        if (!oldData) {
          return []
        }
        return oldData.map((p) => {
          if (p._id === postId) {
            const objeto = {...p, comments: data.data} 
            return objeto
          }
          return p
        })
      })
    }
  })

  return (
    <div className='flex flex-row gap-x-3'>
      <Link className='' to={`/profile/${user.username}`}>
      <div className='w-8 h-8 sm:w-7 sm:h-7 md:w-10 md:h-10 aspect-square'>
        <img src={user.profileImg ||"/Twitter_default_profile_400x400.png"} className="object-cover object-center rounded-full w-full h-full"/>
      </div>
      </Link>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row items-center gap-x-2'>
          <Link to={`/profile/${user.username}`}>
            <h1 className='text-sm md:text-md font-semibold max-w-60 sm:max-w-52 lg:max-w-[12rem] xl:max-w-[14rem] truncate capitalize'>{user.fullname}</h1>
          </Link>
            <h1 className='text-sm md:text-md font-extralight text-[rgb(47,51,54)] max-w-24 sm:max-w-24 md:max-w-28 lg:max-w-24 xl:max-w-36 truncate capitalize'>@{user.username}</h1>
            <h1 className='text-sm font-extralight text-[rgb(47,51,54)] truncate'>{date}</h1>
        </div>
        <h1 className='text-sm md:text-base'>{text}</h1>
      </div>
      {isMyComment && (
        <div className='flex me-1 items-center cursor-pointer'>
          <h1 onClick={() => deleteComment(comment._id)}><FaTrash/></h1>
        </div>
      )}
    </div>
  )
}
