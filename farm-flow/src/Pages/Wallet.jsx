import React from 'react'
import { FaArrowLeftLong, FaPlus } from 'react-icons/fa6'
import { MdOutlineRemoveRedEye } from 'react-icons/md'


const Wallet = () => {
  return (
    <>
    <div className='min-h-screen bg-green-100 pt-4'>
          <div className='flex items-center gap-3 bg-green-800 w-100 m-auto p-1 rounded-sm'>
            <FaArrowLeftLong />
            <img src="Profile image2.jpg" alt="" className='h-15 rounded-full'/>
            <p className='mt-10'>Hi Username!</p>
          </div>
          <div className='bg-green-400 w-80 m-auto mt-2 rounded-lg'>
            <div className='flex justify-between items-center px-6'>
            <h1>Wallet Balance</h1>
            <MdOutlineRemoveRedEye className='text-green-600'/>
          </div>
          <div className='text-center text-2xl font-bold pb-10 pt-6'>
            <h1>&#8358; 0.00</h1>
          </div>
          </div>
          <div className='bg-green-400 w-80 m-auto mt-2 rounded-lg pb-3'>
            <div className='flex flex-col'>
              <div className='flex justify-center items-center bg-green-700 w-77 mt-2 rounded-lg m-auto'>
                <FaPlus className='mr-10'/>
                <button type='submit' className='mr-10'> Add Money</button>
              </div>
            <button type='submit' className='bg-green-700 w-77 mt-2 rounded-lg m-auto'>Withdraw</button>
            <button type='submit' className='bg-green-700 w-77 mt-2 rounded-lg m-auto'>Transaction History</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Wallet