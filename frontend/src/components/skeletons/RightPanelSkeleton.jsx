import React from 'react'

export const RightPanelSkeleton = () => {
  return (
    <div className='flex flex-row hover:bg-[rgb(231,233,234,0.1)] items-center justify-between px-3 py-2'>
      <div className='flex flex-row items-center gap-x-2'>
        <div  className='skeleton w-7 lg:w-10 h-7 lg:h-10 rounded-full'/>
        <div className='flex flex-col gap-y-1'>
          <div className='text-sm md:text-base skeleton h-5 w-16 lg:w-32 rounded-md'></div>
          <div className='text-sm md:text-base skeleton h-5 w-16 lg:w-32 rounded-md text-gray-600'></div>
        </div>
      </div>
      <button className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-thin md:font-semibold py-1 px-3 hidden md:flex btn btn-disabled'>Seguir</button>
    </div>
  )
}
