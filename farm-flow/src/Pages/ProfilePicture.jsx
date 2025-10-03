import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'

const ProfilePicture = () => {
  return (
<>
    <div className='min-h-screen bg-green-100 pt-4'>
      <div className='m-auto w-100 '>
          <div className='flex items-center bg-green-700 rounded-t-xl pt-10'>
            <FaArrowLeftLong className='mr-auto'/>
            <p className='font-semibold mr-auto'>Select Profile Picture</p>
          </div>
          <div className='grid grid-cols-3 gap-2 pt-2 w-90 m-auto'>
            <div className='select'></div>
            <div className='select'></div>
            <div className='select'></div>
            <div className='select'></div>
            <div className='select'></div>
            <div className='select'></div>
            <div className='select'></div>
            <div className='select'></div>
            <div className='select'></div>
            <div className='select'></div>
            <div className='select'></div>
            <div className='select'></div>
          </div>
      </div>
    </div>
</>
  )
}

export default ProfilePicture