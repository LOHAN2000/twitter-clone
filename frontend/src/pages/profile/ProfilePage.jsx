import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaLink } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Posts } from '../../components/common/Posts';

export const ProfilePage = () => {
  
  const isMyProfile = false
  const [homeSection, setHomeSection] = useState('forYou')

  return (
    <div className='flex-[4_4_0]'>
      <div className='flex flex-row w-full items-center p-2 px-4 gap-x-5'>
        <Link to={'/'}>
          <IoArrowBack style={{fill: 'white'}} className='w-6 h-6 sm:w-4 sm:h-4 md:w-6 md:h-6'/>
        </Link>
        <div className='flex flex-col'>
          <p className='font-bold text-lg'>Username</p>
          <span className='text-[rgb(47,51,54)] font-extralight'>511 posts</span>
        </div>
      </div>
      <div className='flex flex-col '>
        <div className='relative'>
          <img src='https://images.unsplash.com/photo-1735292626224-9cbee37fd0d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='object-cover object-center w-full h-52 sm:h-48 md:h-56'/>
          <h1 className='absolute top-0 left-10 text-black'>Hola</h1>
          <div className='relative'>
            <img src='https://plus.unsplash.com/premium_photo-1736782400256-78c23f2d3a68?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='absolute w-32 h-32 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-cover object-center border-4 border-black -bottom-16 ms-4'/>
            <h1 className='absolute -top-10 left-28 text-black'>Hola</h1>
          </div>
        </div>
        {isMyProfile ? (
          <div className='flex justify-end items-center m-3'>
            <button className='btn btn-outline sm:px-5 md:px-7 border-[rgb(47,51,54)] rounded-full text-white'>Editar perfil</button>
          </div>
        ) : (
          <div className='flex justify-end items-center m-3'>
            <button className='btn btn-outline sm:px-5 md:px-7 border-[rgb(47,51,54)] rounded-full text-white'>Seguir</button>
          </div>
        )}
        <div className='flex flex-col m-4 mt-5 gap-y-1 overflow-hidden'>
          <h1 className='font-extrabold text-md md:text-xl'>Nombre</h1>
          <h1 className='text-[rgb(47,51,54)] text-sm sm:text-xs md:text-base'>@Username</h1>
          <p className='mt-2 text-xs md:text-base'>lorem30</p>
          <div className='flex flex-row gap-x-1 items-center mt-1'>
            <FaLink className='text-[rgb(47,51,54)]'/> 
            <a className='flex items-center gap-x-1 underline text-sm sm:text-xs md:text-base text-blue-500 cursor-pointer max-w-md truncate'>Link</a>
            <h1 className='text-[rgb(47,51,54)] ms-4 flex items-center gap-x-1'><FaRegCalendarAlt/>Date</h1>
          </div>
          <div className='flex row mt-2 gap-x-2 text-sm sm:text-xs md:text-base'>
            <h1>2 <span className='text-[rgb(47,51,56)]'>Following</span></h1>
            <h1>3 <span className='text-[rgb(47,51,56)]'>Followers</span></h1>
          </div>
        </div>
        <div role="tablist" className="tabs tabs-bordered mb-2 grid w-[99.8%] mx-auto grid-cols-2 h-12 sticky top-0 ">
          <a onClick={() => setHomeSection('forYou')} role="tab" className={`tab ${homeSection === 'forYou' ? 'tab-active' : ''} `}>Para tí</a>
          <a onClick={() => setHomeSection('following')} role="tab" className={`tab ${homeSection === 'following' ? 'tab-active' : ''} `}>Siguiendo </a>
        </div>
        <Posts/>
      </div>
    </div>
  )
}
