import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { data, Link, useParams } from 'react-router-dom';
import { FaLink } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Posts } from '../../components/common/Posts';
import { FaRegEdit } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadSpinner } from '../../components/common/LoadSpinner';
import { ProfileSkeleton } from '../../components/skeletons/ProfileSkeleton';
import { formatMemberSinceDate } from '../../utils/date';
import { useFollow } from '../../hooks/useFollow';
import { RightPanelUser } from '../../components/common/RightPanelUser.jsx';
import { toast } from 'sonner';

export const ProfilePage = () => {

  const queryClient = useQueryClient();
  
  const { username } = useParams()
  const { data:authUser } = useQuery({ queryKey: ['authUser']})
  const [homeSection, setHomeSection] = useState('posts')
  const [profileImg, setImageProfile] = useState('')
  const [coverImg, setBannerProfile] = useState('')
  const [updateImg, setUpdateImg] = useState(false)
  const [userType, setUserType] = useState('')
  const [dataForm, setDataForm] = useState({
    fullname: '',
    username: '',
    bio: '',
    link: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  })
  const bannerProfRef = useRef(null)
  const imgProfRef = useRef(null)
  
  const handleImageCHange = (e, state) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        state === 'profileImg' && setImageProfile(reader.result)
        state === 'coverImg' && setBannerProfile(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const { data: user, isPending: isPendingUser, refetch, isRefetching } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/user/profile/${username}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message)
        }

        const data = await response.json()

        if (data.Error) {
          throw new Error(data.Error)
        }

        return data
        
      } catch (error) {
        throw new Error(error)
      }
    }
  })

  const { mutate: update, isPending:isPendingUpdate } = useMutation({
    mutationFn: async (dataProfile) => {
      try {
        const response = await fetch(`/api/user/update`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataProfile)
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message)
        }

        const data = await response.json()

        if (data.Error) {
          throw new Error(data.Error)
        }

        return data

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    },
    onSuccess: async (data) => {
      toast.success(data.message);
      console.log(data)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['authUser']}),
        queryClient.invalidateQueries({ queryKey: ['userProfile']})
      ]);
      
      setTimeout(() => {
        setImageProfile(null);
        setBannerProfile(null);
      }, 100);
    }
  })

  const { mutate: follow, isPending } = useFollow()

  const isFollowing = authUser?.User?.following.includes(user?.User?._id)

  const date = formatMemberSinceDate(user?.User.createdAt)

  useEffect(() => {
    refetch()
    setBannerProfile(null)
    setImageProfile(null)
  }, [username, refetch, updateImg])

  const isMyProfile = user?.User?._id === authUser?.User?._id

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(dataForm)
    await update(dataForm)
  }

  return (
    <div className='flex-[4_4_0]'>
      <div className='flex flex-row w-full items-center p-2 px-4 gap-x-5'>
        <Link to={'/'}>
          <IoArrowBack style={{fill: 'white'}} className='w-6 h-6 sm:w-4 sm:h-4 md:w-6 md:h-6'/>
        </Link>
        <div className='flex flex-col'>
          <p hidden={isRefetching} className='font-bold text-lg'>{user?.User.username}</p>
          <span hidden={isRefetching} className='text-[rgb(47,51,54)] font-extralight'>{`${user?.postCount} ${user?.postCount === 1 ? 'Post' : 'Posts'}`}</span>
        </div>
      </div>
      <div className='flex flex-col'>
        {(isPendingUser || isRefetching) ? (
          <ProfileSkeleton/>
        ): (
          <>
          <div className='relative group/imgBanner'>
            <img src={coverImg || (isRefetching ? user.User.coverImg : user.User.coverImg) || '../BannerPlaceholder.png'} className='object-cover object-center w-full h-52 sm:h-48 md:h-56'/>
            <input type='file' hidden ref={bannerProfRef} onChange={(e) => {handleImageCHange(e, 'coverImg')}}/>
            {isMyProfile && (
              <FaRegEdit onClick={() => bannerProfRef.current.click()} className='absolute top-1 right-1 w-11 h-11 group-hover/imgBanner:opacity-100 opacity-0 bg-gray-400/50 p-2 rounded-xl cursor-pointer'/>
            )}
            <div className='relative group/imgProfile '>
              <img src={profileImg || (isRefetching ? user.User.profileImg : user.User.profileImg) || '../Twitter_default_profile_400x400.png'} className='absolute w-32 h-32 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-cover object-center border-4 border-black -bottom-16 ms-4'/>
              <input type='file' hidden ref={imgProfRef} onChange={(e) => {handleImageCHange(e, 'profileImg')}}/>
              {isMyProfile && (
                <FaRegEdit onClick={() => imgProfRef.current.click()} className='absolute -top-[60px] left-[20px] sm:-top-[43.1px] sm:left-[22px] md:-top-[75.1px] md:left-[21.5px] h-[120px] w-[120px] sm:h-[101px] sm:w-[101px] md:w-[133px] md:h-[133px] bg-gray-300/50 fill-slate-100 p-8 sm:p-6 md:p-10 rounded-full group-hover/imgProfile:opacity-100 opacity-0 cursor-pointer'/>
              )}
            </div>
          </div>
          {isMyProfile ? (
            <div className='flex justify-end items-center m-3 gap-x-2'>
              <button onClick={() => document.getElementById(`modal_edit_${user.User._id}`).showModal()} className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-3'>Editar perfil</button>
              {(profileImg || coverImg) && (
                <button onClick={() => {setBannerProfile(null), setImageProfile(null)}} className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-4'>Eliminar</button>
              )}
              {(profileImg || coverImg) && (
                <button onClick={() => update({profileImg, coverImg})} className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-4'>{isPendingUpdate ? <LoadSpinner/> : 'Confirmar'}</button>
              )}
            </div>
          ) : (
            <div className='flex justify-end items-center m-3'>
              <button onClick={() => follow(user.User._id)} className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-4'>{isPending ? <LoadSpinner/> : isFollowing ? 'Dejar de Seguir' : 'Seguir'}</button>
            </div>
          )}
          <div className='flex flex-col m-4 mt-5 gap-y-1 overflow-hidden'>
            <h1 className='font-extrabold text-md md:text-xl'>{user.User.fullname}</h1>
            <h1 className='text-[rgb(47,51,54)] text-sm sm:text-xs md:text-base'>@{user.User.username}</h1>
            {user.User.bio && (<p className='mt-2 text-sm md:text-base'>{user.User.bio}</p>)}
            <div className='flex flex-row gap-x-1 items-center mt-1'>
              {user.User.link?.length > 0 && (
                <>
                  <FaLink className='text-[rgb(47,51,54)]'/> 
                  <a className='flex items-center gap-x-1 underline text-sm sm:text-xs md:text-base text-blue-500 cursor-pointer max-w-md truncate'>{user.User.link}</a>
                </>)}
              <h1 className={`text-[rgb(47,51,54)] ${user.User.link ? 'ms-4' : 'ms-0'} flex items-center gap-x-1`}><FaRegCalendarAlt/>{date}</h1>
            </div>
            <div className='flex row mt-2 gap-x-2 text-sm sm:text-xs md:text-base'>
              <h1 onClick={() => {setUserType('following'), document.getElementById(`modal_user_${userType}`).showModal()}}>{user.User.following?.length} <span className='text-[rgb(47,51,56)] hover:underline cursor-pointer'>Siguiendo</span></h1>
              <h1 onClick={() => {setUserType('followers'), document.getElementById(`modal_user_${userType}`).showModal()}}>{user.User.followers?.length} <span className='text-[rgb(47,51,56)] hover:underline cursor-pointer'>Seguidores</span></h1>
            </div>
          </div>
          <div role="tablist" className="tabs tabs-bordered mb-2 grid w-[99.8%] mx-auto grid-cols-2 h-12 sticky top-0 bg-black">
            <a onClick={() => setHomeSection('posts')} role="tab" className={`tab ${homeSection === 'posts' ? 'tab-active' : ''} `}>Posts</a>
            <a onClick={() => setHomeSection('liked')} role="tab" className={`tab ${homeSection === 'liked' ? 'tab-active' : ''} `}>Me gusta</a>
          </div>
          <Posts type={homeSection} user={user}/>
          </>
        )}
      </div>
      {/* MODAL_EDIT */}
      <dialog id={`modal_edit_${user?.User._id}`} className='modal'>
        <div className='modal-box p-4 pt-5 flex flex-col rounded-xl max-w-md  md:max-w-screen-sm'>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute left-1 top-4">✕</button>
          </form>
          <div className='flex flex-col gap-y-2'>
            <div className='flex flex-row justify-between ps-8 items-center'>
              <h1>Editar perfil</h1>
              <button onClick={onSubmit} className='bg-white text-black rounded-full hover:bg-slate-100 btn-sm font-semibold py-1 px-3'>Confirmar</button>
            </div>
            <form onSubmit={onSubmit} className='grid grid-cols-2 justify-center items-center mt-2 gap-x-1 gap-y-3'>
              <div className='relative'>
                <input type="text" id='fullName' autoComplete='fullName'  name='fullname' placeholder={dataForm?.fullname} className="input input-bordered w-full text-base pt-5 peer" onChange={(e) => setDataForm({...dataForm, [e.target.name]: e.target.value})}/>
                <label htmlFor="name" className='absolute left-4  text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500'>Nombre</label>
              </div>
              <div className='relative'>
                <input type="text" id='username' autoComplete='username' name='username' placeholder={dataForm?.username} className="input input-bordered w-full text-base pt-5 peer" onChange={(e) => setDataForm({...dataForm, [e.target.name]: e.target.value})}/>
                <label htmlFor="username" className='absolute left-4  text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500'>Username</label>
              </div>
              <div className='relative flex col-span-2 '>
                <textarea type="text" id='bio' autoComplete='off' name='bio' placeholder={dataForm?.bio} className="textarea textarea-bordered w-full text-base pt-5 h-10 resize-none overflow-y-auto focus:h-20 peer transition-all duration-200" onChange={(e) => setDataForm({...dataForm, [e.target.name]: e.target.value})}/>
                <label htmlFor="bio" className='absolute left-4 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:top-[0px] peer-focus:text-blue-500 peer-focus:bg-black bg-black mt-[1px] h-5 w-[95%]'>Bio</label>
              </div>
              <div className='relative'>
                <input type="text" id='Link' autoComplete='link' name='link' placeholder={dataForm?.link} className="input input-bordered w-full text-base pt-5 peer" onChange={(e) => setDataForm({...dataForm, [e.target.name]: e.target.value})}/>
                <label htmlFor="Link" className='absolute left-4  text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500'>Link</label>
              </div>
              <div className='relative'>
                <input type="text" id='Email' autoComplete='email' name='email' placeholder={dataForm?.email} className="input input-bordered w-full text-base pt-5 peer" onChange={(e) => setDataForm({...dataForm, [e.target.name]: e.target.value})}/>
                <label htmlFor="Email" className='absolute left-4  text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500'>Email</label>
              </div>
              <div className='relative'>
                <input type="password" autoComplete="current-password" id='password' placeholder="" name='currentPassword' className="input input-bordered w-full text-base pt-5 peer" onChange={(e) => setDataForm({...dataForm, [e.target.name]: e.target.value})}/>
                <label htmlFor="password" className='absolute left-4  text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500'>Current password</label>
              </div>
              <div className='relative'>
                <input type="password" autoComplete="new-password" id='password1' placeholder="" name='newPassword' className="input input-bordered w-full text-base pt-5 peer" onChange={(e) => setDataForm({...dataForm, [e.target.name]: e.target.value})}/>
                <label htmlFor="password1" className='absolute left-4  text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:text-sm peer-focus:top-1 peer-focus:text-blue-500'>New password</label>
              </div>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className=''>close</button>
        </form>
      </dialog>

      {/* MODAL USERS */}
      <dialog id={`modal_user_${userType}`} className='modal'>
        <div className='modal-box p-4 pt-9 flex flex-col rounded-xl max-w-md md:max-w-screen-sm'>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute left-1 top-1">✕</button>
            <div className='flex flex-col w-full max-h-96 rounded-full'>
              <h1 className='text-xl font-bold'>{userType === 'following' ? 'Siguiendo' : 'Seguidores'}</h1>
              {userType === 'following' ? (
                user?.User?.following?.map((user) => (
                  <RightPanelUser user={user} key={user._id} type={'profile'}/>
                ))
              ) : (
                user?.User.followers.map((user) => (
                  <RightPanelUser user={user} key={user._id} type={'profile'}/>
                ))
              )}
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className=''>close</button>
        </form>
      </dialog>
    </div>
  )
}
