import React, { useEffect } from 'react'
import { PostSkeleton } from '../skeletons/PostSkeleton'
import { Post } from './Post'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const Posts = ({ type, authUser, user }) => {
  
  const getPostEndpoint = () => {
    switch (type) {
      case 'forYou':
        return '/api/post/all'
      case 'following':
        return `/api/post/following/${authUser.User._id}`
      case 'posts':
        return `/api/post/user/${user.username}`
      case 'liked':
        return `/api/post/likes/${user._id}`
      default:
        return '/api/post/all'
    }
  }

  const ENDPOINT_POST = getPostEndpoint()

  const { data: posts, isPending, refetch, isRefetching } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const response = await fetch(ENDPOINT_POST)
        if (response.status >= 500) {
          const errorData = await response.json()
          const errorMessage = errorData.message || 'Error interno del servidor'
          throw new Error(errorMessage) 
        }

        const data = await response.json()

        console.log(data)
        return data

      } catch (error) {
        toast.error(error.message)
        throw new Error(error)
      }
    }
  })

  useEffect(() => {
    refetch() 
  }, [type, refetch])

  return (
    <>
      {(isRefetching || isPending) &&(
        <div className='flex flex-col w-full'>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
        </div>
      )}
      {(!isPending && posts?.length > 0) ? (
        posts.map((post) => (
          <Post post={post} key={post._id}/>
        ))
      ) : (
        <div className='flex justify-center w-full mt-2'>
          <h1 className='text-gray-500'>No se encontraron posts 🙁</h1>
        </div>
      )}
    </>
  )
}
