import React, { useEffect, useState } from 'react'
import { useFollow } from '../../hooks/useFollow'
import { LoadSpinner } from './LoadSpinner'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export const RightPanelUser = ({user, type}) => {

  const { data: authUser } = useQuery({ queryKey: ['authUser']})
  const { mutate: follow, isPending } = useFollow()
  const [isMobile, setIsMobile] = useState('')
  const isFollowing = authUser?.User?.following.includes(user?._id)

  return (
    <div className={`flex ${type === 'profile' ? 'flex-row items-center' : 'sm:flex-col lg:flex-row items-start'} hover:bg-[rgb(231,233,234,0.1)] px-3 py-2`}>
      <div className='flex flex-row items-center gap-x-2'>
        <Link to={`/profile/${user.username}`}>
          <div className='w-10 h-10 md:w-10 md:h-10'>
            <img src={user.profileImg ||'/Twitter_default_profile_400x400.png'} className='object-cover rounded-full w-full h-full'/>
          </div>
        </Link>
        <div className='flex flex-col'>
          <Link to={`/profile/${user.username}`}>
            <h1 className='text-sm md:text-base'>{user.fullname}</h1>
          </Link>
          <h1 className='text-sm md:text-base text-gray-600'>@{user.username}</h1>
        </div>
      </div>
      <button onClick={() => follow(user._id)} disabled={isPending} className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-3 ms-auto'>{isPending ? <LoadSpinner size={'sm'}/> : (isFollowing ? 'Dejar de Seguir' : 'Seguir')}</button>
    </div>
  )
}
