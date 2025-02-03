import React from 'react'
import { useFollow } from '../../hooks/useFollow'
import { LoadSpinner } from './LoadSpinner'
import { Link } from 'react-router-dom'

export const RightPanelUser = ({user}) => {

  const { mutate: follow, isPending } = useFollow()

  return (
    <div className='flex flex-col lg:flex-row hover:bg-[rgb(231,233,234,0.1)] items-start md:items-center px-3 py-2'>
      <div className='flex flex-row items-center gap-x-2'>
        <Link className='w-1/5 h-4/5 lg:w-1/5 lg:h-1/5' to={`/profile/${user.username}`}>
          <img src={user.profileImg ||'/Twitter_default_profile_400x400.png'} className='object-contain rounded-full'/>
        </Link>
        <div className='flex flex-col'>
          <Link to={`/profile/${user.username}`}>
            <h1 className='text-sm md:text-base'>{user.fullname}</h1>
          </Link>
          <h1 className='text-sm md:text-base text-gray-600'>{user.username}</h1>
        </div>
      </div>
      <button onClick={() => follow(user._id)} disabled={isPending} className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-3'>{isPending ? <LoadSpinner size={'sm'}/> : 'Seguir'}</button>
    </div>
  )
}
