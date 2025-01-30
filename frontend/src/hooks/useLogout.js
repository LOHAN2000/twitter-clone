import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'

export const useLogout = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST'
        })

        if (!response.ok) {
          const errorData = await response.json()
          const errorMessage = errorData.message || 'Error interno del servidor'
          throw new Error(errorMessage)
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        return data 

      } catch (error) {
        toast.error(error)
        throw error
      }
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryClient: ['authUser']})
    }
  })
}
