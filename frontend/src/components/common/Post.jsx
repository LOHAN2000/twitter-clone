import React, { useState } from 'react'
import { SlOptions } from "react-icons/sl";
import { LuRepeat2 } from "react-icons/lu";
import { Comment } from './Comment';


export const Post = ({ post }) => {

  const { text, img, user, createtAt, comments, likes} = post

  const [response, setResponse] = useState({
    response: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(response)
  }

  const samePerson = false

  return (
    <div className="flex flex-row px-4 py-3.5 gap-x-3.5 w-full border-b border-[rgb(47,51,54)]">
      <img
        src={user.profileImg ||"/Twitter_default_profile_400x400.png"} className="object-container w-[40px] h-[40px]  sm:w-[6%] sm:h-[6%] rounded-full"
      />
      <div className="flex flex-col w-full ">
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row gap-2 '>
            <h1 className='text-sm md:text-md font-semibold max-w-40 sm:max-w-28 md:max-w-44 lg:max-w-[18rem] xl:max-w-[24rem] truncate'>{user.username}</h1>
            <h1 className='text-sm md:text-md font-extralight text-[rgb(47,51,54)] max-w-24 sm:max-w-24 md:max-w-28 lg:max-w-24 xl:max-w-36 truncate'>@{user.fullname}</h1>
            <h1 className='text-md font-extralight text-[rgb(47,51,54)] truncate'>Date</h1>
          </div>
          <div className='dropdown dropdown-end'>
            <SlOptions tabIndex={0} role='button' className='text-[rgb(47,51,54)]'/>
            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-lg z-[1] w-44 sm:w-36 md:w-52 p-2 shadow'>
              <li onClick={() => document.getElementById('modal_delete').showModal()} className='text-md font-semibold text-red-600'><a>Eliminar</a></li>
            </ul>
          </div>
        </div>
        <h1>{text}</h1>
        <div className='mt-2'>
          <img src={img} className='object-contain rounded-2xl'/>
        </div>
        <div className='mt-2 w-3/4 px-2'>
          <div className='flex flex-row justify-between items-center'>
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className='flex flex-row text-[rgb(47,51,54)] item-center gap-x-1.5'><i className="fa-regular fa-comment pt-0.5"></i><h1 className='text-sm'>{comments.length}</h1></button>
            <LuRepeat2 className='text-[rgb(47,51,54)] w-5 h-5'/>
            <a className='flex flex-row text-[rgb(47,51,54)] items-center gap-x-1.5'><i className="fa-regular fa-heart"></i><h1 className='text-sm'>{likes.length}</h1></a>
          </div>
        </div>
      </div>
      {/* MODAL */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box p-4 pt-12 flex flex-col rounded-xl max-w-md  md:max-w-screen-sm">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute left-1 top-1">✕</button>
          </form>
          <div className='flex flex-col gap-y-3'>
            <div className='flex flex-row gap-x-3'>
              <img src="/Twitter_default_profile_400x400.png" className="object-container w-[40px] h-[40px]  sm:w-[7%] sm:h-[7%] rounded-full"/>
              <div className='flex flex-col w-full'>
                <div className='flex flex-row items-center gap-x-2'>
                    <h1 className='text-sm md:text-md font-semibold max-w-60 sm:max-w-52 lg:max-w-[12rem] xl:max-w-[14rem] truncate'>LOHAN</h1>
                    <h1 className='text-sm md:text-md font-extralight text-[rgb(47,51,54)] max-w-24 sm:max-w-24 md:max-w-28 lg:max-w-24 xl:max-w-36 truncate'>@lorem10 lkdsajfds</h1>
                    <h1 className='text-sm font-extralight text-[rgb(47,51,54)] truncate'>Date</h1>
                </div>
                <h1 className='text-sm md:text-base'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, soluta blanditiis quas quidem animi nesciunt molestias laudantium, laborum asperiores iusto id consequatur nostrum suscipit. A!</h1>
              </div>
            </div>
            <div className='flex flew-row gap-x-3 w-full'>
              <img src='/Twitter_default_profile_400x400.png' className='object-container w-[40px] h-[40px]  sm:w-[7%] sm:h-[7%] rounded-full'/>
              <form onSubmit={onSubmit} className='flex overflow-x-hidden w-full'>
                <textarea onChange={(e) => setResponse({...response, [e.target.name]: e.target.value})} name="response" type="text" placeholder="Postea tu respuesta ahora" className="py-2 max-h-48 w-full h-20 resize-none overflow-y-auto border-none focus:outline-none bg-inherit text-md"/> 
              </form>
            </div>
            <div className='flex flex-col max-h-96 gap-y-6 overflow-y-auto'>
              <Comment/>
            </div>
            <div className='flex justify-end'>
              <button onClick={onSubmit} className={`bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-3 ${response.response.length === 0 ? 'btn btn-disabled' : ''}`}>Responder</button>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className=''>close</button>
        </form>
      </dialog>
      <dialog id="modal_delete" className='modal'>
        <div className='modal-box px-6 py-5 flex flex-col rounded-xl max-w-72 sm:max-w-64  md:max-w-80'>
          <div className='flex flex-col justify-center gap-y-2'>
            <h1 className='text-center font-extrabold text-xl'>¿Deseas eliminar post?</h1>
            <p className='font-extralight text-md text-gray-500'>Esta acción no se pude revertir, y se eliminará de tu perfil, de la cronología de las cuentas que te sigan y de los resultados de búsqueda.</p>
            <button className={`my-1 btn btn-error rounded-full text-white ${samePerson ? '' : 'btn-disabled'}`}>{samePerson ? 'Eliminar' : 'No hay permisos'}</button>
            <form method="dialog" className='flex flex-row'> 
              <button className='btn btn-secondary rounded-full text-white w-full'>Cancelar</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
