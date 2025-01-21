import React from 'react'

export const Comment = () => {
  return (
    <div className='flex flex-row gap-x-3'>
      <img src="/Twitter_default_profile_400x400.png" className="object-container w-[40px] h-[40px]  sm:w-[7%] sm:h-[7%] rounded-full"/>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row items-center gap-x-2'>
            <h1 className='text-sm md:text-md font-semibold max-w-60 sm:max-w-52 lg:max-w-[12rem] xl:max-w-[14rem] truncate'>LOHAN</h1>
            <h1 className='text-sm md:text-md font-extralight text-[rgb(47,51,54)] max-w-24 sm:max-w-24 md:max-w-28 lg:max-w-24 xl:max-w-36 truncate'>@lorem10 lkdsajfds</h1>
            <h1 className='text-sm font-extralight text-[rgb(47,51,54)] truncate'>Date</h1>
        </div>
        <h1 className='text-sm md:text-base'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, soluta blanditiis quas quidem animi nesciunt molestias laudantium, laborum asperiores iusto id consequatur nostrum suscipit. A!</h1>
      </div>
    </div>
  )
}
