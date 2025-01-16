import React, { useEffect, useState } from 'react'
import { GoHomeFill } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { CreatePost } from './createPost';
import { Post } from '../../components/common/Post';
import { Sidebar } from '../../components/common/Sidebar';

export const Home = () => {

  const [isMobile, setIsMobile] = useState(false)
  const [activeView, setActiveView] = useState('home')
  const [homeSection, setHomeSection] = useState('forYou')

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
    <div className="flex-[4_4_0] h-screen w-full">
      {!isMobile && (
        <>
          <div className='flex flex-col h-full items-start '>
            <div role="tablist" className="tabs tabs-bordered w-full grid grid-cols-2 h-[5%]">
              <a onClick={() => setHomeSection('forYou')} role="tab" className={`tab ${homeSection === 'forYou' ? 'tab-active' : ''} `}>Para tí</a>
              <a onClick={() => setHomeSection('following')} role="tab" className={`tab ${homeSection === 'following' ? 'tab-active' : ''} `}>Siguiendo </a>
            </div>
            <CreatePost/>
            <Post/>
          </div>
        </>
      )}
      

      {/* Mobile View */}

      {activeView === 'home' && isMobile && (
        <div className='flex flex-col h-full items-start'>
        <div role="tablist" className="tabs tabs-bordered w-full grid grid-cols-2 h-[5%]">
          <a onClick={() => setHomeSection('forYou')} role="tab" className={`tab ${homeSection === 'forYou' ? 'tab-active' : ''} `}>Para tí</a>
          <a onClick={() => setHomeSection('following')} role="tab" className={`tab ${homeSection === 'following' ? 'tab-active' : ''} `}>Siguiendo </a>
        </div>
          <CreatePost/>
          <Post/>
        </div>
      )}
      {activeView === 'notification' && isMobile && (
        <div>notification</div>
      )}
      {activeView === 'profile' && isMobile && (
        <div>profile</div>
      )}
        
      {isMobile && (
        <div className="btm-nav">
          <button onClick={() => setActiveView('home')} className={`${activeView === 'home' ? 'active' : ''}  `}>
            <GoHomeFill className='h-2/5 w-2/5'/>
          </button>
          <button onClick={() => setActiveView('notification')} className={`${activeView === 'notification' ? 'active' : ''} `}>
            <MdOutlineEmail className='h-2/5 w-2/5'/>
          </button>
          <button onClick={() => setActiveView('profile')} className={`${activeView === 'profile' ? 'active' : ''} `}>
            <FaRegUser className='h-2/5 w-2/5'/>
          </button>
        </div>
      )}
    </div>
  )
}
