import React from 'react'
import { GoGear } from "react-icons/go";
import { Notification } from '../../components/common/Notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { LoadSpinner } from '../../components/common/LoadSpinner';

export const NotificationPage = () => {

  const queryClient = useQueryClient()

  const { data: notifications, isPending: isPendingNotifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/notification`)
        if (!response.ok) {
          const dataError = await response.json()
          throw new Error(dataError.message)
        }

        const data = await response.json()

        if (data.Error) {
          throw new Error(data.Error)
        }
        return data.notifications

      } catch (error) {
        return []
      }
    }
  })

  const { mutate: deleteNot, isPending: isPendingDelete } = useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`/api/notification`, {
          method: 'DELETE'
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
        return []
      }
    },
    onSuccess: async (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['notifications']})
    }
  })

  return (
    <div className='flex-[4_4_0]'>
      <div className='flex flex-col'>
        <div className='flex flex-row h-10 px-3 justify-between items-center border-b border-[rgb(47,51,54)]'>
          <h1 className='font-bold'>Notificaciones</h1>
          <div className='dropdown dropdown-end'>
            <GoGear tabIndex={0} role='button' className='w-[1.2rem] h-[1.2rem]'/>
            <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 sm:w-36 md:w-52 p-2 shadow'>
              <li onClick={() => deleteNot()} className='text-md font-semibold text-red-600 cursor-pointer flex justify-center'><a>{isPendingDelete ? <LoadSpinner size={'md'}/> : 'Eliminar notificaciones'}</a></li>
            </ul>
          </div>
        </div>
          {isPendingNotifications ? (
            <div className='flex justify-center my-2'>
              <LoadSpinner size="md" />
            </div>
            ) : notifications && notifications.length > 0 ? (
              <div className='flex flex-col'>
                {notifications.map((not) => (
                  <Notification not={not} key={not._id} />
                ))}
              </div>
            ) : (
              <div className='flex justify-center my-2'>
                <h1>No hay notificaciones</h1>
              </div>
            )} 
      </div>
    </div>
  )
}
