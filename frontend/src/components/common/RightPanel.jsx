import React from 'react'
import { RightPanelSkeleton } from '../skeletons/RightPanelSkeleton'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { RightPanelUser } from './RightPanelUser'

export const RightPanel = () => {

  const { data: suggestedUsers, isPending } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/user/suggested', {
          method: 'GET'
        })

        if (!response.ok) {
          const errorData = await response.json()
          const errorMsg = errorData.message
          throw new Error(errorMsg)
        }

        const data = await response.json()

        if (data.Error) {
          throw new Error(data.Error)
        }

        return data.data

      } catch (error) {
        throw new Error(error)
      }
    }
  })

  return (
    <div className='flex-[2_2_0] border-s border-[rgb(47,51,54)]'>
      <div className='flex flex-col sticky top-0 w-[85%] mx-auto h-screen py-2'>
        <div className='flex flex-col border border-[rgb(47,51,54)] rounded-2xl py-3 gap-y-3'>
          <h1 className='font-bold md:font-extrabold px-3'>A quién seguir</h1>
          {isPending && (
            <div className='flex flex-col'>
              <RightPanelSkeleton/>
              <RightPanelSkeleton/>
              <RightPanelSkeleton/>
              <RightPanelSkeleton/>
            </div>
          )}
          {!isPending && (
            suggestedUsers?.map((user) => (
              <RightPanelUser key={user._id} user={user}/>
            )
          ))}
        </div>
      </div>
    </div>
  )
}
