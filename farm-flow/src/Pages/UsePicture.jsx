import React from 'react'
import { LiaTimesSolid } from 'react-icons/lia'

const UsePicture = () => {
  return (
    <>
        <div className='min-h-screen bg-green-100 pt-4'>
          <div className='m-auto w-100 '>
              <div className='flex gap-6 justify-center pt-10'>
                <LiaTimesSolid className='border-1 size-8 border-green-400 rounded-sm'/>
                <h1 className='mt-4'>Move and Scale</h1>
                <button type='submit' className='border-1 size-8 border-green-400 rounded-sm'>Use</button>
              </div>
              <div className='mt-15'>
                <div className='Select'>
                  <img src="Profile image2.jpg" alt="" className='rounded-full h-40 m-auto'/>
                </div>
              </div>
          </div>
        </div>
    </>
  )
}

export default UsePicture