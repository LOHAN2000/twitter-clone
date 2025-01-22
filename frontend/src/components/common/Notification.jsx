import React from 'react'
import { FcLike } from "react-icons/fc";
import { FaUserLarge } from "react-icons/fa6";

export const Notification = ({ type }) => {
  return (
    <div className='flex flex-row px-3 gap-x-2 py-3 border-b border-[rgb(47,51,54)]'>
      <div className='flex h-full'>
        {type === 'follow' ? (
          <FaUserLarge style={{fill: 'rgb(29, 155, 240)'}} className='w-6 h-6 md:w-7 md:h-7'/>
        ) : (
          <FcLike className='w-6 h-6 md:w-7 md:h-7'/>
        )}
      </div>
      <div className='flex flex-col justify-center h-full md:max-w-[37rem] gap-y-2'>
        <img src='/Twitter_default_profile_400x400.png' className='object-container w-7 h-7 md:w-8 md:h-8 rounded-full '/>
        <div className='flex flex-row gap-x-2'>
          <h1 className='font-semibold text-sm'>Username</h1>
          <p className='font-semibold text-sm'>{type === 'follow' ? 'te sigue.' : 'le gustó tu post.'}</p>
        </div>
      </div>
    </div>
  )
}
