import React, { useState } from 'react'
import { XSvg } from '../svgs/Xsvg'
import { Link } from 'react-router-dom'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { FaRegUser, FaUser  } from "react-icons/fa6";
import { HiOutlineBell, HiMiniBell  } from "react-icons/hi2";
import { IoExitOutline } from "react-icons/io5";


export const Sidebar = () => {

  const [pageView, setPageView] = useState('home')

  return (
    <div className='flex-[2_2_0] border-e border-[rgb(47,51,54)]'>
      <div className='flex flex-col w-4/5 mx-auto h-screen justify-between py-2'>
        <div className='flex flex-col justify-start gap-y-2'>
          <Link to='/'>
            <XSvg className='fill-white w-[22%] hover:bg-[rgb(231,233,234,0.1)] rounded-full p-2'/>
          </Link>
          <div>
            <ul className='flex flex-col gap-y-1'>
              <Link to='/'>
                <li onClick={() => setPageView('home')} className='flex flex-row justify-start items-center gap-x-3 hover:bg-[rgb(231,233,234,0.1)] px-2 py-2.5  rounded-full '>
                  {pageView === 'home' ? <GoHomeFill className='h-[14%] w-[14%]'/> : <GoHome className='h-[14%] w-[14%]'/>}
                  <h1 className='font-bold text-sm md:text-lg'>Inicio</h1>
                </li>
              </Link>
              <Link to='/notifications'>
                <li onClick={() => setPageView('notifications')} className='flex flex-row justify-start items-center gap-x-3 hover:bg-[rgb(231,233,234,0.1)] px-2 py-2.5 rounded-full '>
                  {pageView === 'notifications' ? <HiMiniBell className='h-[14%] w-[14%]'/> : <HiOutlineBell className='h-[14%] w-[14%]'/>}
                  <h1 className='font-bold text-sm md:text-lg'>Notificaciones</h1>
                </li>
              </Link>
              <Link to='/profile'>
                <li onClick={() => setPageView('profile')} className='flex flex-row justify-start items-center gap-x-3 hover:bg-[rgb(231,233,234,0.1)] px-2.5 py-2.5 rounded-full '>
                  {pageView === 'profile' ? <FaUser className='h-[14%] w-[14%]'/> : <FaRegUser className='h-[14%] w-[14%]'/>}
                  <h1 className='font-bold text-sm md:text-lg'>Perfil</h1>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className='flex flex-row items-center rounded-full hover:bg-[rgb(231,233,234,0.1)] gap-x-3 justify-between px-2 py-1'>
          <div className='flex flex-row items-center gap-x-3'>
            <img src='/Twitter_default_profile_400x400.png' className='object-container w-1/4 h-1/4 rounded-full'/>
            <div className='flex flex-col w-full '>
              <h1 className='text-sm md:text-base'>Nombre</h1>
              <h1 className='text-sm md:text-base text-gray-600'>UserName</h1>
            </div>
          </div>
          <IoExitOutline className='w-2/4 h-2/4'/>
        </div>
      </div>
    </div>
  )
}
