import React from 'react'
import { SlOptions } from "react-icons/sl";

export const Post = () => {
  return (
    <div className="flex flex-row px-4 py-3 gap-x-3.5">
  <img
    src="/Twitter_default_profile_400x400.png"
    className="object-cover rounded-full w-10 h-10"
  />
  <div className="flex flex-col w-full">
    {/* Header */}
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-x-2 overflow-hidden">
        <h1 className="truncate text-sm font-semibold max-w-[40%] sm:max-w-[30%]">
          dodgie 👻 (VTuber Arc) | ¡NUEVO VIDEOVIDEO!
        </h1>
        <h1 className="truncate text-sm max-w-[20%] text-gray-500">fresaconcrema</h1>
        <h1 className="truncate text-sm max-w-[10%] text-gray-400">Hora</h1>
      </div>
      <SlOptions className="text-gray-600" />
    </div>

    {/* Body */}
    <div className="mt-2">
      <p className="text-sm text-gray-700">Texto</p>
    </div>
    <div className="mt-2">
      <img
        src="/path/to/image.jpg"
        className="w-full max-h-40 object-cover rounded-lg"
        alt="Imagen"
      />
    </div>
    <div className="flex flex-row gap-2 mt-2">
      <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
        Botón 1
      </button>
      <button className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm">
        Botón 2
      </button>
    </div>
  </div>
</div>
  )
}
