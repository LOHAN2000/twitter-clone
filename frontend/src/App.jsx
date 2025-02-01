import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Home } from "./pages/home/Home.jsx"
import { SignupPage } from "./pages/auth/signup/SignupPage.jsx"
import { LoginPage } from "./pages/auth/login/LoginPage.jsx"
import { useEffect, useState } from "react"
import { Sidebar } from "./components/common/Sidebar.jsx"
import { NotificationPage } from "./pages/notification/NotificationPage.jsx"
import { RightPanel } from "./components/common/RightPanel.jsx"
import { ProfilePage } from "./pages/profile/ProfilePage.jsx"
import { GoHomeFill } from "react-icons/go"
import { MdOutlineEmail } from "react-icons/md"
import { FaRegCircleUser } from "react-icons/fa6"
import { useQuery } from "@tanstack/react-query"
import { LoadSpinner } from "./components/common/LoadSpinner.jsx"

function App() {

  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

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

  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/auth/getMe')

        if (response.status === 401) {
          return null
        }
        if (!response.ok) {
          throw new Error('Error del servidor')
        }
        const data = await response.json()
        
        return data

      } catch (error) {
        throw new Error(error)
      }
    },
    retry: false
  })

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadSpinner size="lg"/>
      </div>
    )
  }

  return (
    <div className=" max-w-[85rem] flex mx-auto">
      {!(location.pathname === '/login' || location.pathname === '/singup') && !isMobile && authUser && <Sidebar />}
        <Routes>
          <Route path='/' element={authUser ? <Home/> : <Navigate to='/login'/>}/>
          <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/'/>}/>
          <Route path='/singup' element={!authUser ? <SignupPage/> : <Navigate to='/'/>}/>
          <Route path='/notifications' element={authUser ? <NotificationPage/> : <Navigate to='login'/>}/>
          <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to='/login'/>}/>
        </Routes>
      {!(location.pathname === '/login' || location.pathname === '/singup') && !isMobile && authUser &&  <RightPanel />}
      {isMobile && !(location.pathname === '/login' || location.pathname === '/singup') && (
        <div className="btm-nav ">
          <Link to={'/'} className={`${location.pathname === '/' ? 'active' : ''}`}>
            <button className="">
              <GoHomeFill className='h-8 w-8'/>
            </button>
          </Link>
          <Link to={'/notifications'} className={`${location.pathname === '/notifications' ? 'active' : ''}`}>
            <button className="">
              <MdOutlineEmail className='h-8 w-8'/>
            </button>
          </Link>
          <Link to={'/profile'} className={`${location.pathname === '/profile' ? 'active' : ''}`}>
            <button>
              <FaRegCircleUser className='h-8 w-8'/>
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default App
