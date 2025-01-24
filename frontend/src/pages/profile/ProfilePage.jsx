import React, { useRef, useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaLink } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Posts } from '../../components/common/Posts';
import { FaRegEdit } from "react-icons/fa";

export const ProfilePage = () => {
  
  const isMyProfile = true
  const [homeSection, setHomeSection] = useState('forYou')
  const [imgProfile, setImageProfile] = useState('')
  const [bannerProfile, setBannerProfile] = useState(null)

  const imgProfRef = useRef(null)
  const bannerProfRef = useRef(null)

  const handleImageCHange = (e, state) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        state === 'imgProfile' && setImageProfile(reader.result)
        state === 'bannerProfile' && setBannerProfile(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='flex-[4_4_0]'>
      <div className='flex flex-row w-full items-center p-2 px-4 gap-x-5'>
        <Link to={'/'}>
          <IoArrowBack style={{fill: 'white'}} className='w-6 h-6 sm:w-4 sm:h-4 md:w-6 md:h-6'/>
        </Link>
        <div className='flex flex-col'>
          <p className='font-bold text-lg'>Username</p>
          <span className='text-[rgb(47,51,54)] font-extralight'>511 posts</span>
        </div>
      </div>
      <div className='flex flex-col '>
        <div className='relative group/imgBanner'>
          <img src={bannerProfile || './BannerPlaceholder.png'} className='object-cover object-center w-full h-52 sm:h-48 md:h-56'/>
          <input type='file' hidden ref={bannerProfRef} onChange={(e) => {handleImageCHange(e, 'bannerProfile')}}/>
          {isMyProfile && (
            <FaRegEdit onClick={() => bannerProfRef.current.click()} className='absolute top-1 right-1 w-11 h-11 group-hover/imgBanner:opacity-100 opacity-0 bg-gray-300/50 p-2 rounded-xl cursor-pointer'/>
          )}
          <div className='relative group/imgProfile '>
            <img src={imgProfile || './Twitter_default_profile_400x400.png'} className='absolute w-32 h-32 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-cover object-center border-4 border-black -bottom-16 ms-4'/>
            <input type='file' hidden ref={imgProfRef} onChange={(e) => {handleImageCHange(e, 'imgProfile')}}/>
            {isMyProfile && (
              <FaRegEdit onClick={() => imgProfRef.current.click()} className='absolute -top-[60px] left-[20px] sm:-top-[43.1px] sm:left-[22px] md:-top-[75.1px] md:left-[21.5px] h-[120px] w-[120px] sm:h-[101px] sm:w-[101px] md:w-[133px] md:h-[133px] bg-gray-300/50 fill-slate-100 p-8 sm:p-6 md:p-10 rounded-full group-hover/imgProfile:opacity-100 opacity-0 cursor-pointer'/>
            )}
          </div>
        </div>
        {isMyProfile ? (
          <div className='flex justify-end items-center m-3'>
            <button onClick={() => document.getElementById('modal_edit').showModal()} className='btn btn-outline sm:px-5 md:px-7 border-[rgb(47,51,54)] rounded-full text-white'>Editar perfil</button>
          </div>
        ) : (
          <div className='flex justify-end items-center m-3'>
            <button className='btn btn-outline sm:px-5 md:px-7 border-[rgb(47,51,54)] rounded-full text-white'>Seguir</button>
          </div>
        )}
        <div className='flex flex-col m-4 mt-5 gap-y-1 overflow-hidden'>
          <h1 className='font-extrabold text-md md:text-xl'>Nombre</h1>
          <h1 className='text-[rgb(47,51,54)] text-sm sm:text-xs md:text-base'>@Username</h1>
          <p className='mt-2 text-xs md:text-base'>lorem30</p>
          <div className='flex flex-row gap-x-1 items-center mt-1'>
            <FaLink className='text-[rgb(47,51,54)]'/> 
            <a className='flex items-center gap-x-1 underline text-sm sm:text-xs md:text-base text-blue-500 cursor-pointer max-w-md truncate'>Link</a>
            <h1 className='text-[rgb(47,51,54)] ms-4 flex items-center gap-x-1'><FaRegCalendarAlt/>Date</h1>
          </div>
          <div className='flex row mt-2 gap-x-2 text-sm sm:text-xs md:text-base'>
            <h1>2 <span className='text-[rgb(47,51,56)]'>Following</span></h1>
            <h1>3 <span className='text-[rgb(47,51,56)]'>Followers</span></h1>
          </div>
        </div>
        <div role="tablist" className="tabs tabs-bordered mb-2 grid w-[99.8%] mx-auto grid-cols-2 h-12 sticky top-0 bg-black">
          <a onClick={() => setHomeSection('forYou')} role="tab" className={`tab ${homeSection === 'forYou' ? 'tab-active' : ''} `}>Para tí</a>
          <a onClick={() => setHomeSection('following')} role="tab" className={`tab ${homeSection === 'following' ? 'tab-active' : ''} `}>Siguiendo </a>
        </div>
        <Posts/>
      </div>
      <dialog id="modal_edit" className='modal'>
        <div className='modal-box p-4 pt-4 flex flex-col rounded-xl max-w-md  md:max-w-screen-xs'>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute left-1 top-4">✕</button>
          </form>
          <div className='flex flex-col gap-y-2'>
            <div className='flex flex-row justify-between ps-8 items-center'>
              <h1>Editar perfil</h1>
              <button className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-3'>Confirmar</button>
            </div>
            <div className='relative mt-2'>
              <input type="text" id='name' placeholder="" className="input input-bordered w-full text-base pt-5 peer"/>
              <label for="name" className='absolute left-4  text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500'>Nombre</label>
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
