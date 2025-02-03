import React from 'react'
import { formatPostDate } from '../../utils/date'
import { Link } from 'react-router-dom'

export const Comment = ({ comment }) => {

  const { user, text, createdAt } = comment

  const date = formatPostDate(createdAt)

  return (
    <div className='flex flex-row gap-x-3'>
      <Link className='w-[40px] h-[40px] sm:w-[7%] sm:h-[7%]' to={`/profile/${user.username}`}>
        <img src={user.profileImg ||"/Twitter_default_profile_400x400.png"} className="object-contain  rounded-full"/>
      </Link>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row items-center gap-x-2'>
          <Link to={`/profile/${user.username}`}>
            <h1 className='text-sm md:text-md font-semibold max-w-60 sm:max-w-52 lg:max-w-[12rem] xl:max-w-[14rem] truncate capitalize'>{user.fullname}</h1>
          </Link>
            <h1 className='text-sm md:text-md font-extralight text-[rgb(47,51,54)] max-w-24 sm:max-w-24 md:max-w-28 lg:max-w-24 xl:max-w-36 truncate capitalize'>@{user.username}</h1>
            <h1 className='text-sm font-extralight text-[rgb(47,51,54)] truncate'>{date}</h1>
        </div>
        <h1 className='text-sm md:text-base'>{text}</h1>
      </div>
    </div>
  )
}
