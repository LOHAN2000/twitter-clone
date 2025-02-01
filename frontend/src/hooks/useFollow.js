import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

export const useFollow = () => {

  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (idUser) => {
      try {
        const response = await fetch(`/api/user/follow/${idUser}`,{
          method: 'POST'
        })

        if (!response.ok) {
          const errorData = await response.json()
          const errorMessage = errorData.message
          throw new Error(errorMessage)
        }

        const data = await response.json()

        if (data.Error) {
          throw new Error(data.Error)
        }

        return data

      } catch (error) {
        toast.error(error.message)
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['authUser']})
      queryClient.invalidateQueries({ queryKey: ['suggestedUsers']})
    }
  })
}
