import React from 'react'
import { GoGear } from "react-icons/go";
import { Notification } from '../../components/common/Notification';

export const NotificationPage = () => {
  return (
    <div className='flex-[4_4_0]'>
      <div className='flex flex-col'>
        <div className='flex flex-row h-10 px-3 justify-between items-center border-b border-[rgb(47,51,54)]'>
          <h1 className='font-bold'>Notificaciones</h1>
          <div className='dropdown dropdown-end'>
            <GoGear tabIndex={0} role='button' className='w-[1.2rem] h-[1.2rem]'/>
            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 sm:w-36 md:w-52 p-2 shadow'>
              <li className='text-md font-semibold text-red-600'><a>Eliminar notificaciones</a></li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col'>
          <Notification type={'follow'}/>
          <Notification type={'like'}/>
          <Notification type={'follow'}/>
          <Notification type={'like'}/>
        </div>
      </div>
    </div>
  )
}
