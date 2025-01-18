import React from 'react'

export const PostSkeleton = () => {
  return (
    <div className='flex flex-row w-full p-5 gap-y-2 border-b border-[rgb(47,51,54)]'>
      <div className="flex flex-row items-start gap-4 w-full">
        <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
        <div className="flex flex-col w-full gap-y-2">
          <div className="skeleton h-4 w-1/4 rounded-lg"></div>
          <div className="skeleton h-4 w-4/5 rounded-lg"></div>
          <div className="skeleton h-32 w-full rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}
