import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { BiSend } from 'react-icons/bi'
import { CiCamera } from 'react-icons/ci'

const Customer = () => {
  return (
<>
  <div className='min-h-screen bg-green-100 pt-4'>
    <div className='m-auto w-100'>
      <div className='flex gap-1 items-center bg-green-700 rounded-t-xl pt-10'>
        <FaArrowLeftLong className=''/>
        <div>
          <img src="Profile image2.jpg" alt="" className='h-13 rounded-full'/>
        </div>
        <p className='font-semibold'>Asim Ken</p>
      </div>
      <div className='bg-green-400 w-90 m-auto pt-1'>
        <div className='bg-green-700 text-sm px-2 text-white w-40  rounded-sm ml-1 pt-1'>
          <p >I want the 50 basket delivered on or before 30th of September. </p>
          <p className='text-end text-sm'>6:20PM</p>
        </div>
        <div className='bg-green-700 text-sm px-2 text-white w-30 rounded-sm mt-3 ml-auto mr-1'>
          <p >Noted!. </p>
          <p className='text-end text-sm'>6:20PM</p>
        </div>
        <div className='flex gap-1 items-center pt-100'>
          <div className='flex justify-between items-center bg-green-700 w-82 h-10 rounded-2xl pl-5 mb-2'>
            <input type="text" placeholder='Message' className='border-0 outline-0'/>
            <BiSend className='mr-2 text-lg'/>
          </div>
          <div className='text-xl size-10 bg-green-700 pt-2.5 pl-2.5 mb-2 rounded-full'>
            <CiCamera />
          </div>
        </div>
    </div>
  </div>
  </div>
</>
  )
}

export default Customer