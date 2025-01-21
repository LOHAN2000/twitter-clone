import React, { useRef, useState } from 'react'
import { SlOptions } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { LuRepeat2 } from "react-icons/lu";
import { FcLike } from "react-icons/fc";
import { Comment } from './Comment';


export const Post = () => {

  const formRef = useRef()
  const [response, setResponse] = useState({
    response: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(response)
  }

  return (
    <div className="flex flex-row px-4 py-3.5 gap-x-3.5 w-full border-b border-[rgb(47,51,54)]">
      <img
        src="/Twitter_default_profile_400x400.png"
        className="object-container w-[40px] h-[40px]  sm:w-[6%] sm:h-[6%] rounded-full"
      />
      <div className="flex flex-col w-full ">
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row gap-2 '>
            <h1 className='text-sm md:text-md font-semibold max-w-40 sm:max-w-28 md:max-w-44 lg:max-w-[18rem] xl:max-w-[24rem] truncate'> fdaslñkfjdkjfdasl kfjdasfdalskjfdasl kfjdas</h1>
            <h1 className='text-sm md:text-md font-extralight text-[rgb(47,51,54)] max-w-24 sm:max-w-24 md:max-w-28 lg:max-w-24 xl:max-w-36 truncate'>@UsernameUsername Username</h1>
            <h1 className='text-md font-extralight text-[rgb(47,51,54)] truncate'>Date</h1>
          </div>
          <SlOptions className='text-[rgb(47,51,54)]'/>
        </div>
        <h1>hcomentacior dliasfl kjlfkdjsalk  jfldkajlfkdjsaj l kjlkjsad ljfldkajlfkdjsajlkjsdalk ja lksjalk jsladkjslkaj</h1>
        <div className='mt-2'>
          <img src='https://images.unsplash.com/photo-1737142928495-ca54258b1e81?q=80&w=2159&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='object-contain rounded-2xl'/>
        </div>
        <div className='mt-2 w-3/4 px-2'>
          <div className='flex flex-row justify-between items-center'>
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className='flex flex-row text-[rgb(47,51,54)] item-center gap-x-1.5'><i className="fa-regular fa-comment pt-0.5"></i><h1 className='text-sm'>21</h1></button>
            <LuRepeat2 className='text-[rgb(47,51,54)] w-5 h-5'/>
            <a className='flex flex-row text-[rgb(47,51,54)] items-center gap-x-1.5'><i className="fa-regular fa-heart"></i><h1 className='text-sm'>5</h1></a>
          </div>
        </div>
      </div>
      {/* MODAL */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box p-4 pt-9 flex flex-col rounded-xl max-w-md  md:max-w-screen-sm">
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
              <form ref={formRef} onSubmit={onSubmit} className='flex overflow-x-hidden w-full'>
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
    </div>
  )
}
