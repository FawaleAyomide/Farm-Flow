import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { LuCreditCard } from 'react-icons/lu'

const AddMoney = () => {
  return (
     <>
        <div className='min-h-screen bg-green-100 pt-4'>
              <div className=' bg-green-800 w-100 m-auto p-1 rounded-sm'>
                <FaArrowLeftLong />
                <p className='mt-8 text-center'>Add Money</p>
              </div>
              <div className='bg-green-400 w-80 m-auto mt-2 rounded-lg shadow-md'>
                <div className='flex justify-between items-center px-6'>
                <h1>Wallet Balance</h1>
                <MdOutlineRemoveRedEye className='text-green-600'/>
              </div>
              <div className='text-xl pb-8 pl-6'>
                <h1>&#8358; 0.00</h1>
              </div>
              </div>
              <h1 className='text-center font-bold my-1.5'>Bank Transfer</h1>
              <div className='border-1 border-green-600 w-40 text-center rounded-2xl m-auto'>
                <h1 className='font-bold'>Farm Flow Account</h1>
                <p>FF_OPAY_Username</p>
              </div>
              <div className='border-1 border-green-600 w-40 text-center rounded-2xl m-auto mt-0.5'>
                <h1 className='font-bold'>Farm Flow Account</h1>
                <p>9145724656</p>
              </div>
              <div className='bg-green-800 w-80 m-auto mt-1 text-center rounded-full'>
                <p>Copy Farm Flow Account Number</p>
              </div>
              <div className='flex items-center bg-green-400 w-80 m-auto mt-3 rounded-xl'>
                <button className='border-1  border-gray-600 my-2 mx-16 py-1 w-40 rounded-xl'>Add With Card</button>
                <LuCreditCard className='text-2xl text-gray-400'/>
              </div>
              <div className='bg-green-400 w-80 m-auto mt-2 rounded-xl'>
                <button className='border-1  border-gray-600 my-2 mx-16 py-1 w-40  rounded-xl'>USSD</button>
              </div>
            </div>
        </>
  )
}

export default AddMoney