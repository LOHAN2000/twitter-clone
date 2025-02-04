import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

export const useUpdate = () => {

  const queryClient = useQueryClient()
  const { data: authUser } = useQuery({ queryKey: ['authUser']})

  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await fetch(`/api/user/update/${authUser.User._id}`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
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
        toast.error(error)
      }
    },
    onSuccess: async (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['authUser']})
    }
  })
}
