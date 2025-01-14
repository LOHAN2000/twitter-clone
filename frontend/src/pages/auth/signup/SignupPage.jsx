import React, { useState } from 'react'
import { LuPencilLine } from 'react-icons/lu'
import { MdOutlinePassword } from 'react-icons/md'
import { XSvg } from '../../../components/svgs/Xsvg'
import { Link } from 'react-router-dom'

export const SignupPage = () => {

  const [formdata, setFormData] = useState({
    email: '',
    username: '',
    fullname: '',
    password: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(formdata)
  }

  return (
    <div className='flex h-screen w-full mx-auto justify-center sm:items-center items-start pt-10 sm:pt-0'>
      <div className='grid grid-cols-1 w-3/4 sm:h-3/4 2xl:grid-cols-2 sm:grid-cols-[20%_80%] transition-all ease-in-out gap-x-36 2xl:gap-x-2 gap-y-3'>
        <div className='flex justify-start items-center sm:justify-center'>
          <XSvg className='max-w-10 sm:max-w-lg transition h-3/4 fill-white'/>
        </div>
        <div className='flex flex-col gap-y-7 sm:gap-y-16 2xl:gap-y-16'>
          <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl  text-start font-black w-2/3 2xl:w-2/3'>Lo que está pasando ahora</h1>
          <form onSubmit={onSubmit} className='flex flex-col gap-y-3 sm:gap-y-6 w-full items-start mx-auto '>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-black 2xl:w-2/3'>Únete hoy</h1>
            <label className="input input-bordered flex items-center w-full sm:w-4/5 gap-2 h-12 md:h-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 lg:h-7 lg:w-7 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" name='email' className="grow sm:text-xl" placeholder="Email" onChange={(e) => setFormData({...formdata, [e.target.name]:e.target.value})}/>
            </label>
            <label className="input input-bordered flex items-center w-full sm:w-4/5 gap-2 h-12 md:h-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 lg:h-7 lg:w-7 opacity-70">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" name='username' className="grow sm:text-xl" autoComplete="username" placeholder="Username" onChange={(e) => setFormData({...formdata, [e.target.name]:e.target.value})}/>
            </label>
            <label className="input input-bordered flex items-center w-full sm:w-4/5 gap-2 h-12 md:h-16">
              <LuPencilLine className="h-5 w-5 lg:h-7 lg:w-7 opacity-70"/>
              <input type="text" name='fullname' className="grow sm:text-xl" autoComplete="fullname" placeholder="Full Name" onChange={(e) => setFormData({...formdata, [e.target.name]:e.target.value})}/>
            </label>
            <label className="input input-bordered flex items-center w-full sm:w-4/5 gap-2 h-12 md:h-16">
              <MdOutlinePassword className="h-5 w-5 lg:h-7 lg:w-7 opacity-70"/>
              <input type="password" name='password' className="grow sm:text-xl" autoComplete="current-password" placeholder="Password" onChange={(e) => setFormData({...formdata, [e.target.name]:e.target.value})}/>
            </label>
            <button className='w-full sm:w-4/5 btn btn-primary btn-circle text-white font-extrabold md:text-lg'>Crear cuenta</button>
          </form>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-xl font-sans font-extralight 2xl:w-2/3'>¿Ya tienes una cuenta?</h1>
            <Link to='/login'>
              <button className='w-full sm:w-4/5 btn btn-outline btn-circle text-white font-extrabold md:text-lg'>Iniciar sesión</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
