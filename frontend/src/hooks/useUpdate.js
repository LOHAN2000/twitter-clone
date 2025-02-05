import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

export const useUpdate = () => {

  const queryClient = useQueryClient()

  return useMutation({
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
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['authUser']})
    }
  })
}
