import React from 'react'

export const ProfileSkeleton = () => {
  return (
    <div className='flex-col gap-2'>
          <div className='flex gap-2 items-center'>
            <div className='flex flex-1 gap-1'>
              <div className='flex flex-col gap-1 w-full'>
                <div className='skeleton h-60 w-full relative mb-2'>
                  <div className='skeleton h-32 w-32 rounded-full border absolute -bottom-14 left-5'></div>
                </div>
                <div className='skeleton me-2 h-6 mt-4 w-24 ml-auto rounded-full'></div>
                <div className='skeleton ms-6 h-4 w-20 rounded-full mt-4'></div>
                <div className='skeleton ms-6 h-4 w-24 rounded-full'></div>
                <div className='skeleton ms-6 h-4 w-2/3 rounded-full'></div>
              </div>
            </div>
          </div>
        </div>
  )
}
