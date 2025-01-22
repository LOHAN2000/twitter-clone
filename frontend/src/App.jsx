import { Link, Route, Routes, useLocation } from "react-router-dom"
import { Home } from "./pages/home/Home.jsx"
import { SignupPage } from "./pages/auth/signup/SignupPage.jsx"
import { LoginPage } from "./pages/auth/login/LoginPage.jsx"
import { useEffect, useState } from "react"
import { Sidebar } from "./components/common/Sidebar.jsx"
import { NotificationPage } from "./pages/notification/NotificationPage.jsx"
import { RightPanel } from "./components/common/RIghtPanel.jsx"
import { ProfilePage } from "./pages/profile/ProfilePage.jsx"
import { GoHomeFill } from "react-icons/go"
import { MdOutlineEmail } from "react-icons/md"
import { FaRegCircleUser } from "react-icons/fa6"

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

  return (
    <div className=" max-w-[85rem] flex mx-auto">
      {!(location.pathname === '/login' || location.pathname === '/singup') && !isMobile && <Sidebar />}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/singup' element={<SignupPage/>}/>
          <Route path='/notifications' element={<NotificationPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
      {!(location.pathname === '/login' || location.pathname === '/singup') && !isMobile && <RightPanel />}
      {isMobile && (
        <div className="btm-nav">
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
