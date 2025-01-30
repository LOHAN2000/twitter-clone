import React, { useEffect, useState } from 'react'
import { CreatePost } from './CreatePost.jsx';
import { Posts } from '../../components/common/Posts.jsx';
import { useLocation } from 'react-router-dom';
import { XSvg } from '../../components/svgs/Xsvg.jsx';
import { IoExitOutline } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';
import { useLogout } from '../../hooks/useLogout.js';

export const Home = () => {

  const [isMobile, setIsMobile] = useState(false)
  const [activeView, setActiveView] = useState('home')
  const [homeSection, setHomeSection] = useState('forYou')
  const location = useLocation()

  const { mutate: logout, isPending } = useLogout()

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  },[])

  return (
    <div className="flex-[4_4_0] w-full">
      {!isMobile && (
        <>
          <div className='flex flex-col items-start '>
            <div role="tablist" className="tabs tabs-bordered w-[99.8%] mx-auto grid grid-cols-2 h-10 sticky top-0 bg-black">
              <a onClick={() => setHomeSection('forYou')} role="tab" className={`tab ${homeSection === 'forYou' ? 'tab-active' : ''} `}>Para tí</a>
              <a onClick={() => setHomeSection('following')} role="tab" className={`tab ${homeSection === 'following' ? 'tab-active' : ''} `}>Siguiendo </a>
            </div>
            <CreatePost/>
            <Posts/>
          </div>
        </>
      )}
      
      {/* Mobile View */}

      {activeView === 'home' && isMobile && (
        <div className='flex flex-col h-full items-start '>
          <div className='w-full sticky top-0 bg-black/50 backdrop-blur-md'>
            <div className='flex flex-row justify-center items-center w-full  relative '>
              <XSvg className='fill-white w-7 h-7 mt-2'/>
              <IoExitOutline onClick={() => logout()} className='absolute right-3 w-6 h-6 text-gray-400'/>
            </div>
            <div role="tablist" className="tabs tabs-bordered w-full grid grid-cols-2 h-[5%] ">
              <a onClick={() => setHomeSection('forYou')} role="tab" className={`tab ${homeSection === 'forYou' ? 'tab-active' : ''} `}>Para tí</a>
              <a onClick={() => setHomeSection('following')} role="tab" className={`tab ${homeSection === 'following' ? 'tab-active' : ''} `}>Siguiendo </a>
            </div>
          </div>
            <CreatePost/>
            <Posts/>
        </div>
      )}
    </div>
  )
}
