import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/home/Home.jsx"
import { SignupPage } from "./pages/auth/signup/SignupPage.jsx"
import { LoginPage } from "./pages/auth/login/LoginPage.jsx"

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/singup' element={<SignupPage/>}/>
      </Routes>
    </div>
  )
}

export default App
