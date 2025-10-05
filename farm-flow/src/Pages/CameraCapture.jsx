import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { MdFlipCameraAndroid } from 'react-icons/md'
import { Link } from 'react-router-dom'

const CameraCapture = () => {
  return (
     <>
        <div className='min-h-screen bg-green-100 pt-4'>
              <div className='m-auto w-100 border-4 border-green-500 rounded-2xl'>
                <div className='bg-green-700 h-20 rounded-t-xl'>
                </div>
                <div className='flex justify-between text-center px-20 pt-8 text-green-400'>
                  <Link to="/capture">
                    <FaArrowLeftLong />
                  </Link>
                  <MdFlipCameraAndroid className='text-2xl'/>
                </div>
                <div className='flex flex-col gap-2 pt-80'>
                 <button type='submit' className='size-20 bg-green-700 rounded-full border-4 border-green-500 m-auto mb-2'></button>
                </div>
            </div>
            </div>
        </>
  )
}

export default CameraCapture