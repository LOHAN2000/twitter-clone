import React from 'react'

export const RightPanelUser = ({user}) => {
  return (
    <div className='flex flex-col lg:flex-row hover:bg-[rgb(231,233,234,0.1)] items-start md:items-center px-3 py-2'>
      <div className='flex flex-row items-center gap-x-2'>
        <img src={user.profileImg ||'/Twitter_default_profile_400x400.png'} className='object-container w-3/5 h-3/5 lg:w-1/5 lg:h-1/5 rounded-full'/>
        <div className='flex flex-col'>
          <h1 className='text-sm md:text-base'>{user.username}</h1>
          <h1 className='text-sm md:text-base text-gray-600'>{user.fullname}</h1>
        </div>
      </div>
      <button className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-3'>Seguir</button>
    </div>
  )
}
