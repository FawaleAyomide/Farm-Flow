import React from 'react'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { FaArrowLeftLong } from 'react-icons/fa6'


const Edit = () => {
  return (
    <>
    <div className='min-h-screen bg-green-100'>
      <div className='m-auto w-100'>
        <FaArrowLeftLong />
        <div>
          <img src="Profile image2.jpg" alt="profile image" className='h-40 m-auto rounded-full'/>
        </div>
        <div className='flex justify-center gap-4 mt-1'>
          <button className='btn'>Gallery</button>
          <button className='btn'>Camera</button>
        </div>
        <div className='flex flex-col mt-3 ml-23'>
          <div>
            <label htmlFor="Username" className='block text-sm font-semibold'>Username</label>
            <input type="text" id='Username' name='Username' placeholder='Username' required className='w-55 border-2 border-green-400'/>
          </div>
          <div>
            <label htmlFor="Location" className='block text-sm font-semibold mt-2'>Location</label>
            <input type="text" id='Location' name='Location' placeholder='Location' required className='w-55 border-2 border-green-400'/>
          </div>
          <div>
            <label htmlFor="Change phone" className='block text-sm font-semibold mt-2'>Change Phone</label>
          <input type="number" id='Number' name='Number' placeholder='+23412607078' className='w-55 border-2 border-green-400'/>
          </div> 
        </div>
        <div className='flex justify-between items-center w-55 ml-23 mt-2'>
          <h1>Show Username</h1>
          <MdOutlineRemoveRedEye className='text-green-400'/>
        </div>
        <button type='submit' className='bg-green-500 ml-23 mt-15 w-55 rounded-md'>Save Changes</button>
      </div>
    </div>
    </>
  )
}

export default Edit