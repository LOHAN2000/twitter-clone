import React, { useEffect, useState } from 'react'
import { GoHomeFill } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

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
    <div className="flex h-screen w-full mx-auto justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-[30%_40%_30%] w-full sm:w-4/5 h-full">

        {!isMobile && (
          <>
            <div className='flex w-full h-full'>
              menu
            </div>
            <div className='flex h-full items-start'>
              <div role="tablist" className="tabs tabs-bordered w-full grid grid-cols-2 h-[5%]">
                <a onClick={() => setHomeSection('forYou')} role="tab" className={`tab ${homeSection === 'forYou' ? 'tab-active' : ''} `}>Para tí</a>
                <a onClick={() => setHomeSection('following')} role="tab" className={`tab ${homeSection === 'following' ? 'tab-active' : ''} `}>Siguiendo </a>
              </div>
            </div>
            <div className='flex w-full h-full'>
              notification
            </div>
          </>
        )}
        

        {/* Mobile View */}

        {activeView === 'home' && isMobile && (
          <div className='flex h-full items-start'>
            <div role="tablist" className="tabs tabs-bordered w-full grid grid-cols-2 h-[5%]">
              <a onClick={() => setHomeSection('forYou')} role="tab" className={`tab ${homeSection === 'forYou' ? 'tab-active' : ''}`}>Para tí</a>
              <a onClick={() => setHomeSection('following')} role="tab" className={`tab ${homeSection === 'following' ? 'tab-active' : ''}`}>Siguiendo </a>
            </div>
          </div>
        )}
        {activeView === 'notification' && isMobile && (
          <div>notification</div>
        )}
        {activeView === 'profile' && isMobile && (
          <div>profile</div>
        )}
        
      </div>
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
