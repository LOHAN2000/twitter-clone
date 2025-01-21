import React from 'react'
import { PostSkeleton } from '../skeletons/PostSkeleton'
import { Post } from './Post'

export const Posts = () => {

  const isLoading = false

  return (
    <>
      {isLoading && (
        <div className='flex flex-col w-full'>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
        </div>
      )}
      {!isLoading && (
        <>
          <Post/>
          <Post/>
          <Post/>
        </>
      )}
    </>
  )
}
