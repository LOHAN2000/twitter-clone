import React, { useState } from 'react'
import { XSvg } from '../../../components/svgs/Xsvg'
import { MdOutlinePassword } from 'react-icons/md'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const LoginPage = () => {

  const [formdata, setFormData] = useState({
    username: '',
    password: ''
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async (formdata) => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formdata)
        })

        if (!response.ok) {
          const errorData = await response.json()
          const errorMessage = errorData.message || 'Error interno del servidor'
          throw new Error(errorMessage)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        return data

      } catch (error) {
        toast.error(error.message)
        throw error
      }
    },
    onSuccess: () => {
      toast.success(`Bienvenido ${formdata.username}`)
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    mutate(formdata)
  }

  return(
    <div className='flex h-screen w-full justify-center sm:items-center pt-10 sm:pt-0'>
      <div className='flex flex-col w-4/5 mx-auto gap-y-2'>
        <div className='flex justify-center'>
            <XSvg className='w-[8%] sm:w-[4%] transition  fill-white'/>
        </div>
        <form onSubmit={onSubmit} className='flex flex-col justify-center items-center w-5/6 md:w-4/6 lg:w-3/6 mx-auto gap-y-3'>
          <h1 className='font-semibold sm:text-xl mb-2'>Inicia sesión en X</h1>
          <label className="input input-bordered flex items-center w-full sm:w-4/5 gap-2 h-8 md:h-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 lg:h-7 lg:w-7 opacity-70">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" name='username' className="grow sm:text-md " autoComplete="username" placeholder="Username" onChange={(e) => setFormData({...formdata, [e.target.name]:e.target.value})}/>
          </label>
          <label className="input input-bordered flex items-center w-full sm:w-4/5 gap-2 h-8 md:h-10">
            <MdOutlinePassword className="h-5 w-5 lg:h-7 lg:w-7 opacity-70"/>
            <input type="password" name='password' className="grow sm:text-md " autoComplete="current-password" placeholder="password" onChange={(e) => setFormData({...formdata, [e.target.name]:e.target.value})}/>
          </label>
          <button className='w-full sm:w-4/5 btn btn-primary btn-circle text-white font-extrabold md:text-lg mt-1'>{isPending ? 'Cargando' : 'Iniciar sesión'}</button>
          <p className='text-md md:text-lg'>¿No tienes una cuenta? <a href='/singup' className='text-primary'>Regístrate</a></p>
        </form>
      </div>
    </div>
  )
}
