import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const CapturePhoto = () => {
  return (
    <>
    <div className='min-h-screen bg-green-100 pt-4'>
          <div className='m-auto w-100'>
            <div>
              <Link to="/edit">
                <FaArrowLeftLong />
              </Link>
              <h1 className='text-green-600 text-center text-lg font-bold '>Farm Flow</h1>
            </div>
            <div className='text-center pt-30'>
              <h1 className='text-2xl font-bold'>Capture Photo</h1>
              <p className='text-MD font-semibold pt-2'>Allow Farm Flow access to your camera?</p>
            </div>
            <div className='flex flex-col gap-2 pt-30'>
              <Link to="/camera" className='CapBtn'>
                <button type='submit'>Yes</button>
              </Link>
              <Link to="/camera" className='CapBtn'>
                <button type='submit'>Only now</button>
              </Link>
              <Link to="/edit" className='CapBtn'>
              <button type='submit'>Go Back</button>
              </Link>
            </div>
        </div>
        </div>
    </>
  )
}

export default CapturePhoto