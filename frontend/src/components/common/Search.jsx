import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { RightPanelUser } from './RightPanelUser';
import { useQuery } from '@tanstack/react-query';

export const Search = () => {

  const [searchTerm, setSearchTerm] = useState({search: ''})
  const [debounceTerm, setDebounceTerm] = useState({search: ''})
  
  const { data: searchResults, isLoading} = useQuery({
    queryKey: ['searchUsers', debounceTerm.search],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/user/search?q=${debounceTerm.search}`)
        console.log(debounceTerm)
        if(!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message)
        }

        const data = await response.json()

        if (data.Error) {
          throw new Error(data.Error)
        }

        console.log(data)

        return data

      } catch (error) {
        throw new Error(error.message)
      }
    },
    enabled: debounceTerm.search.trim().length > 0,
  })

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      setDebounceTerm(searchTerm)
    }, 500)

    return () => clearTimeout(searchTimer)
  }, [searchTerm])


  return (
    <div className='flex flex-col'>
      <input onChange={(e) => setSearchTerm({...searchTerm, [e.target.name]: e.target.value})} type='text' name='search' className='relative h-10 bg-black border-0 rounded-2xl focus:outline-none ps-7' placeholder='Buscar'/>
      <label className='absolute left-2 flex text-center pt-[12px]'><IoSearchOutline/></label>
      {searchResults && (
        <div className='absolute top-14 flex flex-col border border-[rgb(47,51,54)] rounded-2xl gap-y-3 w-full bg-black shadow-md shadow-slate-600'>
          {searchResults?.users.map((user) => (
            <RightPanelUser user={user} key={user._id} type={'search'}/>
          ))}
        </div>
      )}
    </div>
  )
}
