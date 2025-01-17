import React from 'react'
import { RightPanelSkeleton } from '../skeletons/RightPanelSkeleton'

export const RightPanel = () => {

  const isLoading = false

  return (
    <div className='flex-[2_2_0] border-s border-[rgb(47,51,54)]'>
      <div className='flex flex-col sticky top-0 w-[85%] mx-auto h-screen py-2'>
        <div className='flex flex-col border border-[rgb(47,51,54)] rounded-2xl py-3 gap-y-3'>
          <h1 className='font-bold md:font-extrabold px-3'>A quién seguir</h1>
          {isLoading && (
            <div className='flex flex-col'>
              <RightPanelSkeleton/>
              <RightPanelSkeleton/>
              <RightPanelSkeleton/>
              <RightPanelSkeleton/>
            </div>
          )}
          {!isLoading && (
            <div className='flex flex-col lg:flex-row hover:bg-[rgb(231,233,234,0.1)] items-start md:items-center px-3 py-2'>
            <div className='flex flex-row items-center gap-x-2'>
              <img src='/Twitter_default_profile_400x400.png' className='object-container w-3/5 h-3/5 lg:w-1/5 lg:h-1/5 rounded-full'/>
              <div className='flex flex-col'>
                <h1 className='text-sm md:text-base'>Nombre</h1>
                <h1 className='text-sm md:text-base text-gray-600'>Username</h1>
              </div>
            </div>
            <button className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-3'>Seguir</button>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}
